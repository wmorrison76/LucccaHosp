type EventName =
  | "event.created"
  | "event.headcount.changed"
  | "opportunity.stage.changed"
  | "invoice.paid"
  | "journey.email.sent";

export function track(name: EventName, props: Record<string,any> = {}){
  // TODO: wire Segment/GA later
  console.log("[Analytics]", name, props);
}
