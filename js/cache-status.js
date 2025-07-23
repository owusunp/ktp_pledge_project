// Cache Status Indicator
// Shows cache performance and status

class CacheStatus {
    constructor() {
        this.init();
    }

    init() {
        // Only show in development/testing
        if (location.hostname === 'localhost' || location.hostname.includes('dev')) {
            this.createStatusIndicator();
        }
        this.logCacheStatus();
    }

    createStatusIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'cache-status';
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 10000;
            font-family: monospace;
            max-width: 200px;
        `;
        
        document.body.appendChild(indicator);
        this.updateStatus(indicator);
    }

    updateStatus(indicator) {
        const fontCached = localStorage.getItem('font-Roboto') ? '✅' : '❌';
        const swRegistered = navigator.serviceWorker.controller ? '✅' : '❌';
        
        indicator.innerHTML = `
            Fonts: ${fontCached} Cached<br>
            SW: ${swRegistered} Active<br>
            Cache: ${this.getCacheSize()}
        `;
    }

    getCacheSize() {
        try {
            const size = JSON.stringify(localStorage).length;
            return size > 1024 ? `${Math.round(size/1024)}KB` : `${size}B`;
        } catch {
            return 'Unknown';
        }
    }

    logCacheStatus() {
        console.group('🚀 KTP Cache Status');
        console.log('Font Cache:', localStorage.getItem('font-Roboto') ? 'LOADED' : 'EMPTY');
        console.log('Service Worker:', navigator.serviceWorker.controller ? 'ACTIVE' : 'INACTIVE');
        console.log('Cache Size:', this.getCacheSize());
        console.log('Page Load Time:', window.performance ? `${Math.round(window.performance.now())}ms` : 'Unknown');
        console.groupEnd();
    }
}

// Initialize cache status
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        new CacheStatus();
    });
} 