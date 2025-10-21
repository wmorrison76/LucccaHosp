
export interface ToolContext {
  stage: import('konva').Stage | null
}

export abstract class Tool {
  id: string
  constructor(id:string){ this.id = id }
  onActivate(_ctx:ToolContext) {}
  onDeactivate(_ctx:ToolContext) {}
  onPointerDown(_e:any,_ctx:ToolContext) {}
  onPointerMove(_e:any,_ctx:ToolContext) {}
  onPointerUp(_e:any,_ctx:ToolContext) {}
}
