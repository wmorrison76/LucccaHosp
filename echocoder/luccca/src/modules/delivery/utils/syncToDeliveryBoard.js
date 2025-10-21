// src/modules/delivery/utils/syncToDeliveryBoard.js

export const syncToDeliveryBoard = (cakeOrder) => {
  const isOffsite = cakeOrder.deliveryType === "Delivery";

  if (!isOffsite) return;

  const deliveryBoardEntry = {
    id: cakeOrder.id,
    eventRoom: cakeOrder.eventRoom || "N/A",
    time: cakeOrder.deliveryTime || "N/A",
    clientName: cakeOrder.client.name,
    cakeLabel: cakeOrder.label || "Custom Cake",
    driverNotes: cakeOrder.notes || "",
  };

  // Push to delivery module logic here
  window.dispatchEvent(new CustomEvent("cakeDeliveryAdd", { detail: deliveryBoardEntry }));
};

export default syncToDeliveryBoard;
