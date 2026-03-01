const KEY_TOKEN = "lf_token";
const KEY_USER = "lf_user";

export function setAuth(token, user) {
    localStorage.setItem(KEY_TOKEN, token);
    localStorage.setItem(KEY_USER, JSON.stringify(user));
}

export function getToken() {
    return localStorage.getItem(KEY_TOKEN);
}

export function getUser() {
    const raw = localStorage.getItem(KEY_USER);
    return raw ? JSON.parse(raw) : null;
}

export function clearAuth() {
    localStorage.removeItem(KEY_TOKEN);
    localStorage.removeItem(KEY_USER);
}

export function requireAuth() {
    if (!getToken()) {
        window.location.href = "/pages/auth/login.html";
    }
}

export function requireRole(...roles) {
    const u = getUser();
    if (!u || !roles.includes(u.role)) {
        window.location.href = "/pages/auth/login.html";
    }
}


/**
 * NEW: Automatic route guard based on role + page path
 */
export function guardPage() {

    const path = window.location.pathname;

    // allow public pages
    if (
        path.includes("/pages/auth/login.html") ||
        path.includes("/pages/auth/register.html")
    ) {
        return;
    }

    const token = getToken();
    const user = getUser();

    // not logged in
    if (!token || !user) {
        window.location.href = "/pages/auth/login.html";
        return;
    }

    const role = user.role;

    const isAdminPage = path.includes("/pages/admin/");
    const isStaffPage = path.includes("/pages/staff/");
    const isUserPage = path.includes("/pages/user/");

    // admin can access everything
    if (role === "admin") {
        return;
    }

    // staff cannot access admin pages
    if (role === "staff") {
        if (isAdminPage) {
            window.location.href = "/pages/staff/claims.html";
        }
        return;
    }

    // user can only access user pages
    if (role === "user") {

        if (isAdminPage || isStaffPage) {
            window.location.href = "/pages/user/items.html";
            return;
        }

        if (isUserPage) {
            return;
        }

        window.location.href = "/pages/user/items.html";
        return;
    }

    // fallback
    window.location.href = "/pages/auth/login.html";
}



export function redirectByRole(user = null) {
    const u = user ?? getUser();
    const role = u?.role;

    if (role === "admin") {
        window.location.href = "/pages/admin/dashboard.html";
        return;
    }

    if (role === "staff") {
        window.location.href = "/pages/staff/dashboard.html";
        return;
    }

    // default: user
    window.location.href = "/pages/user/items.html";
}