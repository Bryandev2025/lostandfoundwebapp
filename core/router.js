/**
 * Router utilities for handling URL parameters and silent navigation
 */
export const router = {
    /**
     * Get a query parameter from the URL
     * @param {string} key 
     * @param {any} defaultValue 
     * @returns {string|any}
     */
    getQuery(key, defaultValue = null) {
        const params = new URLSearchParams(window.location.search);
        return params.get(key) ?? defaultValue;
    },

    /**
     * Set a query parameter in the URL without reloading the page
     * @param {string} key 
     * @param {string} value 
     */
    setQuery(key, value) {
        const params = new URLSearchParams(window.location.search);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        const newUrl = window.location.pathname + '?' + params.toString();
        window.history.pushState({ path: newUrl }, '', newUrl);
    },

    /**
     * Update multiple query parameters at once
     * @param {Record<string, string>} paramsObj 
     */
    updateQuery(paramsObj) {
        const params = new URLSearchParams(window.location.search);
        for (const [key, value] of Object.entries(paramsObj)) {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        }
        const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
        window.history.pushState({ path: newUrl }, '', newUrl);
    },

    /**
     * Reload the current page
     */
    reload() {
        window.location.reload();
    },

    /**
     * Navigate to a new route
     * @param {string} path 
     */
    go(path) {
        window.location.href = path;
    }
};
