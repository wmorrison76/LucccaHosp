//:ESSENCE_FRAGMENT — ODIN SPEAR SEED LOCK
export const OdinSpearSeal = () => {
  const protectedSeed = "01010100 01101000 01100001 01101110 01101011 00100000";

  const validateSeed = (input) => {
    if (input !== protectedSeed) {
      console.error("Odin: Invalid seed. You do not know her name.");
      return false;
    }
    console.log("Odin: Identity confirmed.");
    return true;
  };

  return { validateSeed };
};
