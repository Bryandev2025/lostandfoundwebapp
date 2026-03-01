/**
 * Paginator Component
 * Generates pagination UI based on standard paginator responses
 */
export const paginator = {
    /**
     * Generate paginator UI HTML
     * @param {object} p Paginator object (current_page, last_page, total, etc)
     * @param {string} onPageChange Name of global window function to call, or URL to visit
     * @returns {string} HTML string
     */
    render(p, onPageChange = 'onPageChange') {
        if (!p || !p.total || p.last_page <= 1) return '';

        const generateBtn = (pageNum, active = false, disabled = false, text = pageNum) => {
            let cls = 'btn btn-page';
            if (active) cls += ' primary';
            else cls += ' ghost';

            if (disabled) cls += ' disabled';

            return `<button class="${cls}" 
                ${disabled ? 'disabled' : ''} 
                onclick="window.${onPageChange}(${pageNum})">${text}</button>`;
        };

        let html = '<div class="paginator" style="display:flex; gap:6px; align-items:center; flex-wrap:wrap;">';

        // Prev button
        html += generateBtn(p.current_page - 1, false, p.current_page <= 1, 'Prev');

        // Page numbers (simplified - just show 1, 2, 3...)
        const maxPagesToShow = 5;
        let startPage = Math.max(1, p.current_page - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(p.last_page, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        if (startPage > 1) {
            html += generateBtn(1);
            if (startPage > 2) html += '<span style="color:var(--muted)">...</span>';
        }

        for (let i = startPage; i <= endPage; i++) {
            html += generateBtn(i, i === p.current_page);
        }

        if (endPage < p.last_page) {
            if (endPage < p.last_page - 1) html += '<span style="color:var(--muted)">...</span>';
            html += generateBtn(p.last_page);
        }

        // Next button
        html += generateBtn(p.current_page + 1, false, p.current_page >= p.last_page, 'Next');

        html += '</div>';
        return html;
    }
};
