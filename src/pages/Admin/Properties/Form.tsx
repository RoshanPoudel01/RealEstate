import { Tabs } from "@chakra-ui/react";
import PageHeader from "@realState/utils/PageHeader";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FAQs, General, Images } from "./panels";
import Amenities from "./panels/Amenities";
import Descriptions from "./panels/Descriptions";

const triggers = [
  {
    label: "General",
    value: "general",
  },
  {
    label: "Descriptions",
    value: "descriptions",
  },
  {
    label: "Amenities",
    value: "amenities",
  },
  {
    label: "Images",
    value: "images",
  },
  {
    label: "Faqs",
    value: "faqs",
  },
];

const PropertyForm = () => {
  const { id } = useParams<{ id: string }>();

  const [tabValue, setTabValue] = useState(triggers[0].value);

  return (
    <>
      <PageHeader heading="Property Form" description="Add new property" />
      <Tabs.Root
        variant={"plain"}
        colorPalette={"primary"}
        lazyMount
        unmountOnExit
        defaultValue={triggers[0].value}
        value={tabValue}
        onValueChange={(e) => setTabValue(e.value)}
      >
        <Tabs.List>
          {triggers.map((trigger, index) => (
            <Tabs.Trigger
              borderBottom={"6px solid"}
              borderColor={"primary.200"}
              _selected={{
                color: "primary.400",
                borderColor: "primary.500",
              }}
              borderRadius={0}
              key={index}
              value={trigger.value}
              disabled={trigger.value !== "general" && !id}
            >
              {trigger.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value={triggers[0].value}>
          <General setTabValue={setTabValue} />
        </Tabs.Content>
        <Tabs.Content value={triggers[1].value}>
          <Descriptions setTabValue={setTabValue} />
        </Tabs.Content>
        <Tabs.Content value={triggers[2].value}>
          <Amenities setTabValue={setTabValue} />
        </Tabs.Content>
        <Tabs.Content value={triggers[3].value}>
          <Images setTabValue={setTabValue} />
        </Tabs.Content>
        <Tabs.Content value={triggers[4].value}>
          <FAQs />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default PropertyForm;
