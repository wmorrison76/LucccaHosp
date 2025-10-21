export {};
declare global {
  interface Window {
    echo?: { sendText?: (text: string) => void };
  }
}
