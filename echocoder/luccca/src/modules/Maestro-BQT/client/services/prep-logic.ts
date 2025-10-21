/**
 * Prep Logic Service - Maestro Banquets
 * Handles course-based cart numbering, recipe analysis, and prep scheduling
 */

import type { 
  BEODocument, 
  BEOMenuItem, 
  Recipe, 
  DailyPrepCount, 
  SpeedRack, 
  CourseDefinition,
  PrepStaffingRequirement,
  TruthStatement,
  RecipeIngredient
} from '../types/beo';

// Default course structure for events
export const DEFAULT_COURSE_STRUCTURE: CourseDefinition[] = [
  {
    courseNumber: 1,
    name: "Appetizers & Canapés",
    description: "First course items including passed hors d'oeuvres and stationed appetizers",
    typicalServiceTime: "6:30 PM",
    cartPrefix: "C1",
    maxItems: 6,
    prepLeadTime: 1
  },
  {
    courseNumber: 2,
    name: "Salads & Soups",
    description: "Second course including salads, soups, and light starters",
    typicalServiceTime: "7:00 PM",
    cartPrefix: "C2",
    maxItems: 4,
    prepLeadTime: 1
  },
  {
    courseNumber: 3,
    name: "Main Entrées",
    description: "Primary course including all main dishes and proteins",
    typicalServiceTime: "7:30 PM",
    cartPrefix: "C3",
    maxItems: 8,
    prepLeadTime: 2
  },
  {
    courseNumber: 4,
    name: "Sides & Accompaniments",
    description: "Vegetable sides, starches, and entrée accompaniments",
    typicalServiceTime: "7:30 PM",
    cartPrefix: "C4",
    maxItems: 6,
    prepLeadTime: 1
  },
  {
    courseNumber: 5,
    name: "Desserts & Coffee",
    description: "Final course including desserts, coffee service, and petit fours",
    typicalServiceTime: "9:00 PM",
    cartPrefix: "C5",
    maxItems: 4,
    prepLeadTime: 1
  }
];

