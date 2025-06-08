'use client'

import { useEffect } from 'react'
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'
import { sendToAnalytics, observePerformance } from '@/lib/analytics'

export default function WebVitals() {
  useEffect(() => {
    // Initialize performance monitoring
    observePerformance()

    // Report Web Vitals
    onCLS(sendToAnalytics)
    onINP(sendToAnalytics)
    onFCP(sendToAnalytics)
    onLCP(sendToAnalytics)
    onTTFB(sendToAnalytics)

    // Additional performance monitoring
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        // Monitor memory usage if available
        if ('memory' in performance) {
          const memory = (performance as unknown as { memory: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory
          console.log('Memory usage:', {
            used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
            total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
            limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB',
          })
        }

        // Monitor connection quality
        if ('connection' in navigator) {
          const connection = (navigator as unknown as { connection: { effectiveType: string; downlink: number; rtt: number } }).connection
          console.log('Connection:', {
            effectiveType: connection.effectiveType,
            downlink: connection.downlink,
            rtt: connection.rtt,
          })
        }
      })
    }
  }, [])

  // This component doesn't render anything
  return null
}

// Hook for manual performance tracking
export function usePerformanceTracking() {
  const trackCustomMetric = (name: string, value: number, unit = 'ms') => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      console.log(`Custom metric: ${name} = ${value}${unit}`)
      
      // Send to analytics if needed
      console.log('Custom metric tracked:', { name, value, unit })
    }
  }

  const measureAsyncOperation = async <T,>(
    operation: () => Promise<T>,
    operationName: string
  ): Promise<T> => {
    const start = performance.now()
    try {
      const result = await operation()
      const duration = performance.now() - start
      trackCustomMetric(operationName, duration)
      return result
    } catch (error) {
      const duration = performance.now() - start
      trackCustomMetric(`${operationName}-error`, duration)
      throw error
    }
  }

  return {
    trackCustomMetric,
    measureAsyncOperation,
  }
}