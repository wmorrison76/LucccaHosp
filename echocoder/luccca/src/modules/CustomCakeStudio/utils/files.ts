export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onerror = () => reject(fr.error)
    fr.onload = () => resolve(fr.result as string)
    fr.readAsDataURL(file)
  })
}

export default readFileAsDataURL;
