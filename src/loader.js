/**
 * Reinocast Auto-Loader
 * This script automatically loads the latest version of the application
 * with cache busting to ensure users always get the newest code.
 * 
 * Usage in Webflow Custom Code (Head):
 * <script src="https://reinocast.reinocapital.com.br/loader.js"></script>
 */

(function() {
  const BASE_URL = 'https://reinocast.reinocapital.com.br';
  
  // Generate cache-busting parameter based on current timestamp
  // This ensures fresh files are loaded on each deployment
  const cacheBuster = Date.now();
  
  // Load CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `${BASE_URL}/styles.css?v=${cacheBuster}`;
  document.head.appendChild(link);
  
  // Load JavaScript
  const script = document.createElement('script');
  script.defer = true;
  script.src = `${BASE_URL}/index.js?v=${cacheBuster}`;
  document.head.appendChild(script);
})();

