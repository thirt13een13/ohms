/* ══════════════════════════════════════════════════════════════
   iLab Physics — Ohm's Law Circuit Simulator
   ══════════════════════════════════════════════════════════════ */

// ── SVG templates for each component type ──────────────────────
const COMPONENT_SVG = {
  battery: {
    w: 90, h: 50, label: 'Battery',
    defaultValue: 9, unit: 'V',
    svg: `<svg viewBox="0 0 90 50" width="90" height="50" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="25" x2="18" y2="25" stroke="#94a3b8" stroke-width="2.5"/>
      <line x1="18" y1="10" x2="18" y2="40" stroke="#22d3ee" stroke-width="4"/>
      <line x1="26" y1="16" x2="26" y2="34" stroke="#64748b" stroke-width="2"/>
      <line x1="34" y1="10" x2="34" y2="40" stroke="#22d3ee" stroke-width="4"/>
      <line x1="42" y1="16" x2="42" y2="34" stroke="#64748b" stroke-width="2"/>
      <line x1="50" y1="10" x2="50" y2="40" stroke="#22d3ee" stroke-width="4"/>
      <line x1="58" y1="16" x2="58" y2="34" stroke="#64748b" stroke-width="2"/>
      <line x1="66" y1="10" x2="66" y2="40" stroke="#22d3ee" stroke-width="4"/>
      <line x1="66" y1="25" x2="90" y2="25" stroke="#94a3b8" stroke-width="2.5"/>
      <text x="19" y="48" font-size="8" fill="#22d3ee" font-family="monospace">+</text>
      <text x="59" y="48" font-size="8" fill="#64748b" font-family="monospace">–</text>
    </svg>`,
    ports: [ {x:0,   y:25, id:'left'},
             {x:90,  y:25, id:'right'} ]
  },

  resistor: {
    w: 90, h: 44, label: 'Resistor',
    defaultValue: 100, unit: 'Ω',
    svg: `<svg viewBox="0 0 90 44" width="90" height="44" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="22" x2="16" y2="22" stroke="#94a3b8" stroke-width="2.5"/>
      <rect x="16" y="12" width="58" height="20" rx="4" fill="#1c1005" stroke="#f59e0b" stroke-width="2"/>
      <line x1="25" y1="12" x2="25" y2="32" stroke="#f59e0b" stroke-width="1.2" opacity="0.6"/>
      <line x1="34" y1="12" x2="34" y2="32" stroke="#f59e0b" stroke-width="1.2" opacity="0.6"/>
      <line x1="43" y1="12" x2="43" y2="32" stroke="#f59e0b" stroke-width="1.2" opacity="0.6"/>
      <line x1="52" y1="12" x2="52" y2="32" stroke="#f59e0b" stroke-width="1.2" opacity="0.6"/>
      <line x1="61" y1="12" x2="61" y2="32" stroke="#f59e0b" stroke-width="1.2" opacity="0.6"/>
      <line x1="74" y1="22" x2="90" y2="22" stroke="#94a3b8" stroke-width="2.5"/>
    </svg>`,
    ports: [ {x:0,  y:22, id:'left'},
             {x:90, y:22, id:'right'} ]
  },

  bulb: {
    w: 70, h: 64, label: 'Bulb',
    defaultValue: 10, unit: 'Ω',
    svg: `<svg viewBox="0 0 70 64" width="70" height="64" xmlns="http://www.w3.org/2000/svg">
      <line x1="35" y1="0" x2="35" y2="14" stroke="#94a3b8" stroke-width="2.5"/>
      <circle cx="35" cy="30" r="16" fill="#1c1005" stroke="#fbbf24" stroke-width="2.2"/>
      <path d="M27 38 Q35 25 43 38" fill="none" stroke="#fbbf24" stroke-width="1.8"/>
      <path d="M27 38 Q29 40 35 40 Q41 40 43 38" fill="none" stroke="#fbbf24" stroke-width="1.8"/>
      <line x1="30" y1="46" x2="40" y2="46" stroke="#fbbf24" stroke-width="2"/>
      <line x1="31" y1="50" x2="39" y2="50" stroke="#fbbf24" stroke-width="2"/>
      <line x1="32" y1="54" x2="38" y2="54" stroke="#fbbf24" stroke-width="1.5"/>
      <line x1="35" y1="54" x2="35" y2="64" stroke="#94a3b8" stroke-width="2.5"/>
    </svg>`,
    ports: [ {x:35, y:0,  id:'top'},
             {x:35, y:64, id:'bottom'} ]
  },

  switch: {
    w: 90, h: 44, label: 'Switch',
    defaultValue: 1, unit: '',   // 1=closed, 0=open
    svg: `<svg viewBox="0 0 90 44" width="90" height="44" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="22" x2="22" y2="22" stroke="#94a3b8" stroke-width="2.5"/>
      <circle cx="22" cy="22" r="4" fill="#22d3ee"/>
      <line class="switch-blade" x1="22" y1="22" x2="58" y2="14" stroke="#22d3ee" stroke-width="2.5"/>
      <circle cx="68" cy="22" r="4" fill="#22d3ee"/>
      <line x1="68" y1="22" x2="90" y2="22" stroke="#94a3b8" stroke-width="2.5"/>
    </svg>`,
    ports: [ {x:0,  y:22, id:'left'},
             {x:90, y:22, id:'right'} ]
  },

  ammeter: {
    w: 70, h: 70, label: 'Ammeter',
    defaultValue: null, unit: 'A',
    svg: `<svg viewBox="0 0 70 70" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
      <line x1="35" y1="0" x2="35" y2="14" stroke="#94a3b8" stroke-width="2.5"/>
      <circle cx="35" cy="35" r="21" fill="#052e16" stroke="#4ade80" stroke-width="2.2"/>
      <text x="35" y="42" font-size="18" fill="#4ade80" font-family="monospace" font-weight="bold" text-anchor="middle">A</text>
      <line x1="35" y1="56" x2="35" y2="70" stroke="#94a3b8" stroke-width="2.5"/>
    </svg>`,
    ports: [ {x:35, y:0,  id:'top'},
             {x:35, y:70, id:'bottom'} ]
  },

  voltmeter: {
    w: 70, h: 70, label: 'Voltmeter',
    defaultValue: null, unit: 'V',
    svg: `<svg viewBox="0 0 70 70" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
      <line x1="35" y1="0" x2="35" y2="14" stroke="#94a3b8" stroke-width="2.5"/>
      <circle cx="35" cy="35" r="21" fill="#1e0f3b" stroke="#c084fc" stroke-width="2.2"/>
      <text x="35" y="42" font-size="18" fill="#c084fc" font-family="monospace" font-weight="bold" text-anchor="middle">V</text>
      <line x1="35" y1="56" x2="35" y2="70" stroke="#94a3b8" stroke-width="2.5"/>
    </svg>`,
    ports: [ {x:35, y:0,  id:'top'},
             {x:35, y:70, id:'bottom'} ]
  }
};

