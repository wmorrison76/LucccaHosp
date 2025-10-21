// File: utils/invoice/orderConflictChecker.js
// Flags incoming orders that already exist in storeroom
export function flagConflictingOrders(invoiceItems, storeroomItems) {
  return invoiceItems.filter(item =>
    storeroomItems.some(stock => stock.vendorCode === item.vendorCode)
  );
}o