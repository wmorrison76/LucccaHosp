export function downloadTextFile(filename: string, text: string){
  const blob = new Blob([text], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  setTimeout(()=>{
    URL.revokeObjectURL(url)
    a.remove()
  }, 0)
}

export default downloadTextFile;
