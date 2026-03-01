/**
 * Modal Component functionality
 */
export const modal = {
    /**
     * Initialize modal event listeners to handle closing Modals
     */
    init() {
        // Handle explicit close buttons
        document.body.addEventListener('click', (e) => {
            if (e.target.closest('[data-close]')) {
                const id = e.target.closest('[data-close]').getAttribute('data-close');
                if (id) {
                    this.close(id);
                } else {
                    // find closest modal relative to button
                    const closestModal = e.target.closest('.modal-overlay');
                    if (closestModal) {
                        this.close(closestModal.id);
                    }
                }
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModals = document.querySelectorAll('.modal-overlay.open');
                openModals.forEach(el => this.close(el.id));
            }
        });
    },

    /**
     * Open a modal
     * @param {string} id ID of the .modal-overlay element
     */
    open(id) {
        const el = document.getElementById(id);
        if (el) {
            el.classList.add('open');
            document.body.style.overflow = 'hidden'; // prevent background scrolling
        }
    },

    /**
     * Close a modal
     * @param {string} id ID of the .modal-overlay element
     */
    close(id) {
        const el = document.getElementById(id);
        if (el) {
            el.classList.remove('open');

            // Check if any other modals are open before restoring scrolling
            if (document.querySelectorAll('.modal-overlay.open').length === 0) {
                document.body.style.overflow = '';
            }
        }
    },

    /**
     * Generate HTML for a standard modal
     * @param {string} id ID of the modal
     * @param {string} title Modal title
     * @param {string} bodyContent HTML content of body
     * @param {string} footerContent HTML content of footer actions
     * @returns {string} Modal HTML
     */
    generateHTML(id, title, bodyContent, footerContent = '') {
        return `
            <div class="modal-overlay" id="${id}">
                <div class="modal-content card">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                        <h3 style="margin:0;">${title}</h3>
                        <button class="btn ghost" data-close="${id}" style="padding:4px 8px;">✕</button>
                    </div>
                    <div class="modal-body" style="margin-bottom:16px;">
                        ${bodyContent}
                    </div>
                    ${footerContent ? `
                    <div class="modal-footer" style="display:flex; justify-content:flex-end; gap:8px;">
                        ${footerContent}
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
};

// Auto-initialize standard listeners
setTimeout(() => modal.init(), 0);
