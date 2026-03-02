import { getToken, clearAuth } from "./auth.js";
import { toast } from "../components/toast.js";

export const API = {
    baseUrl: "https://backend.test/api", // change in one place
};

async function request(path, { method = "GET", body = null, isForm = false } = {}) {
    const token = getToken();
    const headers = { "Accept": "application/json" };

    if (!isForm) headers["Content-Type"] = "application/json";
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API.baseUrl}${path}`, {
        method,
        headers,
        body: body ? (isForm ? body : JSON.stringify(body)) : null,
    });

    // Auto handle expired token
    if (res.status === 401) {
        clearAuth();
        toast("Session expired. Please login again.", "warn");
        window.location.href = "/pages/auth/login.html";
        return;
    }

    // Handle non-JSON downloads (pdf/excel)
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) return res;

    const data = await res.json();

    if (!res.ok) {
        const msg = data?.message || "Request failed.";
        toast(msg, "danger");
        throw new Error(msg);
    }

    return data;
}

export const api = {
    get: (p) => request(p),
    post: (p, body) => request(p, { method: "POST", body }),
    put: (p, body) => request(p, { method: "PUT", body }),
    del: (p) => request(p, { method: "DELETE" }),
    postForm: (p, formData) => request(p, { method: "POST", body: formData, isForm: true }),
};