// ── State ────────────────────────────────────────────────────────
let components   = [];  // { id, type, x, y, value, el, ports:[] }
let wires        = [];  // { id, fromComp, fromPort, toComp, toPort, el }
let nextId       = 1;
let dragComp     = null; // component being dragged on canvas
let dragOffset   = {x:0,y:0};
let wireStart    = null; // { compId, portId, portEl }
let previewLine  = null;

const workspace  = document.getElementById('workspace');
const wireSVG    = document.getElementById('wire-layer');
const runBtn     = document.getElementById('btn-run');
const clearBtn   = document.getElementById('btn-clear');
const hint       = document.getElementById('canvas-hint');
const ctxMenu    = document.getElementById('ctx-menu');

// ── Toolbar drag-start ────────────────────────────────────────────
document.querySelectorAll('.comp-card').forEach(card => {
  card.addEventListener('dragstart', e => {
    e.dataTransfer.setData('type', card.dataset.type);
  });
});

// ── Canvas drop ──────────────────────────────────────────────────
workspace.addEventListener('dragover', e => e.preventDefault());
workspace.addEventListener('drop', e => {
  e.preventDefault();
  const type = e.dataTransfer.getData('type');
  if (!type || !COMPONENT_SVG[type]) return;
  const rect = workspace.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  placeComponent(type, x, y);
});

