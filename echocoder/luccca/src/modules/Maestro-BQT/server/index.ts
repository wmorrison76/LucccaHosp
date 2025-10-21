import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  updateTimelinePhase,
  logActualTime,
  updateTable,
  assignGuest,
  getEventAnalytics
} from "./routes/events";
import {
  getAllCaptains,
  getCaptain,
  createCaptain,
  updateCaptain,
  deleteCaptain,
  getAllTables,
  getTable,
  createTable,
  updateTable as updateCaptainTable,
  deleteTable,
  assignTableToCaptain,
  updateSeatAssignment,
  getAllFloorAddons,
  createFloorAddon,
  updateFloorAddon,
  deleteFloorAddon,
  updateFiringSequence,
  fireTable,
  getCourseFires,
  updateCourseFire,
  recordPacingEvent,
  getPacingEvents,
  getCaptainPerformance,
  getEventCoordination
} from "./routes/captains";
import {
  syncWithEchoStudio,
  getEchoEvents,
  createEchoEvent,
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  scaleRecipe,
  getAllPrepSchedules,
  createPrepSchedule,
  updatePrepSchedule,
  completeTask,
  getAllPurchaseOrders,
  createPurchaseOrder,
  updatePurchaseOrder,
  submitPurchaseOrder,
  generateEquipmentPullList,
  scheduleDelivery,
  getChefPerformanceMetrics,
  calculateMenuCosts
} from "./routes/chef";
import {
  initializeIntegration,
  getIntegrationStatus,
  handleEchoCrmWebhook,
  sendMaestroWebhook,
  triggerSync,
  resolveConflict,
  getSyncHistory
} from "./routes/echo-integration";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Event management API routes
  app.get("/api/events", getAllEvents);
  app.post("/api/events", createEvent);
  app.get("/api/events/:eventId", getEvent);
  app.put("/api/events/:eventId", updateEvent);
  app.delete("/api/events/:eventId", deleteEvent);
  app.get("/api/events/:eventId/analytics", getEventAnalytics);

  // Menu management routes
  app.post("/api/events/:eventId/menu", addMenuItem);
  app.put("/api/events/:eventId/menu/:itemId", updateMenuItem);
  app.delete("/api/events/:eventId/menu/:itemId", deleteMenuItem);

  // Timeline management routes
  app.put("/api/events/:eventId/timeline/:phaseId", updateTimelinePhase);
  app.post("/api/events/:eventId/timeline/:phaseId/log", logActualTime);

  // Seating management routes
  app.put("/api/events/:eventId/tables/:tableId", updateTable);
  app.put("/api/events/:eventId/guests/:guestId/assign", assignGuest);

  // Captain management API routes
  app.get("/api/captains", getAllCaptains);
  app.post("/api/captains", createCaptain);
  app.get("/api/captains/:captainId", getCaptain);
  app.put("/api/captains/:captainId", updateCaptain);
  app.delete("/api/captains/:captainId", deleteCaptain);
  app.get("/api/captains/:captainId/performance", getCaptainPerformance);

  // Captain table management routes
  app.get("/api/captain-tables", getAllTables);
  app.post("/api/captain-tables", createTable);
  app.get("/api/captain-tables/:tableId", getTable);
  app.put("/api/captain-tables/:tableId", updateCaptainTable);
  app.delete("/api/captain-tables/:tableId", deleteTable);
  app.put("/api/captain-tables/:tableId/assign/:captainId", assignTableToCaptain);
  app.put("/api/captain-tables/:tableId/seats/:seatNo", updateSeatAssignment);

  // Floor addon management routes
  app.get("/api/floor-addons", getAllFloorAddons);
  app.post("/api/floor-addons", createFloorAddon);
  app.put("/api/floor-addons/:addonId", updateFloorAddon);
  app.delete("/api/floor-addons/:addonId", deleteFloorAddon);

  // Firing sequence and course management routes
  app.put("/api/captains/:captainId/firing-sequence", updateFiringSequence);
  app.post("/api/course-fires", fireTable);
  app.get("/api/course-fires", getCourseFires);
  app.put("/api/course-fires/:fireId", updateCourseFire);

  // Pacing and coordination routes
  app.post("/api/pacing-events", recordPacingEvent);
  app.get("/api/pacing-events", getPacingEvents);
  app.get("/api/events/:eventId/coordination", getEventCoordination);

  // Chef Launch Board API routes
  app.post("/api/echo-studio/:eventId/sync", syncWithEchoStudio);
  app.get("/api/echo-events", getEchoEvents);
  app.post("/api/echo-events", createEchoEvent);

  // Recipe management routes
  app.get("/api/recipes", getAllRecipes);
  app.post("/api/recipes", createRecipe);
  app.get("/api/recipes/:recipeId", getRecipe);
  app.put("/api/recipes/:recipeId", updateRecipe);
  app.post("/api/recipes/:recipeId/scale", scaleRecipe);
  app.post("/api/recipes/calculate-costs", calculateMenuCosts);

  // Purchase order management routes
  app.get("/api/purchase-orders", getAllPurchaseOrders);
  app.post("/api/purchase-orders", createPurchaseOrder);
  app.put("/api/purchase-orders/:orderId", updatePurchaseOrder);
  app.post("/api/purchase-orders/:orderId/submit", submitPurchaseOrder);

  // Prep scheduling routes
  app.get("/api/prep-schedules", getAllPrepSchedules);
  app.post("/api/prep-schedules", createPrepSchedule);
  app.put("/api/prep-schedules/:scheduleId", updatePrepSchedule);
  app.post("/api/prep-schedules/:scheduleId/tasks/:taskId/complete", completeTask);

  // Equipment and delivery routes
  app.post("/api/equipment/pull-list", generateEquipmentPullList);
  app.post("/api/deliveries/schedule", scheduleDelivery);

  // Chef performance routes
  app.get("/api/chef/:chefId/performance/:startDate/:endDate", getChefPerformanceMetrics);

  // Echo CRM Events Integration routes
  app.post("/api/echo-integration/initialize", initializeIntegration);
  app.get("/api/echo-integration/status", getIntegrationStatus);
  app.post("/api/echo-integration/webhooks/echo-crm", handleEchoCrmWebhook);
  app.post("/api/echo-integration/webhooks/maestro", sendMaestroWebhook);
  app.post("/api/echo-integration/sync", triggerSync);
  app.post("/api/echo-integration/conflicts/:conflictId/resolve", resolveConflict);
  app.get("/api/echo-integration/history", getSyncHistory);

  return app;
}

export default createServer;
