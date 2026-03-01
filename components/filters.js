import { router } from "../core/router.js";

/**
 * Filter UI bindings
 */
export const filters = {
    /**
     * Bind a set of input/select elements to update URL query params when a primary button is clicked
     * @param {string} btnSelector The apply button selector
     * @param {string[]} inputIds Array of input IDs to extract values from
     */
    bind(btnSelector, inputIds) {
        const btn = document.querySelector(btnSelector);
        if (!btn) return;

        btn.addEventListener("click", () => {
            const params = {};
            inputIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    params[id.replace(/^f/, '').toLowerCase()] = el.value.trim(); // Converts fType to type
                }
            });

            router.updateQuery(params);
            router.reload();
        });
    },

    /**
     * Prefill a set of inputs from the current URL query string
     * @param {string[]} inputIds Array of input IDs
     */
    prefill(inputIds) {
        inputIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                const paramName = id.replace(/^f/, '').toLowerCase();
                const val = router.getQuery(paramName);
                if (val !== null) {
                    el.value = val;
                }
            }
        });
    }
};
