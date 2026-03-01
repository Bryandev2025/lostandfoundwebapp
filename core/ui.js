/**
 * UI Utilities for common DOM operations
 */
export const ui = {
    /**
     * Escapes HTML to prevent XSS
     * @param {string} str 
     * @returns {string}
     */
    escapeHTML(str) {
        if (!str) return "";
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    /**
     * Show an element by setting display
     * @param {HTMLElement|string} el Element or selector
     * @param {string} display Display type, defaults to 'block'
     */
    show(el, display = 'block') {
        const element = typeof el === 'string' ? document.querySelector(el) : el;
        if (element) element.style.display = display;
    },

    /**
     * Hide an element
     * @param {HTMLElement|string} el Element or selector
     */
    hide(el) {
        const element = typeof el === 'string' ? document.querySelector(el) : el;
        if (element) element.style.display = 'none';
    },

    /**
     * Toggle element visibility
     * @param {HTMLElement|string} el Element or selector
     * @param {string} display Display type if shown
     */
    toggle(el, display = 'block') {
        const element = typeof el === 'string' ? document.querySelector(el) : el;
        if (element) {
            element.style.display = element.style.display === 'none' ? display : 'none';
        }
    },

    /**
     * Disable a button and optionally show a loading state
     * @param {HTMLButtonElement|string} btn Button or selector
     * @param {string|null} loadingText Text to show while disabled
     */
    disable(btn, loadingText = null) {
        const button = typeof btn === 'string' ? document.querySelector(btn) : btn;
        if (button) {
            button.disabled = true;
            if (loadingText) {
                button.dataset.originalText = button.innerHTML;
                button.innerHTML = loadingText;
            }
            button.style.opacity = '0.7';
            button.style.cursor = 'not-allowed';
        }
    },

    /**
     * Enable a previously disabled button
     * @param {HTMLButtonElement|string} btn Button or selector
     */
    enable(btn) {
        const button = typeof btn === 'string' ? document.querySelector(btn) : btn;
        if (button) {
            button.disabled = false;
            if (button.dataset.originalText) {
                button.innerHTML = button.dataset.originalText;
                delete button.dataset.originalText;
            }
            button.style.opacity = '1';
            button.style.cursor = 'pointer';
        }
    }
};
