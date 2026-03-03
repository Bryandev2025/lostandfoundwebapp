export function mountFooter() {
    // Prevent duplicate footers
    if (document.getElementById('apple-footer')) return;

    const footerHTML = `
        <footer id="apple-footer" class="apple-footer">
            <div class="footer-container">
                
                <div class="footer-grid cols-5">
                    <div class="footer-column">
                        <h4 class="footer-heading">Services</h4>
                        <ul class="footer-links">
                            <li><a href="/pages/user/report.html">Report Lost Item</a></li>
                            <li><a href="/pages/user/items.html">Browse Global Feed</a></li>
                            <li><a href="/pages/user/my-claims.html">Track Claims</a></li>
                            <li><a href="/pages/user/my-items.html">Manage Reports</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h4 class="footer-heading">Account</h4>
                        <ul class="footer-links">
                            <li><a href="/pages/user/profile.html">Manage Your ID</a></li>
                            <li><a href="/pages/user/dashboard.html">User Dashboard</a></li>
                            <li><a href="/pages/staff/dashboard.html">Staff Portals</a></li>
                            <li><a href="/pages/admin/dashboard.html">Admin Controls</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h4 class="footer-heading">For Community</h4>
                        <ul class="footer-links">
                            <li><a href="#">Security Guidelines</a></li>
                            <li><a href="#">Found Item Policy</a></li>
                            <li><a href="#">Volunteer Network</a></li>
                            <li><a href="#">Campus Maps</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h4 class="footer-heading">About</h4>
                        <ul class="footer-links">
                            <li><a href="#">Our Mission</a></li>
                            <li><a href="#">Contact Support</a></li>
                            <li><a href="#">FAQs</a></li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h4 class="footer-heading">Policies</h4>
                        <ul class="footer-links">
                            <li><a href="#">Terms of Use</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Data Processing</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <div class="footer-legal">
                        <span class="footer-copyright">© ${new Date().getFullYear()} Lost & Found Inc. All rights reserved.</span>
                    </div>
                    <div class="footer-icon-wrapper">
                        <img class="footer-icon" src="/assets/img/lf-brand-logo.png" alt="Lost & Found" />
                    </div>
                </div>
            </div>
        </footer>
    `;

    // Append footer to the end of the body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}
