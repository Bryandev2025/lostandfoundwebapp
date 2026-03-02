import { getUser, clearAuth } from "/core/auth.js";

export function mountNavbar() {
  const el = document.getElementById("navbar");
  if (!el) return;

  // Add the base website layout class to body to trigger new layout styles globally
  // We do this here so any page mounting the navbar gets the right body style automatically.
  document.body.classList.add("website-layout");

  const user = getUser();
  const initial = (user?.name || "U").slice(0, 1).toUpperCase();
  const path = window.location.pathname;

  const navLinks = [
    { href: "/pages/user/dashboard.html", label: "Home" },
    { href: "/pages/user/items.html", label: "Browse Items" },
    { href: "/pages/user/my-items.html", label: "My Reports" },
    { href: "/pages/user/my-claims.html", label: "My Claims" },
    { href: "/pages/user/report.html", label: "Report Items" },
  ];

  const renderNavLinks = () => navLinks.map(link => `
    <a href="${link.href}" class="web-nav-link ${path === link.href ? 'active' : ''}">
      ${link.label}
    </a>
  `).join("");

  el.innerHTML = `
    <div class="web-navbar">
      <div class="web-container">
        
        <a href="/pages/user/dashboard.html" class="web-brand">
          <div class="web-logo"></div>
          <span class="web-brand-text">Lost<span style="color:var(--accent-primary)">&</span>Found</span>
        </a>

        <div class="web-nav-links">
          ${renderNavLinks()}
        </div>

        <div class="web-profile-menu" style="position: relative;">
          ${user ? `
            <span style="color:var(--text-muted); font-size:0.9rem; margin-right: 12px; display:inline-block;">${user.name.split(' ')[0]}</span>
            <div class="web-avatar" id="navAvatar" style="cursor: pointer; display:inline-flex; align-items:center; justify-content:center;">
              ${initial}
            </div>
            <div id="navDropdown" style="display:none; position:absolute; right:0; top:calc(100% + 12px); background:#1c1c1e; border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:8px; width:220px; box-shadow:0 10px 40px rgba(0,0,0,0.5); z-index:100; flex-direction:column; gap:4px; backdrop-filter: blur(16px);">
                <a href="/pages/user/profile.html" style="padding:10px 16px; color:#fff; text-decoration:none; font-size:0.95rem; border-radius:8px; transition:background 0.2s; display:flex; align-items:center; gap:12px; font-weight:500;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    My Profile
                </a>
                <div style="height:1px; background:rgba(255,255,255,0.1); margin:4px 0;"></div>
                <button id="btnNavLogout" style="padding:10px 16px; color:#ef4444; border:none; background:transparent; font-size:0.95rem; text-align:left; border-radius:8px; cursor:pointer; width:100%; transition:background 0.2s; display:flex; align-items:center; gap:12px; font-weight:600;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Logout
                </button>
            </div>
          ` : `
            <a href="/pages/auth/login.html" class="web-btn web-btn-glass" style="padding: 8px 16px; font-size: 0.9rem;">Log in</a>
          `}
        </div>

      </div>
    </div>
  `;

  const navAvatar = el.querySelector("#navAvatar");
  const navDropdown = el.querySelector("#navDropdown");

  if (navAvatar && navDropdown) {
    navAvatar.addEventListener("click", (e) => {
      e.stopPropagation();
      navDropdown.style.display = navDropdown.style.display === "none" ? "flex" : "none";
    });
    document.addEventListener("click", (e) => {
      if (!navDropdown.contains(e.target)) {
        navDropdown.style.display = "none";
      }
    });

    const menuItems = navDropdown.querySelectorAll('a, button');
    menuItems.forEach(item => {
      item.addEventListener('mouseover', () => item.style.background = 'rgba(255,255,255,0.08)');
      item.addEventListener('mouseout', () => item.style.background = 'transparent');
    });
  }

  el.querySelector("#btnNavLogout")?.addEventListener("click", () => {
    const btn = el.querySelector("#btnNavLogout");
    btn.innerHTML = `<svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg> Logging out...`;
    setTimeout(() => {
      clearAuth();
      window.location.href = "/pages/auth/login.html";
    }, 800);
  });
}
