
/**
 * Command pattern placeholder. In v0 we serialize project JSON to store undo.
 * Later we store fine-grained ops.
 */
export interface Command {
  id: string
  name: string
  apply(): void
  revert(): void
}
