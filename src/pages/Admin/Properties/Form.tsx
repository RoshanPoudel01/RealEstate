import { Icon, Tabs } from "@chakra-ui/react";
import { Article, HouseLine, ImagesSquare, Info } from "@phosphor-icons/react";
import { Question } from "@phosphor-icons/react/dist/ssr";
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
    icon: <Info />,
  },
  {
    label: "Descriptions",
    value: "descriptions",
    icon: <Article />,
  },
  {
    label: "Amenities",
    value: "amenities",
    icon: <HouseLine />,
  },
  {
    label: "Images",
    value: "images",
    icon: <ImagesSquare />,
  },
  {
    label: "Faqs",
    value: "faqs",
    icon: <Question />,
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
        <Tabs.List overflowX={"auto"}>
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
              {trigger.icon && (
                <Icon asChild boxSize={5}>
                  {trigger.icon}
                </Icon>
              )}
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