// Sample recipe database for demonstration
export const SAMPLE_RECIPES: Record<string, Recipe> = {
  'organic-greens-salad': {
    id: 'organic-greens-salad',
    name: 'Organic Greens Salad with Lemon Olive Oil',
    yield: 10,
    prepTimeMinutes: 45,
    cookTimeMinutes: 0,
    complexity: 2,
    prepDaysAdvance: 0, // Day-of prep
    skillRequired: 2,
    storageRequirements: ['refrigerated', 'assembled_to_order'],
    ingredients: [
      {
        id: 'mixed-greens',
        name: 'Organic Mixed Greens',
        amount: 2,
        unit: 'lbs',
        prepRequired: 'washed and dried',
        prepTimeMinutes: 15,
        critical: true
      },
      {
        id: 'cherry-tomatoes',
        name: 'Cherry Tomatoes',
        amount: 1,
        unit: 'lb',
        prepRequired: 'halved',
        prepTimeMinutes: 10,
        critical: false
      },
      {
        id: 'red-onions',
        name: 'Red Onions',
        amount: 2,
        unit: 'medium',
        prepRequired: 'grilled and sliced',
        prepTimeMinutes: 20,
        critical: false
      }
    ],
    steps: [
      {
        id: 'wash-greens',
        order: 1,
        instruction: 'Wash and thoroughly dry mixed greens',
        timeMinutes: 15,
        equipment: ['salad spinner'],
        canParallelize: true
      },
      {
        id: 'prep-vegetables',
        order: 2,
        instruction: 'Prepare tomatoes and grill onions',
        timeMinutes: 30,
        equipment: ['grill', 'knife', 'cutting_board'],
        canParallelize: true
      }
    ],
    equipment: ['salad_spinner', 'grill', 'mixing_bowls'],
    truthStatements: [
      {
        id: 'large-event-rule',
        condition: 'guestCount > 75',
        action: 'requireExtraStaff',
        priority: 1,
        description: 'Events over 75 guests require additional salad prep staff'
      }
    ]
  },
  'rocky-mountain-taco-bar': {
    id: 'rocky-mountain-taco-bar',
    name: 'Rocky Mountain Taco Bar',
    yield: 25,
    prepTimeMinutes: 240, // 4 hours
    cookTimeMinutes: 180, // 3 hours
    complexity: 4,
    prepDaysAdvance: 1, // Start day before
    skillRequired: 4,
    storageRequirements: ['refrigerated_proteins', 'ambient_garnishes'],
    ingredients: [
      {
        id: 'duck-breast',
        name: 'Duck Breast',
        amount: 8,
        unit: 'lbs',
        prepRequired: 'scored and marinated',
        prepTimeMinutes: 60,
        advancePrepDays: 1,
        critical: true
      },
      {
        id: 'venison',
        name: 'Venison Loin',
        amount: 6,
        unit: 'lbs',
        prepRequired: 'trimmed and seasoned',
        prepTimeMinutes: 45,
        advancePrepDays: 1,
        critical: true
      },
      {
        id: 'seafood-mix',
        name: 'Seafood Medley',
        amount: 4,
        unit: 'lbs',
        prepRequired: 'cleaned and portioned',
        prepTimeMinutes: 90,
        advancePrepDays: 0,
        critical: true
      }
    ],
    steps: [
      {
        id: 'marinate-proteins',
        order: 1,
        instruction: 'Marinate duck and season venison overnight',
        timeMinutes: 120,
        equipment: ['mixing_bowls', 'vacuum_sealer'],
        skillRequired: 3,
        canParallelize: false
      },
      {
        id: 'prepare-garnishes',
        order: 2,
        instruction: 'Prepare salsas, guacamole, and garnishes',
        timeMinutes: 90,
        equipment: ['food_processor', 'mixing_bowls'],
        skillRequired: 2,
        canParallelize: true
      },
      {
        id: 'cook-proteins',
        order: 3,
        instruction: 'Grill proteins to proper temperature',
        timeMinutes: 180,
        equipment: ['grill', 'thermometer'],
        skillRequired: 4,
        canParallelize: false,
        dependsOnStep: 'marinate-proteins'
      }
    ],
    equipment: ['grill', 'food_processor', 'vacuum_sealer', 'thermometer'],
    dependsOn: ['pico-de-gallo', 'guacamole', 'spicy-slaw'],
    truthStatements: [
      {
        id: 'protein-scaling-rule',
        condition: 'guestCount > 50',
        action: 'scaleProteins',
        priority: 1,
        description: 'Scale protein quantities proportionally for larger events'
      },
      {
        id: 'chef-requirement',
        condition: 'complexity >= 4',
        action: 'requireSousChef',
        priority: 1,
        description: 'Complex dishes require sous chef supervision'
      }
    ]
  }
};

export class PrepLogicService {
  /**
   * Generate course-based cart numbers for speed racks
   */
  static generateCartNumber(beoId: string, course: 1 | 2 | 3 | 4 | 5, sequence: string): string {
    const coursePrefix = DEFAULT_COURSE_STRUCTURE[course - 1].cartPrefix;
    const beoNumber = beoId.split('-').pop()?.slice(-3) || '001';
    return `SR-${beoNumber}-${coursePrefix}-${sequence}`;
  }

  /**
   * Analyze recipes and determine prep day requirements
   */
  static analyzeRecipePrepRequirements(recipe: Recipe, guestCount: number, eventDate: Date): {
    prepDays: { date: Date; tasks: string[]; estimatedHours: number }[];
    totalPrepTime: number;
    requiredStaff: number;
    scalingFactor: number;
  } {
    const scalingFactor = guestCount / recipe.yield;
    const totalPrepTime = recipe.prepTimeMinutes * scalingFactor;
    
    // Apply truth statements
    let requiredStaff = 1;
    let adjustedPrepTime = totalPrepTime;
    
    recipe.truthStatements?.forEach(statement => {
      if (this.evaluateTruthStatement(statement, { guestCount, recipe })) {
        switch (statement.action) {
          case 'requireExtraStaff':
            requiredStaff += 1;
            adjustedPrepTime = totalPrepTime / requiredStaff;
            break;
          case 'requireSousChef':
            requiredStaff = Math.max(requiredStaff, 2);
            break;
          case 'scaleProteins':
            // Additional scaling logic could go here
            break;
        }
      }
    });

    // Build prep schedule
    const prepDays: { date: Date; tasks: string[]; estimatedHours: number }[] = [];
    
    // Day before tasks (if any)
    if (recipe.prepDaysAdvance > 0) {
      const prepDate = new Date(eventDate);
      prepDate.setDate(prepDate.getDate() - recipe.prepDaysAdvance);
      
      const advanceTasks = recipe.ingredients
        .filter(ing => ing.advancePrepDays && ing.advancePrepDays > 0)
        .map(ing => `Prep ${ing.name}: ${ing.prepRequired}`);
      
      if (advanceTasks.length > 0) {
        prepDays.push({
          date: prepDate,
          tasks: advanceTasks,
          estimatedHours: Math.ceil(adjustedPrepTime / 60 / 2) // Half the prep time for advance work
        });
      }
    }

    // Event day tasks
    const eventDayTasks = recipe.steps.map(step => step.instruction);
    prepDays.push({
      date: eventDate,
      tasks: eventDayTasks,
      estimatedHours: Math.ceil(adjustedPrepTime / 60)
    });

    return {
      prepDays,
      totalPrepTime: adjustedPrepTime,
      requiredStaff,
      scalingFactor
    };
  }

