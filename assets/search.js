/* Full-screen search modal over assets/search-index.json (posts + published
   vault notes). The sidebar box is just a trigger; typing filters a result
   list on the left with a live preview of the selected note on the right. */
(function () {
  "use strict";

  var trigger = document.getElementById("zgSearchTrigger");
  var overlay = document.getElementById("zgSearchOverlay");
  var input = document.getElementById("zgSearchInput");
  var list = document.getElementById("zgSearchList");
  var preview = document.getElementById("zgSearchPreview");
  if (!overlay || !input || !list || !preview) return;

  var INDEX_URL = "/assets/search-index.json";
  var index = null;
  var indexPromise = null;
  var hits = [];
  var activeIndex = -1;

  function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch(INDEX_URL)
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function (data) { index = data; return data; })
        .catch(function () { index = []; return index; });
    }
    return indexPromise;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function highlight(text, q) {
    var safe = escapeHtml(text);
    if (!q) return safe;
    var idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return safe;
    var pre = escapeHtml(text.slice(0, idx));
    var mid = escapeHtml(text.slice(idx, idx + q.length));
    var post = escapeHtml(text.slice(idx + q.length));
    return pre + "<mark>" + mid + "</mark>" + post;
  }

  function open() {
    overlay.classList.add("zg-open");
    document.body.style.overflow = "hidden";
    loadIndex();
    input.focus();
    input.select();
  }

  function close() {
    overlay.classList.remove("zg-open");
    document.body.style.overflow = "";
    input.blur(); // otherwise the "/" shortcut sees focus still in the (hidden) input and no-ops
  }

  function isOpen() {
    return overlay.classList.contains("zg-open");
  }

  function renderPreview(q) {
    var hit = hits[activeIndex];
    if (!hit) {
      preview.innerHTML = '<p class="zg-search-preview-empty">Select a result to preview it.</p>';
      return;
    }
    preview.innerHTML =
      "<h3>" + highlight(hit.title, q) + "</h3>" +
      '<p class="zg-preview-meta">' + escapeHtml(hit.tag) + "</p>" +
      '<p class="zg-preview-body">' + highlight(hit.snippet, q) + "</p>";
  }

  function setActive(i) {
    var rows = list.querySelectorAll(".zg-search-hit");
    rows.forEach(function (r) { r.classList.remove("zg-active"); });
    activeIndex = i;
    if (rows[i]) {
      rows[i].classList.add("zg-active");
      rows[i].scrollIntoView({ block: "nearest" });
    }
    renderPreview(input.value.trim());
  }

  function render(q) {
    if (!q) {
      hits = [];
      activeIndex = -1;
      list.innerHTML = "";
      preview.innerHTML = '<p class="zg-search-preview-empty">Start typing to search posts and notes.</p>';
      return;
    }
    var needle = q.toLowerCase();
    hits = (index || []).filter(function (n) {
      return n.title.toLowerCase().indexOf(needle) !== -1 ||
             n.snippet.toLowerCase().indexOf(needle) !== -1 ||
             n.tag.toLowerCase().indexOf(needle) !== -1;
    }).slice(0, 40);

    if (!hits.length) {
      list.innerHTML = '<li class="zg-search-empty">nothing cut out for that yet</li>';
      activeIndex = -1;
      preview.innerHTML = '<p class="zg-search-preview-empty">No matches.</p>';
      return;
    }

    list.innerHTML = hits.map(function (n, i) {
      return '<li><a class="zg-search-hit' + (i === 0 ? " zg-active" : "") + '" href="' + n.url + '" data-i="' + i + '">' +
        '<span class="zg-hit-title">' + highlight(n.title, q) + "</span>" +
        '<span class="zg-hit-tag">' + escapeHtml(n.tag) + "</span>" +
        "</a></li>";
    }).join("");
    activeIndex = 0;
    renderPreview(q);
  }

  trigger.addEventListener("click", open);
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && !isOpen() && !e.target.closest("input, textarea")) {
      e.preventDefault();
      open();
    }
  });

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });

  input.addEventListener("input", function () {
    loadIndex().then(function () { render(input.value.trim()); });
  });

  list.addEventListener("mouseover", function (e) {
    var row = e.target.closest(".zg-search-hit");
    if (row) setActive(parseInt(row.getAttribute("data-i"), 10));
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { close(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); if (hits.length) setActive((activeIndex + 1) % hits.length); return; }
    if (e.key === "ArrowUp") { e.preventDefault(); if (hits.length) setActive((activeIndex - 1 + hits.length) % hits.length); return; }
    if (e.key === "Enter") {
      var hit = hits[activeIndex];
      if (hit) window.location.href = hit.url;
    }
  });
})();
