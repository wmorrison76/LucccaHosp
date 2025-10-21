import { useStudioStore } from '../store/useStudioStore'
import { serializeProject } from './serialize'

let started = false

export function initAutosave(){
  if (started) return
  started = true
  let timeout: any = null
  useStudioStore.subscribe(async (s)=>{
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(async ()=>{
      try {
        const file = await serializeProject(s.project)
        localStorage.setItem('CustomCakeStudio.autosave', JSON.stringify(file))
      } catch {}
    }, 1000) // debounce 1s
  })
}

export function tryRestoreAutosave(){
  try {
    const raw = localStorage.getItem('CustomCakeStudio.autosave')
    if (!raw) return null
    return JSON.parse(raw)
  } catch { return null }
}

export default initAutosave;
