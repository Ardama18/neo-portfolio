// Web Vitals reporting for performance monitoring
import { type Metric } from 'web-vitals'

// Google Analytics function (if you want to use GA4)
export function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(...args)
  }
}

// Send Web Vitals data to analytics
export function sendToAnalytics(metric: Metric) {
  if (process.env.NODE_ENV === 'production') {
    // Send to Google Analytics
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      custom_map: {
        metric_id: metric.id,
        metric_value: metric.value,
        metric_delta: metric.delta,
        metric_name: metric.name,
        metric_rating: metric.rating,
      },
    })

    // Send to console for debugging
    console.log('Web Vital:', metric)

    // You can also send to other analytics services here
    // Example: sending to a custom endpoint
    if (navigator.sendBeacon) {
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        url: window.location.href,
        timestamp: Date.now(),
      })

      navigator.sendBeacon('/api/vitals', body)
    }
  }
}

// Performance observer for custom metrics
export function observePerformance() {
  if (typeof window === 'undefined') return

  // Observe navigation timing
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.log('Performance entry:', entry)
        })
      })

      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] })
    } catch (error) {
      console.error('Performance observer error:', error)
    }
  }

  // Observe resource loading
  if ('PerformanceObserver' in window) {
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 1000) {
            console.warn('Slow resource:', entry.name, entry.duration)
          }
        })
      })

      resourceObserver.observe({ entryTypes: ['resource'] })
    } catch (error) {
      console.error('Resource observer error:', error)
    }
  }
}

// Track custom events
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (process.env.NODE_ENV === 'production') {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track page views
export function trackPageView(url: string) {
  if (process.env.NODE_ENV === 'production') {
    gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_location: url,
    })
  }
}