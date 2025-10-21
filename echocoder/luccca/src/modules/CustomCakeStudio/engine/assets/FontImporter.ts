import { registerFont, ensureLoaded } from '../text/FontManager'

export class FontImporter {
  static async importFile(file: File){
    const url = URL.createObjectURL(file)
    const name = file.name.replace(/\.(ttf|otf|woff2?|TTF|OTF|WOFF2?)$/, '')
    registerFont({ name, url })
    await ensureLoaded(name)
    return { name, url }
  }
}
