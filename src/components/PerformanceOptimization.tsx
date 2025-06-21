import { ReactNode } from 'react'

interface PerformanceOptimizationProps {
  children: ReactNode
}

export function PerformanceOptimization({ children }: PerformanceOptimizationProps) {
  return (
    <>
      {/* Preload critical resources */}
      <link rel="preload" href="/fonts/Inter.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />

      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//img.notionusercontent.com" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Resource hints */}
      <link rel="prefetch" href="/blog" />
      <link rel="prefetch" href="/work" />
      <link rel="prefetch" href="/about" />

      {children}
    </>
  )
}

// Performance monitoring script
export function PerformanceScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
                    // Core Web Vitals monitoring
                    if ('PerformanceObserver' in window) {
                        const observer = new PerformanceObserver((list) => {
                            for (const entry of list.getEntries()) {
                                if (entry.entryType === 'largest-contentful-paint') {
                                    console.log('LCP:', entry.startTime);
                                }
                                if (entry.entryType === 'first-input') {
                                    console.log('FID:', entry.processingStart - entry.startTime);
                                }
                                if (entry.entryType === 'layout-shift') {
                                    console.log('CLS:', entry.value);
                                }
                            }
                        });
                        
                        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
                    }
                    
                    // Service Worker registration for caching
                    if ('serviceWorker' in navigator) {
                        window.addEventListener('load', () => {
                            navigator.serviceWorker.register('/sw.js')
                                .then(registration => console.log('SW registered'))
                                .catch(error => console.log('SW registration failed'));
                        });
                    }
                `,
      }}
    />
  )
}
