// File: utils/invoice/checkInventory.js
// Compares parsed invoice items against storeroom database
export function checkStoreroomForDuplicates(invoiceItems, storeroomItems) {
  return invoiceItems.map((item) => {
    const match = storeroomItems.find((storeItem) => storeItem.vendorCode === item.vendorCode);
    return {
      ...item,
      existsInStoreroom: !!match,
      storeroomQty: match ? match.qty : 0,
    };
  });
}

