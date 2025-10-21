// BLOCK 3 – Invoice Parsing Engine
// Parses structured JSON invoice data into standardized objects for downstream logic

export function parseInvoice(rawInvoiceData) {
  const {
    vendorName,
    vendorInvoiceNumber,
    orderDate,
    deliveryDate,
    repName,
    outletName,
    lineItems = []
  } = rawInvoiceData;

  const parsedItems = lineItems.map((item) => {
    const unitPrice = parseFloat(item.unitPrice.replace(/[^0-9.]/g, ''));
    const totalPrice = parseFloat(item.totalPrice.replace(/[^0-9.]/g, ''));
    const weight = parseFloat(item.weight?.replace(/[^0-9.]/g, '') || 0);

    return {
      vendorCode: item.vendorCode,
      name: item.name,
      packageSize: item.packageSize,
      unitPrice,
      weight,
      totalPrice,
    };
  });

  return {
    metadata: {
      vendorName,
      vendorInvoiceNumber,
      orderDate,
      deliveryDate,
      repName,
      outletName,
    },
    items: parsedItems,
  };
}
