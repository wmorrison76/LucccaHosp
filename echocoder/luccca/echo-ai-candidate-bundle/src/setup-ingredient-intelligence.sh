cd frontend/src

mkdir -p components/Invoice
mkdir -p components/Ingredients
mkdir -p data/invoiceMocks
mkdir -p utils/invoice

touch components/Invoice/InvoiceUpload.jsx
touch components/Invoice/InvoicePreviewModal.jsx
touch components/Ingredients/IngredientBuilder.jsx
touch components/Ingredients/IngredientMasterList.jsx

touch utils/invoice/InvoiceParser.js
touch data/invoiceMocks/sampleInvoice1.json

tree components -I "node_modules"

