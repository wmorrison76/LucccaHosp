/**
 * Internationalization System
 * Supports multiple languages with country flags
 */

export type Language = 'en' | 'es' | 'fr' | 'de' | 'ja';

export interface LanguageConfig {
  code: Language;
  name: string;
  flag: string; // Country flag emoji
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: Record<Language, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    nativeName: 'English',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    flag: '🇪🇸',
    nativeName: 'Español',
  },
  fr: {
    code: 'fr',
    name: 'French',
    flag: '🇫🇷',
    nativeName: 'Français',
  },
  de: {
    code: 'de',
    name: 'German',
    flag: '🇩🇪',
    nativeName: 'Deutsch',
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    flag: '🇯🇵',
    nativeName: '日本語',
  },
};

export interface Translations {
  // Navbar & Toolbar
  appearance: string;
  theme: string;
  language: string;
  settings: string;
  lightMode: string;
  darkMode: string;

  // Dashboard
  goodMorning: string;
  goodAfternoon: string;
  goodEvening: string;
  nightService: string;
  chef: string;
  dragPanels: string;
  pinToGrid: string;
  popOut: string;

  // Panel titles
  todayCovers: string;
  foodCost: string;
  laborCost: string;
  activeOrders: string;
  kitchenStatus: string;
  staffOnDuty: string;
  systemAlerts: string;
  liveRevenue: string;

  // Actions
  close: string;
  minimize: string;
  expand: string;
  reset: string;
  add: string;
  delete: string;
  save: string;
  cancel: string;

  // Status
  loading: string;
  error: string;
  success: string;
  warning: string;

  // Sidebar
  dashboard: string;
  events: string;
  scheduling: string;
  inventory: string;
  culinary: string;
  pastry: string;
  mixology: string;
  staff: string;
  reports: string;
  support: string;
}

// English translations
const en: Translations = {
  appearance: 'Appearance',
  theme: 'Theme',
  language: 'Language',
  settings: 'Settings',
  lightMode: 'Light Mode',
  darkMode: 'Dark Mode',

  goodMorning: 'Good Morning',
  goodAfternoon: 'Good Afternoon',
  goodEvening: 'Good Evening',
  nightService: 'Night Service',
  chef: 'Chef',
  dragPanels: 'Drag panels',
  pinToGrid: 'Pin to grid',
  popOut: 'Pop out anytime',

  todayCovers: "Today's Covers",
  foodCost: 'Food Cost %',
  laborCost: 'Labor Cost %',
  activeOrders: 'Active Orders',
  kitchenStatus: 'Kitchen Status',
  staffOnDuty: 'Staff on Duty',
  systemAlerts: 'System Alerts',
  liveRevenue: 'Live Revenue',

  close: 'Close',
  minimize: 'Minimize',
  expand: 'Expand',
  reset: 'Reset',
  add: 'Add',
  delete: 'Delete',
  save: 'Save',
  cancel: 'Cancel',

  loading: 'Loading...',
  error: 'Error',
  success: 'Success',
  warning: 'Warning',

  dashboard: 'Dashboard',
  events: 'Events',
  scheduling: 'Scheduling',
  inventory: 'Inventory',
  culinary: 'Culinary',
  pastry: 'Pastry',
  mixology: 'Mixology',
  staff: 'Staff',
  reports: 'Reports',
  support: 'Support',
};

// Spanish translations
const es: Translations = {
  appearance: 'Apariencia',
  theme: 'Tema',
  language: 'Idioma',
  settings: 'Configuración',
  lightMode: 'Modo Claro',
  darkMode: 'Modo Oscuro',

  goodMorning: 'Buenos Días',
  goodAfternoon: 'Buenas Tardes',
  goodEvening: 'Buenas Noches',
  nightService: 'Servicio Nocturno',
  chef: 'Chef',
  dragPanels: 'Arrastra paneles',
  pinToGrid: 'Fija a la cuadrícula',
  popOut: 'Saca en cualquier momento',

  todayCovers: 'Covers Hoy',
  foodCost: 'Costo de Alimentos %',
  laborCost: 'Costo de Mano de Obra %',
  activeOrders: 'Pedidos Activos',
  kitchenStatus: 'Estado de Cocina',
  staffOnDuty: 'Personal en Servicio',
  systemAlerts: 'Alertas del Sistema',
  liveRevenue: 'Ingresos en Vivo',

  close: 'Cerrar',
  minimize: 'Minimizar',
  expand: 'Expandir',
  reset: 'Reiniciar',
  add: 'Agregar',
  delete: 'Eliminar',
  save: 'Guardar',
  cancel: 'Cancelar',

  loading: 'Cargando...',
  error: 'Error',
  success: 'Éxito',
  warning: 'Advertencia',

  dashboard: 'Panel de Control',
  events: 'Eventos',
  scheduling: 'Programación',
  inventory: 'Inventario',
  culinary: 'Culinario',
  pastry: 'Pastelería',
  mixology: 'Mixología',
  staff: 'Personal',
  reports: 'Reportes',
  support: 'Soporte',
};

