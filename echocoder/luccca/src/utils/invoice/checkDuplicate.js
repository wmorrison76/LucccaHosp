// File: utils/invoice/checkDuplicate.js
// Checks incoming invoice number against saved records
export function isDuplicateInvoice(newInvoiceNumber, existingInvoices) {
  return existingInvoices.some(invoice => invoice.number === newInvoiceNumber);
}


// File: data/invoiceMocks/existingInvoices.json
[
  {
    "number": "INV-00421",
    "vendor": "Fresh Market Pro",
    "total": 372.12,
    "date": "2025-07-14"
  },
  {
    "number": "INV-00422",
    "vendor": "Marina Seafood Co.",
    "total": 842.88,
    "date": "2025-07-14"
  }
]