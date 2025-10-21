/**
 * Comprehensive Spelling Correction and Voice Notes Utility
 * Provides fuzzy spelling corrections and voice note capabilities across the application
 */

// Simple fuzzy string matching for spelling corrections
export function calculateLevenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  const len1 = str1.length;
  const len2 = str2.length;

  for (let i = 0; i <= len2; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len1; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len2; i++) {
    for (let j = 1; j <= len1; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[len2][len1];
}

// Common hospitality and event management terms for spelling suggestions
export const hospitalityTerms = [
  // Event Types
  'wedding', 'reception', 'conference', 'meeting', 'banquet', 'ceremony', 'celebration',
  'gala', 'fundraiser', 'corporate', 'birthday', 'anniversary', 'graduation', 'reunion',
  
  // Venues & Spaces
  'ballroom', 'pavilion', 'garden', 'rooftop', 'terrace', 'lobby', 'foyer', 'atrium',
  'boardroom', 'suite', 'hall', 'chapel', 'courtyard', 'pergola', 'gazebo',
  
  // Catering & Food
  'catering', 'appetizer', 'entree', 'dessert', 'buffet', 'plated', 'cocktail', 'hors', 'oeuvres',
  'beverage', 'wine', 'champagne', 'signature', 'mocktail', 'vegetarian', 'vegan', 'gluten',
  'kosher', 'halal', 'dietary', 'allergen', 'lactose', 'dairy', 'seafood', 'shellfish',
  
  // Service & Staff
  'coordinator', 'planner', 'server', 'bartender', 'sommelier', 'chef', 'maitre', 'captain',
  'hostess', 'valet', 'security', 'photographer', 'videographer', 'florist', 'decorator',
  
  // Equipment & Setup
  'linens', 'centerpiece', 'uplighting', 'projection', 'microphone', 'speakers', 'podium',
  'stage', 'dance', 'floor', 'tent', 'canopy', 'heater', 'generator', 'restroom', 'portable',
  
  // Business Terms
  'budget', 'invoice', 'contract', 'deposit', 'balance', 'gratuity', 'service', 'charge',
  'overtime', 'cancellation', 'insurance', 'liability', 'permit', 'license', 'vendor',
  
  // Guest Management
  'guest', 'attendee', 'invitee', 'RSVP', 'headcount', 'seating', 'arrangement', 'assignment',
  'accommodation', 'transportation', 'parking', 'accessibility', 'wheelchair', 'special', 'needs'
];

export function findBestSpellingMatch(input: string, maxDistance: number = 3): string | null {
  const lowerInput = input.toLowerCase();
  let bestMatch = null;
  let bestDistance = maxDistance + 1;

  for (const term of hospitalityTerms) {
    const distance = calculateLevenshteinDistance(lowerInput, term);
    if (distance < bestDistance && distance <= maxDistance) {
      bestMatch = term;
      bestDistance = distance;
    }
  }

  return bestMatch;
}

export function getSpellingSuggestions(input: string, maxSuggestions: number = 5): string[] {
  const lowerInput = input.toLowerCase();
  const suggestions: Array<{ term: string; distance: number }> = [];

  for (const term of hospitalityTerms) {
    const distance = calculateLevenshteinDistance(lowerInput, term);
    if (distance <= 3 && distance > 0) { // Only suggest if there's a reasonable match but not exact
      suggestions.push({ term, distance });
    }
  }

  // Sort by distance (closest matches first) and return top suggestions
  return suggestions
    .sort((a, b) => a.distance - b.distance)
    .slice(0, maxSuggestions)
    .map(s => s.term);
}

// Enhanced spell check with context awareness
export function spellCheckText(text: string): Array<{ word: string; suggestions: string[]; position: number }> {
  const words = text.split(/\s+/);
  const issues: Array<{ word: string; suggestions: string[]; position: number }> = [];
  let position = 0;

  for (const word of words) {
    const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
    if (cleanWord.length > 2) { // Only check words longer than 2 characters
      const suggestions = getSpellingSuggestions(cleanWord);
      if (suggestions.length > 0 && !hospitalityTerms.includes(cleanWord)) {
        issues.push({
          word: cleanWord,
          suggestions: suggestions,
          position: position
        });
      }
    }
    position += word.length + 1; // +1 for space
  }

  return issues;
}

// Voice Notes Functionality
export class VoiceNotesManager {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private isRecording = false;

  async startRecording(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.start();
      this.isRecording = true;
      return true;
    } catch (error) {
      console.error('Error starting voice recording:', error);
      return false;
    }
  }

  stopRecording(): Promise<Blob | null> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || !this.isRecording) {
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.isRecording = false;
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
      
      // Stop all tracks to release the microphone
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    });
  }

  isCurrentlyRecording(): boolean {
    return this.isRecording;
  }

  // Convert audio blob to base64 for storage
  audioToBase64(audioBlob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        resolve(base64.split(',')[1]); // Remove data URL prefix
      };
      reader.onerror = reject;
      reader.readAsDataURL(audioBlob);
    });
  }

  // Create audio URL for playback
  createAudioURL(audioBlob: Blob): string {
    return URL.createObjectURL(audioBlob);
  }

  // Simulate speech-to-text conversion (in real implementation, this would call a service)
  async speechToText(audioBlob: Blob): Promise<string> {
    // This is a simulation - in real implementation, you'd send the audio to a speech recognition service
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
    
    const sampleTranscriptions = [
      "The client requested vegetarian options for the wedding reception.",
      "Meeting scheduled for next Tuesday to discuss budget requirements.",
      "Special dietary restrictions noted for gluten-free and dairy-free options.",
      "Venue walkthrough completed, additional lighting equipment needed.",
      "Contract terms reviewed, deposit payment confirmed received."
    ];
    
    return sampleTranscriptions[Math.floor(Math.random() * sampleTranscriptions.length)];
  }
}

