import { sendGAEvent } from '@next/third-parties/google';

export const trackButtonClick = (buttonName: string) => {
  sendGAEvent('event', 'button_click', {
    button_name: buttonName,
  });
};

export const trackPageView = (pagePath: string) => {
  sendGAEvent('event', 'page_view', {
    page_path: pagePath,
  });
};

export const trackUserAction = (action: string, category: string, label?: string) => {
  sendGAEvent('event', action, {
    event_category: category,
    event_label: label,
  });
};
