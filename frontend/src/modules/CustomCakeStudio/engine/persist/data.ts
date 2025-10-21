export async function blobToDataURL(blob: Blob): Promise<string> {
  return await new Promise((resolve, reject)=>{
    const r = new FileReader()
    r.onerror = () => reject(new Error('read blob failed'))
    r.onload = () => resolve(String(r.result))
    r.readAsDataURL(blob)
  })
}

export async function fetchAsDataURL(url: string): Promise<string> {
  const res = await fetch(url, { mode: 'cors' }).catch(()=>null)
  if (!res || !res.ok) throw new Error('fetch failed')
  const blob = await res.blob()
  return await blobToDataURL(blob)
}

export function isDataURL(s?: string): boolean {
  return !!s && /^data:image\//i.test(s)
}

export default isDataURL;
