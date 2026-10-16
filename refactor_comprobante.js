const fs = require('fs');
const path = require('path');

const filePath = path.join('C:\\Users\\USUARIO\\Desktop\\jinnova\\tienda\\front_mambo\\app\\admin\\comprobantes\\crearComprobante\\page.tsx');

let content = fs.readFileSync(filePath, 'utf8');

// Color Replacements
const colorMap = {
  '#0f172a': '#1a0f14',
  '#64748b': '#66585e',
  '#475569': '#66585e',
  '#334155': '#44383d',
  '#f8fafc': '#faf7f8',
  '#e2e8f0': '#f3e2e8',
  '#cbd5e1': '#f3e2e8',
  '#f1f5f9': '#f3e2e8',
  '#0284c7': '#9c3552',
  '#3b82f6': '#9c3552',
  '#1d4ed8': '#9c3552',
  '#eff6ff': '#fcf0f4',
  '#bfdbfe': '#f3c2d4'
};

for (const [oldC, newC] of Object.entries(colorMap)) {
  content = content.replace(new RegExp(oldC, 'g'), newC);
}

// Enhance input styles
content = content.replace(
  /const inputStyle: React\.CSSProperties = \{[\s\S]*?\};/,
  `const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "2px solid #f3e2e8",
  fontSize: "0.78rem",
  outline: "none",
  backgroundColor: "#faf7f8",
  color: "#1a0f14",
  fontWeight: "600"
};`
);

// Add rounded icon boxes
content = content.replace(
  /<User02Icon size=\{15\} color="([^"]+)" \/> Datos del Cliente & Comprobante/g,
  `<div style={{ padding: "6px", backgroundColor: "#fcf0f4", borderRadius: "8px" }}><User02Icon size={16} color="#9c3552" /></div> Datos del Ingreso`
);

content = content.replace(
  /<Invoice01Icon size=\{16\} color="([^"]+)" \/> Detalle de Productos en Comprobante/g,
  `<div style={{ padding: "6px", backgroundColor: "#fcf0f4", borderRadius: "8px" }}><Invoice01Icon size={16} color="#9c3552" /></div> Detalle del Comprobante`
);

content = content.replace(
  /<Tag01Icon size=\{16\} color="([^"]+)" \/> Configurar & Agregar Producto/g,
  `<div style={{ padding: "6px", backgroundColor: "#fcf0f4", borderRadius: "8px" }}><Tag01Icon size={16} color="#9c3552" /></div> Agregar Producto`
);

// Reduce some paddings
content = content.replace(/padding: "16px"/g, 'padding: "20px"'); // Increase inner padding slightly for premium feel

// Adjust borders and shadows
content = content.replace(/boxShadow: "0 1px 2px rgba\(0,0,0,0.02\)"/g, 'boxShadow: "0 4px 12px rgba(156, 53, 82, 0.04)"');
content = content.replace(/border: "1px solid #e2e8f0"/g, 'border: "1px solid #f3e2e8"');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done replacing colors and styles in crearComprobante/page.tsx');