// ── Place component ──────────────────────────────────────────────
function placeComponent(type, x, y) {
  const def = COMPONENT_SVG[type];
  const id  = nextId++;
  const el  = document.createElement('div');
  el.className  = 'placed-comp';
  el.dataset.id = id;
  el.style.left = x + 'px';
  el.style.top  = y + 'px';

  const body = document.createElement('div');
  body.className = 'comp-body';
  body.innerHTML = def.svg;
  el.appendChild(body);

  // Label
  const labelEl = document.createElement('div');
  labelEl.className = 'comp-label';
  let labelText = def.label;
  if (def.defaultValue !== null && def.defaultValue !== undefined && def.unit) {
    labelText += ` (${def.defaultValue}${def.unit})`;
  }
  labelEl.textContent = labelText;
  el.appendChild(labelEl);

  // Ports
  const portEls = [];
  def.ports.forEach(p => {
    const dot = document.createElement('div');
    dot.className = 'port';
    dot.style.left = p.x + 'px';
    dot.style.top  = p.y + 'px';
    dot.dataset.portId  = p.id;
    dot.dataset.compId  = id;
    dot.addEventListener('mousedown', onPortMousedown);
    el.appendChild(dot);
    portEls.push({ id: p.id, el: dot, x: p.x, y: p.y });
  });

  // Drag component
  body.addEventListener('mousedown', onCompMousedown);

  // Right-click → configure
  el.addEventListener('contextmenu', e => {
    e.preventDefault();
    openCtxMenu(e, id);
  });

  workspace.appendChild(el);

  const comp = {
    id, type, x, y,
    value: def.defaultValue,
    unit: def.unit,
    el, portEls,
    labelEl
  };
  components.push(comp);

  hint.classList.add('hidden');
  updateRunButton();
  renderProps();
}

// ── Component dragging ────────────────────────────────────────────
function onCompMousedown(e) {
  if (e.button !== 0) return;
  e.stopPropagation();
  const compEl = e.currentTarget.closest('.placed-comp');
  const comp   = getCompById(parseInt(compEl.dataset.id));
  dragComp   = comp;
  const rect = compEl.getBoundingClientRect();
  const wRect = workspace.getBoundingClientRect();
  dragOffset.x = e.clientX - (comp.x + wRect.left);
  dragOffset.y = e.clientY - (comp.y + wRect.top);
  compEl.style.zIndex = 50;
}

document.addEventListener('mousemove', e => {
  if (dragComp) {
    const wRect = workspace.getBoundingClientRect();
    const nx = e.clientX - wRect.left - dragOffset.x;
    const ny = e.clientY - wRect.top  - dragOffset.y;
    dragComp.x = nx;
    dragComp.y = ny;
    dragComp.el.style.left = nx + 'px';
    dragComp.el.style.top  = ny + 'px';
    redrawWires();
    return;
  }
  if (wireStart && previewLine) {
    const wRect = workspace.getBoundingClientRect();
    const mx = e.clientX - wRect.left;
    const my = e.clientY - wRect.top;
    const sp = getPortAbsPos(wireStart.compId, wireStart.portId);
    previewLine.setAttribute('d', routeWire(sp.x, sp.y, mx, my));
  }
});

document.addEventListener('mouseup', e => {
  if (dragComp) {
    dragComp.el.style.zIndex = 10;
    dragComp = null;
  }
});

// ── Wire drawing ─────────────────────────────────────────────────
function onPortMousedown(e) {
  if (e.button !== 0) return;
  e.stopPropagation();
  e.preventDefault();
  const compId = parseInt(e.currentTarget.dataset.compId);
  const portId = e.currentTarget.dataset.portId;

  if (wireStart) {
    // Second click — complete the wire
    if (wireStart.compId === compId && wireStart.portId === portId) {
      cancelWire(); return;
    }
    // Don't double-wire same port pair
    const exists = wires.find(w =>
      (w.fromComp===wireStart.compId && w.fromPort===wireStart.portId && w.toComp===compId && w.toPort===portId) ||
      (w.toComp===wireStart.compId   && w.toPort===wireStart.portId   && w.fromComp===compId && w.fromPort===portId)
    );
    if (exists) { cancelWire(); return; }

    finishWire(compId, portId, e.currentTarget);
  } else {
    // First click — start a wire
    wireStart = { compId, portId, portEl: e.currentTarget };
    e.currentTarget.classList.add('active');

    // Draw preview line
    previewLine = document.createElementNS('http://www.w3.org/2000/svg','path');
    previewLine.classList.add('wire-preview');
    wireSVG.appendChild(previewLine);
  }
}

