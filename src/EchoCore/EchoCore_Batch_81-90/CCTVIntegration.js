// CCTVIntegration.js
/**
 * Integrates with CCTV system for security feeds.
 */
export default class CCTVIntegration {
  constructor(streamUrl) {
    this.streamUrl = streamUrl;
  }

  getStream() {
    return this.streamUrl;
  }
}
