// File: utils/invoice/echoLogicRouter.js
// Routes logic to Echo for prompting chefs & notifications
export function echoPromptLogic(parsedItems) {
  return parsedItems.map((item) => {
    if (item.existsInStoreroom) {
      return {
        ...item,
        echoMessage: `Item ${item.name} exists in storeroom with ${item.storeroomQty} units. Consider using stock before reordering.`,
      };
    } else {
      return {
        ...item,
        echoMessage: `Item ${item.name} is new to both outlet and storeroom. No conflicts detected.`,
      };
    }
  });
}
