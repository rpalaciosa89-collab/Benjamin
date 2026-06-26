// generate-paths.js — Extrae paths SIMPLIFICADOS para trazo infantil
// Uso: node magic-abc/generate-paths.js
// Genera: magic-abc/letter-paths.js

const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');

const FONT_PATH = '/System/Library/Fonts/Supplemental/Comic Sans MS.ttf';
const OUTPUT = path.join(__dirname, 'letter-paths.js');

// ==========================================
//  Ramer-Douglas-Peucker simplification
// ==========================================
function rdpSimplify(points, epsilon) {
    if (points.length < 3) return points;
    let maxDist = 0, maxIdx = 0;
    const first = points[0], last = points[points.length - 1];
    for (let i = 1; i < points.length - 1; i++) {
        const d = perpendicularDist(points[i], first, last);
        if (d > maxDist) { maxDist = d; maxIdx = i; }
    }
    if (maxDist > epsilon) {
        const left = rdpSimplify(points.slice(0, maxIdx + 1), epsilon);
        const right = rdpSimplify(points.slice(maxIdx), epsilon);
        return left.slice(0, -1).concat(right);
    }
    return [first, last];
}

function perpendicularDist(p, a, b) {
    const dx = b.x - a.x, dy = b.y - a.y;
    const lenSq = dx*dx + dy*dy;
    if (lenSq === 0) return Math.hypot(p.x - a.x, p.y - a.y);
    const t = ((p.x - a.x)*dx + (p.y - a.y)*dy) / lenSq;
    if (t < 0) return Math.hypot(p.x - a.x, p.y - a.y);
    if (t > 1) return Math.hypot(p.x - b.x, p.y - b.y);
    const projX = a.x + t*dx, projY = a.y + t*dy;
    return Math.hypot(p.x - projX, p.y - projY);
}

// ==========================================
//  Minimum distance filter
// ==========================================
function minDistFilter(points, minDist) {
    if (points.length < 2) return points;
    const result = [points[0]];
    for (let i = 1; i < points.length; i++) {
        const last = result[result.length - 1];
        const d = Math.hypot(points[i].x - last.x, points[i].y - last.y);
        if (d >= minDist) result.push(points[i]);
    }
    return result;
}

// ==========================================
//  Flatten beziers (CHILD-FRIENDLY tolerance)
// ==========================================
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

function flattenPath(pathData, tolerance = 4.0) {
    const points = [];
    let cx = 0, cy = 0;
    for (const cmd of pathData.commands) {
        switch (cmd.type) {
            case 'M':
                points.push({ x: Math.round(cmd.x), y: Math.round(cmd.y) });
                cx = cmd.x; cy = cmd.y;
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
            case 'Z': break;
        }
    }
    return points;
}

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

// ==========================================
//  MAIN — Child-friendly path generation
// ==========================================
console.log('Generando paths infantiles...');
const fontBuffer = fs.readFileSync(FONT_PATH).buffer;
const font = opentype.parse(fontBuffer);

const FONT_SIZE = 200;
const BEZIER_TOLERANCE = 4.0;  // Comic Sans ya es simple
const RDP_EPSILON = 3.0;       // Simplificación moderada
const MIN_POINT_DIST = 8;      // Buena separación

const letters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz';
const letterPaths = {};
let totalOrig = 0, totalSimple = 0;

for (const char of letters) {
    try {
        const glyphPath = font.getPath(char, 0, 0, FONT_SIZE);
        let points = flattenPath(glyphPath, BEZIER_TOLERANCE);
        totalOrig += points.length;
        
        // Simplificar con RDP
        points = rdpSimplify(points, RDP_EPSILON);
        // Filtrar puntos muy cercanos
        points = minDistFilter(points, MIN_POINT_DIST);
        // Normalizar
        points = normalize(points);
        
        if (points.length >= 3) {
            letterPaths[char] = points;
            totalSimple += points.length;
        }
    } catch(e) {
        console.warn(`  ⚠️ ${char}: ${e.message}`);
    }
}

const js = 'const LETTER_PATHS = ' + JSON.stringify(letterPaths) + ';';
fs.writeFileSync(OUTPUT, js);

console.log(`✅ ${Object.keys(letterPaths).length} letras generadas`);
console.log(`   Puntos originales: ${totalOrig} → Simplificados: ${totalSimple} (${Math.round(totalSimple/totalOrig*100)}%)`);
console.log(`   Tamaño: ${(fs.statSync(OUTPUT).size/1024).toFixed(1)} KB`);
