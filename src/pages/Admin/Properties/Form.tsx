import { Tabs } from "@chakra-ui/react";
import PageHeader from "@realState/utils/PageHeader";
import { useState } from "react";
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
    label: "Amenities"  ,
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

  const [tabValue, setTabValue] = useState(triggers[0].value);

  return (
    <>
      <PageHeader heading="Property Form" description="Add new property" />
      <Tabs.Root
        variant={"enclosed"}
        colorPalette={"primary"}
        lazyMount
        unmountOnExit
        defaultValue={triggers[0].value}
        value={tabValue}
        onValueChange={(e) => setTabValue(e.value)}
      >
        <Tabs.List>
          {triggers.map((trigger, index) => (
            <Tabs.Trigger key={index}
            value={trigger.value}>
              {trigger.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value={triggers[0].value}>
          <General 
          setTabValue={setTabValue}
          />
        </Tabs.Content>
        <Tabs.Content value={triggers[1].value}>
          <Descriptions
          setTabValue={setTabValue}
          />
        </Tabs.Content>
        <Tabs.Content value={triggers[2].value}>
          <Amenities
          setTabValue={setTabValue}
          />
        </Tabs.Content>
        <Tabs.Content value={triggers[3].value}>
          <Images 
          setTabValue={setTabValue}
          
          />
        </Tabs.Content>
        <Tabs.Content value={triggers[4].value}>
          <FAQs />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default PropertyForm;
