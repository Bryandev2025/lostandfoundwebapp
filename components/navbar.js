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
        { href: "/pages/user/report.html", label: "Report Found/Lost" },
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

        <div class="web-profile-menu">
          ${user ? `
            <span style="color:var(--text-muted); font-size:0.9rem; display:none;">Welcome, ${user.name.split(' ')[0]}</span>
            <div class="web-avatar" id="navAvatar" title="Click to logout">
              ${initial}
            </div>
          ` : `
            <a href="/pages/auth/login.html" class="web-btn web-btn-glass" style="padding: 8px 16px; font-size: 0.9rem;">Log in</a>
          `}
        </div>

      </div>
    </div>
  `;

    // Simple logout on avatar click for now
    el.querySelector("#navAvatar")?.addEventListener("click", () => {
        if (confirm("Are you sure you want to log out?")) {
            clearAuth();
            window.location.href = "/pages/auth/login.html";
        }
    });
}
