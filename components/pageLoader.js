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
    <div class="brand-loader">
      <div class="loader-text">
        <span class="word l">Lost</span>
        <span class="word a">&</span>
        <span class="word f">Found</span>
      </div>
      <div class="loader-progress">
        <div class="loader-progress-bar"></div>
      </div>
    </div>
    <style>
      .brand-loader {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        opacity: 0;
        animation: fade-in 0.4s ease forwards;
        animation-delay: 0.1s;
      }
      .loader-text {
        font-family: var(--font-display, Inter, sans-serif);
        font-size: 2.2rem;
        letter-spacing: -0.03em;
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .loader-text .word {
        opacity: 0;
        filter: blur(8px);
        transform: translateY(12px) scale(0.95);
        animation: text-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      .loader-text .word.l { color: var(--text-main, #1c1c1a); font-weight: 700; animation-delay: 0.1s; }
      .loader-text .word.a { color: var(--text-muted, #86868b); font-weight: 400; font-size: 1.8rem; animation-delay: 0.25s; }
      .loader-text .word.f { color: var(--text-main, #1c1c1a); font-weight: 700; animation-delay: 0.4s; }
      
      .loader-progress {
        width: 140px;
        height: 3px;
        border-radius: 4px;
        background: rgba(0,0,0,0.05);
        overflow: hidden;
        position: relative;
        opacity: 0;
        animation: fade-in 0.4s ease forwards;
        animation-delay: 0.6s;
      }
      .loader-progress-bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 40%;
        background: var(--text-main, #1c1c1a);
        border-radius: 4px;
        animation: progress-slide 1.2s cubic-bezier(0.65, 0, 0.35, 1) infinite alternate;
      }
      
      @keyframes text-reveal {
        to {
          opacity: 1;
          filter: blur(0);
          transform: translateY(0) scale(1);
        }
      }
      @keyframes progress-slide {
        0% { left: -40%; width: 40%; }
        100% { left: 100%; width: 80%; }
      }
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
