// generate-paths.js — Extrae paths de letras desde Baloo 2 Bold
// Uso: node magic-abc/generate-paths.js
// Genera: magic-abc/letter-paths.json

const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');

const FONT_PATH = '/System/Library/Fonts/Supplemental/Arial Bold.ttf';
const OUTPUT = path.join(__dirname, 'letter-paths.json');

// Aplanar curva de Bézier cúbica a segmentos de línea
function flattenCubic(x0, y0, x1, y1, x2, y2, x3, y3, tol, out) {
    const ux = 3*x1 - 2*x0 - x3, uy = 3*y1 - 2*y0 - y3;
    const vx = 3*x2 - 2*x3 - x0, vy = 3*y2 - 2*y3 - y0;
    if (Math.max(ux*ux + uy*uy, vx*vx + vy*vy) <= 16 * tol * tol) {
        out.push({ x: Math.round(x3), y: Math.round(y3) });
        return;
    }
    const x01 = (x0+x1)/2, y01 = (y0+y1)/2;
    const x12 = (x1+x2)/2, y12 = (y1+y2)/2;
    const x23 = (x2+x3)/2, y23 = (y2+y3)/2;
    const x012 = (x01+x12)/2, y012 = (y01+y12)/2;
    const x123 = (x12+x23)/2, y123 = (y12+y23)/2;
    const x0123 = (x012+x123)/2, y0123 = (y012+y123)/2;
    flattenCubic(x0,y0, x01,y01, x012,y012, x0123,y0123, tol, out);
    flattenCubic(x0123,y0123, x123,y123, x23,y23, x3,y3, tol, out);
}

function flattenQuad(x0, y0, x1, y1, x2, y2, tol, out) {
    const cx1 = x0 + 2/3*(x1 - x0), cy1 = y0 + 2/3*(y1 - y0);
    const cx2 = x2 + 2/3*(x1 - x2), cy2 = y2 + 2/3*(y1 - y2);
    flattenCubic(x0, y0, cx1, cy1, cx2, cy2, x2, y2, tol, out);
}

function flattenPath(pathData, tolerance = 0.8) {
    const points = [];
    let cx = 0, cy = 0, startX = 0, startY = 0;
    
    for (const cmd of pathData.commands) {
        switch (cmd.type) {
            case 'M':
                if (points.length > 0) points.push(null); // stroke break
                points.push({ x: Math.round(cmd.x), y: Math.round(cmd.y) });
                cx = cmd.x; cy = cmd.y;
                startX = cmd.x; startY = cmd.y;
                break;
            case 'L':
                points.push({ x: Math.round(cmd.x), y: Math.round(cmd.y) });
                cx = cmd.x; cy = cmd.y;
                break;
            case 'C':
                flattenCubic(cx, cy, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y, tolerance, points);
                cx = cmd.x; cy = cmd.y;
                break;
            case 'Q':
                flattenQuad(cx, cy, cmd.x1, cmd.y1, cmd.x, cmd.y, tolerance, points);
                cx = cmd.x; cy = cmd.y;
                break;
            case 'Z':
                if (Math.abs(cx - startX) > 1 || Math.abs(cy - startY) > 1) {
                    points.push({ x: Math.round(startX), y: Math.round(startY) });
                }
                cx = startX; cy = startY;
                break;
        }
    }
    
    // Filter out null separators and keep as single continuous path
    // (for kids' tracing, we want ONE path per letter)
    return points.filter(p => p !== null);
}

// Normalize points to 200×250 space
function normalize(points) {
    if (points.length === 0) return [];
    const xs = points.map(p => p.x), ys = points.map(p => p.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const rangeX = maxX - minX || 1, rangeY = maxY - minY || 1;
    const scale = Math.min(180 / rangeX, 230 / rangeY);
    const offsetX = (200 - rangeX * scale) / 2 - minX * scale;
    const offsetY = 10 - minY * scale;
    
    return points.map(p => ({
        x: Math.round(p.x * scale + offsetX),
        y: Math.round(p.y * scale + offsetY)
    }));
}

// Main
console.log('Cargando fuente...');
const fontBuffer = fs.readFileSync(FONT_PATH).buffer;
const font = opentype.parse(fontBuffer);
console.log(`Fuente cargada: ${font.names?.fontFamily?.en || 'OK'}`);

const FONT_SIZE = 200;
const letters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz';
const letterPaths = {};
let generated = 0;

for (const char of letters) {
    try {
        const glyphPath = font.getPath(char, 0, 0, FONT_SIZE);
        const points = flattenPath(glyphPath, 0.8);
        const normalized = normalize(points);
        if (normalized.length >= 3) {
            letterPaths[char] = normalized;
            generated++;
        }
    } catch(e) {
        console.warn(`  ⚠️ ${char}: ${e.message}`);
    }
}

// Ensure ñ and Ñ exist
if (!letterPaths['ñ']) letterPaths['ñ'] = letterPaths['n'] || [];
if (!letterPaths['Ñ']) letterPaths['Ñ'] = letterPaths['N'] || [];

fs.writeFileSync(OUTPUT, JSON.stringify(letterPaths, null, 2));
console.log(`✅ ${generated} letras generadas → ${OUTPUT}`);
console.log(`   Tamaño: ${(fs.statSync(OUTPUT).size / 1024).toFixed(1)} KB`);
