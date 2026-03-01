import { getUser } from "/core/auth.js";

export function mountTopbar() {
    const el = document.getElementById("topbar");
    if (!el) return;

    const user = getUser();
    const initial = (user?.name || "U").slice(0, 1).toUpperCase();

    el.innerHTML = `
    <div style="display:flex; align-items:center; gap:10px;">
      <button class="btn mobileToggle" id="btnToggle">Menu</button>
      <div style="font-weight:800; letter-spacing:.2px;">Dashboard</div>
    </div>

    <div class="search">
      <input class="input" id="globalSearch" placeholder="Search items, claims, locations..." />
    </div>

    <div class="profile">
      <div class="profile-actions">
        <button class="btn ghost" id="btnQuickReport">+ Report</button>
      </div>
      <div class="meta">
        <div class="name">${user?.name ?? "Unknown"}</div>
        <div class="role">${user?.role ?? "guest"}</div>
      </div>
      <div class="avatar">${initial}</div>
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