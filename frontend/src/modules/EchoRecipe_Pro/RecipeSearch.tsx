import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppData } from "@/context/AppDataContext";
import { Dropzone } from "@/components/Dropzone";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Star,
  LayoutGrid,
  Rows,
  List,
  Trash2,
  RotateCcw,
  ExternalLink,
  Search,
  Save,
  X,
  Package,
  Pencil,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { axisOptions } from "@/lib/taxonomy";
import { cn } from "@/lib/utils";
import { useLanguage, useTranslation } from "@/context/LanguageContext";
import type { LanguageCode } from "@/i18n/config";
import type { RecipeCollection } from "@shared/server-notes";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";

export function RecipeCard({
  r,
  onPreview,
  onFav,
  onRate,
  onTrash,
  inTrash,
  onDestroy,
  selectMode,
  selected,
  onToggleSelect,
  onUpdateTags,
}: {
  r: ReturnType<typeof useAppData>["recipes"][number];
  onPreview: () => void;
  onFav: () => void;
  onRate: (n: number) => void;
  onTrash: () => void;
  inTrash?: boolean;
  onDestroy?: () => void;
  selectMode?: boolean;
  selected?: boolean;
  onToggleSelect?: () => void;
  onUpdateTags?: (tags: string[]) => void;
}) {
  const { t } = useTranslation();
  const cover = r.imageDataUrls?.[0] ?? r.image ?? undefined;
  const stars = Array.from({ length: 5 }, (_, i) => i < (r.rating || 0));
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");

  // Calculate recipe cost from extra data if available
  const recipeCost = (() => {
    try {
      const serverNotes = r.extra?.serverNotes as any;
      if (serverNotes?.totals?.fullRecipeCost) {
        return serverNotes.totals.fullRecipeCost;
      }
    } catch {}
    return null;
  })();

  const portionCost = (() => {
    if (!recipeCost) return null;
    try {
      const serverNotes = r.extra?.serverNotes as any;
      const portionCount = serverNotes?.portionCount;
      if (portionCount) {
        return recipeCost / portionCount;
      }
    } catch {}
    return null;
  })();
  return (
    <div
      className={cn(
        "rounded-xl border bg-white dark:bg-zinc-900 shadow-sm overflow-hidden glow transition-colors",
        selectMode && selected
          ? "border-primary ring-2 ring-primary/40 bg-primary/5 dark:bg-primary/10"
          : undefined,
      )}
      data-echo-key="card:recipes:result"
    >
      <div className="grid grid-cols-[120px_1fr] gap-3 p-3 items-start">
        <div className="relative h-[110px] w-[110px] shrink-0">
          {cover ? (
            <img
              src={cover}
              alt={r.title}
              className="h-full w-full rounded object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded bg-muted text-muted-foreground">
              No Image
            </div>
          )}
          {selectMode && (
            <button
              type="button"
              aria-pressed={selected}
              onClick={(event) => {
                event.preventDefault();
                onToggleSelect?.();
              }}
              className={cn(
                "absolute left-2 top-2 rounded-full px-3 py-1 text-xs font-semibold shadow focus-visible:outline-none focus-visible:ring",
                selected
                  ? "bg-primary text-primary-foreground"
                  : "bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground",
              )}
            >
              {selected ? t("recipeSearch.selected") : t("recipeSearch.select")}
            </button>
          )}
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <div className="flex items-start justify-between gap-2">
            <h2 className="m-0 text-base font-semibold line-clamp-1">
              {r.title}
            </h2>
            <button
              className={`shrink-0 p-1 rounded ${r.favorite ? "text-yellow-500" : "text-muted-foreground"} hover:bg-black/5`}
              onClick={onFav}
              aria-label="Favorite"
            >
              <Star className={r.favorite ? "fill-current" : ""} />
            </button>
          </div>
          <div className="flex items-center gap-1">
            {stars.map((on, i) => (
              <button
                key={i}
                className={`p-0.5 ${on ? "text-yellow-500" : "text-muted-foreground"}`}
                onClick={() => onRate(i + 1)}
                aria-label={`rate ${i + 1}`}
              >
                ★
              </button>
            ))}
          </div>
          <div className="flex items-center flex-wrap gap-2">
            {r.tags?.length ? (
              <p className="m-0 text-xs text-muted-foreground flex-1">
                {r.tags.slice(0, 5).join(" · ")}
              </p>
            ) : (
              <p className="m-0 text-xs text-muted-foreground italic">No categories</p>
            )}
            <Button
              size="sm"
              variant="ghost"
              className="h-5 px-1.5 text-xs"
              onClick={() => setShowCategoryDialog(true)}
              title="Edit categories"
            >
              <Pencil className="h-3 w-3" />
            </Button>
          </div>
          <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Edit Categories for {r.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Add category:</label>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={categoryInput}
                      onChange={(e) => setCategoryInput(e.target.value)}
                      placeholder="e.g., Soup, Appetizer"
                      className="flex-1 rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring text-sm"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && categoryInput.trim()) {
                          const newTags = [...(r.tags || []), categoryInput.trim()];
                          onUpdateTags?.(Array.from(new Set(newTags)));
                          setCategoryInput("");
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        if (categoryInput.trim()) {
                          const newTags = [...(r.tags || []), categoryInput.trim()];
                          onUpdateTags?.(Array.from(new Set(newTags)));
                          setCategoryInput("");
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Current categories:</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {r.tags?.length ? (
                      r.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => {
                            onUpdateTags?.((r.tags || []).filter(t => t !== tag));
                          }}
                        >
                          {tag}
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground">No categories assigned</p>
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Cost Display Badges */}
          {(recipeCost || portionCost) && (
            <div className="mt-2 flex flex-wrap gap-2 items-center">
              {portionCost && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  <DollarSign className="h-2.5 w-2.5" />
                  ${portionCost.toFixed(2)}/portion
                </Badge>
              )}
              {recipeCost && !portionCost && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  <DollarSign className="h-2.5 w-2.5" />
                  ${recipeCost.toFixed(2)} total
                </Badge>
              )}
            </div>
          )}

          {r.ingredients?.length ? (
            <ul className="mt-2 mb-0 text-xs text-muted-foreground max-h-10 overflow-hidden hide-scrollbar list-disc pl-4">
              {r.ingredients.slice(0, 5).map((x, i) => (
                <li key={i} className="truncate" title={x}>
                  {x}
                </li>
              ))}
              {r.ingredients.length > 5 && (
                <li className="list-none">+{r.ingredients.length - 5} more</li>
              )}
            </ul>
          ) : null}
          <div className="mt-2 flex gap-2">
            <Button size="sm" variant="secondary" onClick={onPreview}>
              Preview
            </Button>
            {inTrash ? (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onTrash}
                  title={t("recipeSearch.restore")}
                >
                  <RotateCcw />
                </Button>
                {onDestroy && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={onDestroy}
                    title={t("recipeSearch.deleteForever")}
                  >
                    <Trash2 />
                  </Button>
                )}
              </>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                onClick={onTrash}
                title="Move to trash"
              >
                <Trash2 />
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              asChild
              data-echo-key="cta:recipes:open"
            >
              <a href={`/recipe/${r.id}/view`}>
                <ExternalLink className="mr-1" />
                Open
              </a>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                try {
                  const draft = {
                    recipeName: r.title,
                    ingredients: (r.ingredients || []).map((s: string) => ({
                      qty: "",
                      unit: "",
                      item: String(s),
                      prep: "",
                      yield: "",
                      cost: "",
                    })),
                    directions: Array.isArray(r.instructions)
                      ? (r.instructions as any[])
                          .map(String)
                          .map((x, i) => `${i + 1}. ${x}`)
                          .join("\n")
                      : String((r as any).instructions || ""),
                    taxonomy: (r.extra as any)?.taxonomy || undefined,
                  };
                  localStorage.setItem("recipe:draft", JSON.stringify(draft));
                } catch {}
                location.href = "/?tab=add-recipe";
              }}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecipeSearchSection() {
  const {
    recipes,
    searchRecipes,
    linkImagesToRecipesByFilename,
    clearRecipes,
    addRecipesFromJsonFiles,
    addRecipesFromDocxFiles,
    addRecipesFromHtmlFiles,
    addRecipesFromPdfFiles,
    addRecipesFromExcelFiles,
    addRecipesFromImageOcr,
    addFromZipArchive,
    toggleFavorite,
    rateRecipe,
    updateRecipeTags,
    deleteRecipe,
    restoreRecipe,
    exportAllZip,
    addImages,
    destroyRecipe,
    purgeDeleted,
    collections,
    createCollection,
    updateCollection,
    deleteCollection,
    setCollectionRecipes,
  } = useAppData();
  const [q, setQ] = useState("");
  type Cat = "all" | "recent" | "top" | "favorites" | "uncategorized" | "trash" | "global";
  const [cat, setCat] = useState<Cat>("all");
  const { language: appLanguage, setLanguage, options: languageOptions } =
    useLanguage();
  const { t } = useTranslation();
  const [menuExportLanguage, setMenuExportLanguage] = useState<LanguageCode>(
    appLanguage,
  );
  // Taxonomy filters
  const [fcuisine, setFCuisine] = useState<string>("");
  const [ftech, setFTech] = useState<string>("");
  const [fcourse, setFCourse] = useState<string>("");
  const [fdiet, setFDiet] = useState<string>("");

  // Autocomplete state
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);

  // Generate autocomplete suggestions from recipe titles
  const suggestions = useMemo(() => {
    if (!q.trim()) return [];
    const lowerQ = q.toLowerCase();
    return recipes
      .filter(r => !r.deletedAt && r.title.toLowerCase().includes(lowerQ))
      .slice(0, 8)
      .map(r => r.title)
      .filter((v, i, a) => a.indexOf(v) === i);
  }, [q, recipes]);

  const results = useMemo(() => {
    const base = searchRecipes(q);
    const filterByTax = (arr: typeof base) =>
      arr.filter((r) => {
        const t: any = (r as any).extra?.taxonomy || {};
        if (fcuisine && t.cuisine !== fcuisine) return false;
        if (
          ftech &&
          !(Array.isArray(t.technique) && t.technique.includes(ftech))
        )
          return false;
        if (fcourse && !(Array.isArray(t.course) && t.course.includes(fcourse)))
          return false;
        if (fdiet && !(Array.isArray(t.diets) && t.diets.includes(fdiet)))
          return false;
        return true;
      });
    const byTitle = (arr: typeof base) =>
      arr
        .slice()
        .sort((a, b) =>
          a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
        );
    const notDeleted = byTitle(filterByTax(base.filter((r) => !r.deletedAt)));
    switch (cat) {
      case "recent":
        return notDeleted; // still alphabetized per request
      case "top":
        return notDeleted; // keep alpha
      case "favorites":
        return byTitle(notDeleted.filter((r) => r.favorite));
      case "uncategorized":
        return byTitle(
          notDeleted.filter((r) => !r.tags || r.tags.length === 0),
        );
      case "global":
        return byTitle(notDeleted.filter((r) => (r as any).isGlobal === true));
      case "trash":
        return byTitle(filterByTax(base.filter((r) => !!r.deletedAt)));
      default:
        return notDeleted;
    }
  }, [q, searchRecipes, cat, fcuisine, ftech, fcourse, fdiet]);

  useEffect(() => {
    setMenuExportLanguage(appLanguage);
  }, [appLanguage]);

  const [status, setStatus] = useState<string | null>(null);
  const [mode, setMode] = useState<"cards" | "grid4" | "rows">("cards");
  const [query, setQuery] = useState("");
  const [errors, setErrors] = useState<{ file: string; error: string }[]>([]);
  const [url, setUrl] = useState("");
  const [loadingUrl, setLoadingUrl] = useState(false);
  const [processed, setProcessed] = useState(0);
  const [total, setTotal] = useState(0);
  const [importedTitles, setImportedTitles] = useState<string[]>([]);
  // Book PDF import progress state
  const [bookPhase, setBookPhase] = useState<
    null | "reading" | "selecting" | "categorizing" | "importing" | "done"
  >(null);
  const [bookFile, setBookFile] = useState<string | null>(null);
  const [bookPage, setBookPage] = useState(0);
  const [bookTotal, setBookTotal] = useState(0);
  const [bookImported, setBookImported] = useState<number | null>(null);
  const [tocOpen, setTocOpen] = useState(false);
  const [toc, setToc] = useState<{ title: string; page: number }[] | null>(
    null,
  );
  const [tocChecked, setTocChecked] = useState<Record<string, boolean>>({});
  const pdfPendingRef = useRef<File | null>(null);