// French translations
const fr: Translations = {
  appearance: 'Apparence',
  theme: 'Thème',
  language: 'Langue',
  settings: 'Paramètres',
  lightMode: 'Mode Clair',
  darkMode: 'Mode Sombre',

  goodMorning: 'Bon Matin',
  goodAfternoon: 'Bon Après-midi',
  goodEvening: 'Bonsoir',
  nightService: 'Service de Nuit',
  chef: 'Chef',
  dragPanels: 'Faites glisser les panneaux',
  pinToGrid: 'Épingler à la grille',
  popOut: 'Sortir à tout moment',

  todayCovers: "Couverts d'Aujourd'hui",
  foodCost: 'Coût Alimentaire %',
  laborCost: 'Coût Main-d\'œuvre %',
  activeOrders: 'Commandes Actives',
  kitchenStatus: 'État de la Cuisine',
  staffOnDuty: 'Personnel en Service',
  systemAlerts: 'Alertes Système',
  liveRevenue: 'Revenus en Direct',

  close: 'Fermer',
  minimize: 'Minimiser',
  expand: 'Agrandir',
  reset: 'Réinitialiser',
  add: 'Ajouter',
  delete: 'Supprimer',
  save: 'Enregistrer',
  cancel: 'Annuler',

  loading: 'Chargement...',
  error: 'Erreur',
  success: 'Succès',
  warning: 'Avertissement',

  dashboard: 'Tableau de Bord',
  events: 'Événements',
  scheduling: 'Planification',
  inventory: 'Inventaire',
  culinary: 'Culinaire',
  pastry: 'Pâtisserie',
  mixology: 'Mixologie',
  staff: 'Personnel',
  reports: 'Rapports',
  support: 'Support',
};

// German translations
const de: Translations = {
  appearance: 'Erscheinungsbild',
  theme: 'Thema',
  language: 'Sprache',
  settings: 'Einstellungen',
  lightMode: 'Heller Modus',
  darkMode: 'Dunkler Modus',

  goodMorning: 'Guten Morgen',
  goodAfternoon: 'Guten Nachmittag',
  goodEvening: 'Guten Abend',
  nightService: 'Nachtdienst',
  chef: 'Chef',
  dragPanels: 'Ziehen Sie Felder',
  pinToGrid: 'An Raster anheften',
  popOut: 'Jederzeit herausnehmen',

  todayCovers: 'Heute Abdeckungen',
  foodCost: 'Lebensmittelkosten %',
  laborCost: 'Arbeitskosten %',
  activeOrders: 'Aktive Bestellungen',
  kitchenStatus: 'Küchenstatus',
  staffOnDuty: 'Personal im Dienst',
  systemAlerts: 'Systemwarnungen',
  liveRevenue: 'Live-Umsatz',

  close: 'Schließen',
  minimize: 'Minimieren',
  expand: 'Erweitern',
  reset: 'Zurücksetzen',
  add: 'Hinzufügen',
  delete: 'Löschen',
  save: 'Speichern',
  cancel: 'Abbrechen',

  loading: 'Wird geladen...',
  error: 'Fehler',
  success: 'Erfolg',
  warning: 'Warnung',

  dashboard: 'Armaturenbrett',
  events: 'Ereignisse',
  scheduling: 'Zeitplanung',
  inventory: 'Bestand',
  culinary: 'Kulinarisch',
  pastry: 'Konditorei',
  mixology: 'Mixologie',
  staff: 'Personal',
  reports: 'Berichte',
  support: 'Unterstützung',
};

// Japanese translations
const ja: Translations = {
  appearance: '外観',
  theme: 'テーマ',
  language: '言語',
  settings: '設定',
  lightMode: 'ライトモード',
  darkMode: 'ダークモード',

  goodMorning: 'おはよう',
  goodAfternoon: 'こんにちは',
  goodEvening: 'こんばんは',
  nightService: 'ナイトサービス',
  chef: 'シェフ',
  dragPanels: 'パネルをドラッグ',
  pinToGrid: 'グリッドにピン留め',
  popOut: 'いつでも飛び出す',

  todayCovers: '本日のカバー',
  foodCost: '食事費 %',
  laborCost: '労務費 %',
  activeOrders: 'アクティブな注文',
  kitchenStatus: 'キッチンステータス',
  staffOnDuty: '勤務中のスタッフ',
  systemAlerts: 'システムアラート',
  liveRevenue: 'ライブ収益',

  close: '閉じる',
  minimize: '最小化',
  expand: '展開',
  reset: 'リセット',
  add: '追加',
  delete: '削除',
  save: '保存',
  cancel: 'キャンセル',

  loading: '読込中...',
  error: 'エラー',
  success: '成功',
  warning: '警告',

  dashboard: 'ダッシュボード',
  events: 'イベント',
  scheduling: 'スケジューリング',
  inventory: '在庫',
  culinary: '料理',
  pastry: 'ペストリー',
  mixology: 'ミクソロジー',
  staff: 'スタッフ',
  reports: 'レポート',
  support: 'サポート',
};

export const allTranslations: Record<Language, Translations> = {
  en,
  es,
  fr,
  de,
  ja,
};

export function getTranslations(language: Language): Translations {
  return allTranslations[language] || allTranslations.en;
}
