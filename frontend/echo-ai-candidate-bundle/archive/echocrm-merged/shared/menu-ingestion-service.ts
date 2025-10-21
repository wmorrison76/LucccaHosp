// AI Menu Ingestion Pipeline
// PDF/Word/URLs → OCR/NLP → Structured Catalog Items

import { CatalogItem, Package, IngestionResult, ReviewItem } from './beo-reo-types';

export interface MenuDocument {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'html_url' | 'image' | 'text';
  content: string | ArrayBuffer | File;
  uploaded_at: Date;
  processed: boolean;
}

export interface ExtractedMenuItem {
  name: string;
  description: string;
  price?: number;
  category: string;
  allergens: string[];
  dietary_tags: string[];
  portion_size?: string;
  preparation_time?: number;
  confidence: number;
}

export interface ExtractedPackage {
  name: string;
  description: string;
  items: string[];
  pricing_type: 'per_person' | 'per_event' | 'tiered';
  base_price?: number;
  min_guests?: number;
  max_guests?: number;
  confidence: number;
}

export class MenuIngestionService {
  private static readonly OCR_CONFIDENCE_THRESHOLD = 0.75;
  private static readonly NLP_CONFIDENCE_THRESHOLD = 0.80;
  
  /**
   * Main ingestion pipeline entry point
   */
  static async ingestMenuDocument(document: MenuDocument): Promise<IngestionResult> {
    console.log(`Starting ingestion for document: ${document.name}`);
    const startTime = Date.now();
    
    try {
      // Step 1: OCR Processing
      const ocrResult = await this.performOCR(document);
      
      // Step 2: NLP Extraction
      const nlpResult = await this.performNLP(ocrResult.text);
      
      // Step 3: Normalization & Cataloging
      const catalogResult = await this.normalizeToCatalog(nlpResult);
      
      // Step 4: Quality Assessment
      const qualityResult = this.assessQuality(catalogResult);
      
      const processingTime = Date.now() - startTime;
      
      return {
        success: true,
        confidence_score: qualityResult.overall_confidence,
        extracted_items: qualityResult.approved_items,
        extracted_packages: qualityResult.approved_packages,
        requires_review: qualityResult.review_items.length > 0,
        review_items: qualityResult.review_items,
        processing_time_ms: processingTime
      };
      
    } catch (error) {
      console.error('Menu ingestion failed:', error);
      return {
        success: false,
        confidence_score: 0,
        extracted_items: [],
        extracted_packages: [],
        requires_review: true,
        review_items: [],
        processing_time_ms: Date.now() - startTime
      };
    }
  }
  
  /**
   * OCR Processing - Extract text from documents
   */
  private static async performOCR(document: MenuDocument): Promise<{ text: string; confidence: number }> {
    // Simulate OCR processing
    // In production, would use AWS Textract, Google Document AI, or Azure Form Recognizer
    
    if (document.type === 'text') {
      return {
        text: document.content as string,
        confidence: 1.0
      };
    }
    
    // Mock OCR results for demo
    const mockMenuText = `
      APPETIZERS
      Shrimp Cocktail - Fresh gulf shrimp with cocktail sauce - $14.95
      Caesar Salad - Romaine lettuce, parmesan, croutons - $8.95 (Contains: dairy, gluten)
      
      ENTREES
      Grilled Salmon - Atlantic salmon with lemon herb butter - $28.95 (GF available)
      Chicken Marsala - Pan-seared chicken breast with mushroom wine sauce - $24.95
      Vegetarian Pasta Primavera - Seasonal vegetables with marinara - $19.95 (V, VG option)
      
      DESSERTS  
      Chocolate Mousse - Rich chocolate mousse with berry garnish - $7.95 (Contains: dairy, eggs)
      Seasonal Fruit Tart - Fresh fruit with pastry cream - $6.95
      
      BEVERAGE PACKAGES
      Premium Bar Package - Top shelf liquors, wines, beer - $45 per person (4 hour service)
      Wine & Beer Package - House wines and domestic beer - $25 per person
      Non-Alcoholic Package - Sodas, juices, coffee, tea - $12 per person
      
      SERVICE CHARGES
      Gratuity: 20% of food and beverage total
      Administrative Fee: $3.50 per person
      Cake Cutting Fee: $2.50 per person (if outside dessert)
      
      MINIMUM ORDERS
      Lunch Events: 25 person minimum
      Dinner Events: 30 person minimum
      Weekend Events: 50 person minimum
    `;
    
    return {
      text: mockMenuText,
      confidence: 0.92
    };
  }
  
