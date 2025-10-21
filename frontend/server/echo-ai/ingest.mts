import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { Pool } from "pg";
import OpenAI from "openai";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const EMBED = process.env.OPENAI_EMBED_MODEL || "text-embedding-3-small"; // 1536 dims

async function readAsText(filePath: string): Promise<string> {
  const ext = path.extname(filePath).toLowerCase();
  const buf = fs.readFileSync(filePath);
  if (ext === ".pdf") {
    const mod = await import("pdf-parse/lib/pdf-parse.js"); // avoid test harness
    const pdfParse = (mod as any).default ?? mod;
    const r = await pdfParse(buf);
    return r.text;
  }
  if (ext === ".docx") {
    const { default: mammoth } = await import("mammoth");
    const r = await mammoth.extractRawText({ buffer: buf });
    return r.value;
  }
  return buf.toString("utf8"); // .txt/.md/etc.
}

function chunkText(text: string, target = 2200, overlap = 300): string[] {
  const paras = text.split(/\n{2,}/);
  const out: string[] = [];
  let cur = "";
  for (const p of paras) {
    const cand = cur ? cur + "\n\n" + p : p;
    if (cand.length > target && cur) { out.push(cur.trim()); cur = p; }
    else { cur = cand; }
  }
  if (cur.trim()) out.push(cur.trim());
  const withOverlap: string[] = [];
  for (let i = 0; i < out.length; i++) {
    const prevTail = i > 0 ? out[i - 1].slice(-overlap) : "";
    withOverlap.push((prevTail ? prevTail + "\n\n" : "") + out[i]);
  }
  return withOverlap;
}

async function embedBatch(texts: string[]): Promise<number[][]> {
  if (!texts.length) return [];
  const r = await openai.embeddings.create({ model: EMBED, input: texts });
  return r.data.map(d => d.embedding as unknown as number[]);
}

async function ingestOne(filePath: string) {
  const client = await pool.connect();
  try {
    const title = path.basename(filePath);
    const text = await readAsText(filePath);
    const chunks = chunkText(text, 2200, 300);

    const docId = randomUUID();
    await client.query(
      `INSERT INTO documents (doc_id, title, source_path, license_note)
       VALUES ($1,$2,$3,$4)`,
      [docId, title, filePath, "owned/internal use"]
    );

    await client.query("BEGIN");
    const BATCH = 64;
    for (let i = 0; i < chunks.length; i += BATCH) {
      const slice = chunks.slice(i, i + BATCH);
      const embs = await embedBatch(slice);
      for (let j = 0; j < slice.length; j++) {
        const vec = `[${embs[j].join(",")}]`;
        await client.query(
          `INSERT INTO chunks (doc_id, chunk_index, content, embedding)
           VALUES ($1,$2,$3,$4::vector)`,
          [docId, i + j, slice[j], vec]
        );
      }
    }
    await client.query("COMMIT");
    console.log(`✓ Ingested ${title} (${chunks.length} chunks)`);
  } catch (e) {
    await client.query("ROLLBACK").catch(()=>{});
    console.error("Ingest failed:", e);
    throw e;
  } finally {
    client.release();
  }
}

async function main() {
  const inputs = process.argv.slice(2);
  if (!inputs.length) {
    console.error("Usage: pnpm tsx server/echo-ai/ingest.mts <file-or-folder> [...]");
    process.exit(1);
  }
  for (const input of inputs) {
    const stat = fs.statSync(input);
    if (stat.isDirectory()) {
      const files = fs.readdirSync(input)
        .map(f => path.join(input, f))
        .filter(p => [".pdf", ".docx", ".txt", ".md"].includes(path.extname(p).toLowerCase()));
      for (const f of files) await ingestOne(f);
    } else {
      await ingestOne(input);
    }
  }
  await pool.end();
}
main().catch(()=>process.exit(1));