const [bookDropActive, setBookDropActive] = useState(false);
// Live scan state
const [scanOpen, setScanOpen] = useState(false);
  const [scanPageNo, setScanPageNo] = useState(0);
  const [scanTotal, setScanTotal] = useState(0);
  const [detectedOpen, setDetectedOpen] = useState(false);
  const [detected, setDetected] = useState<{ page: number; title: string }[]>(
    [],
  );
  const [scanPageTexts, setScanPageTexts] = useState<string[] | null>(null);
  const [scanCandidates, setScanCandidates] = useState<number[] | null>(null);
  const [scanBookName, setScanBookName] = useState<string | null>(null);
  const [ownershipConfirmOpen, setOwnershipConfirmOpen] = useState(false);
  const [pendingOwnershipFile, setPendingOwnershipFile] = useState<File | null>(null);

  const { toast } = useToast();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const collectionNameRef = useRef<HTMLInputElement | null>(null);
  const [collectionDraftName, setCollectionDraftName] = useState("");
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<string[]>([]);
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  const [collectionToDelete, setCollectionToDelete] = useState<RecipeCollection | null>(null);

  const sortedCollections = useMemo(() => {
    const timestamp = (value: string | undefined) =>
      value ? Date.parse(value) || 0 : 0;
    return [...collections].sort(
      (a, b) => timestamp(b.updatedAt) - timestamp(a.updatedAt),
    );
  }, [collections]);

  const [searchParams, setSearchParams] = useSearchParams();
  const goToCookbookBuilder = useCallback(() => {
    const next = new URLSearchParams(searchParams);
    next.set("tab", "server-notes");
    setSearchParams(next, { replace: false });
  }, [searchParams, setSearchParams]);

  const importBookPdf = async (file: File) => {
  if (!file) return;
  const isPdf =
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) {
    toast({
      title: "PDF required",
      description: "Drop a cookbook PDF to use the library importer.",
      variant: "destructive",
    });
    return;
  }
  if (bookPhase && bookPhase !== "done") {
    toast({
      title: "Book import in progress",
      description: "Wait for the current PDF import to finish before adding another.",
    });
    return;
  }
  if (
    typeof window !== "undefined" &&
    !confirm("Confirm you own/purchased this cookbook PDF for personal import?")
  ) {
    return;
  }
  try {
    setBookFile(file.name);
    setBookPhase("reading");
    setStatus("Reading book PDF...");
    const ab = await file.arrayBuffer();
    pdfPendingRef.current = file;
    const pdfjs: any = await import(
      "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.mjs",
    );
    const workerSrc = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.worker.mjs";
    if (pdfjs.GlobalWorkerOptions)
      pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
    const doc = await pdfjs.getDocument({ data: ab }).promise;
    setBookTotal(doc.numPages);
    setScanOpen(true);
    setDetectedOpen(true);
    setDetected([]);
    setScanPageNo(0);
    setScanTotal(doc.numPages);
    let lines: string[] = [];
    const isLikelyIngredientList = (txt: string) => {
      const ls = txt
        .split(/\n/)
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 80);
      const qty =
        /^(?:\d+(?:\s+\d\/\d)?|\d+\/\d|\d+(?:\.\d+)?|[¼½¾⅓⅔⅛⅜⅝⅞])(?:\s*[a-zA-Z]+)?\b/;
      let c = 0;
      for (const L of ls) {
        if (qty.test(L) || /^[•\-*]\s+/.test(L)) c++;
      }
      return c >= 3;
    };
    const normalizeLineA = (s: string) => {
      let t = s.replace(/\s+/g, " ").trim();
      if (
        /^([A-Z]\s+){2,}[A-Z](?:\s+\d+)?[\s:]*$/.test(t) &&
        t.length <= 60
      ) {
        t = t.replace(/\s+/g, "");
      }
      return t;
    };
    const pageTexts: string[] = [];
    const candidates: number[] = [];
    for (let p = 1; p <= doc.numPages; p++) {
      const page = await doc.getPage(p);
      const tc = await page.getTextContent();
      const pageLines = (tc.items as any[])
        .map((i: any) => String(i.str))
        .filter(Boolean);
      lines.push(...pageLines);
      lines.push("");
      const t = pageLines.join("\n");
      pageTexts.push(t);
      setBookPage(p);
      setScanPageNo(p);
      const hasIng =
        /\bingredients?\b/i.test(t) || isLikelyIngredientList(t);
      if (hasIng) {
        candidates.push(p);
        let guess = "";
        const top = pageLines
          .map(normalizeLineA)
          .filter(Boolean)
          .slice(0, 10);
        for (const L of top) {
          if (
            /^[A-Z][A-Za-z0-9\-'\s]{2,80}$/.test(L) ||
            /^([A-Z]\s+){2,}[A-Z][\s:]*$/.test(L)
          ) {
            guess = L.replace(/\s+/g, " ").trim();
            break;
          }
        }
        if (
          /^see\b/i.test(guess) ||
          /(flexipan|inch|inches|cm|diameter)\b/i.test(guess)
        )
          guess = "";
        setDetected((d) => [...d, { page: p, title: guess || `Candidate p.${p}` }]);
      }
    }
    try {
      const keepTop = (obj: Record<string, number>, n: number) =>
        Object.fromEntries(
          Object.entries(obj)
            .sort((a, b) => b[1] - a[1])
            .slice(0, n),
        );
      const words: Record<string, number> = {},
        bigrams: Record<string, number> = {};
      const textAll = pageTexts
        .join("\n")
        .toLowerCase()
        .replace(/[^a-z\s]/g, " ");
      const arr = textAll
        .split(/\s+/)
        .filter((w) => w.length >= 3 && w.length <= 24);
      for (let i = 0; i < arr.length; i++) {
        const w = arr[i];
        words[w] = (words[w] || 0) + 1;
        if (i < arr.length - 1) {
          const g = `${arr[i]} ${arr[i + 1]}`;
          if (g.length >= 5 && g.length <= 40)
            bigrams[g] = (bigrams[g] || 0) + 1;
        }
      }
      const raw = localStorage.getItem("kb:cook") || "{}";
      const kb = JSON.parse(raw || "{}");
      kb.terms = keepTop({ ...kb.terms, ...words }, 400);
      kb.bigrams = keepTop({ ...kb.bigrams, ...bigrams }, 600);
      kb.books = Array.from(
        new Set([...(kb.books || []), file.name.replace(/\.[^.]+$/, "")]),
      );
      localStorage.setItem("kb:cook", JSON.stringify(kb));
    } catch {}
    setScanOpen(false);
    setBookPhase("selecting");
    setScanPageTexts(pageTexts);
    setScanCandidates(candidates);
    setScanBookName(file.name.replace(/\.[^.]+$/, ""));
    if (candidates.length >= 5) {
      setStatus(
        `Detected ${candidates.length} recipe candidates. Click "Import detected" to add them.`,
      );
      return;
    }
    const normLine = (s: string) => {
      let t = s.replace(/\s+/g, " ").trim();
      if (
        /^([A-Z]\s+){2,}[A-Z](?:\s+\d+)?[\s:]*$/.test(t) &&
        t.length <= 60
      ) {
        t = t.replace(/\s+/g, "");
      }
      return t;
    };
    const norm = lines.map(normLine);
    let tocEntries = norm
      .map((s) => {
        const tests = [
          /^(.{3,120}?)(?:[\.·•\s]{2,})(\d{1,4})$/,
          /^(.{3,120}?)\s{3,}(\d{1,4})$/,
          /^(.{3,120}?)\s+[-–—]\s*(\d{1,4})$/,
        ];
        let m: RegExpMatchArray | null = null;
        for (const re of tests) {
          m = s.match(re);
          if (m) break;
        }
        if (!m) return null;
        const title = m[1].trim();
        const page = parseInt(m[2], 10);
        const bad =
          /^(?:contents|index|appendix|recipes?|chapter|table of contents|fig(?:\.|ures?)?(?:\s*\d+)?|plates?(?:\s*\d+)?|illustrations?(?:\s*\d+)?|photos?(?:\s*\d+)?|tables?(?:\s*\d+)?|maps?(?:\s*\d+)?|yield\b|to convert\b|see\b)/i;
        if (!title || bad.test(title)) return null;
        if (/(flexipan|inch|inches|cm|diameter)\b/i.test(title)) return null;
        return { title, page };
      })
      .filter(Boolean) as { title: string; page: number }[];
    const seen: Record<number, boolean> = {};
    tocEntries = tocEntries.filter((e) => !seen[e.page] && (seen[e.page] = true));
    if (tocEntries.length >= 5) {
      setToc(tocEntries);
      const checked: Record<string, boolean> = {};
      tocEntries.forEach((x) => (checked[x.title] = true));
      setTocChecked(checked);
      setTocOpen(true);
      setStatus("Select recipes to import");
      return;
    }
    const items: any[] = [];
    let i = 0;
    const book = file.name.replace(/\.[^.]+$/, "");
    const isTitle = (s: string) =>
      s &&
      s.length < 70 &&
      /[A-Za-z]/.test(s) &&
      (s === s.toUpperCase() || /^[A-Z][^.!?]{2,}$/.test(s));
    while (i < norm.length) {
      while (i < norm.length && !/ingredients?/i.test(norm[i])) i++;
      if (i >= norm.length) break;
      let tIdx = Math.max(0, i - 5);
      let title = "";
      for (let k = i - 1; k >= tIdx; k--) {
        if (isTitle(norm[k])) {
          title = norm[k];
          break;
        }
      }
      const ings: string[] = [];
      i++;
      while (i < norm.length && !/ingredients?/i.test(norm[i])) {
        const s = norm[i];
        if (/^(instructions|directions|method)/i.test(s)) break;
        if (s) ings.push(s);
        i++;
      }
      let ins: string[] = [];
      while (i < norm.length && !/ingredients?/i.test(norm[i])) {
        const s = norm[i];
        if (s) ins.push(s);
        i++;
      }
      if (title && (ings.length || ins.length))
        items.push({
          title,
          ingredients: ings,
          instructions: ins,
          tags: [book],
          extra: { book, source: "pdf-auto" },
        });
    }
    setBookPhase("importing");
    if (items.length) {
      const blob = new Blob([JSON.stringify(items)], {
        type: "application/json",
      });
      const jsonFile = new File([blob], `${book}.json`, {
        type: "application/json",
      });
      const { added } = await addRecipesFromJsonFiles([jsonFile]);
      setBookImported(added);
      setStatus(`Imported ${added} recipes from book.`);
      setBookPhase("done");
    } else {
      setStatus("Could not detect recipes in PDF");
      setBookPhase(null);
    }
  } catch (e: any) {
    setStatus(`Failed: ${e?.message || "error"}`);
    setBookPhase(null);
  }
};

