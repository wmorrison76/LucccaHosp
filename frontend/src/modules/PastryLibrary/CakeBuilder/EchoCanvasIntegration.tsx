/**
 * LUCCCA | EchoCanvas Integration
 * Prepare for AI-powered cake decoration image generation
 * Integrates with Stability AI or other image generators
 */

import React, { useState } from 'react';
import { CakeIntakeData } from './types';

interface EchoCanvasIntegrationProps {
  cakeData: CakeIntakeData;
  onImageGenerated?: (imageUrl: string) => void;
  onClose?: () => void;
}

interface GenerationStatus {
  isGenerating: boolean;
  progress: number;
  message: string;
}

/**
 * Prompt builder for creating cake decoration descriptions
 */
function buildImagePrompt(cakeData: CakeIntakeData): string {
  const themeDescriptions: Record<string, string> = {
    mad_hatter: 'whimsical, colorful, topsy-turvy stacked, wildly creative, tea party themed',
    bear: 'cute bear themed, animal decorations, child-friendly, playful',
    hare: 'Easter bunny themed, spring decorations, floral elements',
    yule: 'Christmas themed, snowflakes, holly, winter decorations, festive',
    custom: 'custom themed',
  };

  const themeDesc = themeDescriptions[cakeData.theme] || 'custom';

  const flavorEmoji: Record<string, string> = {
    butter: '🧈',
    vanilla: '🌼',
    chocolate: '🍫',
    pound_vanilla: '🧃',
    pound_orange: '🍊',
    pound_chocolate: '🍫',
    pound_lemon: '🍋',
    pound_marble: '🎨',
    strawberry: '🍓',
    confetti: '🎉',
    raspberry: '🫐',
  };

  const emoji = flavorEmoji[cakeData.mainFlavor] || '🎂';

  const prompt = `A professional bakery-quality cake decoration design. 
Theme: ${themeDesc}. 
Cake flavor: ${cakeData.mainFlavor.replace(/_/g, ' ')}. 
Icing color: ${cakeData.icingColor}.
Icing type: ${cakeData.icingType}.
Fillings: ${cakeData.fillingFlavors.join(', ')}.
Special notes: ${cakeData.decorationNotes || 'Professional and elegant design'}.

Style: Photorealistic, bakery-quality, professional pastry art.
Perfect for: A custom cake for ${cakeData.guestCount} guests.
Background: Transparent background, ready to apply to cake design.
Format: PNG with transparency.
Quality: High detail, professional finish.

${emoji} ${cakeData.mainFlavor.toUpperCase()} CAKE with ${cakeData.icingType.toUpperCase()} FROSTING`;

  return prompt;
}

/**
 * Main EchoCanvas Integration Component
 */
