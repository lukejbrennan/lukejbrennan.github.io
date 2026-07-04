/* Force-directed graph of #published vault notes.
   Expects: <div id="vault-graph"> and graph data at DATA_URL (or window.GRAPH_DATA).
   Clicking a node opens that note's page; /graph/#Note%20Title highlights a node. */
(function () {
  "use strict";

  var DATA_URL = "/assets/graph.json";

  var COLORS = {
    light: {
      surface: "#fcfcfb", node: "#2a78d6", nodeRing: "#fcfcfb",
      link: "#c3c2b7", linkDim: "#e1e0d9", label: "#52514e",
      labelStrong: "#0b0b0b", muted: "#898781"
    },
    dark: {
      surface: "#1a1a19", node: "#3987e5", nodeRing: "#1a1a19",
      link: "#52514e", linkDim: "#2c2c2a", label: "#c3c2b7",
      labelStrong: "#ffffff", muted: "#898781"
    }
  };

  // The site theme is the body.dark-mode class (set by the header's toggle);
  // fall back to the OS preference when the class system isn't present.
  function theme() {
    if (document.body.classList.contains("dark-mode")) return COLORS.dark;
    if (localStorage.getItem("theme")) return COLORS.light; // toggle explicitly set to light
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? COLORS.dark : COLORS.light;
  }

  var root = document.getElementById("vault-graph");
  if (!root) return;

  root.innerHTML = "";
  root.style.position = "relative";

  var canvas = document.createElement("canvas");
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.borderRadius = "8px";
  canvas.style.cursor = "grab";
  root.appendChild(canvas);

  var hint = document.createElement("p");
  hint.style.color = theme().muted;
  hint.style.font = "13px system-ui, -apple-system, 'Segoe UI', sans-serif";
  hint.style.margin = "8px 2px";
  hint.textContent = "Drag to pan, scroll to zoom, click a note to read it.";
  root.appendChild(hint);

  var ctx = canvas.getContext("2d");
  var nodes = [], links = [], byTitle = {};
  var W = 0, H = 0, DPR = window.devicePixelRatio || 1;
  var view = { x: 0, y: 0, k: 1 };
  var hovered = null, highlighted = null, dragging = null, panning = null;
  var alpha = 1;

  function resize() {
    W = root.clientWidth;
    H = Math.max(420, Math.min(640, Math.round(window.innerHeight * 0.65)));
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.height = H + "px";
    draw();
  }

  function emptyState(msg) {
    var p = document.createElement("p");
    p.style.cssText = "padding:48px 16px;text-align:center;font:15px system-ui,sans-serif;";
    p.style.color = theme().muted;
    p.textContent = msg;
    root.insertBefore(p, canvas);
    canvas.remove();
    hint.remove();
  }

  function init(data) {
    if (!data.nodes || data.nodes.length === 0) {
      emptyState("Nothing here yet — notes tagged #" + (data.tag || "published") + " will show up as a graph.");
      return;
    }
    nodes = data.nodes.map(function (n, i) {
      var angle = i * 2.399963, dist = 40 * Math.sqrt(i + 1);
      return {
        id: n.id, url: n.url,
        r: Math.max(4, Math.min(14, 3 + Math.sqrt((n.wc || 0) / 12))),
        x: Math.cos(angle) * dist, y: Math.sin(angle) * dist,
        vx: 0, vy: 0
      };
    });
    nodes.forEach(function (n) { byTitle[n.id.toLowerCase()] = n; });
    links = (data.links || []).map(function (l) {
      return { s: nodes[l.source], t: nodes[l.target] };
    });
    resize();
    view.x = W / 2; view.y = H / 2;
    var fit = Math.sqrt(nodes.length) * 55;
    view.k = Math.max(0.25, Math.min(1.2, Math.min(W, H) / (fit * 2 + 80)));
    var initial = decodeURIComponent((location.hash || "").slice(1)).toLowerCase();
    if (initial && byTitle[initial]) highlighted = byTitle[initial];
    // settle the layout before first paint so big graphs don't open as a hairball
    alpha = 1;
    var deadline = Date.now() + 500;
    for (var w = 0; w < 600 && Date.now() < deadline; w++) { step(); alpha *= 0.997; }
    requestAnimationFrame(tick);
  }

  /* ---- physics ---- */
  function step() {
    var i, j, n, m, dx, dy, d2, d, f;
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      // gravity toward center
      n.vx -= n.x * 0.0012;
      n.vy -= n.y * 0.0012;
      // repulsion
      for (j = i + 1; j < nodes.length; j++) {
        m = nodes[j];
        dx = n.x - m.x; dy = n.y - m.y;
        d2 = dx * dx + dy * dy;
        if (d2 < 1) { d2 = 1; dx = Math.random() - 0.5; dy = Math.random() - 0.5; }
        if (d2 > 160000) continue;
        f = 900 / d2;
        d = Math.sqrt(d2);
        dx /= d; dy /= d;
        n.vx += dx * f; n.vy += dy * f;
        m.vx -= dx * f; m.vy -= dy * f;
      }
    }
    // springs
    for (i = 0; i < links.length; i++) {
      var l = links[i];
      dx = l.t.x - l.s.x; dy = l.t.y - l.s.y;
      d = Math.sqrt(dx * dx + dy * dy) || 1;
      f = (d - 70) * 0.012;
      dx /= d; dy /= d;
      l.s.vx += dx * f; l.s.vy += dy * f;
      l.t.vx -= dx * f; l.t.vy -= dy * f;
    }
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      if (n === dragging) { n.vx = 0; n.vy = 0; continue; }
      n.vx *= 0.85; n.vy *= 0.85;
      n.x += n.vx * alpha; n.y += n.vy * alpha;
    }
  }

  function tick() {
    if (alpha > 0.02 || dragging) {
      step();
      if (!dragging) alpha *= 0.995;
      draw();
      requestAnimationFrame(tick);
    } else {
      draw();
    }
  }

  function reheat(a) { var was = alpha; alpha = Math.max(alpha, a); if (was <= 0.02) requestAnimationFrame(tick); }

  /* ---- drawing ---- */
  function neighborsOf(node) {
    var set = {};
    links.forEach(function (l) {
      if (l.s === node) set[l.t.id] = true;
      if (l.t === node) set[l.s.id] = true;
    });
    return set;
  }

  function draw() {
    var c = theme();
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.fillStyle = c.surface;
    ctx.fillRect(0, 0, W, H);
    ctx.translate(view.x, view.y);
    ctx.scale(view.k, view.k);

    var focus = hovered || highlighted;
    var nbrs = focus ? neighborsOf(focus) : null;

    ctx.lineWidth = 1 / view.k;
    links.forEach(function (l) {
      var lit = focus && (l.s === focus || l.t === focus);
      ctx.strokeStyle = focus ? (lit ? c.link : c.linkDim) : c.link;
      ctx.globalAlpha = focus && !lit ? 0.5 : 1;
      ctx.beginPath();
      ctx.moveTo(l.s.x, l.s.y);
      ctx.lineTo(l.t.x, l.t.y);
      ctx.stroke();
    });
    ctx.globalAlpha = 1;

    nodes.forEach(function (n) {
      var dimmed = focus && n !== focus && !(nbrs && nbrs[n.id]);
      ctx.globalAlpha = dimmed ? 0.3 : 1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = c.node;
      ctx.fill();
      ctx.lineWidth = 2 / view.k;
      ctx.strokeStyle = c.nodeRing;
      ctx.stroke();
      if (n === highlighted) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 3 / view.k, 0, Math.PI * 2);
        ctx.lineWidth = 1.5 / view.k;
        ctx.strokeStyle = c.labelStrong;
        ctx.stroke();
      }
    });
    ctx.globalAlpha = 1;

    // labels: always when zoomed in or few nodes; otherwise focus + neighbors
    var showAll = view.k > 0.8 || nodes.length <= 30;
    ctx.font = (12 / view.k) + "px system-ui, -apple-system, 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    nodes.forEach(function (n) {
      var isFocus = n === focus;
      var isNbr = nbrs && nbrs[n.id];
      if (!showAll && !isFocus && !isNbr) return;
      if (focus && !isFocus && !isNbr) ctx.globalAlpha = 0.35;
      ctx.fillStyle = isFocus ? c.labelStrong : c.label;
      ctx.fillText(n.id, n.x, n.y + n.r + 14 / view.k);
      ctx.globalAlpha = 1;
    });

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  /* ---- interaction ---- */
  function toWorld(px, py) {
    return { x: (px - view.x) / view.k, y: (py - view.y) / view.k };
  }

  function pick(px, py) {
    var p = toWorld(px, py), best = null, bestD = Infinity;
    nodes.forEach(function (n) {
      var dx = n.x - p.x, dy = n.y - p.y, d = Math.sqrt(dx * dx + dy * dy);
      var hit = Math.max(n.r + 6, 14 / view.k); // generous hit target
      if (d < hit && d < bestD) { best = n; bestD = d; }
    });
    return best;
  }

  function pos(ev) {
    var r = canvas.getBoundingClientRect();
    return { x: ev.clientX - r.left, y: ev.clientY - r.top };
  }

  var pressAt = null; // screen coords at pointerdown, to tell click from drag

  canvas.addEventListener("pointerdown", function (ev) {
    var p = pos(ev), n = pick(p.x, p.y);
    canvas.setPointerCapture(ev.pointerId);
    pressAt = { x: p.x, y: p.y, moved: 0 };
    if (n) { dragging = n; reheat(0.3); }
    else panning = { x: p.x, y: p.y };
    canvas.style.cursor = "grabbing";
  });

  canvas.addEventListener("pointermove", function (ev) {
    var p = pos(ev);
    if (pressAt) pressAt.moved += Math.abs(p.x - pressAt.x) + Math.abs(p.y - pressAt.y);
    if (dragging) {
      var w = toWorld(p.x, p.y);
      dragging.x = w.x; dragging.y = w.y;
      reheat(0.3);
      return;
    }
    if (panning) {
      view.x += p.x - panning.x; view.y += p.y - panning.y;
      panning.x = p.x; panning.y = p.y;
      draw();
      return;
    }
    var n = pick(p.x, p.y);
    if (n !== hovered) { hovered = n; canvas.style.cursor = n ? "pointer" : "grab"; draw(); }
  });

  canvas.addEventListener("pointerup", function () {
    var clicked = dragging && pressAt && pressAt.moved < 5;
    if (clicked && dragging.url) {
      window.location.href = dragging.url;
      return;
    }
    dragging = null;
    panning = null;
    pressAt = null;
    canvas.style.cursor = hovered ? "pointer" : "grab";
    draw();
  });

  canvas.addEventListener("pointercancel", function () {
    dragging = null; panning = null; pressAt = null;
    canvas.style.cursor = "grab";
  });

  canvas.addEventListener("wheel", function (ev) {
    ev.preventDefault();
    var p = pos(ev);
    var k = Math.max(0.15, Math.min(4, view.k * Math.pow(1.0015, -ev.deltaY)));
    view.x = p.x - (p.x - view.x) * (k / view.k);
    view.y = p.y - (p.y - view.y) * (k / view.k);
    view.k = k;
    draw();
  }, { passive: false });

  /* ---- boot ---- */
  window.addEventListener("resize", resize);
  function retheme() { hint.style.color = theme().muted; draw(); }
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", retheme);
  }
  new MutationObserver(retheme).observe(document.body, { attributes: true, attributeFilter: ["class"] });

  if (window.GRAPH_DATA) {
    init(window.GRAPH_DATA);
  } else {
    fetch(DATA_URL)
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(init)
      .catch(function () { emptyState("Couldn’t load the graph data."); });
  }
})();
