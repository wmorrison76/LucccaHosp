import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { c as calculateCakeSpecs } from "./CakeSizeCalculator-D9SPtCeL.js";
const CAKE_FLAVORS = [
  "butter",
  "vanilla",
  "chocolate",
  "pound_vanilla",
  "pound_orange",
  "pound_chocolate",
  "pound_lemon",
  "pound_marble",
  "strawberry",
  "confetti",
  "raspberry"
];
const CAKE_THEMES = ["mad_hatter", "bear", "hare", "yule", "custom"];
const ICING_TYPES = ["frosting", "fondant", "buttercream"];
const IntakeForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = reactExports.useState(
    initialData || {
      eventDate: "",
      eventTime: "",
      eventLocation: "",
      pickupOrDelivery: "pickup",
      guestCount: 20,
      cakeShape: "round",
      mainFlavor: "vanilla",
      fillingFlavors: ["vanilla"],
      icingColor: "#FFFFFF",
      icingType: "frosting",
      theme: "custom",
      decorationNotes: "",
      showPieceCake: true,
      sheetCakeProduction: true
    }
  );
  const [showPreview, setShowPreview] = reactExports.useState(false);
  const [calculatedSpecs, setCalculatedSpecs] = reactExports.useState(calculateCakeSpecs(formData.guestCount, formData.cakeShape));
  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (field === "guestCount" || field === "cakeShape") {
      setCalculatedSpecs(calculateCakeSpecs(updated.guestCount, updated.cakeShape));
    }
  };
  const handleFillingChange = (flavor) => {
    const fillings = formData.fillingFlavors.includes(flavor) ? formData.fillingFlavors.filter((f) => f !== flavor) : [...formData.fillingFlavors, flavor];
    handleChange("fillingFlavors", fillings);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "cake-intake-form", style: styles.container, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { style: styles.title, children: "🎂 Custom Cake Order Form" }, void 0, false, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
      lineNumber: 88,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: handleSubmit, style: styles.form, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("fieldset", { style: styles.fieldset, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("legend", { style: styles.legend, children: "📅 Event Details" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 93,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.formGroup, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.label, children: "Event Date *" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 96,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "input",
            {
              type: "date",
              value: formData.eventDate,
              onChange: (e) => handleChange("eventDate", e.target.value),
              required: true,
              style: styles.input
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 97,
              columnNumber: 13
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 95,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.formGroup, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.label, children: "Event Time *" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 107,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "input",
            {
              type: "time",
              value: formData.eventTime,
              onChange: (e) => handleChange("eventTime", e.target.value),
              required: true,
              style: styles.input
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 108,
              columnNumber: 13
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 106,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.formGroup, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.label, children: "Location *" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 118,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "input",
            {
              type: "text",
              placeholder: "Event venue or address",
              value: formData.eventLocation,
              onChange: (e) => handleChange("eventLocation", e.target.value),
              required: true,
              style: styles.input
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 119,
              columnNumber: 13
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 117,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.formGroup, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.label, children: "Pickup or Delivery? *" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 130,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "select",
            {
              value: formData.pickupOrDelivery,
              onChange: (e) => handleChange("pickupOrDelivery", e.target.value),
              style: styles.select,
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "pickup", children: "🚗 Pickup" }, void 0, false, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
                  lineNumber: 136,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "delivery", children: "🚚 Delivery" }, void 0, false, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
                  lineNumber: 137,
                  columnNumber: 15
                }, void 0)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 131,
              columnNumber: 13
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 129,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
        lineNumber: 92,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("fieldset", { style: styles.fieldset, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("legend", { style: styles.legend, children: "🎂 Cake Specifications" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 144,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.formGroup, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.label, children: "Number of Guests *" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 147,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "input",
            {
              type: "number",
              min: "1",
              max: "500",
              value: formData.guestCount,
              onChange: (e) => handleChange("guestCount", parseInt(e.target.value)),
              style: styles.input
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 148,
              columnNumber: 13
            },
            void 0
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("small", { style: styles.hint, children: [
            "We recommend ",
            calculatedSpecs.cakeDiameter,
            '" diameter, ',
            calculatedSpecs.cakeLayers,
            " layers"
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 156,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 146,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.formGroup, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.label, children: "Cake Shape *" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 160,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("select", { value: formData.cakeShape, onChange: (e) => handleChange("cakeShape", e.target.value), style: styles.select, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "round", children: "⭕ Round" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 162,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "square", children: "⬜ Square" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 163,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "quarter_sheet", children: "📦 Quarter Sheet" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 164,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "half_sheet", children: "📦 Half Sheet" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 165,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "full_sheet", children: "📦 Full Sheet" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 166,
              columnNumber: 15
            }, void 0)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 161,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 159,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.formGroup, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.label, children: "Main Cake Flavor *" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 171,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("select", { value: formData.mainFlavor, onChange: (e) => handleChange("mainFlavor", e.target.value), style: styles.select, children: CAKE_FLAVORS.map((flavor) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: flavor, children: flavor.replace(/_/g, " ") }, flavor, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 174,
            columnNumber: 17
          }, void 0)) }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 172,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 170,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.formGroup, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.label, children: "Filling Flavors (select all that apply)" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 182,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.checkboxGroup, children: CAKE_FLAVORS.map((flavor) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.checkboxLabel, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                type: "checkbox",
                checked: formData.fillingFlavors.includes(flavor),
                onChange: () => handleFillingChange(flavor),
                style: styles.checkbox
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
                lineNumber: 186,
                columnNumber: 19
              },
              void 0
            ),
            flavor.replace(/_/g, " ")
          ] }, flavor, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 185,
            columnNumber: 17
          }, void 0)) }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 183,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 181,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
        lineNumber: 143,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("fieldset", { style: styles.fieldset, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("legend", { style: styles.legend, children: "🎨 Decoration & Colors" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 201,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.formGroup, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.label, children: "Icing Color *" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 204,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.colorPickerWrapper, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                type: "color",
                value: formData.icingColor,
                onChange: (e) => handleChange("icingColor", e.target.value),
                style: styles.colorPicker
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
                lineNumber: 206,
                columnNumber: 15
              },
              void 0
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { style: styles.colorValue, children: formData.icingColor }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 212,
              columnNumber: 15
            }, void 0)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 205,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 203,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.formGroup, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.label, children: "Icing Type *" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 217,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("select", { value: formData.icingType, onChange: (e) => handleChange("icingType", e.target.value), style: styles.select, children: ICING_TYPES.map((type) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: type, children: type.charAt(0).toUpperCase() + type.slice(1) }, type, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 220,
            columnNumber: 17
          }, void 0)) }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 218,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 216,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.formGroup, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.label, children: "Cake Theme" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 228,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("select", { value: formData.theme, onChange: (e) => handleChange("theme", e.target.value), style: styles.select, children: CAKE_THEMES.map((theme) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: theme, children: theme.replace(/_/g, " ") }, theme, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 231,
            columnNumber: 17
          }, void 0)) }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 229,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 227,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.formGroup, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.label, children: "Decoration Notes" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 239,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "textarea",
            {
              placeholder: "Describe any special decorations, themes, or specific requests...",
              value: formData.decorationNotes,
              onChange: (e) => handleChange("decorationNotes", e.target.value),
              style: styles.textarea
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 240,
              columnNumber: 13
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 238,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
        lineNumber: 200,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("fieldset", { style: styles.fieldset, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("legend", { style: styles.legend, children: "📋 Production Options" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 251,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.formGroup, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.checkboxLabel, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "input",
            {
              type: "checkbox",
              checked: formData.showPieceCake,
              onChange: (e) => handleChange("showPieceCake", e.target.checked),
              style: styles.checkbox
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 255,
              columnNumber: 15
            },
            void 0
          ),
          "Include Show Piece Cake (3D display cake)"
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 254,
          columnNumber: 13
        }, void 0) }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 253,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.formGroup, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.checkboxLabel, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "input",
            {
              type: "checkbox",
              checked: formData.sheetCakeProduction,
              onChange: (e) => handleChange("sheetCakeProduction", e.target.checked),
              style: styles.checkbox
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 267,
              columnNumber: 15
            },
            void 0
          ),
          "Also Produce Sheet Cake (serves additional guests)"
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 266,
          columnNumber: 13
        }, void 0) }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 265,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
        lineNumber: 250,
        columnNumber: 9
      }, void 0),
      showPreview && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("fieldset", { style: styles.fieldset, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("legend", { style: styles.legend, children: "⏱️ Estimated Production Timeline" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 281,
          columnNumber: 13
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.timelineGrid, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.timelineItem, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Baking Time (per layer):" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 284,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: formatTime(calculatedSpecs.bakingTimeMinutes) }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 285,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 283,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.timelineItem, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Cooling Time:" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 288,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: formatTime(calculatedSpecs.coolingTimeMinutes) }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 289,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 287,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.timelineItem, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Prep & Assembly:" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 292,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: formatTime(calculatedSpecs.preparationTimeMinutes) }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 293,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 291,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.timelineItem, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Total Production Time:" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 296,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { style: styles.totalTime, children: formatTime(calculatedSpecs.totalProductionTimeMinutes) }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 297,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 295,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.timelineItem, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Cake Diameter:" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 300,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
              calculatedSpecs.cakeDiameter,
              '"'
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 301,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 299,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.timelineItem, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Layers:" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 304,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: calculatedSpecs.cakeLayers }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 305,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 303,
            columnNumber: 15
          }, void 0),
          calculatedSpecs.supportColumnsNeeded && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.timelineItem, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Structural Supports:" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 309,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { style: styles.warning, children: "⚠️ Required" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
              lineNumber: 310,
              columnNumber: 19
            }, void 0)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
            lineNumber: 308,
            columnNumber: 17
          }, void 0)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 282,
          columnNumber: 13
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
        lineNumber: 280,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.buttonGroup, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { type: "button", onClick: () => setShowPreview(!showPreview), style: styles.buttonSecondary, children: showPreview ? "🔝 Hide Timeline" : "⏱️ Show Timeline" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 319,
          columnNumber: 11
        }, void 0),
        onCancel && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { type: "button", onClick: onCancel, style: styles.buttonCancel, children: "Cancel" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 323,
          columnNumber: 13
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { type: "submit", style: styles.buttonPrimary, children: "📊 Next: Design Cake →" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
          lineNumber: 327,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
        lineNumber: 318,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
      lineNumber: 90,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/IntakeForm.tsx",
    lineNumber: 87,
    columnNumber: 5
  }, void 0);
};
const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "system-ui, -apple-system, sans-serif",
    color: "#333"
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#000",
    fontSize: "2rem"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem"
  },
  fieldset: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1.5rem",
    backgroundColor: "#f9f9f9"
  },
  legend: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#000",
    padding: "0 0.5rem"
  },
  formGroup: {
    marginBottom: "1.5rem",
    display: "flex",
    flexDirection: "column"
  },
  label: {
    marginBottom: "0.5rem",
    fontWeight: "500",
    color: "#333"
  },
  input: {
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem"
  },
  select: {
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    backgroundColor: "#fff"
  },
  textarea: {
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    minHeight: "100px",
    fontFamily: "system-ui, -apple-system, sans-serif",
    resize: "vertical"
  },
  hint: {
    fontSize: "0.85rem",
    color: "#666",
    marginTop: "0.3rem"
  },
  checkboxGroup: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "0.75rem"
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer"
  },
  checkbox: {
    cursor: "pointer",
    width: "18px",
    height: "18px"
  },
  colorPickerWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "1rem"
  },
  colorPicker: {
    width: "80px",
    height: "60px",
    border: "2px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer"
  },
  colorValue: {
    fontFamily: "monospace",
    fontSize: "0.9rem",
    color: "#666"
  },
  timelineGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem"
  },
  timelineItem: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "1rem",
    backgroundColor: "#fff",
    borderRadius: "4px",
    border: "1px solid #ddd"
  },
  totalTime: {
    fontWeight: "bold",
    fontSize: "1.1rem",
    color: "#0066cc"
  },
  warning: {
    color: "#ff6600",
    fontWeight: "bold"
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    marginTop: "2rem"
  },
  buttonPrimary: {
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#0066cc",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  buttonSecondary: {
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#0066cc",
    backgroundColor: "#fff",
    border: "2px solid #0066cc",
    borderRadius: "4px",
    cursor: "pointer"
  },
  buttonCancel: {
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#666",
    backgroundColor: "#fff",
    border: "2px solid #999",
    borderRadius: "4px",
    cursor: "pointer"
  }
};
export {
  IntakeForm
};
