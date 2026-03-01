export function toast(message, type = "info") {
    let host = document.getElementById("toastHost");
    if (!host) {
        host = document.createElement("div");
        host.id = "toastHost";
        host.style.position = "fixed";
        host.style.right = "18px";
        host.style.bottom = "18px";
        host.style.display = "grid";
        host.style.gap = "10px";
        host.style.zIndex = "9999";
        document.body.appendChild(host);
    }

    const t = document.createElement("div");
    t.className = "card";
    t.style.padding = "12px 14px";
    t.style.borderRadius = "16px";
    t.style.maxWidth = "360px";
    t.style.borderColor =
        type === "success" ? "rgba(34,197,94,.35)" :
            type === "danger" ? "rgba(239,68,68,.35)" :
                type === "warn" ? "rgba(245,158,11,.35)" : "rgba(255,255,255,.12)";

    t.innerHTML = `<div style="font-weight:700; margin-bottom:4px;">${type.toUpperCase()}</div>
                 <div style="color:var(--muted);">${message}</div>`;
    host.appendChild(t);

    setTimeout(() => {
        t.style.transition = ".2s ease";
        t.style.opacity = "0";
        t.style.transform = "translateY(6px)";
        setTimeout(() => t.remove(), 220);
    }, 2600);
}

window.toast = toast;