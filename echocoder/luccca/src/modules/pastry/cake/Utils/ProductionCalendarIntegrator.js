// src/modules/pastry/cake/utils/ProductionCalendarIntegrator.js

export const generateProductionCalendarEntry = ({
  cakeName,
  clientName,
  eventDate,
  servings,
  chef,
  prepStartDays = 2,
  requiresAssembly = true,
}) => {
  const event = {
    title: `Cake: ${cakeName}`,
    client: clientName,
    eventDate,
    assignedChef: chef,
    servings,
    requiresAssembly,
    prepStart: new Date(new Date(eventDate).setDate(new Date(eventDate).getDate() - prepStartDays)).toISOString(),
    tasks: [
      { type: "Bake", due: "TBD" },
      { type: "Fill", due: "TBD" },
      { type: "Stack & Decorate", due: "TBD" },
      ...(requiresAssembly ? [{ type: "Transport/Assembly", due: eventDate }] : []),
    ],
    source: "CakeDesigner",
    linkedForms: {
      CRM: `/crm/client/${clientName.replace(/\s+/g, "-").toLowerCase()}`,
      REO: `/events/REO/${eventDate}-${cakeName}`,
      OrderForm: `/orders/cakes/${cakeName.replace(/\s+/g, "-")}`,
    },
  };

  return event;
};

export default generateProductionCalendarEntry;