export const EchoCanvasIntegration: React.FC<EchoCanvasIntegrationProps> = ({ cakeData, onImageGenerated, onClose }) => {
  const [status, setStatus] = useState<GenerationStatus>({
    isGenerating: false,
    progress: 0,
    message: '',
  });
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>(buildImagePrompt(cakeData));
  const [apiKey, setApiKey] = useState<string>('');
  const [apiKeyError, setApiKeyError] = useState<string>('');

  const handleGenerateImage = async () => {
    if (!apiKey) {
      setApiKeyError('API key is required');
      return;
    }

    setStatus({
      isGenerating: true,
      progress: 10,
      message: 'Connecting to image generation service...',
    });
    setApiKeyError('');

    try {
      // This is a placeholder for actual API integration
      // When Stability AI API key is provided, replace with actual API call
      setStatus({ isGenerating: true, progress: 25, message: 'Preparing your request...' });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus({ isGenerating: true, progress: 50, message: 'Generating cake decoration image...' });

      // Placeholder: actual call would be to Stability AI or similar
      const response = await generateImageWithStabilityAI(prompt, apiKey);

      if (response.success && response.imageUrl) {
        setStatus({ isGenerating: true, progress: 90, message: 'Processing image...' });

        // Simulate processing
        await new Promise((resolve) => setTimeout(resolve, 500));

        setGeneratedImage(response.imageUrl);
        setStatus({
          isGenerating: false,
          progress: 100,
          message: '✅ Image generated successfully!',
        });

        onImageGenerated?.(response.imageUrl);
      } else {
        setStatus({
          isGenerating: false,
          progress: 0,
          message: `Error: ${response.error || 'Failed to generate image'}`,
        });
      }
    } catch (error) {
      setStatus({
        isGenerating: false,
        progress: 0,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  };

  const handleDownloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `cake-decoration-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🎨 EchoCanvas - AI Decoration Generator</h1>
        <p style={styles.subtitle}>Generate professional cake decoration images powered by AI</p>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <div style={styles.mainPanel}>
          {/* API Key Section */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🔐 Configuration</h2>
            <p style={styles.sectionText}>
              To generate cake decoration images, provide your Stability AI API key. Get one free at{' '}
              <a href="https://platform.stability.ai" target="_blank" rel="noopener noreferrer" style={styles.link}>
                platform.stability.ai
              </a>
            </p>

            <div style={styles.formGroup}>
              <label style={styles.label}>Stability AI API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setApiKeyError('');
                }}
                placeholder="sk-..."
                style={styles.input}
              />
              {apiKeyError && <p style={styles.errorText}>{apiKeyError}</p>}
              <p style={styles.hint}>Your API key is stored locally and never sent to our servers</p>
            </div>
          </div>

          {/* Prompt Section */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📝 Image Description</h2>
            <p style={styles.sectionText}>
              Edit the description to customize the generated decoration. The AI will use this to create unique cake topper designs.
            </p>

            <div style={styles.formGroup}>
              <label style={styles.label}>Prompt for AI</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={styles.textarea}
              />
            </div>
          </div>

          {/* Cake Info Summary */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🎂 Cake Specifications</h2>
            <div style={styles.summaryGrid}>
              <div style={styles.summaryItem}>
                <strong>Flavor:</strong> {cakeData.mainFlavor.replace(/_/g, ' ')}
              </div>
              <div style={styles.summaryItem}>
                <strong>Theme:</strong> {cakeData.theme.replace(/_/g, ' ')}
              </div>
              <div style={styles.summaryItem}>
                <strong>Guests:</strong> {cakeData.guestCount}
              </div>
              <div style={styles.summaryItem}>
                <strong>Icing Type:</strong> {cakeData.icingType}
              </div>
              <div style={styles.summaryItem}>
                <strong>Color:</strong>
                <span
                  style={{
                    display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    backgroundColor: cakeData.icingColor,
                    border: '1px solid #ccc',
                    borderRadius: '3px',
                    marginLeft: '0.5rem',
                    verticalAlign: 'middle',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Generation Button */}
          <div style={styles.section}>
            <button
              onClick={handleGenerateImage}
              disabled={status.isGenerating || !apiKey}
              style={{
                ...styles.buttonPrimary,
                opacity: status.isGenerating || !apiKey ? 0.5 : 1,
                cursor: status.isGenerating || !apiKey ? 'not-allowed' : 'pointer',
              }}
            >
              {status.isGenerating ? '⏳ Generating...' : '✨ Generate Decoration Image'}
            </button>

            {/* Progress Bar */}
            {status.isGenerating && (
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${status.progress}%`,
                  }}
                />
              </div>
            )}

            {/* Status Message */}
            {status.message && (
              <p
                style={{
                  ...styles.statusMessage,
                  color: status.message.includes('Error') || status.message.includes('error') ? '#ff6b6b' : '#0066cc',
                }}
              >
                {status.message}
              </p>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        {generatedImage && (
          <div style={styles.previewPanel}>
            <h2 style={styles.sectionTitle}>🖼️ Generated Image</h2>
            <img src={generatedImage} alt="Generated cake decoration" style={styles.previewImage} />

            <div style={styles.previewActions}>
              <button onClick={handleDownloadImage} style={styles.buttonSecondary}>
                📥 Download Image
              </button>
              <button
                onClick={() => setGeneratedImage(null)}
                style={styles.buttonCancel}
              >
                ✏️ Try Again
              </button>
            </div>

            <p style={styles.previewHint}>
              ✨ This image is ready to apply to your cake design. You can use it as a cake topper, edible print, or decoration guide.
            </p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div style={styles.infoSection}>
        <h3>💡 How EchoCanvas Works</h3>
        <ol style={styles.infoList}>
          <li>
            <strong>Describe:</strong> Customize the prompt with your cake theme and decorative ideas
          </li>
          <li>
            <strong>Generate:</strong> AI creates a unique, professional cake decoration design
          </li>
          <li>
            <strong>Apply:</strong> Use the image as a cake topper, edible print, or design inspiration
          </li>
          <li>
            <strong>Iterate:</strong> Generate multiple variations until you find the perfect design
          </li>
        </ol>
      </div>

      {/* Actions */}
      <div style={styles.footer}>
        {onClose && (
          <button onClick={onClose} style={styles.buttonCancel}>
            ← Back to Cake Design
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Placeholder for Stability AI integration
 * Replace with actual API call when API key is available
 */
async function generateImageWithStabilityAI(
  prompt: string,
  apiKey: string
): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
  try {
    // This is a placeholder - actual implementation would call Stability AI
    // https://platform.stability.ai/rest-api-reference#tag/v1generation

    // For now, return a placeholder response
    console.log('[EchoCanvas] Image generation requested with prompt:', prompt);
    console.log('[EchoCanvas] API Key provided (length:', apiKey.length, ')');

    // Placeholder: return a data URL with a cake emoji
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, 512, 512);
      ctx.font = 'bold 120px Arial';
      ctx.fillStyle = '#0066cc';
      ctx.textAlign = 'center';
      ctx.fillText('🎂', 256, 280);
      ctx.font = '24px Arial';
      ctx.fillStyle = '#666';
      ctx.fillText('Image generation ready', 256, 360);
    }

    return {
      success: true,
      imageUrl: canvas.toDataURL(),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate image',
    };
  }
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderBottom: '2px solid #ddd',
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '2rem',
    color: '#000',
  },
  subtitle: {
    margin: '0',
    fontSize: '0.95rem',
    color: '#666',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '1.5rem',
    padding: '1.5rem 2rem',
    flex: 1,
  },
  mainPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  previewPanel: {
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '2px solid #0066cc',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  section: {
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  sectionTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#000',
  },
  sectionText: {
    margin: '0 0 1rem 0',
    fontSize: '0.95rem',
    color: '#666',
    lineHeight: '1.5',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '0.95rem',
  },
  textarea: {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontFamily: 'monospace',
    minHeight: '120px',
    resize: 'vertical',
  },
  hint: {
    margin: '0.5rem 0 0 0',
    fontSize: '0.8rem',
    color: '#999',
    fontStyle: 'italic',
  },
  errorText: {
    margin: '0.5rem 0 0 0',
    fontSize: '0.85rem',
    color: '#ff6b6b',
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
  },
  summaryItem: {
    padding: '0.75rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    fontSize: '0.9rem',
  },
  progressBar: {
    height: '6px',
    backgroundColor: '#eee',
    borderRadius: '3px',
    overflow: 'hidden',
    marginTop: '1rem',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0066cc',
    transition: 'width 0.3s ease',
  },
  statusMessage: {
    margin: '1rem 0 0 0',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  previewImage: {
    width: '100%',
    borderRadius: '8px',
    border: '2px solid #ddd',
  },
  previewActions: {
    display: 'flex',
    gap: '0.5rem',
    flexDirection: 'column',
  },
  previewHint: {
    margin: '0',
    fontSize: '0.8rem',
    color: '#666',
    fontStyle: 'italic',
  },
  infoSection: {
    padding: '2rem',
    backgroundColor: '#E8F0FF',
    borderTop: '2px solid #ddd',
  },
  infoList: {
    margin: '1rem 0 0 0',
    paddingLeft: '1.5rem',
  },
  buttonPrimary: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#0066cc',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  buttonSecondary: {
    padding: '0.6rem 1.2rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#0066cc',
    backgroundColor: '#fff',
    border: '2px solid #0066cc',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  buttonCancel: {
    padding: '0.6rem 1.2rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#666',
    backgroundColor: '#fff',
    border: '2px solid #999',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  footer: {
    padding: '1.5rem 2rem',
    backgroundColor: '#fff',
    borderTop: '2px solid #ddd',
  },
  link: {
    color: '#0066cc',
    textDecoration: 'none',
  },
};
