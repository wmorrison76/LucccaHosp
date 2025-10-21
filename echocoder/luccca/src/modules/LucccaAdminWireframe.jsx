
export default function LucccaAdminWireframe() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>EchoQR Generator</h2>
      <input placeholder="Enter menu/event URL" />
      <button>Generate QR Code</button>

      <h2>EchoSurvey Manager</h2>
      <textarea placeholder="Enter survey question..." />
      <button>Create Survey</button>

      <h2>EchoDine Room Service</h2>
      <textarea placeholder="Enter room service order..." />
      <button>Submit Order</button>

      <h2>EchoCrawler Control</h2>
      <input placeholder="Enter ZIP or Region" />
      <button>Start Crawl for Menus</button>
      <button>Start Crawl for Recipes</button>
    </div>
  );
}
    