/**
 * Table Component
 * Generates semantic HTML tables from structured data
 */
export const table = {
    /**
     * Generate HTML for a data table
     * @param {Array<{key: string, label: string, render?: function}>} columns 
     * @param {Array<object>} data
     * @param {string} emptyText Message to display if data is empty
     * @returns {string} HTML string
     */
    render(columns, data, emptyText = "No data available") {
        if (!data || data.length === 0) {
            return `
            <div style="padding:32px 16px; text-align:center; color:var(--muted); font-size:14px; background:rgba(0,0,0,0.2); border-radius:12px;">
                ${emptyText}
            </div>
            `;
        } // Returns an empty state message if no data

        let html = '<div style="overflow-x:auto;"><table class="table" style="width:100%; border-collapse:collapse; text-align:left;">';

        // Header
        html += '<thead><tr>';
        columns.forEach(col => {
            html += `<th style="padding:12px; border-bottom:1px solid var(--border); font-weight:600; color:var(--muted); font-size:13px;">${col.label || col.key}</th>`;
        });
        html += '</tr></thead>';

        // Body
        html += '<tbody>';
        data.forEach((row, idx) => {
            html += `<tr style="border-bottom:1px solid rgba(255,255,255,0.05); transition:background 0.2s;">`;
            columns.forEach(col => {
                let cellData = row[col.key];

                // Allow custom rendering functions
                if (col.render && typeof col.render === 'function') {
                    cellData = col.render(row, idx);
                } else if (cellData === null || cellData === undefined) {
                    cellData = '—';
                }

                html += `<td style="padding:16px 12px; font-size:14px;">${cellData}</td>`;
            });
            html += '</tr>';
        });
        html += '</tbody>';

        html += '</table></div>';
        return html;
    }
};
