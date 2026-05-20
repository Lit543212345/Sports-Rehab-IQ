/**
 * @description Type declarations for vite-plugin-pwa virtual modules.
 * These modules are generated at build time by the PWA plugin.
 */

declare module 'virtual:pwa-register' {
  export interface RegisterSWOptions {
    immediate?: boolean;
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
    /**
     * Called once the SW is registered (can be called again if SW is updated).
     * @param swUrl - The URL of the registered service worker script.
     * @param registration - The ServiceWorkerRegistration object if available.
     */
    onRegisteredSW?: (swUrl: string, registration: ServiceWorkerRegistration | undefined) => void;
    onRegisterError?: (error: Error) => void;
  }

  /**
   * Registers a service worker with the given options.
   * @returns A function that accepts `reloadPage?: boolean`. When called with
   *          `true`, it tells the waiting SW to activate and reloads the page.
   */
  export function registerSW(options?: RegisterSWOptions): (reloadPage?: boolean) => Promise<void>;
}
