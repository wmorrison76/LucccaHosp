// Lightweight sales pipeline types + defaults so the CRM UI can compile.

export interface PipelineStage {
  id: string;
  name: string;
  color?: string;
  wipLimit?: number;
}

export interface Deal {
  id: string;
  name: string;
  value: number;              // e.g., USD
  stageId: string;            // matches a PipelineStage.id
  owner?: string;
  probability?: number;       // 0..1
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
}

export interface SalesPipeline {
  stages: PipelineStage[];
  defaultProbabilities?: Record<string, number>; // by stageId
}

export const defaultHospitalityPipeline: SalesPipeline = {
  stages: [
    { id: 'new',          name: 'New Lead' },
    { id: 'qualified',    name: 'Qualified' },
    { id: 'proposal',     name: 'Proposal' },
    { id: 'negotiation',  name: 'Negotiation' },
    { id: 'won',          name: 'Closed Won' },
    { id: 'lost',         name: 'Closed Lost' },
  ],
  defaultProbabilities: {
    new: 0.05,
    qualified: 0.2,
    proposal: 0.4,
    negotiation: 0.65,
    won: 1.0,
    lost: 0.0,
  },
};

// Helpful aliases some files might import
export const defaultStages = defaultHospitalityPipeline.stages;
