(function() {
    function detectDevice() {
        const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
        const isTablet = (window.innerWidth > 768 && window.innerWidth <= 1024) || /iPad/i.test(navigator.userAgent);
        
        const html = document.documentElement;
        
        html.classList.remove('is-mobile', 'is-tablet', 'is-desktop');
        
        if (isMobile) {
            html.classList.add('is-mobile');
        } else if (isTablet) {
            html.classList.add('is-tablet');
        } else {
            html.classList.add('is-desktop');
        }
    }

    // Run immediately before DOM loads if possible
    detectDevice();

    // Run on resize
    window.addEventListener('resize', detectDevice);
})();