  /**
   * Calculate daily food counts by course
   */
  static calculateDailyPrepCounts(beo: BEODocument): DailyPrepCount[] {
    const eventDate = new Date(beo.event.date);
    const guestCount = beo.event.guaranteed;
    const dailyCounts: DailyPrepCount[] = [];

    // Group menu items by course
    const itemsByCourse = beo.menu.items.reduce((acc, item) => {
      const course = item.course || 3; // Default to course 3 if not specified
      if (!acc[course]) acc[course] = [];
      acc[course].push(item);
      return acc;
    }, {} as Record<number, BEOMenuItem[]>);

    // For each course, calculate prep requirements
    Object.entries(itemsByCourse).forEach(([courseNum, items]) => {
      const course = parseInt(courseNum) as 1 | 2 | 3 | 4 | 5;
      
      // Calculate prep days needed for this course
      const maxPrepDays = Math.max(
        ...items.map(item => item.recipe?.prepDaysAdvance || 0)
      );

      for (let dayOffset = maxPrepDays; dayOffset >= 0; dayOffset--) {
        const prepDate = new Date(eventDate);
        prepDate.setDate(prepDate.getDate() - dayOffset);
        
        const dailyItems = items
          .filter(item => {
            const recipe = item.recipe || SAMPLE_RECIPES[item.id];
            return recipe && (recipe.prepDaysAdvance >= dayOffset);
          })
          .map(item => {
            const recipe = item.recipe || SAMPLE_RECIPES[item.id];
            const quantity = item.quantity || guestCount;
            const analysis = recipe ? 
              this.analyzeRecipePrepRequirements(recipe, quantity, eventDate) : 
              { totalPrepTime: 60, requiredStaff: 1 }; // Default fallback

            return {
              menuItemId: item.id,
              recipeId: recipe?.id || '',
              targetQuantity: quantity,
              preparedQuantity: 0,
              remainingQuantity: quantity,
              assignedStaff: [],
              estimatedTimeMinutes: analysis.totalPrepTime,
              status: 'not_started' as const,
              dependencies: recipe?.dependsOn || []
            };
          });

        if (dailyItems.length > 0) {
          const totalTime = dailyItems.reduce((sum, item) => sum + item.estimatedTimeMinutes, 0);
          
          dailyCounts.push({
            date: prepDate.toISOString().split('T')[0],
            course,
            items: dailyItems,
            totalTimeRequired: totalTime,
            totalTimeUsed: 0,
            efficiency: 1.0
          });
        }
      }
    });

    return dailyCounts.sort((a, b) => a.date.localeCompare(b.date));
  }

