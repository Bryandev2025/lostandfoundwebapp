export function mountPageLoader() {
    // If a loader already exists, remove it
    const existingLoader = document.getElementById("globalPageLoader");
    if (existingLoader) existingLoader.remove();

    // Create overlay container
    const loader = document.createElement("div");
    loader.id = "globalPageLoader";

    // Style it
    loader.style.position = "fixed";
    loader.style.top = "0";
    loader.style.left = "0";
    loader.style.width = "100%";
    loader.style.height = "100%";
    loader.style.backgroundColor = "var(--bg-dark, #F9F9F8)";
    loader.style.zIndex = "999999";
    loader.style.display = "flex";
    loader.style.flexDirection = "column";
    loader.style.alignItems = "center";
    loader.style.justifyContent = "center";
    loader.style.transition = "opacity 0.6s cubic-bezier(0.8, 0, 0.2, 1)";

    // Insert animated content (Apple-esque loader)
    loader.innerHTML = `
    <div style="display:flex; flex-direction:column; align-items:center; opacity:0; animation: fade-in 0.4s ease forwards; animation-delay: 0.1s;">
      <svg class="loader-spinner" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary, #1C1C1A)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 24px; animation: spin 1.2s linear infinite;">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
      </svg>
      <div style="font-family: var(--font-display, Inter, sans-serif); font-weight: 500; letter-spacing:-0.01em; color: var(--text-main, #1C1C1A); font-size: 1.1rem; display:flex; gap: 4px; align-items:flex-end;">
        <span style="display:inline-block; font-weight: 700;">Lost</span>
        <span style="display:inline-block; color:var(--text-muted, #73736E); font-weight: 400;">&</span>
        <span style="display:inline-block; font-weight: 700;">Found</span>
      </div>
    </div>
    <style>
      @keyframes spin { 100% { transform: rotate(360deg); } }
      @keyframes fade-in { to { opacity: 1; } }
      .website-layout.loading { overflow: hidden; }
    </style>
  `;

    document.body.appendChild(loader);
    document.body.classList.add("loading");

    // Dismiss loader automatically after window loads or a max timeout
    const removeLoader = () => {
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => {
                if (loader.parentNode) loader.parentNode.removeChild(loader);
                document.body.classList.remove("loading");
            }, 600); // Wait for transition
        }
    };

    // Give a small artificial delay so the user actually sees the beautiful animation
    // then hide it when the page is fully loaded
    const delay = Math.max(0, 800 - performance.now());

    if (document.readyState === "complete") {
        setTimeout(removeLoader, delay);
    } else {
        window.addEventListener("load", () => {
            setTimeout(removeLoader, 500); // 500ms minimum display time on fast networks
        });
    }

    // Backup timeout just in case the window load event doesn't fire
    setTimeout(removeLoader, 2500);
}

// Intercept clicks on internal links to show the loader immediately before navigation happens
export function bindLinkNavigation() {
    document.addEventListener("click", (e) => {
        // Find the closest anchor tag
        const link = e.target.closest("a");

        if (link && !e.ctrlKey && !e.shiftKey && !e.metaKey && !e.altKey && link.target !== "_blank") {
            const href = link.getAttribute("href");

            // Check if it's an internal link
            if (href && href.startsWith("/") && !href.startsWith("//") && !href.startsWith("#")) {
                e.preventDefault();

                // Show loader
                mountPageLoader();

                // Navigate after a tiny delay to allow loader to render smoothly
                setTimeout(() => {
                    window.location.href = href;
                }, 150);
            }
        }
    });
}
mountPageLoader();
