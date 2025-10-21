// Headless image-gen client. Posts GenPayload to VITE_IMG_API_URL (or preview fallback).
export type GenPayload = {
  prompt: string;
  negative?: string;
  width?: number;
  height?: number;
  seed?: number;
  referenceDataURL?: string;
  maskDataURL?: string;
  mode?: "fast" | "balanced" | "quality";
};

const API_URL =
  (import.meta as any).env?.VITE_IMG_API_URL ||
  (import.meta as any).env?.VITE_IMG_APIURL || "";

export async function generate(p: GenPayload): Promise<{ url?: string; base64?: string; blob?: Blob }> {
  const url = API_URL || "/__preview/txt2img";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(p),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Image API ${res.status}: ${text || res.statusText}`);
  }

  const ct = res.headers.get("content-type") || "";
  if (ct.startsWith("application/json")) {
    const data = await res.json();
    if (data?.url) return { url: data.url };
    if (data?.base64) return { base64: data.base64, url: `data:image/png;base64,${data.base64}` };
    throw new Error("Invalid JSON response from Image API.");
  }
  if (ct.startsWith("image/")) {
    const blob = await res.blob();
    return { blob, url: URL.createObjectURL(blob) };
  }

  const text = await res.text().catch(() => "");
  throw new Error(`Unexpected content-type: ${ct} ${text}`);
}

export default { generate };