// Real-time spelling correction for input fields
export function createSpellCheckInput(
  inputElement: HTMLInputElement | HTMLTextAreaElement,
  onSuggestion?: (suggestions: string[]) => void
) {
  let timeout: NodeJS.Timeout;

  const checkSpelling = () => {
    const text = inputElement.value;
    const issues = spellCheckText(text);
    
    if (issues.length > 0 && onSuggestion) {
      const latestIssue = issues[issues.length - 1];
      onSuggestion(latestIssue.suggestions);
    }
  };

  inputElement.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(checkSpelling, 500); // Debounce spell checking
  });

  return () => {
    clearTimeout(timeout);
    inputElement.removeEventListener('input', checkSpelling);
  };
}

// Auto-correct common typos in hospitality context
export const autoCorrectRules: Record<string, string> = {
  'weding': 'wedding',
  'recpetion': 'reception',
  'catering': 'catering',
  'budjet': 'budget',
  'buget': 'budget',
  'accomodation': 'accommodation',
  'acommodation': 'accommodation',
  'availible': 'available',
  'availabe': 'available',
  'seperate': 'separate',
  'definately': 'definitely',
  'definetly': 'definitely',
  'occassion': 'occasion',
  'restaraunt': 'restaurant',
  'resturant': 'restaurant',
  'vegeterian': 'vegetarian',
  'glutten': 'gluten',
  'alergies': 'allergies',
  'allergys': 'allergies'
};

export function autoCorrectText(text: string): string {
  let correctedText = text;
  
  for (const [typo, correction] of Object.entries(autoCorrectRules)) {
    const regex = new RegExp(`\\b${typo}\\b`, 'gi');
    correctedText = correctedText.replace(regex, correction);
  }
  
  return correctedText;
}

// Export singleton instance for voice notes
export const voiceNotesManager = new VoiceNotesManager();

export default calculateLevenshteinDistance;
