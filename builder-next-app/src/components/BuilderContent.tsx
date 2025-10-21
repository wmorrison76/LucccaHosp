import { useEffect, useState } from "react";
import { Builder, builder } from "@builder.io/sdk";

builder.init("YOUR_API_KEY"); // Replace with your Builder.io API key

const BuilderContent = ({ model, content }) => {
  const [builderContent, setBuilderContent] = useState(null);

  useEffect(() => {
    if (content) {
      setBuilderContent(content);
    } else {
      builder
        .get(model)
        .promise()
        .then((data) => {
          setBuilderContent(data);
        })
        .catch((error) => {
          console.error("Error fetching Builder.io content:", error);
        });
    }
  }, [model, content]);

  if (!builderContent) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {builderContent?.data && (
        <BuilderComponent model={model} content={builderContent.data} />
      )}
    </div>
  );
};

export default BuilderContent;