/**
 * True when running inside the Tauri desktop shell. There is no server in
 * desktop mode: the landing page is skipped, LLM settings are entered in-app
 * (BYOK), and drafting calls the configured endpoint directly from the
 * webview — reflections and keys never leave the device.
 */
export const isDesktop =
  typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