  /**
   * NLP Processing - Extract structured data from text
   */
  private static async performNLP(text: string): Promise<{
    items: ExtractedMenuItem[];
    packages: ExtractedPackage[];
    pricing_rules: any[];
  }> {
    const items: ExtractedMenuItem[] = [];
    const packages: ExtractedPackage[] = [];
    const pricing_rules: any[] = [];
    
    // Parse menu sections
    const sections = text.split(/\n\s*[A-Z][A-Z\s]+\n/);
    
    for (const section of sections) {
      const lines = section.split('\n').filter(line => line.trim());
      
      for (const line of lines) {
        // Extract menu items using regex patterns
        const itemMatch = line.match(/^(.+?)\s*-\s*(.+?)\s*-\s*\$([0-9.]+)/);
        if (itemMatch) {
          const [, name, description, priceStr] = itemMatch;
          const price = parseFloat(priceStr);
          
          // Extract allergens and dietary info
          const allergens = this.extractAllergens(line);
          const dietaryTags = this.extractDietaryTags(line);
          
          // Determine category
          const category = this.categorizeItem(name, description);
          
          items.push({
            name: name.trim(),
            description: description.trim(),
            price,
            category,
            allergens,
            dietary_tags: dietaryTags,
            confidence: 0.88
          });
        }
        
        // Extract package deals
        const packageMatch = line.match(/^(.+Package)\s*-\s*(.+?)\s*-\s*\$([0-9.]+)\s*per\s*(person|event)/i);
        if (packageMatch) {
          const [, name, description, priceStr, pricingType] = packageMatch;
          
          packages.push({
            name: name.trim(),
            description: description.trim(),
            items: this.extractPackageItems(description),
            pricing_type: pricingType === 'person' ? 'per_person' : 'per_event',
            base_price: parseFloat(priceStr),
            confidence: 0.85
          });
        }
        
        // Extract pricing rules and minimums
        if (line.includes('minimum') || line.includes('Minimum')) {
          const minimumMatch = line.match(/(\d+)\s*person\s*minimum/i);
          if (minimumMatch) {
            pricing_rules.push({
              type: 'minimum_guests',
              value: parseInt(minimumMatch[1]),
              context: line.trim()
            });
          }
        }
        
        // Extract service charges
        if (line.includes('%') || line.includes('Fee')) {
          const serviceMatch = line.match(/(.+?):\s*(\d+)%|(.+?):\s*\$([0-9.]+)/);
          if (serviceMatch) {
            pricing_rules.push({
              type: 'service_charge',
              name: serviceMatch[1] || serviceMatch[3],
              rate: serviceMatch[2] ? parseFloat(serviceMatch[2]) / 100 : null,
              amount: serviceMatch[4] ? parseFloat(serviceMatch[4]) : null
            });
          }
        }
      }
    }
    
    return { items, packages, pricing_rules };
  }
  
  /**
   * Normalize extracted data to catalog format
   */
  private static async normalizeToCatalog(nlpResult: {
    items: ExtractedMenuItem[];
    packages: ExtractedPackage[];
    pricing_rules: any[];
  }): Promise<{
    catalog_items: CatalogItem[];
    packages: Package[];
    service_rules: any[];
  }> {
    const catalog_items: CatalogItem[] = nlpResult.items.map((item, index) => ({
      id: `extracted_${Date.now()}_${index}`,
      type: this.mapCategoryToType(item.category),
      name: item.name,
      description: item.description,
      unit: 'per person',
      cost: item.price ? item.price * 0.65 : 0, // Estimate 65% cost ratio
      price: item.price || 0,
      tax_code: this.determineTaxCode(item.category),
      gl_code: this.determineGLCode(item.category),
      modifiers: [],
      allergens: item.allergens,
      prep_lead_hours: this.estimatePrepTime(item.category, item.description),
      dietary_tags: item.dietary_tags
    }));
    
    const packages: Package[] = nlpResult.packages.map((pkg, index) => ({
      id: `package_${Date.now()}_${index}`,
      name: pkg.name,
      rules: {
        pricing_type: pkg.pricing_type,
        lead_time_hours: 24
      },
      lines: pkg.items.map(itemName => ({
        item_id: '', // Would link to actual catalog items
        qty_rule: '1 per person',
        price_override: undefined,
        required: true
      })),
      min_pax: pkg.min_guests || 1,
      max_pax: pkg.max_guests || 1000,
      upsell: pkg.name.toLowerCase().includes('premium')
    }));
    
    return {
      catalog_items,
      packages,
      service_rules: nlpResult.pricing_rules
    };
  }
  
  /**
   * Quality assessment and confidence scoring
   */
  private static assessQuality(catalogResult: {
    catalog_items: CatalogItem[];
    packages: Package[];
  }): {
    overall_confidence: number;
    approved_items: CatalogItem[];
    approved_packages: Package[];
    review_items: ReviewItem[];
  } {
    const review_items: ReviewItem[] = [];
    const approved_items: CatalogItem[] = [];
    const approved_packages: Package[] = [];
    
    // Assess catalog items
    for (const item of catalogResult.catalog_items) {
      const confidence = this.calculateItemConfidence(item);
      
      if (confidence >= this.NLP_CONFIDENCE_THRESHOLD && item.price > 0) {
        approved_items.push(item);
      } else {
        review_items.push({
          item_data: item,
          confidence,
          issues: this.identifyItemIssues(item),
          suggested_fixes: this.suggestItemFixes(item)
        });
      }
    }
    
    // Assess packages
    for (const pkg of catalogResult.packages) {
      if (pkg.name && pkg.lines.length > 0) {
        approved_packages.push(pkg);
      }
    }
    
    const overall_confidence = approved_items.length > 0 ? 
      approved_items.reduce((sum, item) => sum + this.calculateItemConfidence(item), 0) / approved_items.length : 0;
    
    return {
      overall_confidence,
      approved_items,
      approved_packages,
      review_items
    };
  }
  
