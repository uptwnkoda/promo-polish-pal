// Analytics hook for funnel event tracking

type FunnelEvent = 
  | 'lp_step1_view'
  | 'lp_step1_select_project_type'
  | 'lp_step2_view'
  | 'lp_step2_submit'
  | 'lp_step3_view'
  | 'lp_call_click';

interface EventData {
  value?: string;
  placement?: 'hero' | 'footer' | 'step3' | 'sticky';
  [key: string]: string | number | boolean | undefined;
}

export const useAnalytics = () => {
  const trackEvent = (event: FunnelEvent, data?: EventData) => {
    // Log to console for debugging
    console.log(`[Analytics] ${event}`, data);
    
    // Google Analytics 4 (if available)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, data);
    }
    
    // Facebook Pixel (if available)
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', event, data);
    }
  };

  const trackStep1View = () => trackEvent('lp_step1_view');
  const trackStep1Select = (projectType: string) => 
    trackEvent('lp_step1_select_project_type', { value: projectType });
  const trackStep2View = () => trackEvent('lp_step2_view');
  const trackStep2Submit = () => trackEvent('lp_step2_submit');
  const trackStep3View = () => trackEvent('lp_step3_view');
  const trackCallClick = (placement: 'hero' | 'footer' | 'step3' | 'sticky') => 
    trackEvent('lp_call_click', { placement });

  return {
    trackEvent,
    trackStep1View,
    trackStep1Select,
    trackStep2View,
    trackStep2Submit,
    trackStep3View,
    trackCallClick,
  };
};
