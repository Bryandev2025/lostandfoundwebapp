export function toast(message, type = "info") {
    let host = document.getElementById("toastHost");
    if (!host) {
        host = document.createElement("div");
        host.id = "toastHost";
        host.style.position = "fixed";
        host.style.top = "32px";
        host.style.right = "32px";
        host.style.display = "flex";
        host.style.flexDirection = "column";
        host.style.alignItems = "flex-end";
        host.style.gap = "12px";
        host.style.zIndex = "9999";
        document.body.appendChild(host);
    }

    const t = document.createElement("div");

    // Select styling based on type
    const isError = type === "danger";
    const bg = isError ? "rgba(40, 0, 0, 0.85)" : "rgba(0, 0, 0, 0.85)";
    const border = isError ? "1px solid rgba(255, 60, 60, 0.3)" : "1px solid rgba(255, 255, 255, 0.1)";
    const textColor = isError ? "#ffb3b3" : "#ffffff";

    t.style.background = bg;
    t.style.backdropFilter = "blur(12px)";
    t.style.WebkitBackdropFilter = "blur(12px)";
    t.style.border = border;
    t.style.padding = "14px 24px";
    t.style.borderRadius = "12px"; // Slightly less rounded for corner positioning
    t.style.color = textColor;
    t.style.fontSize = "0.9rem";
    t.style.fontWeight = "400";
    t.style.letterSpacing = "0.5px";
    t.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.4)";
    t.style.display = "flex";
    t.style.alignItems = "center";
    t.style.gap = "12px";
    t.style.animation = "slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards";

    // Optional icon placeholder based on type
    const icon = isError ? `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>` : `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>`;

    // Add keyframes dynamically if not exists
    if (!document.getElementById("toastAnim")) {
        const style = document.createElement("style");
        style.id = "toastAnim";
        style.innerHTML = `
            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(40px) scale(0.95); }
                to { opacity: 1; transform: translateX(0) scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    t.innerHTML = `${icon} <span style="margin-top: 1px;">${message}</span>`;
    host.appendChild(t);

    setTimeout(() => {
        t.style.transition = "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
        t.style.opacity = "0";
        t.style.transform = "translateX(40px) scale(0.95)";
        setTimeout(() => t.remove(), 400);
    }, 3500);
}

window.toast = toast;