const onFiles = async (files: File[]) => {
    const list = files.slice(0, 100);
    const jsonFiles = list.filter(
      (f) => f.type.includes("json") || f.name.toLowerCase().endsWith(".json"),
    );
    const docxFiles = list.filter((f) =>
      f.name.toLowerCase().endsWith(".docx"),
    );
    const htmlFiles = list.filter((f) => /(\.html?|\.htm)$/i.test(f.name));
    const pdfFiles = list.filter((f) => f.name.toLowerCase().endsWith(".pdf"));
    const xlsFiles = list.filter((f) => /(\.xlsx|\.xls|\.csv)$/i.test(f.name));
    const imageFiles = list.filter(
      (f) =>
        f.type.startsWith("image/") ||
        /(png|jpe?g|webp|heic|heif)$/i.test(f.name),
    );
    const zipFiles = list.filter(
      (f) => f.type.includes("zip") || f.name.toLowerCase().endsWith(".zip"),
    );

    const steps =
      jsonFiles.length +
      docxFiles.length +
      htmlFiles.length +
      pdfFiles.length +
      xlsFiles.length +
      imageFiles.length +
      zipFiles.length;
    setProcessed(0);
    setTotal(steps);
    setImportedTitles([]);
    setErrors([]);
    setStatus("Processing...");

    const collectedTitles: string[] = [];
    const rememberTitles = (titles?: string[]) => {
      if (titles?.length) {
        collectedTitles.push(...titles);
        setImportedTitles((t) => [...t, ...titles]);
      }
    };

    let importedCount = 0;
    const allErrors: { file: string; error: string }[] = [];

    for (const f of jsonFiles) {
      const { added, errors, titles } = await addRecipesFromJsonFiles([f]);
      importedCount += added;
      allErrors.push(...errors);
      rememberTitles(titles);
      setProcessed((p) => p + 1);
    }
    for (const f of docxFiles) {
      const { added, errors, titles } = await addRecipesFromDocxFiles([f]);
      importedCount += added;
      allErrors.push(...errors);
      rememberTitles(titles);
      setProcessed((p) => p + 1);
    }
    for (const f of htmlFiles) {
      const { added, errors, titles } = await addRecipesFromHtmlFiles([f]);
      importedCount += added;
      allErrors.push(...errors);
      rememberTitles(titles);
      setProcessed((p) => p + 1);
    }
    for (const f of pdfFiles) {
      const { added, errors, titles } = await addRecipesFromPdfFiles([f]);
      importedCount += added;
      allErrors.push(...errors);
      rememberTitles(titles);
      setProcessed((p) => p + 1);
    }
    for (const f of xlsFiles) {
      const { added, errors, titles } = await addRecipesFromExcelFiles([f]);
      importedCount += added;
      allErrors.push(...errors);
      rememberTitles(titles);
      setProcessed((p) => p + 1);
    }
    for (const f of imageFiles) {
      const { added, errors, titles } = await addRecipesFromImageOcr([f]);
      importedCount += added;
      allErrors.push(...errors);
      rememberTitles(titles);
      setProcessed((p) => p + 1);
    }
    for (const z of zipFiles) {
      const res = await addFromZipArchive(z);
      importedCount += res.addedRecipes;
      for (const e of res.errors)
        allErrors.push({ file: e.entry, error: e.error });
      rememberTitles(res.titles);
      setProcessed((p) => p + 1);
    }

    setErrors(allErrors);
    const summary = `Imported ${importedCount} recipe${importedCount === 1 ? "" : "s"}.`;
    const issueSummary =
      allErrors.length > 0
        ? `${allErrors.length} item${allErrors.length === 1 ? "" : "s"} had issues.`
        : "No issues detected.";
    const titleSummary =
      collectedTitles.length > 0
        ? `Added: ${collectedTitles
            .slice(0, 4)
            .join(", ")}${collectedTitles.length > 4 ? " …" : ""}`
        : "";
    const statusMessage = [summary, issueSummary].join(" ");
    setStatus(titleSummary ? `${statusMessage} ${titleSummary}` : statusMessage);
    toast({
      title: "Recipe import complete",
      description: [summary, issueSummary, titleSummary]
        .filter(Boolean)
        .join(" "),
    });
    setProcessed(0);
    setTotal(0);
  };

  const importFromUrl = async () => {
    if (!url) return;
    try {
      setLoadingUrl(true);
      setStatus("Downloading...");
      const resp = await fetch(url);
      const contentType = resp.headers.get("content-type") || "";
      if (
        /json|javascript/.test(contentType) ||
        url.toLowerCase().endsWith(".json")
      ) {
        try {
          const data = await resp.json();
          const blob = new Blob([JSON.stringify(data)], {
            type: "application/json",
          });
          const name = (url.split("/").pop() || "import.json").replace(
            /\?.*$/,
            "",
          );
          const file = new File([blob], name, { type: "application/json" });
          const {
            added,
            errors: errs,
            titles,
          } = await addRecipesFromJsonFiles([file]);
          setErrors(errs);
          setStatus(
            `Imported ${added} recipe(s) from JSON${titles.length ? `: ${titles.slice(0, 5).join(", ")}${titles.length > 5 ? " …" : ""}` : ""}.`,
          );
          return;
        } catch {}
      }
      const blob = await resp.blob();
      const name = (url.split("/").pop() || "import.zip").replace(/\?.*$/, "");
      const file = new File([blob], name, {
        type: blob.type || "application/zip",
      });
      const res = await addFromZipArchive(file);
      setErrors(res.errors.map((e) => ({ file: e.entry, error: e.error })));
      setStatus(
        `Imported ${res.addedRecipes} recipe(s) and ${res.addedImages} image(s) from ZIP.`,
      );
    } catch (e: any) {
      setStatus(`Failed to import from URL: ${e?.message ?? "error"}`);
    } finally {
      setLoadingUrl(false);
    }
  };

  const [preview, setPreview] = useState<
    ReturnType<typeof useAppData>["recipes"][number] | null
  >(null);
  const inTrashView = cat === "trash";

  const isCollectionDraftActive =
    Boolean(activeCollectionId) ||
    collectionDraftName.trim().length > 0 ||
    selectedRecipeIds.length > 0;
  const isCollectionSelectionEnabled = isCollectionDraftActive && !inTrashView;

  useEffect(() => {
    if (!selectedRecipeIds.length) return;
    setSelectedRecipeIds((prev) =>
      prev.filter((id) => recipes.some((recipe) => recipe.id === id)),
    );
  }, [recipes, selectedRecipeIds.length]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = "serverNotes:presetSelection";
    if (!selectedRecipeIds.length) {
      window.sessionStorage.removeItem(key);
      return;
    }
    window.sessionStorage.setItem(
      key,
      JSON.stringify({
        version: 1,
        ids: selectedRecipeIds,
        savedAt: Date.now(),
      }),
    );
  }, [selectedRecipeIds]);

  const resetCollectionDraft = useCallback(() => {
    setCollectionDraftName("");
    setSelectedRecipeIds([]);
    setActiveCollectionId(null);
  }, []);

  const toggleRecipeSelection = useCallback(
    (recipeId: string) => {
      if (!isCollectionSelectionEnabled) return;
      setSelectedRecipeIds((prev) =>
        prev.includes(recipeId)
          ? prev.filter((id) => id !== recipeId)
          : [...prev, recipeId],
      );
    },
    [isCollectionSelectionEnabled],
  );

  const handleEditCollection = useCallback(
    (collection: RecipeCollection) => {
      setActiveCollectionId(collection.id);
      setCollectionDraftName(collection.name);
      setSelectedRecipeIds(
        collection.recipeIds.filter((id) =>
          recipes.some((recipe) => recipe.id === id),
        ),
      );
      requestAnimationFrame(() => {
        collectionNameRef.current?.focus();
      });
    },
    [recipes],
  );

  const handleSaveCollection = useCallback(() => {
    const trimmedName = collectionDraftName.trim();
    if (!trimmedName) {
      toast({
        title: "Name required",
        description: "Add a name before saving the collection.",
        variant: "destructive",
      });
      return;
    }
    if (selectedRecipeIds.length === 0) {
      toast({
        title: "No recipes selected",
        description: "Select at least one recipe to include.",
        variant: "destructive",
      });
      return;
    }
    if (activeCollectionId) {
      updateCollection(activeCollectionId, { name: trimmedName });
      setCollectionRecipes(activeCollectionId, selectedRecipeIds);
      toast({
        title: "Collection updated",
        description: "Changes have been saved.",
      });
    } else {
      createCollection({
        name: trimmedName,
        season: "All",
        year: new Date().getFullYear(),
        version: 1,
        recipeIds: selectedRecipeIds,
      });
      toast({
        title: "Collection created",
        description: `${selectedRecipeIds.length} recipe${selectedRecipeIds.length === 1 ? "" : "s"} saved to "${trimmedName}".`,
      });
    }
    resetCollectionDraft();
  }, [
    activeCollectionId,
    collectionDraftName,
    createCollection,
    resetCollectionDraft,
    selectedRecipeIds,
    setCollectionRecipes,
    toast,
    updateCollection,
  ]);

  const handleDeleteCollection = useCallback(() => {
    if (!collectionToDelete) return;
    deleteCollection(collectionToDelete.id);
    if (collectionToDelete.id === activeCollectionId) {
      resetCollectionDraft();
    }
    toast({
      title: "Collection deleted",
      description: `"${collectionToDelete.name}" removed.`,
    });
    setCollectionToDelete(null);
  }, [
    activeCollectionId,
    collectionToDelete,
    deleteCollection,
    resetCollectionDraft,
    toast,
  ]);

  return (
    <div
      className="mx-auto w-full max-w-[1400px] space-y-5 px-4 py-4 sm:px-6 lg:px-10"
      data-echo-key="page:recipes:search"
    >
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
          {(
            [
              "all",
              "recent",
              "top",
              "favorites",
              "uncategorized",
              "global",
              "trash",
            ] as Cat[]
          ).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1 rounded-md text-sm ${cat === c ? "bg-background shadow" : "text-foreground/80"}`}
            >
              {t(`recipes.filter.${c}`, c.replace(/^[a-z]/, (s) => s.toUpperCase()))}
            </button>
          ))}
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <Select
            value={menuExportLanguage}
            onValueChange={(value) => {
              const code = value as LanguageCode;
              setMenuExportLanguage(code);
              setLanguage(code);
            }}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder={t("recipes.exportLanguage", "Export language")} />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option.code} value={option.code}>
                  {option.flag} {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportAllZip(menuExportLanguage)}
          >
            {t("recipes.exportAll", "Export all (ZIP)")}
          </Button>
          {inTrashView && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                if (
                  confirm(
                    t("recipes.deleteAllTrash.confirm", "Delete all items in Trash permanently? This cannot be undone."),
                  )
                )
                  purgeDeleted();
              }}
            >
              {t("recipes.deleteAll", "Delete all")}
            </Button>
          )}
          <Button
            variant="destructive"
            size="sm"
            onClick={() => clearRecipes()}
          >
            {t("recipes.clear", "Clear")}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Dropzone
          className="glow flex min-h-[160px] flex-col items-center justify-center rounded-xl border border-dashed border-primary/35 bg-background/90 p-6 text-center shadow-sm transition-all hover:border-primary/60 hover:shadow-md dark:bg-zinc-900/70"
          accept=".json,application/json,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.html,.htm,text/html,.pdf,application/pdf,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.xls,application/vnd.ms-excel,.csv,text/csv,application/zip,application/x-zip-compressed,.zip,image/*"
          multiple
          onFiles={onFiles}
          busy={
            (total > 0 && processed < total) ||
            bookPhase === "reading" ||
            bookPhase === "importing"
          }
          progress={
            total > 0
              ? processed / Math.max(total, 1)
              : bookPhase === "reading"
                ? bookTotal
                  ? bookPage / Math.max(bookTotal, 1)
                  : 0
                : undefined
          }
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-semibold uppercase tracking-[0.55em] text-primary">
              {t("recipes.recipeDrop.title", "Recipe Drop")}
            </div>
            <div className="text-sm font-medium text-foreground">
              {t("recipes.recipeDrop.description", "Drag or upload recipes and images (Word, PDF, Excel, HTML, JSON, ZIP).")}
            </div>
            <div className="text-xs text-muted-foreground">
              {t("recipes.recipeDrop.autoDetect", "We auto-detect titles, ingredients, yields, and instructions.")}
            </div>
          </div>
        </Dropzone>
        <div className="flex flex-col space-y-4 rounded-xl border border-primary/30 bg-background/90 p-4 shadow-sm dark:bg-zinc-900/70">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex min-w-[220px] flex-1 flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                  {t("recipes.menuCollection", "Menu Collection")}
                </div>
                {activeCollectionId && (
                  <span className="rounded-full bg-primary/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
                    {t("recipes.editing", "Editing")}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 rounded-full border border-primary/20 bg-background px-4 py-2 shadow-inner dark:bg-zinc-950/60">
                <input
                  ref={collectionNameRef}
                  value={collectionDraftName}
                  onChange={(event) => setCollectionDraftName(event.target.value)}
                  placeholder={t("recipes.collectionName.placeholder", "Collection Name")}
                  className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => searchInputRef.current?.focus()}
                title="Search recipes"
              >
                <Search className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={handleSaveCollection}
                disabled={
                  collectionDraftName.trim().length === 0 || selectedRecipeIds.length === 0
                }
                title="Save collection"
              >
                <Save className="h-4 w-4" />
              </Button>
              {isCollectionDraftActive && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={resetCollectionDraft}
                  title="Clear"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          {isCollectionDraftActive && (
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
              <div>
                {selectedRecipeIds.length} recipe
                {selectedRecipeIds.length === 1 ? "" : "s"} selected
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRecipeIds([])}
                  disabled={selectedRecipeIds.length === 0}
                >
                  Clear picks
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => searchInputRef.current?.focus()}
                >
                  Search catalog
                </Button>
                <Button
                  type="button"
                  size="sm"
                  className="font-semibold"
                  onClick={goToCookbookBuilder}
                  disabled={selectedRecipeIds.length === 0}
                >
                  Build recipe book
                </Button>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Previous Collections
            </div>
            {sortedCollections.length === 0 ? (
              <div className="rounded-lg border border-dashed px-3 py-4 text-center text-xs text-muted-foreground">
                No collections yet. Create one to save curated menus.
              </div>
            ) : (
              <div className="space-y-2">
                {sortedCollections.map((collection) => {
                  const isActive = activeCollectionId === collection.id;
                  const recipeCount = collection.recipeIds.length;
                  return (
                    <div
                      key={collection.id}
                      className={cn(
                        "rounded-lg border px-3 py-2 transition-colors",
                        isActive
                          ? "border-primary bg-primary/5 dark:bg-primary/15"
                          : "border-border/60 bg-background/80 dark:bg-zinc-950/70",
                      )}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium">
                            {collection.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {collection.season} • {collection.year} • v{collection.version} • {recipeCount} recipe
                            {recipeCount === 1 ? "" : "s"}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const params = new URLSearchParams(window.location.search);
                              params.set("tab", "server-notes");
                              params.set("collection", collection.id);
                              window.location.href = `/?${params.toString()}`;
                            }}
                            title="Build package"
                          >
                            <Package className="mr-1 h-4 w-4" />
                            Build
                          </Button>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEditCollection(collection)}
                            title="Edit collection"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => setCollectionToDelete(collection)}
                            title="Delete collection"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div
          className={cn(
            "rounded-xl border bg-background/85 p-4 shadow-sm transition-colors dark:bg-zinc-900/70 lg:col-span-2",
            bookDropActive &&
              "border-primary/60 bg-primary/10 shadow-[0_0_0_1px_rgba(56,189,248,0.35)]",
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setBookDropActive(true);
          }}
          onDragLeave={() => setBookDropActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setBookDropActive(false);
            const file = e.dataTransfer.files?.[0];
            if (file) {
              void importBookPdf(file);
            }
          }}
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Library (Book PDF) Import
            </div>
            <div className="text-xs text-muted-foreground">
              {bookPhase ? (
                <div className="flex items-center gap-2">
                  <span>
                    {bookPhase === "reading"
                      ? "Reading file"
                      : bookPhase === "selecting"
                        ? "Selecting recipes"
                        : bookPhase === "categorizing"
                          ? "Categorizing recipes"
                          : bookPhase === "importing"
                            ? "Importing"
                            : "Done"}
                  </span>
                  {bookPhase === "reading" && (
                    <span>
                      {bookPage}/{bookTotal}
                    </span>
                  )}
                </div>
              ) : (
                <>Imported: {recipes.length}</>
              )}
            </div>
          </div>
          <input
            type="file"
            accept="application/pdf"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              if (
                !confirm(
                  "Confirm you own/purchased this cookbook PDF for personal import?",
                )
              ) {
                (e.target as HTMLInputElement).value = "";
                return;
              }
              try {
                setBookFile(f.name);
                setBookPhase("reading");
                setStatus("Reading book PDF...");
                const ab = await f.arrayBuffer();
                pdfPendingRef.current = f;
                const pdfjs: any = await import(
                  "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.mjs"
                );
                const workerSrc =
                  "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.worker.mjs";
                if (pdfjs.GlobalWorkerOptions)
                  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
                const doc = await pdfjs.getDocument({ data: ab }).promise;
                setBookTotal(doc.numPages);
                // live scan popups
                setScanOpen(true);
                setDetectedOpen(true);
                setDetected([]);
                setScanPageNo(0);
                setScanTotal(doc.numPages);
                let lines: string[] = [];
                const isLikelyIngredientList = (txt: string) => {
                  const ls = txt
                    .split(/\n/)
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .slice(0, 80);
                  const qty =
                    /^(?:\d+(?:\s+\d\/\d)?|\d+\/\d|\d+(?:\.\d+)?|[¼½¾⅓⅔⅛⅜⅝⅞])(?:\s*[a-zA-Z]+)?\b/;
                  let c = 0;
                  for (const L of ls) {
                    if (qty.test(L) || /^[•\-*]\s+/.test(L)) c++;
                  }
                  return c >= 3;
                };
                const normalizeLineA = (s: string) => {
                  let t = s.replace(/\s+/g, " ").trim();
                  if (
                    /^([A-Z]\s+){2,}[A-Z](?:\s+\d+)?[\s:]*$/.test(t) &&
                    t.length <= 60
                  ) {
                    t = t.replace(/\s+/g, "");
                  }
                  return t;
                };
                const pageTexts: string[] = [];
                const candidates: number[] = [];
                for (let p = 1; p <= doc.numPages; p++) {
                  const page = await doc.getPage(p);
                  const tc = await page.getTextContent();
                  const pageLines = (tc.items as any[])
                    .map((i: any) => String(i.str))
                    .filter(Boolean);
                  lines.push(...pageLines);
                  lines.push("");
                  const t = pageLines.join("\n");
                  pageTexts.push(t);
                  setBookPage(p);
                  setScanPageNo(p);
                  const hasIng =
                    /\bingredients?\b/i.test(t) || isLikelyIngredientList(t);
                  if (hasIng) {
                    candidates.push(p);
                    let guess = "";
                    const top = pageLines
                      .map(normalizeLineA)
                      .filter(Boolean)
                      .slice(0, 10);
                    for (const L of top) {
                      if (
                        /^[A-Z][A-Za-z0-9\-\'\s]{2,80}$/.test(L) ||
                        /^([A-Z]\s+){2,}[A-Z][\s:]*$/.test(L)
                      ) {
                        guess = L.replace(/\s+/g, " ").trim();
                        break;
                      }
                    }
                    if (
                      /^see\b/i.test(guess) ||
                      /(flexipan|inch|inches|cm|diameter)\b/i.test(guess)
                    )
                      guess = "";
                    setDetected((d) => [
                      ...d,
                      { page: p, title: guess || `Candidate p.${p}` },
                    ]);
                  }
                }
                // update knowledge store
                try {
                  const keepTop = (obj: Record<string, number>, n: number) =>
                    Object.fromEntries(
                      Object.entries(obj)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, n),
                    );
                  const words: Record<string, number> = {},
                    bigrams: Record<string, number> = {};
                  const textAll = pageTexts
                    .join("\n")
                    .toLowerCase()
                    .replace(/[^a-z\s]/g, " ");
                  const arr = textAll
                    .split(/\s+/)
                    .filter((w) => w.length >= 3 && w.length <= 24);
                  for (let i = 0; i < arr.length; i++) {
                    const w = arr[i];
                    words[w] = (words[w] || 0) + 1;
                    if (i < arr.length - 1) {
                      const g = `${arr[i]} ${arr[i + 1]}`;
                      if (g.length >= 5 && g.length <= 40)
                        bigrams[g] = (bigrams[g] || 0) + 1;
                    }
                  }
                  const raw = localStorage.getItem("kb:cook") || "{}";
                  const kb = JSON.parse(raw || "{}");
                  kb.terms = keepTop({ ...kb.terms, ...words }, 400);
                  kb.bigrams = keepTop({ ...kb.bigrams, ...bigrams }, 600);
                  kb.books = Array.from(
                    new Set([
                      ...(kb.books || []),
                      f.name.replace(/\.[^.]+$/, ""),
                    ]),
                  );
                  localStorage.setItem("kb:cook", JSON.stringify(kb));
                } catch {}
                setScanOpen(false);
                setBookPhase("selecting");
                setScanPageTexts(pageTexts);
                setScanCandidates(candidates);
                setScanBookName(f.name.replace(/\.[^.]+$/, ""));
                if (candidates.length >= 5) {
                  setStatus(
                    `Detected ${candidates.length} recipe candidates. Click "Import detected" to add them.`,
                  );
                  return;
                }
                const normLine = (s: string) => {
                  let t = s.replace(/\s+/g, " ").trim();
                  if (
                    /^([A-Z]\s+){2,}[A-Z](?:\s+\d+)?[\s:]*$/.test(t) &&
                    t.length <= 60
                  ) {
                    t = t.replace(/\s+/g, "");
                  }
                  return t;
                };
                const norm = lines.map(normLine);
                let tocEntries = norm
                  .map((s) => {
                    const tests = [
                      /^(.{3,120}?)(?:[\.·•\s]{2,})(\d{1,4})$/, // dot leaders or many spaces then page
                      /^(.{3,120}?)\s{3,}(\d{1,4})$/, // right-aligned page with spaces
                      /^(.{3,120}?)\s+[-–—]\s*(\d{1,4})$/, // dash then page
                    ];
                    let m: RegExpMatchArray | null = null;
                    for (const re of tests) {
                      m = s.match(re);
                      if (m) break;
                    }
                    if (!m) return null;
                    const title = m[1].trim();
                    const page = parseInt(m[2], 10);
                    const bad =
                      /^(?:contents|index|appendix|recipes?|chapter|table of contents|fig(?:\.|ures?)?(?:\s*\d+)?|plates?(?:\s*\d+)?|illustrations?(?:\s*\d+)?|photos?(?:\s*\d+)?|tables?(?:\s*\d+)?|maps?(?:\s*\d+)?|yield\b|to convert\b|see\b)/i;
                    if (!title || bad.test(title)) return null;
                    if (/(flexipan|inch|inches|cm|diameter)\b/i.test(title))
                      return null;
                    return { title, page };
                  })
                  .filter(Boolean) as { title: string; page: number }[];
                // de-duplicate by page number
                const seen: Record<number, boolean> = {};
                tocEntries = tocEntries.filter(
                  (e) => !seen[e.page] && (seen[e.page] = true),
                );
                if (tocEntries.length >= 5) {
                  setToc(tocEntries);
                  const checked: Record<string, boolean> = {};
                  tocEntries.forEach((x) => (checked[x.title] = true));
                  setTocChecked(checked);
                  setTocOpen(true);
                  setStatus("Select recipes to import");
                  return;
                }
                const items: any[] = [];
                let i = 0;
                const book = f.name.replace(/\.[^.]+$/, "");
                const isTitle = (s: string) =>
                  s &&
                  s.length < 70 &&
                  /[A-Za-z]/.test(s) &&
                  (s === s.toUpperCase() || /^[A-Z][^.!?]{2,}$/.test(s));
                while (i < norm.length) {
                  while (i < norm.length && !/ingredients?/i.test(norm[i])) i++;
                  if (i >= norm.length) break;
                  let tIdx = Math.max(0, i - 5);
                  let title = "";
                  for (let k = i - 1; k >= tIdx; k--) {
                    if (isTitle(norm[k])) {
                      title = norm[k];
                      break;
                    }
                  }
                  const ings: string[] = [];
                  i++;
                  while (i < norm.length && !/ingredients?/i.test(norm[i])) {
                    const s = norm[i];
                    if (/^(instructions|directions|method)/i.test(s)) break;
                    if (s) ings.push(s);
                    i++;
                  }
                  let ins: string[] = [];
                  while (i < norm.length && !/ingredients?/i.test(norm[i])) {
                    const s = norm[i];
                    if (s) ins.push(s);
                    i++;
                  }
                  if (title && (ings.length || ins.length))
                    items.push({
                      title,
                      ingredients: ings,
                      instructions: ins,
                      tags: [book],
                      extra: { book, source: "pdf-auto" },
                    });
                }
                setBookPhase("importing");
                if (items.length) {
                  const blob = new Blob([JSON.stringify(items)], {
                    type: "application/json",
                  });
                  const file = new File([blob], `${book}.json`, {
                    type: "application/json",
                  });
                  const { added } = await addRecipesFromJsonFiles([file]);
                  setBookImported(added);
                  setStatus(`Imported ${added} recipes from book.`);
                  setBookPhase("done");
                } else {
                  setStatus("Could not detect recipes in PDF");
                  setBookPhase(null);
                }
              } catch (e: any) {
                setStatus(`Failed: ${e?.message || "error"}`);
                setBookPhase(null);
              } finally {
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <div className="mt-1">
            <label className="text-xs flex items-center gap-1">
              <input
                type="checkbox"
                className="scale-75"
                defaultChecked={
                  typeof localStorage !== "undefined" &&
                  localStorage.getItem("pdf:ocr") === "1"
                }
                onChange={(e) => {
                  try {
                    localStorage.setItem(
                      "pdf:ocr",
                      e.target.checked ? "1" : "0",
                    );
                  } catch {}
                }}
              />{" "}
              OCR fallback for scanned PDFs
            </label>
          </div>
          {(bookPhase || total > 0) && (
            <div className="mt-2 space-y-1">
              {bookPhase && (
                <>
                  <div className="text-xs text-muted-foreground">
                    {bookFile || ""}
                  </div>
                  {bookPhase === "reading" && (
                    <div className="h-2 w-full rounded bg-muted">
                      <div
                        className="h-2 rounded bg-primary transition-all"
                        style={{
                          width: `${Math.round((bookPage / Math.max(bookTotal, 1)) * 100)}%`,
                        }}
                      />
                    </div>
                  )}
                </>
              )}
              {total > 0 && (
                <>
                  <div className="text-xs text-muted-foreground">
                    {processed} / {total} files processed
                  </div>
                  <div className="h-2 w-full rounded bg-muted">
                    <div
                      className="h-2 rounded bg-primary transition-all"
                      style={{
                        width: `${Math.round((processed / Math.max(total, 1)) * 100)}%`,
                      }}
                    />
                  </div>
                </>
              )}
              {importedTitles.length > 0 && (
                <div className="max-h-32 overflow-auto rounded border p-2 text-xs">
                  <div className="font-medium mb-1">Imported:</div>
                  <ul className="space-y-1 list-disc pl-4">
                    {importedTitles.map((t, i) => (
                      <li key={i} className="truncate" title={t}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          <div className="mt-3 space-y-2 text-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Import from the web
            </div>
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 lg:flex-1">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("recipeSearch.searchWeb")}
                  className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="sm:self-stretch"
                  onClick={() => {
                    const q = encodeURIComponent(query);
                    window.open(
                      `https://www.google.com/search?q=${q}+recipe`,
                      "_blank",
                    );
                  }}
                >
                  Search
                </Button>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 lg:flex-1">
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={t("recipeSearch.pasteUrl")}
                  className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <Button
                  size="sm"
                  className="sm:self-stretch"
                  onClick={async () => {
                    try {
                      setLoadingUrl(true);
                      setStatus("Fetching recipe...");
                      const r = await fetch("/api/recipe/import", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ url }),
                      });
                      if (!r.ok)
                        throw new Error(
                          (await r.json().catch(() => ({})))?.error || "Failed",
                        );
                      const data = await r.json();
                      let imageName: string | undefined;
                      const imgUrl =
                        typeof data.image === "string"
                          ? data.image
                          : data.image?.url || data.image?.contentUrl || "";
                      if (imgUrl) {
                        try {
                          const imgRes = await fetch(
                            `/api/recipe/image?url=${encodeURIComponent(String(imgUrl))}`,
                          );
                          if (!imgRes.ok) throw new Error("image fetch");
                          const blob = await imgRes.blob();
                          imageName = (
                            String(imgUrl).split("?")[0].split("/").pop() ||
                            `${Date.now()}.jpg`
                          ).replace(/[^A-Za-z0-9_.-]/g, "_");
                          await addImages(
                            [
                              new File([blob], imageName, {
                                type: blob.type || "image/jpeg",
                              }),
                            ],
                            { tags: ["web"] },
                          );
                        } catch {}
                      }
                      const sample = [
                        {
                          title: data.title,
                          image: imageName || undefined,
                          ingredients: data.ingredients,
                          instructions: Array.isArray(data.instructions)
                            ? data.instructions
                            : String(data.instructions || "")
                                .split(/\r?\n/)
                                .filter(Boolean),
                          tags: [],
                        },
                      ];
                      const file = new File(
                        [
                          new Blob([JSON.stringify(sample)], {
                            type: "application/json",
                          }),
                        ],
                        "web.json",
                        { type: "application/json" },
                      );
                      const { added } = await addRecipesFromJsonFiles([file]);
                      setStatus(`Imported ${added} recipe(s) from web.`);
                    } catch (e: any) {
                      setStatus(`Failed: ${e?.message || "error"}`);
                    } finally {
                      setLoadingUrl(false);
                    }
                  }}
                  disabled={loadingUrl || !url}
                >
                  {loadingUrl ? "Importing..." : "Import"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {status && <div className="rounded-md border p-3 text-sm">{status}</div>}
      <AlertDialog
        open={!!collectionToDelete}
        onOpenChange={(open) => {
          if (!open) setCollectionToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete collection?</AlertDialogTitle>
            <AlertDialogDescription>
              {collectionToDelete
                ? `"${collectionToDelete.name}" will be removed permanently.`
                : "This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCollectionToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeleteCollection}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={tocOpen} onOpenChange={setTocOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Select recipes to import</DialogTitle>
          </DialogHeader>
          <div className="max-h-[50vh] overflow-auto hide-scrollbar border rounded p-2 text-sm space-y-1">
            {(toc || []).map((t) => (
              <label
                key={`${t.page}-${t.title}`}
                className="grid grid-cols-[16px_1fr_42px] items-center gap-2 text-xs"
              >
                <input
                  type="checkbox"
                  className="scale-75"
                  checked={!!tocChecked[t.title]}
                  onChange={() =>
                    setTocChecked((m) => ({ ...m, [t.title]: !m[t.title] }))
                  }
                />
                <span className="truncate" title={`${t.title} — p.${t.page}`}>
                  {t.title}
                </span>
                <span className="text-muted-foreground text-right">
                  p.{t.page}
                </span>
              </label>
            ))}
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  const all: Record<string, boolean> = {};
                  (toc || []).forEach((t) => (all[t.title] = true));
                  setTocChecked(all);
                }}
              >
                Select all
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  const none: Record<string, boolean> = {};
                  (toc || []).forEach((t) => (none[t.title] = false));
                  setTocChecked(none);
                }}
              >
                Unselect all
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setTocOpen(false);
                  setToc(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  try {
                    setTocOpen(false);
                    const f = pdfPendingRef.current;
                    if (!f) return;
                    setScanOpen(true);
                    setDetectedOpen(true);
                    setDetected([]);
                    setScanPageNo(0);
                    setStatus("Scanning book...");
                    const ab = await f.arrayBuffer();
                    const pdfjs: any = await import(
                      "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.mjs"
                    );
                    const workerSrc =
                      "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.worker.mjs";
                    if (pdfjs.GlobalWorkerOptions)
                      pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
                    const doc = await pdfjs.getDocument({ data: ab }).promise;
                    setScanTotal(doc.numPages);
                    const pageTexts: string[] = [];
                    const normLine = (s: string) => {
                      let t = s.replace(/\s+/g, " ").trim();
                      if (
                        /^([A-Z]\s+){2,}[A-Z](?:\s+\d+)?[\s:]*$/.test(t) &&
                        t.length <= 60
                      ) {
                        t = t.replace(/\s+/g, "");
                      }
                      return t;
                    };
                    const isLikelyIngredientList = (txt: string) => {
                      const ls = txt
                        .split(/\n/)
                        .map((s) => s.trim())
                        .filter(Boolean)
                        .slice(0, 80);
                      const qty =
                        /^(?:\d+(?:\s+\d\/\d)?|\d+\/\d|\d+(?:\.\d+)?|[¼½¾⅓⅔⅛⅜⅝��])(?:\s*[a-zA-Z]+)?\b/;
                      let c = 0;
                      for (const L of ls) {
                        if (qty.test(L) || /^[•\-*]\s+/.test(L)) c++;
                      }
                      return c >= 3;
                    };
                    const candidates: number[] = [];
                    for (let p = 1; p <= doc.numPages; p++) {
                      const page = await doc.getPage(p);
                      const tc = await page.getTextContent();
                      const t = (tc.items as any[])
                        .map((i) => String(i.str))
                        .join("\n");
                      pageTexts.push(t);
                      setScanPageNo(p);
                      const hasIng =
                        /\bingredients?\b/i.test(t) ||
                        isLikelyIngredientList(t);
                      if (hasIng) {
                        candidates.push(p);
                        const lines = t
                          .split(/\n/)
                          .map(normLine)
                          .filter(Boolean);
                        let guess = "";
                        for (let k = 0; k < Math.min(lines.length, 10); k++) {
                          const L = lines[k];
                          if (
                            /^[A-Z][A-Za-z0-9\-\'\s]{2,80}$/.test(L) ||
                            /^([A-Z]\s+){2,}[A-Z][\s:]*$/.test(L)
                          ) {
                            guess = L.replace(/\s+/g, " ").trim();
                            break;
                          }
                        }
                        setDetected((d) => [
                          ...d,
                          { page: p, title: guess || `Candidate p.${p}` },
                        ]);
                      }
                    }
                    // Learn cookbook terminology
                    try {
                      const keepTop = (
                        obj: Record<string, number>,
                        n: number,
                      ) =>
                        Object.fromEntries(
                          Object.entries(obj)
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, n),
                        );
                      const words: Record<string, number> = {},
                        bigrams: Record<string, number> = {};
                      const textAll = pageTexts
                        .join("\n")
                        .toLowerCase()
                        .replace(/[^a-z\s]/g, " ");
                      const arr = textAll
                        .split(/\s+/)
                        .filter((w) => w.length >= 3 && w.length <= 24);
                      for (let i = 0; i < arr.length; i++) {
                        const w = arr[i];
                        words[w] = (words[w] || 0) + 1;
                        if (i < arr.length - 1) {
                          const g = `${arr[i]} ${arr[i + 1]}`;
                          if (g.length >= 5 && g.length <= 40)
                            bigrams[g] = (bigrams[g] || 0) + 1;
                        }
                      }
                      const raw = localStorage.getItem("kb:cook") || "{}";
                      const kb = JSON.parse(raw);
                      kb.terms = keepTop({ ...kb.terms, ...words }, 400);
                      kb.bigrams = keepTop({ ...kb.bigrams, ...bigrams }, 600);
                      kb.books = Array.from(
                        new Set([
                          ...(kb.books || []),
                          f.name.replace(/\.[^.]+$/, ""),
                        ]),
                      );
                      localStorage.setItem("kb:cook", JSON.stringify(kb));
                    } catch {}
                    const starts = candidates.sort((a, b) => a - b);
                    const items: any[] = [];
                    for (let i = 0; i < starts.length; i++) {
                      const s = starts[i];
                      const e =
                        i + 1 < starts.length
                          ? starts[i + 1] - 1
                          : pageTexts.length;
                      const textRaw = pageTexts.slice(s - 1, e).join("\n");
                      const text = textRaw.split(/\n/).map(normLine).join("\n");
                      const lines = text
                        .split(/\n/)
                        .map(normLine)
                        .filter(Boolean);
                      const lower = lines.map((l) => l.toLowerCase());
                      const find = (labels: string[]) =>
                        lower.findIndex((l) =>
                          labels.some((x) => l.startsWith(x)),
                        );
                      let ingIdx = find(["ingredients", "ingredient"]);
                      let instIdx = find([
                        "instructions",
                        "directions",
                        "method",
                        "steps",
                        "preparation",
                        "procedure",
                      ]);
                      if (ingIdx < 0) {
                        const qty =
                          /^(?:\d+(?:\s+\d\/\d)?|\d+\/\d|\d+(?:\.\d+)?|[¼½¾⅓⅔⅛⅜⅝⅞])(?:\s*[a-zA-Z]+)?\b/;
                        for (let j = 0; j < Math.min(lines.length, 80); j++) {
                          if (
                            qty.test(lines[j]) ||
                            /^[•\-*]\s+/.test(lines[j])
                          ) {
                            ingIdx = j - 1;
                            break;
                          }
                        }
                      }
                      if (instIdx < 0 && ingIdx >= 0) {
                        for (
                          let j = ingIdx + 1;
                          j < Math.min(lines.length, 200);
                          j++
                        ) {
                          if (
                            /^(instructions|directions|method|steps|preparation|procedure)\b/i.test(
                              lines[j],
                            ) ||
                            /^\d+\.|^Step\s*\d+/i.test(lines[j])
                          ) {
                            instIdx = j;
                            break;
                          }
                        }
                      }
                      const getRange = (a: number, b: number) =>
                        lines
                          .slice(a + 1, b > a ? b : undefined)
                          .filter(Boolean);
                      const ings =
                        ingIdx >= 0
                          ? getRange(
                              ingIdx,
                              instIdx >= 0 ? instIdx : lines.length,
                            )
                          : [];
                      const ins =
                        instIdx >= 0 ? getRange(instIdx, lines.length) : [];
                      if (ings.length >= 2 || ins.length >= 3) {
                        let title = "";
                        for (
                          let k = Math.max(0, ingIdx - 6);
                          k < Math.min(lines.length, Math.max(ingIdx, 8));
                          k++
                        ) {
                          const L = lines[k] || "";
                          if (
                            /^[A-Z][A-Za-z0-9\-\'\s]{2,80}$/.test(L) ||
                            /^([A-Z]\s+){2,}[A-Z][\s:]*$/.test(L)
                          ) {
                            title = L.replace(/\s+/g, " ").trim();
                            break;
                          }
                        }
                        if (!title)
                          title =
                            lines[0] ||
                            `${f.name.replace(/\.[^.]+$/, "")} p.${s}`;
                        items.push({
                          title,
                          ingredients: ings,
                          instructions: ins,
                          tags: [f.name.replace(/\.[^.]+$/, "")],
                        });
                      }
                    }
                    if (items.length) {
                      const blob = new Blob([JSON.stringify(items)], {
                        type: "application/json",
                      });
                      const jf = new File(
                        [blob],
                        `${f.name.replace(/\.[^.]+$/, "")}.json`,
                        { type: "application/json" },
                      );
                      const { added } = await addRecipesFromJsonFiles([jf]);
                      setStatus(`Imported ${added} recipes from book.`);
                    } else {
                      setStatus("No recipes detected.");
                    }
                  } catch (e: any) {
                    setStatus(`Failed: ${e?.message || "error"}`);
                  } finally {
                    setScanOpen(false);
                    setDetectedOpen(false);
                    setToc(null);
                    setTocChecked({});
                    pdfPendingRef.current = null;
                  }
                }}
              >
                Import all (auto)
              </Button>
              <Button
                onClick={async () => {
                  try {
                    setTocOpen(false);
                    setBookPhase("importing");
                    const selected = Object.keys(tocChecked).filter(
                      (k) => tocChecked[k],
                    );
                    localStorage.setItem(
                      "pdf:index:allow",
                      JSON.stringify(selected),
                    );
                    if (pdfPendingRef.current) {
                      const { added } = await addRecipesFromPdfFiles([
                        pdfPendingRef.current,
                      ]);
                      setStatus(`Imported ${added} recipe(s) from book.`);
                      setBookPhase("done");
                    }
                  } catch (e: any) {
                    setStatus(`Failed: ${e?.message || "error"}`);
                    setBookPhase(null);
                  } finally {
                    setToc(null);
                    setTocChecked({});
                    pdfPendingRef.current = null;
                  }
                }}
              >
                Accept
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Live scanning progress */}
      <Dialog open={scanOpen} onOpenChange={setScanOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Scanning book…</DialogTitle>
          </DialogHeader>
          <div className="text-xs text-muted-foreground">
            Page {Math.min(scanPageNo, scanTotal)} / {scanTotal}
          </div>
          <div className="h-2 w-full rounded bg-muted">
            <div
              className="h-2 rounded bg-primary transition-all"
              style={{
                width: `${Math.round((scanPageNo / Math.max(scanTotal, 1)) * 100)}%`,
              }}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Detected recipes list */}
      <Dialog open={detectedOpen} onOpenChange={setDetectedOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detected recipes</DialogTitle>
          </DialogHeader>
          <div className="max-h-[50vh] overflow-auto border rounded p-2 text-sm space-y-1">
            {detected.length === 0 ? (
              <div className="text-xs text-muted-foreground">Scanning…</div>
            ) : (
              detected.map((d) => (
                <div
                  key={`${d.page}-${d.title}`}
                  className="flex items-center justify-between gap-2 text-xs"
                >
                  <span className="truncate" title={d.title}>
                    {d.title || `Candidate p.${d.page}`}
                  </span>
                  <span className="text-muted-foreground">p.{d.page}</span>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              size="sm"
              variant="default"
              disabled={!scanPageTexts || !detected.length}
              onClick={async () => {
                try {
                  const pageTexts = scanPageTexts!;
                  const starts = detected
                    .map((d) => d.page)
                    .sort((a, b) => a - b);
                  const normLine = (s: string) => {
                    let t = s.replace(/\s+/g, " ").trim();
                    if (
                      /^([A-Z]\s+){2,}[A-Z](?:\s+\d+)?[\s:]*$/.test(t) &&
                      t.length <= 60
                    ) {
                      t = t.replace(/\s+/g, "");
                    }
                    return t;
                  };
                  const items: any[] = [];
                  const book = scanBookName || "Book";
                  for (let i = 0; i < starts.length; i++) {
                    const s = starts[i];
                    const e =
                      i + 1 < starts.length
                        ? starts[i + 1] - 1
                        : pageTexts.length;
                    const textRaw = pageTexts.slice(s - 1, e).join("\n");
                    const text = textRaw.split(/\n/).map(normLine).join("\n");
                    const lines = text
                      .split(/\n/)
                      .map(normLine)
                      .filter(Boolean);
                    const lower = lines.map((l) => l.toLowerCase());
                    const find = (labels: string[]) =>
                      lower.findIndex((l) =>
                        labels.some((x) => l.startsWith(x)),
                      );
                    let ingIdx = find(["ingredients", "ingredient"]);
                    let instIdx = find([
                      "instructions",
                      "directions",
                      "method",
                      "steps",
                      "preparation",
                      "procedure",
                    ]);
                    if (ingIdx < 0) {
                      const qty =
                        /^(?:\d+(?:\s+\d\/\d)?|\d+\/\d|\d+(?:\.\d+)?|[¼½¾⅓⅔⅛⅜⅝⅞])(?:\s*[a-zA-Z]+)?\b/;
                      for (let j = 0; j < Math.min(lines.length, 80); j++) {
                        if (qty.test(lines[j]) || /^[•\-*]\s+/.test(lines[j])) {
                          ingIdx = j - 1;
                          break;
                        }
                      }
                    }
                    if (instIdx < 0 && ingIdx >= 0) {
                      for (
                        let j = ingIdx + 1;
                        j < Math.min(lines.length, 200);
                        j++
                      ) {
                        if (
                          /^(instructions|directions|method|steps|preparation|procedure)\b/i.test(
                            lines[j],
                          ) ||
                          /^\d+\.|^Step\s*\d+/i.test(lines[j])
                        ) {
                          instIdx = j;
                          break;
                        }
                      }
                    }
                    const getRange = (a: number, b: number) =>
                      lines.slice(a + 1, b > a ? b : undefined).filter(Boolean);
                    const ings =
                      ingIdx >= 0
                        ? getRange(
                            ingIdx,
                            instIdx >= 0 ? instIdx : lines.length,
                          )
                        : [];
                    const ins =
                      instIdx >= 0 ? getRange(instIdx, lines.length) : [];
                    if (ings.length >= 2 || ins.length >= 3) {
                      let title = "";
                      for (
                        let k = Math.max(0, ingIdx - 6);
                        k < Math.min(lines.length, Math.max(ingIdx, 8));
                        k++
                      ) {
                        const L = lines[k] || "";
                        if (
                          /^[A-Z][A-Za-z0-9\-\'\s]{2,80}$/.test(L) ||
                          /^([A-Z]\s+){2,}[A-Z][\s:]*$/.test(L)
                        ) {
                          title = L.replace(/\s+/g, " ").trim();
                          break;
                        }
                      }
                      if (!title) title = lines[0] || `${book} p.${s}`;
                      items.push({
                        title,
                        ingredients: ings,
                        instructions: ins,
                        tags: [book],
                      });
                    }
                  }
                  if (items.length) {
                    // add book metadata and de-duplicate by title within this batch
                    const bookName = scanBookName || "book";
                    const seen: Record<string, boolean> = {};
                    const withMeta = items
                      .filter((it) => {
                        const k = (it.title || "").toLowerCase();
                        if (seen[k]) return false;
                        seen[k] = true;
                        return true;
                      })
                      .map((it) => ({
                        ...it,
                        extra: {
                          ...(it.extra || {}),
                          book: bookName,
                          source: "pdf-detected",
                        },
                      }));
                    const blob = new Blob([JSON.stringify(withMeta)], {
                      type: "application/json",
                    });
                    const jf = new File([blob], `${bookName}.json`, {
                      type: "application/json",
                    });
                    const { added } = await addRecipesFromJsonFiles([jf]);
                    setStatus(`Imported ${added} recipes from detected list.`);
                  }
                } catch (e: any) {
                  setStatus(`Failed: ${e?.message || "error"}`);
                } finally {
                  setDetectedOpen(false);
                  setDetected([]);
                  setScanPageTexts(null);
                }
              }}
            >
              Import detected
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {errors.length > 0 && (
        <div className="rounded-md border p-3 text-sm">
          <div className="font-medium mb-2">Errors</div>
          <ul className="space-y-1 list-disc pl-5">
            {errors.map((e, i) => (
              <li key={i}>
                <span className="font-mono">{e.file}</span>: {e.error}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        data-echo-key="section:recipes:filters"
      >
        <div className="flex-1 relative" data-echo-key="field:recipes:query">
          <input
            ref={searchInputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={t("recipeSearch.searchByName")}
            className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
            >
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setQ(suggestion);
                    setShowSuggestions(false);
                    searchInputRef.current?.focus();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-muted transition-colors text-sm"
                >
                  <Search className="inline h-3 w-3 mr-2 opacity-50" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
        <select
          value={fcuisine}
          onChange={(e) => setFCuisine(e.target.value)}
          className="rounded-md border bg-background px-2 py-2 text-sm max-w-[220px]"
          data-echo-key="filter:recipes:cuisine"
        >
          <option value="">Cuisine</option>
          {axisOptions("cuisines").map((o) => (
            <option key={o.slug} value={o.slug}>
              {o.label}
            </option>
          ))}
        </select>
        <select
          value={fcourse}
          onChange={(e) => setFCourse(e.target.value)}
          className="rounded-md border bg-background px-2 py-2 text-sm max-w-[220px]"
          data-echo-key="filter:recipes:course"
        >
          <option value="">Course</option>
          {axisOptions("course").map((o) => (
            <option key={o.slug} value={o.slug}>
              {o.label}
            </option>
          ))}
        </select>
        <select
          value={fdiet}
          onChange={(e) => setFDiet(e.target.value)}
          className="rounded-md border bg-background px-2 py-2 text-sm max-w-[220px]"
          data-echo-key="filter:recipes:dietary"
        >
          <option value="">Dietary</option>
          {axisOptions("diets").map((o) => (
            <option key={o.slug} value={o.slug}>
              {o.label}
            </option>
          ))}
        </select>
        <div className="text-sm text-muted-foreground whitespace-nowrap">
          {results.length} / {recipes.length} recipes
        </div>
      </div>

      {recipes.length === 0 ? (
        <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">
          No recipes yet. Drop files above or import from URL.
        </div>
      ) : mode === "cards" ? (
        <div
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
          data-echo-key="section:recipes:results"
        >
          {results.map((r) => (
            <RecipeCard
              key={r.id}
              r={r}
              inTrash={inTrashView}
              onPreview={() => setPreview(r)}
              onFav={() => toggleFavorite(r.id)}
              onRate={(n) => rateRecipe(r.id, n)}
              onUpdateTags={(tags) => updateRecipeTags(r.id, tags)}
              onTrash={() =>
                r.deletedAt ? restoreRecipe(r.id) : deleteRecipe(r.id)
              }
              onDestroy={() => {
                if (confirm("Delete this recipe forever?")) destroyRecipe(r.id);
              }}
              selectMode={isCollectionSelectionEnabled}
              selected={selectedRecipeIds.includes(r.id)}
              onToggleSelect={() => toggleRecipeSelection(r.id)}
            />
          ))}
        </div>
      ) : mode === "grid4" ? (
        <div
          className="grid gap-3 grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
          data-echo-key="section:recipes:results"
        >
          {results.filter(Boolean).map((r) => {
            const key = r.id || Math.random().toString(36).slice(2);
            const selected = selectedRecipeIds.includes(r.id);
            return (
              <div
                key={key}
                className={cn(
                  "flex items-start gap-2 rounded border p-3 glow transition-colors",
                  isCollectionSelectionEnabled && selected
                    ? "border-primary bg-primary/5 dark:bg-primary/15"
                    : undefined,
                )}
                data-echo-key="card:recipes:result"
              >
                <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded bg-muted">
                  {r.imageDataUrls?.[0] ? (
                    <img
                      src={r.imageDataUrls[0]}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                  {isCollectionSelectionEnabled && (
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleRecipeSelection(r.id)}
                      className={cn(
                        "absolute left-1.5 top-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold shadow focus-visible:outline-none focus-visible:ring",
                        selected
                          ? "bg-primary text-primary-foreground"
                          : "bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground",
                      )}
                    >
                      {selected ? t("recipeSearch.selected") : t("recipeSearch.select")}
                    </button>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="line-clamp-2 text-sm font-medium" title={r.title}>
                    {r.title}
                  </div>
                  <div className="line-clamp-1 text-xs text-muted-foreground">
                    {r.tags?.join(" �� ")}
                  </div>
                  <div className="mt-1 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setPreview(r)}
                    >
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      data-echo-key="cta:recipes:open"
                    >
                      <a href={`/recipe/${r.id}/view`}>
                        <ExternalLink className="mr-1" />
                        Open
                      </a>
                    </Button>
                    {inTrashView ? (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => restoreRecipe(r.id)}
                          title={t("recipeSearch.restore")}
                        >
                          <RotateCcw />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm("Delete forever?")) destroyRecipe(r.id);
                          }}
                          title={t("recipeSearch.deleteForever")}
                        >
                          <Trash2 />
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteRecipe(r.id)}
                        title="Move to trash"
                      >
                        <Trash2 />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="divide-y rounded-lg border glow"
          data-echo-key="section:recipes:results"
        >
          {results.filter(Boolean).map((r) => {
            const key = r.id || Math.random().toString(36).slice(2);
            const selected = selectedRecipeIds.includes(r.id);
            return (
              <div
                key={key}
                className={cn(
                  "flex items-start gap-3 p-3 transition-colors",
                  isCollectionSelectionEnabled && selected
                    ? "bg-primary/5 dark:bg-primary/15"
                    : undefined,
                )}
                data-echo-key="card:recipes:result"
              >
                <div className="relative h-16 w-20 overflow-hidden rounded bg-muted">
                  {r.imageDataUrls?.[0] ? (
                    <img
                      src={r.imageDataUrls[0]}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                  {isCollectionSelectionEnabled && (
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleRecipeSelection(r.id)}
                      className={cn(
                        "absolute left-1.5 top-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold shadow focus-visible:outline-none focus-visible:ring",
                        selected
                          ? "bg-primary text-primary-foreground"
                          : "bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground",
                      )}
                    >
                      {selected ? t("recipeSearch.selected") : t("recipeSearch.select")}
                    </button>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="line-clamp-1 font-medium">{r.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {r.createdAt
                        ? new Date(r.createdAt).toLocaleDateString()
                        : "-"}
                    </div>
                  </div>
                  <div className="line-clamp-1 text-xs text-muted-foreground">
                    {r.tags?.join(" · ")}
                  </div>
                  <div className="mt-1 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setPreview(r)}
                    >
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      data-echo-key="cta:recipes:open"
                    >
                      <a href={`/recipe/${r.id}/view`}>
                        <ExternalLink className="mr-1" />
                        Open
                      </a>
                    </Button>
                    {inTrashView ? (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => restoreRecipe(r.id)}
                          title={t("recipeSearch.restore")}
                        >
                          <RotateCcw />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm("Delete forever?")) destroyRecipe(r.id);
                          }}
                          title={t("recipeSearch.deleteForever")}
                        >
                          <Trash2 />
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteRecipe(r.id)}
                        title="Move to trash"
                      >
                        <Trash2 />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 text-xs text-muted-foreground text-center">
        Total recipes in system: {recipes.length}
      </div>

      <details className="rounded-md border p-3 text-sm">
        <summary className="cursor-pointer select-none">
          Knowledge learned from imports
        </summary>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
          {(() => {
            try {
              const raw = localStorage.getItem("kb:cook");
              if (!raw)
                return (
                  <div className="text-xs text-muted-foreground col-span-2">
                    No knowledge yet.
                  </div>
                );
              const kb = JSON.parse(raw) || {};
              const top = (obj: any, n: number) =>
                Object.entries(obj || {})
                  .sort((a: any, b: any) => b[1] - a[1])
                  .slice(0, n);
              return (
                <>
                  <div>
                    <div className="font-medium mb-1">Top terms</div>
                    <ul className="list-disc pl-5 space-y-0.5 text-xs">
                      {top(kb.terms, 20).map(([k, v]: any) => (
                        <li key={k}>
                          {k}{" "}
                          <span className="text-muted-foreground">({v})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Top phrases</div>
                    <ul className="list-disc pl-5 space-y-0.5 text-xs">
                      {top(kb.bigrams, 20).map(([k, v]: any) => (
                        <li key={k}>
                          {k}{" "}
                          <span className="text-muted-foreground">({v})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              );
            } catch {
              return (
                <div className="text-xs text-muted-foreground">
                  Unable to read knowledge store.
                </div>
              );
            }
          })()}
        </div>
      </details>

      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{preview?.title}</DialogTitle>
          </DialogHeader>
          {preview && (
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 items-start">
              <div className="rounded border overflow-hidden bg-muted/20">
                {preview.imageDataUrls?.[0] ? (
                  <img
                    src={preview.imageDataUrls[0]}
                    alt={preview.title}
                    className="w-full h-auto"
                  />
                ) : (
                  <div className="h-40 flex items-center justify-center text-xs text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
              <div className="text-sm space-y-2">
                {preview.tags?.length ? (
                  <div className="text-muted-foreground">
                    {preview.tags.join(" · ")}
                  </div>
                ) : null}
                {preview.ingredients?.length ? (
                  <div>
                    <div className="font-medium">Ingredients</div>
                    <ul className="list-disc pl-5 max-h-32 overflow-auto">
                      {preview.ingredients.slice(0, 20).map((x, i) => (
                        <li key={i}>{x}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {preview.instructions?.length ? (
                  <div>
                    <div className="font-medium">Instructions</div>
                    <div className="max-h-32 overflow-auto whitespace-pre-wrap hide-scrollbar">
                      {preview.instructions.join("\n")}
                    </div>
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button size="sm" variant="outline" asChild>
                    <a href={`/recipe/${preview.id}/view`}>
                      <ExternalLink className="mr-1" />
                      Open
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const body = encodeURIComponent(`${preview.title}`);
                      location.href = `sms:?&body=${body}`;
                    }}
                  >
                    SMS
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.print()}
                  >
                    Print
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
