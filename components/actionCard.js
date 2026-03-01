export function renderActionCard({ iconSvg, title, description, buttonText, href, staggerClass = '', primary = false }) {
    const btnClass = primary ? 'web-btn-primary' : 'web-btn-glass';
    const hoverClass = primary ? '' : 'web-card-hoverable';

    return `
        <div class="web-card ${hoverClass} animate-in ${staggerClass}"
            style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div
                    style="width: 48px; height: 48px; border: 1px solid var(--text-main); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                    ${iconSvg}
                </div>
                <h3 style="font-size: 1.25rem; margin-bottom: 8px;">${title}</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.5; margin-bottom: 24px;">
                    ${description}
                </p>
            </div>
            <button class="web-btn ${btnClass}" style="width: 100%;"
                onclick="window.location.href='${href}'">${buttonText}</button>
        </div>
    `;
}
