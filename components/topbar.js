import { getUser } from "/core/auth.js";
import { toast } from "/components/toast.js";
import { mountPageLoader, bindLinkNavigation } from "/components/pageLoader.js";

// Init link blocker early
bindLinkNavigation();

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
      <div class="profile-actions" style="display:flex; align-items:center; gap: 12px;">
        <div style="position: relative;" id="notifWrapper">
          <button class="btn ghost" id="btnNotifications" style="padding: 8px; border-radius: 50%; width: 40px; height: 40px; display:flex; align-items:center; justify-content:center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span style="position: absolute; top: 8px; right: 10px; width: 8px; height: 8px; background-color: #ef4444; border-radius: 50%; border: 2px solid #ffffff;"></span>
          </button>
          
          <div id="notifDropdown" style="display:none; position:absolute; right:0; top:calc(100% + 8px); background:var(--panel, #ffffff); border:1px solid var(--border, rgba(0,0,0,0.1)); border-radius:12px; width:300px; box-shadow:0 10px 40px rgba(0,0,0,0.1); z-index:100; flex-direction:column; overflow: hidden; cursor: default; text-align: left;">
            <div style="padding: 16px; border-bottom: 1px solid var(--border, rgba(0,0,0,0.05)); display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 600; font-size: 15px;">Notifications</span>
              <span style="font-size: 12px; color: var(--brand, #0071e3); cursor: pointer; font-weight: 500;">Mark all as read</span>
            </div>
            <div style="padding: 32px 16px; text-align: center; color: var(--muted, #86868b); font-size: 14px; display: flex; flex-direction: column; align-items: center;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity: 0.5; margin-bottom: 12px;">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <div>No new notifications</div>
            </div>
          </div>
        </div>

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

  const btnNotifications = el.querySelector("#btnNotifications");
  const notifDropdown = el.querySelector("#notifDropdown");
  const notifWrapper = el.querySelector("#notifWrapper");

  if (btnNotifications && notifDropdown) {
    btnNotifications.addEventListener("click", (e) => {
      e.stopPropagation();
      notifDropdown.style.display = notifDropdown.style.display === "none" ? "flex" : "none";
    });

    notifDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    document.addEventListener("click", (e) => {
      const isClickInside = notifWrapper?.contains(e.target) || notifDropdown.contains(e.target);
      if (!isClickInside) {
        notifDropdown.style.display = "none";
      }
    });
  }

  // optional search route
  el.querySelector("#globalSearch")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const q = e.target.value.trim();
      if (q) window.location.href = `/pages/user/items.html?q=${encodeURIComponent(q)}`;
    }
  });
}