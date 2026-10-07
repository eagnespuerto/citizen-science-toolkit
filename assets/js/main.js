(function () {
  const root = document.documentElement;

  // ---- Theme toggle (remembered per browser) ----
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };
  const saved = store.get("cs-theme");
  if (saved) root.dataset.theme = saved;

  function currentTheme() {
    return root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  function syncThemeIcon(btn) {
    const dark = currentTheme() === "dark";
    btn.innerHTML = dark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.querySelector(".theme-btn");
    if (themeBtn) {
      syncThemeIcon(themeBtn);
      themeBtn.addEventListener("click", () => {
        root.dataset.theme = currentTheme() === "dark" ? "light" : "dark";
        store.set("cs-theme", root.dataset.theme);
        syncThemeIcon(themeBtn);
      });
    }

    // ---- Mobile menu ----
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(open));
      });
    }

    // ---- Mark current page ----
    const here = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav a").forEach((a) => {
      if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page");
    });

    document.querySelectorAll("[data-projects]").forEach(initProjects);
    document.querySelectorAll("[data-ledger]").forEach(initLedger);
  });

  const F = () => window.CS_FIELDS;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const TIME = { minutes: ["fa-regular fa-clock", "A few minutes"], hours: ["fa-solid fa-hourglass-half", "An hour or more"], ongoing: ["fa-solid fa-rotate", "Ongoing"] };
  const WHERE = { online: ["fa-solid fa-laptop", "Online"], outdoors: ["fa-solid fa-tree", "Outdoors"], idle: ["fa-solid fa-power-off", "Idle computer"] };
  const SKILL = { none: ["fa-solid fa-seedling", "No experience needed"], some: ["fa-solid fa-graduation-cap", "Some skill helps"] };
  const meta = (pair) => `<span><i class="${pair[0]}" aria-hidden="true"></i>${pair[1]}</span>`;

  function projectCard(p) {
    const f = F()[p.field];
    return `<article class="project f-${p.field}">
      <div class="top"><span class="tag"><i class="${f.icon}" aria-hidden="true"></i>${f.label}</span>
        <i class="${p.icon}" style="color:var(--c)" aria-hidden="true"></i></div>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.desc)}</p>
      <div style="display:grid;gap:12px">
        <div class="meta">${meta(TIME[p.time])}${meta(WHERE[p.where])}${meta(SKILL[p.skill])}</div>
        <a class="visit" href="${p.url}" target="_blank" rel="noopener">Visit project <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
      </div>
    </article>`;
  }

  function entry(a) {
    const f = F()[a.field];
    return `<li class="entry f-${a.field}">
      <div class="year">${a.year}</div>
      <div class="body">
        <span class="tag"><i class="${f.icon}" aria-hidden="true"></i>${f.label}</span>
        <h3>${esc(a.title)}</h3>
        <div class="who"><i class="fa-solid fa-user-astronaut" aria-hidden="true" style="color:var(--c);margin-right:6px"></i>${esc(a.who)}</div>
        <p>${esc(a.text)}</p>
        <div class="row"><span class="catalog">${esc(a.catalog)}</span>
          <a href="${a.link}" target="_blank" rel="noopener">Read more <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></div>
      </div>
    </li>`;
  }

  // A filter group is a container of .chip buttons sharing data-key; one value active at a time.
  function wireChips(scope, state, render) {
    scope.querySelectorAll(".chip[data-key]").forEach((chip) => {
      chip.addEventListener("click", () => {
        const key = chip.dataset.key;
        scope.querySelectorAll(`.chip[data-key="${key}"]`).forEach((c) => c.setAttribute("aria-pressed", "false"));
        chip.setAttribute("aria-pressed", "true");
        state[key] = chip.dataset.value;
        render();
      });
    });
  }

  function initProjects(el) {
    const fixed = el.dataset.projects; // "all" or a field key
    const list = el.querySelector(".projects");
    const count = el.querySelector(".count");
    const search = el.querySelector(".search");
    const state = { field: fixed === "all" ? "all" : fixed, time: "all", where: "all" };
    const hash = location.hash.slice(1);
    if (fixed === "all" && F()[hash]) {
      state.field = hash;
      el.querySelectorAll('.chip[data-key="field"]').forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.value === hash)));
    }
    function render() {
      const q = (search && search.value.trim().toLowerCase()) || "";
      const items = window.CS_PROJECTS.filter((p) =>
        (state.field === "all" || p.field === state.field) &&
        (state.time === "all" || p.time === state.time) &&
        (state.where === "all" || p.where === state.where) &&
        (!q || (p.name + " " + p.desc).toLowerCase().includes(q)));
      list.innerHTML = items.length ? items.map(projectCard).join("") : '<p class="empty">No projects match those filters. Try widening one.</p>';
      if (count) count.textContent = `${items.length} project${items.length === 1 ? "" : "s"}`;
    }
    wireChips(el, state, render);
    if (search) search.addEventListener("input", render);
    render();
  }

  function initLedger(el) {
    const fixed = el.dataset.ledger;
    const list = el.querySelector(".ledger");
    const count = el.querySelector(".count");
    const state = { field: fixed === "all" ? "all" : fixed, order: "asc" };
    const hash = location.hash.slice(1);
    if (fixed === "all" && F()[hash]) {
      state.field = hash;
      el.querySelectorAll('.chip[data-key="field"]').forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.value === hash)));
    }
    function render() {
      const items = window.CS_ACHIEVEMENTS
        .filter((a) => state.field === "all" || a.field === state.field)
        .sort((a, b) => (state.order === "asc" ? a.year - b.year : b.year - a.year));
      list.innerHTML = items.map(entry).join("");
      if (count) count.textContent = `${items.length} entr${items.length === 1 ? "y" : "ies"}`;
    }
    wireChips(el, state, render);
    render();
  }
})();