  // Helper methods
  private static extractAllergens(text: string): string[] {
    const allergenKeywords = ['dairy', 'gluten', 'nuts', 'shellfish', 'eggs', 'soy', 'fish'];
    const found: string[] = [];
    
    for (const allergen of allergenKeywords) {
      if (text.toLowerCase().includes(allergen)) {
        found.push(allergen);
      }
    }
    
    return found;
  }
  
  private static extractDietaryTags(text: string): string[] {
    const dietaryMap = {
      'gf': 'gluten-free',
      'gluten-free': 'gluten-free',
      'v': 'vegetarian',
      'vg': 'vegan',
      'vegetarian': 'vegetarian',
      'vegan': 'vegan'
    };
    
    const found: string[] = [];
    const lowerText = text.toLowerCase();
    
    for (const [key, value] of Object.entries(dietaryMap)) {
      if (lowerText.includes(key)) {
        found.push(value);
      }
    }
    
    return [...new Set(found)];
  }
  
  private static categorizeItem(name: string, description: string): string {
    const text = `${name} ${description}`.toLowerCase();
    
    if (text.includes('appetizer') || text.includes('starter')) return 'appetizer';
    if (text.includes('salad')) return 'salad';
    if (text.includes('soup')) return 'soup';
    if (text.includes('entree') || text.includes('main')) return 'entree';
    if (text.includes('dessert') || text.includes('sweet')) return 'dessert';
    if (text.includes('beverage') || text.includes('drink')) return 'beverage';
    
    return 'misc';
  }
  
  private static mapCategoryToType(category: string): 'FB' | 'AV' | 'DECOR' | 'RENTAL' | 'FEE' {
    if (['appetizer', 'salad', 'soup', 'entree', 'dessert', 'beverage'].includes(category)) {
      return 'FB';
    }
    return 'FB'; // Default to F&B
  }
  
  private static determineTaxCode(category: string): string {
    if (category === 'beverage') return 'BEVERAGE';
    return 'FOOD';
  }
  
  private static determineGLCode(category: string): string {
    if (category === 'beverage') return '4100';
    return '4000';
  }
  
  private static estimatePrepTime(category: string, description: string): number {
    const complexityKeywords = ['grilled', 'seared', 'braised', 'roasted'];
    const isComplex = complexityKeywords.some(keyword => 
      description.toLowerCase().includes(keyword)
    );
    
    switch (category) {
      case 'appetizer': return isComplex ? 3 : 2;
      case 'salad': return 1;
      case 'soup': return 4;
      case 'entree': return isComplex ? 6 : 4;
      case 'dessert': return 3;
      default: return 2;
    }
  }
  
  private static extractPackageItems(description: string): string[] {
    // Simple extraction - would be more sophisticated in production
    const items = description.split(',').map(item => item.trim());
    return items.filter(item => item.length > 3);
  }
  
  private static calculateItemConfidence(item: CatalogItem): number {
    let confidence = 0.5;
    
    if (item.name && item.name.length > 2) confidence += 0.2;
    if (item.description && item.description.length > 5) confidence += 0.2;
    if (item.price > 0) confidence += 0.3;
    
    return Math.min(confidence, 1.0);
  }
  
  private static identifyItemIssues(item: CatalogItem): string[] {
    const issues: string[] = [];
    
    if (!item.name || item.name.length < 3) issues.push('Name too short or missing');
    if (!item.description || item.description.length < 5) issues.push('Description missing or inadequate');
    if (item.price <= 0) issues.push('Price missing or invalid');
    
    return issues;
  }
  
  private static suggestItemFixes(item: CatalogItem): string[] {
    const fixes: string[] = [];
    
    if (!item.name || item.name.length < 3) fixes.push('Provide descriptive item name');
    if (!item.description) fixes.push('Add detailed description');
    if (item.price <= 0) fixes.push('Set appropriate pricing');
    
    return fixes;
  }
}

// Export utility functions
export const MenuIngestionUtils = {
  /**
   * Validate document before processing
   */
  validateDocument: (document: MenuDocument): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!document.name) errors.push('Document name is required');
    if (!document.content) errors.push('Document content is required');
    if (!['pdf', 'docx', 'html_url', 'image', 'text'].includes(document.type)) {
      errors.push('Unsupported document type');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  },
  
  /**
   * Preview extracted data before committing
   */
  previewExtraction: (result: IngestionResult): string => {
    return `
Extraction Summary:
- ${result.extracted_items.length} menu items found
- ${result.extracted_packages.length} packages identified  
- Overall confidence: ${(result.confidence_score * 100).toFixed(1)}%
- ${result.requires_review ? `${result.review_items.length} items need review` : 'No review required'}
- Processing time: ${result.processing_time_ms}ms
    `.trim();
  }
};