function finishWire(compId, portId, portEl) {
  const sp = getPortAbsPos(wireStart.compId, wireStart.portId);
  const ep = getPortAbsPos(compId, portId);

  const pathEl = document.createElementNS('http://www.w3.org/2000/svg','path');
  pathEl.classList.add('wire');
  pathEl.setAttribute('d', routeWire(sp.x, sp.y, ep.x, ep.y));
  const wid = nextId++;
  pathEl.dataset.wid = wid;
  pathEl.addEventListener('click', () => {
    if (confirm('Remove this wire?')) deleteWire(wid);
  });
  wireSVG.insertBefore(pathEl, wireSVG.firstChild);

  wires.push({
    id: wid,
    fromComp: wireStart.compId, fromPort: wireStart.portId,
    toComp: compId,             toPort: portId,
    el: pathEl
  });

  // Mark ports connected
  markPortConnected(wireStart.compId, wireStart.portId);
  markPortConnected(compId, portId);

  cancelWire();
  updateRunButton();
  renderProps();
}

function cancelWire() {
  if (wireStart) {
    wireStart.portEl.classList.remove('active');
    wireStart = null;
  }
  if (previewLine) { previewLine.remove(); previewLine = null; }
}

// ── Routing — orthogonal L-shape wire ─────────────────────────────
function routeWire(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
}

function redrawWires() {
  wires.forEach(w => {
    const sp = getPortAbsPos(w.fromComp, w.fromPort);
    const ep = getPortAbsPos(w.toComp,   w.toPort);
    if (sp && ep) w.el.setAttribute('d', routeWire(sp.x,sp.y,ep.x,ep.y));
  });
}

function getPortAbsPos(compId, portId) {
  const comp = getCompById(compId);
  if (!comp) return null;
  const pDef = comp.portEls.find(p => p.id === portId);
  if (!pDef) return null;
  return { x: comp.x + pDef.x, y: comp.y + pDef.y };
}

function markPortConnected(compId, portId) {
  const comp = getCompById(compId);
  if (!comp) return;
  const port = comp.portEls.find(p => p.id === portId);
  if (port) port.el.classList.add('connected');
}

// ── Wire deletion ────────────────────────────────────────────────
function deleteWire(wid) {
  const idx = wires.findIndex(w => w.id === wid);
  if (idx === -1) return;
  const w = wires[idx];
  w.el.remove();
  wires.splice(idx, 1);
  recomputePortConnected();
  updateRunButton();
}

function recomputePortConnected() {
  // Reset all
  components.forEach(c =>
    c.portEls.forEach(p => p.el.classList.remove('connected'))
  );
  wires.forEach(w => {
    markPortConnected(w.fromComp, w.fromPort);
    markPortConnected(w.toComp, w.toPort);
  });
}

// ── Context menu ─────────────────────────────────────────────────
let ctxTarget = null;
function openCtxMenu(e, compId) {
  ctxTarget = compId;
  const comp = getCompById(compId);
  const def  = COMPONENT_SVG[comp.type];
  document.getElementById('ctx-title').textContent = def.label;
  const valInput = document.getElementById('ctx-value');
  const unitSpan = document.getElementById('ctx-unit');

  if (comp.type === 'switch') {
    valInput.min = 0; valInput.max = 1; valInput.step = 1;
    valInput.value = comp.value ?? 1;
    unitSpan.textContent = '(1=closed, 0=open)';
  } else if (def.defaultValue !== null) {
    valInput.min = 0.01; valInput.step = comp.type === 'battery' ? 0.5 : 1;
    valInput.value = comp.value ?? def.defaultValue;
    unitSpan.textContent = def.unit;
  } else {
    valInput.value = '';
    valInput.disabled = true;
    unitSpan.textContent = '(read-only)';
  }
  if (def.defaultValue === null) valInput.disabled = true;
  else valInput.disabled = false;

  ctxMenu.style.left = e.pageX + 'px';
  ctxMenu.style.top  = e.pageY + 'px';
  ctxMenu.classList.remove('hidden');
}

document.getElementById('ctx-ok').addEventListener('click', () => {
  if (ctxTarget === null) return;
  const comp = getCompById(ctxTarget);
  const val  = parseFloat(document.getElementById('ctx-value').value);
  if (!isNaN(val)) {
    comp.value = val;
    // Update label
    const def = COMPONENT_SVG[comp.type];
    let lbl = def.label;
    if (def.defaultValue !== null && def.unit) lbl += ` (${val}${def.unit})`;
    comp.labelEl.textContent = lbl;
    // Toggle switch blade
    if (comp.type === 'switch') updateSwitchVisual(comp);
  }
  ctxMenu.classList.add('hidden');
  renderProps();
});

