import { getUser } from "./auth.js";
import { ui } from "./ui.js";

/**
 * Guards utility for fine-grained element control based on roles
 */
export const guards = {
    /**
     * Removes an element from the DOM if the user doesn't have the required role
     * @param {HTMLElement|string} selector Element or selector
     * @param  {...string} allowedRoles Roles allowed to see this element
     */
    requireElementRole(selector, ...allowedRoles) {
        const user = getUser();
        const role = user?.role;
        const els = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];

        if (!role || !allowedRoles.includes(role)) {
            els.forEach(el => el && el.remove());
        }
    },

    /**
     * Disables form inputs or buttons if the user doesn't have the explicit role
     * @param {HTMLElement|string} selector Form elements or container selector
     * @param  {...string} allowedRoles Roles allowed to interact
     */
    disableIfRoleLacking(selector, ...allowedRoles) {
        const user = getUser();
        const role = user?.role;

        if (!role || !allowedRoles.includes(role)) {
            const els = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];
            els.forEach(el => {
                if (el) {
                    el.disabled = true;
                    el.style.opacity = '0.5';
                    el.style.cursor = 'not-allowed';
                    el.title = "You do not have permission to perform this action.";
                }
            });
        }
    },

    /**
     * Conditionally runs a callback if user has the correct role
     * @param {function} callback 
     * @param  {...string} allowedRoles 
     * @returns {boolean} Whether it ran
     */
    runIfRole(callback, ...allowedRoles) {
        const user = getUser();
        const role = user?.role;

        if (role && allowedRoles.includes(role)) {
            callback(user);
            return true;
        }
        return false;
    }
};
