/**
 * @module sw-register
 * @description Service worker registration and update handling for the InjuryIQ PWA.
 * Uses the 'prompt' strategy — shows a toast when a new version is available,
 * letting the user choose when to update.
 */

import { registerSW } from 'virtual:pwa-register';

/** Interval in milliseconds to check for SW updates (1 hour) */
const SW_UPDATE_INTERVAL_MS = 60 * 60 * 1000;

/**
 * Registers the service worker and sets up periodic update checks.
 * Returns a function that can be called to apply a pending update.
 *
 * @param onNeedRefresh - Callback fired when a new SW version is waiting.
 *                        The UI should show an "Update Available" prompt.
 * @param onOfflineReady - Callback fired when the app is fully cached and
 *                         ready for offline use for the first time.
 * @returns A function to call when the user accepts the update.
 */
export function initServiceWorker(
  onNeedRefresh: () => void,
  onOfflineReady: () => void
): () => void {
  const updateSW = registerSW({
    onNeedRefresh() {
      onNeedRefresh();
    },
    onOfflineReady() {
      onOfflineReady();
    },
    onRegisteredSW(swUrl, registration) {
      if (registration) {
        // Periodically check for updates
        setInterval(() => {
          registration.update().catch((error: unknown) => {
            console.warn('[SW] Update check failed:', error);
          });
        }, SW_UPDATE_INTERVAL_MS);
      }
      console.info('[SW] Registered:', swUrl);
    },
    onRegisterError(error) {
      console.error('[SW] Registration error:', error);
    },
  });

  /**
   * Call this function when the user clicks "Update Now" in the UI.
   * It activates the waiting service worker and reloads the page.
   */
  return () => {
    updateSW(true);
  };
}
