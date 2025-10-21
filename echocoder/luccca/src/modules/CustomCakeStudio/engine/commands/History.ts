export class History {
  private undoStack: string[] = []
  private redoStack: string[] = []
  constructor(private cap = 100) {}

  mark(stateJson: string){
    this.undoStack.push(stateJson)
    if (this.undoStack.length > this.cap) this.undoStack.shift()
    this.redoStack = [] // new branch
  }
  canUndo(){ return this.undoStack.length > 0 }
  canRedo(){ return this.redoStack.length > 0 }
  counts(){ return { undo: this.undoStack.length, redo: this.redoStack.length } }

  stepUndo(currentState: string): string | null {
    if (!this.canUndo()) return null
    const prev = this.undoStack.pop() as string
    this.redoStack.push(currentState)
    return prev
  }

  stepRedo(currentState: string): string | null {
    if (!this.canRedo()) return null
    const next = this.redoStack.pop() as string
    this.undoStack.push(currentState)
    return next
  }
}
