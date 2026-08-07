import { type Metric } from 'web-vitals'

/**
 * Web Vitals measurement and reporting
 * Tracks LCP, FID, CLS, FCP, and TTFB
 */

export function reportWebVitals(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric.name, metric.value)
  }

  // Send to analytics if available
  if (typeof window !== 'undefined' && 'fetch' in window) {
    const body = JSON.stringify(metric)
    
    // Use sendBeacon for non-blocking requests
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/vitals', body)
    } else {
      fetch('/api/vitals', {
        method: 'POST',
        body,
        keepalive: true,
      }).catch(() => {
        // Silently fail
      })
    }
  }
}