  /**
   * Generate speed racks with course-based numbering
   */
  static generateSpeedRacks(beo: BEODocument): SpeedRack[] {
    const speedRacks: SpeedRack[] = [];
    const guestCount = beo.event.guaranteed;

    // Group menu items by course
    const itemsByCourse = beo.menu.items.reduce((acc, item) => {
      const course = item.course || 3;
      if (!acc[course]) acc[course] = [];
      acc[course].push(item);
      return acc;
    }, {} as Record<number, BEOMenuItem[]>);

    Object.entries(itemsByCourse).forEach(([courseNum, items]) => {
      const course = parseInt(courseNum) as 1 | 2 | 3 | 4 | 5;
      const courseDefinition = DEFAULT_COURSE_STRUCTURE[course - 1];
      
      // Calculate how many racks needed for this course
      const itemsPerRack = Math.min(courseDefinition.maxItems, 4);
      const rackCount = Math.ceil(items.length / itemsPerRack);

      for (let rackIndex = 0; rackIndex < rackCount; rackIndex++) {
        const rackSequence = String.fromCharCode(65 + rackIndex); // A, B, C, etc.
        const rackNumber = this.generateCartNumber(beo.id, course, rackSequence);
        
        const rackItems = items
          .slice(rackIndex * itemsPerRack, (rackIndex + 1) * itemsPerRack)
          .map(item => ({
            menuItemId: item.id,
            recipeId: item.recipe?.id || '',
            quantity: item.quantity || guestCount,
            prepStatus: 'pending' as const,
            prepDate: new Date().toISOString().split('T')[0]
          }));

        const totalPrepTime = rackItems.reduce((sum, item) => {
          const recipe = SAMPLE_RECIPES[item.recipeId];
          return sum + (recipe ? recipe.prepTimeMinutes : 30);
        }, 0);

        speedRacks.push({
          id: `rack-${rackNumber}`,
          rackNumber,
          beoNumber: beo.id,
          course,
          location: this.determineRackLocation(course),
          items: rackItems,
          status: 'staged',
          assignedTo: [],
          estimatedPrepTime: totalPrepTime
        });
      }
    });

    return speedRacks;
  }

  /**
   * Evaluate truth statements for dynamic logic
   */
  private static evaluateTruthStatement(
    statement: TruthStatement, 
    context: { guestCount: number; recipe: Recipe }
  ): boolean {
    const { condition } = statement;
    const { guestCount, recipe } = context;

    try {
      // Simple condition evaluation (in production, use a proper expression parser)
      switch (true) {
        case condition.includes('guestCount >'):
          const threshold = parseInt(condition.split('>')[1].trim());
          return guestCount > threshold;
        
        case condition.includes('complexity >='):
          const complexityThreshold = parseInt(condition.split('>=')[1].trim());
          return recipe.complexity >= complexityThreshold;
        
        default:
          return false;
      }
    } catch (error) {
      console.warn('Failed to evaluate truth statement:', statement, error);
      return false;
    }
  }

  /**
   * Determine optimal location for speed rack based on course
   */
  private static determineRackLocation(course: 1 | 2 | 3 | 4 | 5): string {
    const locationMap = {
      1: 'Cold Kitchen', // Appetizers
      2: 'Salad Station', // Salads
      3: 'Main Kitchen', // Entrees
      4: 'Hot Kitchen', // Sides
      5: 'Pastry Station' // Desserts
    };
    
    return locationMap[course] || 'Main Kitchen';
  }

  /**
   * Calculate staffing requirements based on prep schedule
   */
  static calculateStaffingRequirements(dailyPrepCounts: DailyPrepCount[]): PrepStaffingRequirement[] {
    return dailyPrepCounts.map(dayCount => {
      const totalHours = Math.ceil(dayCount.totalTimeRequired / 60);
      const complexity = dayCount.items.reduce((max, item) => {
        const recipe = SAMPLE_RECIPES[item.recipeId];
        return Math.max(max, recipe?.complexity || 1);
      }, 1);

      // Determine staff requirements based on complexity and time
      const requiredStaff = [];
      
      if (complexity >= 4 || totalHours > 8) {
        requiredStaff.push({
          role: 'Sous Chef',
          skillLevel: 4 as const,
          count: 1,
          hoursNeeded: totalHours
        });
      }

      requiredStaff.push({
        role: 'Line Cook',
        skillLevel: Math.max(2, complexity - 1) as 1 | 2 | 3 | 4 | 5,
        count: Math.ceil(totalHours / 8),
        hoursNeeded: totalHours
      });

      if (totalHours > 4) {
        requiredStaff.push({
          role: 'Prep Cook',
          skillLevel: 2 as const,
          count: Math.ceil(totalHours / 12),
          hoursNeeded: Math.min(totalHours, 8)
        });
      }

      return {
        date: dayCount.date,
        course: dayCount.course,
        requiredStaff,
        totalHours,
        criticalTasks: dayCount.items
          .filter(item => SAMPLE_RECIPES[item.recipeId]?.ingredients.some(ing => ing.critical))
          .map(item => `${item.menuItemId} (critical ingredients)`)
      };
    });
  }
}

export default DEFAULT_COURSE_STRUCTURE;
