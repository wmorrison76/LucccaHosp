export function dataURLToBlob(dataUrl: string): Blob | null {
  try {
    const [meta, b64] = dataUrl.split(',')
    const mime = /data:(.*?);base64/.exec(meta)?.[1] || 'application/octet-stream'
    const bin = atob(b64)
    const arr = new Uint8Array(bin.length)
    for (let i=0;i<bin.length;i++) arr[i] = bin.charCodeAt(i)
    return new Blob([arr], { type: mime })
  } catch { return null }
}

export default dataURLToBlob;