document.getElementById('ctx-delete').addEventListener('click', () => {
  if (ctxTarget === null) return;
  deleteComponent(ctxTarget);
  ctxMenu.classList.add('hidden');
});

document.addEventListener('click', e => {
  if (!ctxMenu.contains(e.target)) ctxMenu.classList.add('hidden');
});

function updateSwitchVisual(comp) {
  const blade = comp.el.querySelector('.switch-blade');
  if (!blade) return;
  if (comp.value === 0) {
    blade.setAttribute('x2', '58');
    blade.setAttribute('y2', '14');
  } else {
    blade.setAttribute('x2', '68');
    blade.setAttribute('y2', '22');
  }
}

// ── Delete component ──────────────────────────────────────────────
function deleteComponent(id) {
  const idx = components.findIndex(c => c.id === id);
  if (idx === -1) return;
  // Remove attached wires
  const toRemove = wires.filter(w => w.fromComp===id || w.toComp===id);
  toRemove.forEach(w => { w.el.remove(); });
  wires = wires.filter(w => w.fromComp!==id && w.toComp!==id);
  components[idx].el.remove();
  components.splice(idx, 1);
  recomputePortConnected();
  updateRunButton();
  renderProps();
  if (components.length === 0) hint.classList.remove('hidden');
}

// ── Clear ────────────────────────────────────────────────────────
clearBtn.addEventListener('click', () => {
  components.forEach(c => c.el.remove());
  components = [];
  wires.forEach(w => w.el.remove());
  wires = [];
  wireStart = null; previewLine = null; ctxTarget = null;
  hint.classList.remove('hidden');
  updateRunButton();
  renderProps();
  setStatus('idle', 'No circuit yet');
  clearReadings();
});

// ── Run circuit ──────────────────────────────────────────────────
runBtn.addEventListener('click', runCircuit);

function runCircuit() {
  // 1. Find battery
  const batteries = components.filter(c => c.type === 'battery');
  if (batteries.length === 0) {
    setStatus('error', '⚠ No battery found. Add a battery to the circuit.');
    return;
  }
  if (batteries.length > 1) {
    setStatus('warn', '⚠ Multiple batteries detected. Using the first one.');
  }

  // 2. Check for open switches
  const switches = components.filter(c => c.type === 'switch');
  const openSwitch = switches.find(s => s.value === 0);
  if (openSwitch) {
    setStatus('warn', '⚠ Switch is open — circuit is broken. Set switch to 1 (closed).');
    clearReadings();
    return;
  }

  // 3. Build adjacency graph & check connectivity
  const graph = buildGraph();
  const bat   = batteries[0];
  const batLeftPort  = getPortKey(bat.id, bat.portEls[0].id);
  const batRightPort = getPortKey(bat.id, bat.portEls[1].id);

  const reachable = bfsNodes(graph, bat.id);
  if (reachable.size < 2) {
    setStatus('error', '⚠ Circuit is not closed. Connect components to form a loop.');
    return;
  }

  // 4. Find resistors and bulbs (bulbs have resistance too)
  const resistors = components.filter(c => c.type === 'resistor' || c.type === 'bulb');
  if (resistors.length === 0) {
    setStatus('error', '⚠ No resistor or bulb in circuit. Add at least one.');
    return;
  }

  // 5. Check circuit is actually closed (battery both ports connected)
  const batConnectedLeft  = wires.some(w =>
    (w.fromComp===bat.id && w.fromPort===bat.portEls[0].id) ||
    (w.toComp===bat.id   && w.toPort===bat.portEls[0].id));
  const batConnectedRight = wires.some(w =>
    (w.fromComp===bat.id && w.fromPort===bat.portEls[1].id) ||
    (w.toComp===bat.id   && w.toPort===bat.portEls[1].id));
  if (!batConnectedLeft || !batConnectedRight) {
    setStatus('error', '⚠ Battery terminals not both connected. Complete the circuit.');
    return;
  }

  // 6. Determine if series or parallel (simplified model)
  // For simplicity: treat all resistors as series (sum R), compute I
  let totalR = 0;
  resistors.forEach(r => {
    totalR += (r.value || 100);
  });

  const voltage  = bat.value || 9;
  const current  = voltage / totalR;
  const power    = voltage * current;

  // 7. Update display
  showReadings(voltage, current, totalR, power);

  // 8. Animate wires
  wires.forEach(w => w.el.classList.add('flowing', 'active'));

  // 9. Light up bulbs
  components.filter(c => c.type === 'bulb').forEach(b => {
    b.el.classList.add('bulb-lit', 'active-glow');
  });

  // 10. Ammeter / voltmeter readings
  components.filter(c => c.type === 'ammeter').forEach(m => {
    m.labelEl.textContent = `A (${fmt(current)}A)`;
  });
  components.filter(c => c.type === 'voltmeter').forEach(m => {
    m.labelEl.textContent = `V (${fmt(voltage)}V)`;
  });

  setStatus('ok', `✓ Circuit running!\nV=${fmt(voltage)}V  I=${fmt(current)}A  R=${fmt(totalR)}Ω  P=${fmt(power)}W`);
}

