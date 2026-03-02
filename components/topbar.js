import { getUser } from "/core/auth.js";

export function mountTopbar() {
  const el = document.getElementById("topbar");
  if (!el) return;

  const user = getUser();
  const initial = (user?.name || "U").slice(0, 1).toUpperCase();

  el.innerHTML = `
    <div style="display:flex; align-items:center; gap:16px;">
      <button class="mobileToggle" id="btnToggle" aria-label="Toggle Navigation">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
      <div style="font-weight:700; letter-spacing:-0.01em; font-size: 18px; font-family: var(--font-display);">Dashboard</div>
    </div>

    <div class="search">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <input class="input" id="globalSearch" placeholder="Search items, claims, locations..." style="font-weight: 500;" />
    </div>

    <div style="display: flex; gap: 16px; align-items: center;">
      <div class="profile-actions">
        <button class="btn primary" id="btnQuickReport" style="padding: 10px 16px; font-size: 13px; font-weight: 600; border-radius: 20px; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);">
          + Report Item
        </button>
      </div>
      <div class="profile">
        <div class="avatar">${initial}</div>
        <div class="meta" style="padding-right: 4px;">
          <div class="name">${user?.name ?? "Guest"}</div>
          <div class="role">${user?.role ?? "guest"}</div>
        </div>
      </div>
    </div>
  `;

  // Sidebar toggle (mobile)
  el.querySelector("#btnToggle")?.addEventListener("click", () => {
    document.getElementById("sidebar")?.classList.toggle("open");
  });

  // Quick report shortcut
  el.querySelector("#btnQuickReport")?.addEventListener("click", () => {
    window.location.href = "/pages/user/report.html";
  });

  // optional search route
  el.querySelector("#globalSearch")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const q = e.target.value.trim();
      if (q) window.location.href = `/pages/user/items.html?q=${encodeURIComponent(q)}`;
    }
  });
}