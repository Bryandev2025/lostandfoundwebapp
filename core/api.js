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
        toast("Session expired. Please login again.", "danger");
        window.location.href = "/pages/auth/login.html";
        return;
    }

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    if (!res.ok) {
        let msg = "Request failed.";
        if (isJson) {
            try {
                const data = await res.json();
                msg = data?.message || msg;

                if (data?.errors) {
                    const firstError = Object.values(data.errors)[0][0];
                    if (firstError) msg = firstError;
                }
            } catch (e) { }
        } else {
            // Non-JSON error (e.g., 500 HTML page)
            msg = `Server Error: ${res.status} ${res.statusText}`.trim();
        }

        toast(msg, "danger");
        throw new Error(msg);
    }

    // Handle non-JSON downloads (pdf/excel)
    if (!isJson) return res;

    return await res.json();
}

export const api = {
    get: (p) => request(p),
    post: (p, body) => request(p, { method: "POST", body }),
    put: (p, body) => request(p, { method: "PUT", body }),
    del: (p) => request(p, { method: "DELETE" }),
    postForm: (p, formData) => request(p, { method: "POST", body: formData, isForm: true }),
};