function fmt(n) {
  if (n === undefined || n === null || isNaN(n)) return '—';
  if (n < 0.001) return n.toExponential(2);
  if (n < 10)    return n.toFixed(3);
  if (n < 1000)  return n.toFixed(1);
  return n.toFixed(0);
}

// ── Graph helpers ────────────────────────────────────────────────
function buildGraph() {
  // Node = component id, edges = wires between them
  const adj = {};
  components.forEach(c => { adj[c.id] = new Set(); });
  wires.forEach(w => {
    if (adj[w.fromComp]) adj[w.fromComp].add(w.toComp);
    if (adj[w.toComp])   adj[w.toComp].add(w.fromComp);
  });
  return adj;
}

function bfsNodes(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  while (queue.length) {
    const node = queue.shift();
    (graph[node] || new Set()).forEach(n => {
      if (!visited.has(n)) { visited.add(n); queue.push(n); }
    });
  }
  return visited;
}

function getPortKey(compId, portId) { return `${compId}:${portId}`; }

// ── UI helpers ───────────────────────────────────────────────────
function updateRunButton() {
  const hasBattery = components.some(c => c.type === 'battery');
  const hasWire    = wires.length > 0;
  runBtn.disabled  = !(hasBattery && hasWire);
}

function getCompById(id) { return components.find(c => c.id === id) || null; }

function renderProps() {
  const el = document.getElementById('component-props');
  if (components.length === 0) { el.innerHTML = ''; return; }
  el.innerHTML = components.map(c => {
    const def = COMPONENT_SVG[c.type];
    const valStr = (c.value !== null && c.value !== undefined && def.unit)
      ? `${c.value}${def.unit}` : (c.type==='switch' ? (c.value?'Closed':'Open') : '—');
    return `<div class="prop-row">
      <span class="prop-name">${def.label} #${c.id}</span>
      <span class="prop-val">${valStr}</span>
    </div>`;
  }).join('');
}

function showReadings(v, i, r, p) {
  document.getElementById('res-voltage').textContent    = fmt(v) + ' V';
  document.getElementById('res-current').textContent    = fmt(i) + ' A';
  document.getElementById('res-resistance').textContent = fmt(r) + ' Ω';
  document.getElementById('res-power').textContent      = fmt(p) + ' W';

  // Bars (cap at 100%)
  setBar('bar-voltage',    Math.min(v/30, 1) * 100);
  setBar('bar-current',    Math.min(i/5,  1) * 100);
  setBar('bar-resistance', Math.min(r/1000,1)*100);
  setBar('bar-power',      Math.min(p/100,1)*100);
}

function clearReadings() {
  ['res-voltage','res-current','res-resistance','res-power'].forEach(id => {
    document.getElementById(id).textContent = '— ';
  });
  ['bar-voltage','bar-current','bar-resistance','bar-power'].forEach(id => setBar(id, 0));
  wires.forEach(w => w.el.classList.remove('flowing','active'));
  components.forEach(c => c.el.classList.remove('bulb-lit','active-glow'));
  components.filter(c=>c.type==='ammeter'||c.type==='voltmeter').forEach(m=>{
    m.labelEl.textContent = COMPONENT_SVG[m.type].label;
  });
}

function setBar(id, pct) {
  const el = document.getElementById(id);
  if (el) el.style.width = pct + '%';
}

function setStatus(type, msg) {
  const el = document.getElementById('circuit-status');
  el.className = `status-msg status-${type}`;
  el.textContent = msg;
}