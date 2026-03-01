import { getUser, clearAuth } from "/core/auth.js";

function navItem(href, label, currentPath) {
  const active = currentPath.endsWith(href);
  return `
    <a href="${href}" class="${active ? "active" : ""}">
      <span>${label}</span>
      <span style="color:var(--muted); font-size:12px;">›</span>
    </a>
  `;
}

function getRole() {
  const user = getUser();
  return user?.role ?? "guest";
}

function menusByRole(role) {
  const userMenu = [
    { href: "/pages/user/items.html", label: "Browse Items" },
    { href: "/pages/user/report.html", label: "Report Lost/Found" },
    { href: "/pages/user/my-items.html", label: "My Reports" },
    { href: "/pages/user/my-claims.html", label: "My Claims" },
  ];

  const staffMenu = [
    { href: "/pages/staff/claims.html", label: "Claims Queue" },
    { href: "/pages/staff/match.html", label: "Match Items" },
    { href: "/pages/staff/qr.html", label: "QR Tools" },
    { href: "/pages/staff/prints.html", label: "Print Center" },
  ];

  const adminMenu = [
    { href: "/pages/admin/dashboard.html", label: "Admin Dashboard" },
    { href: "/pages/admin/imports.html", label: "Imports" },
    { href: "/pages/admin/exports.html", label: "Exports" },
    { href: "/pages/admin/logs.html", label: "Logs" },
  ];

  // Admin can still access Staff tools (very common in real systems)
  if (role === "admin") {
    return [
      ...adminMenu,
      { href: "/pages/staff/claims.html", label: "Staff: Claims" },
      { href: "/pages/staff/match.html", label: "Staff: Match" },
      { href: "/pages/staff/qr.html", label: "Staff: QR Tools" },
      { href: "/pages/staff/prints.html", label: "Staff: Print Center" },
      { href: "/pages/user/items.html", label: "User: Browse" },
    ];
  }

  if (role === "staff") return staffMenu;
  if (role === "user") return userMenu;

  // Guest fallback
  return [
    { href: "/pages/auth/login.html", label: "Login" },
    { href: "/pages/auth/register.html", label: "Register" },
  ];
}

export function mountSidebar() {
  const el = document.getElementById("sidebar");
  if (!el) return;

  const user = getUser();
  const role = getRole();
  const path = window.location.pathname;

  const items = menusByRole(role);

  el.innerHTML = `
    <div class="brand">
      <div class="logo"></div>
      <div>
        <div class="title">Lost & Found</div>
        <div class="subtitle">API-driven system</div>
      </div>
    </div>

    <div class="card" style="padding:12px; background:rgba(255,255,255,.04); border-radius:16px;">
      <div style="display:flex; align-items:center; gap:10px;">
        <div class="avatar">${(user?.name || "U").slice(0, 1).toUpperCase()}</div>
        <div style="min-width:0;">
          <div style="font-weight:700; font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
            ${user?.name ?? "Guest"}
          </div>
          <div style="color:var(--muted); font-size:12px;">${role}</div>
        </div>
      </div>
    </div>

    <nav class="nav" style="margin-top:12px;">
      ${items.map(i => navItem(i.href, i.label, path)).join("")}
    </nav>

    ${role !== "guest"
      ? `
        <div style="margin-top:16px; padding-top:14px; border-top:1px solid var(--border);">
          <button class="btn ghost" id="btnLogout" style="width:100%;">Logout</button>
        </div>
      `
      : `
        <div style="margin-top:16px; padding-top:14px; border-top:1px solid var(--border); color:var(--muted); font-size:12px;">
          Login to access dashboards.
        </div>
      `
    }
  `;

  el.querySelector("#btnLogout")?.addEventListener("click", () => {
    clearAuth();
    window.location.href = "/pages/auth/login.html";
  });
}