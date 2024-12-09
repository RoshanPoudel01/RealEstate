import { Tabs } from "@chakra-ui/react";
import PageHeader from "@realState/utils/PageHeader";
import { FAQs, General, Images } from "./panels";

const triggers = [
  {
    label: "General",
    value: "general",
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
  return (
    <>
      <PageHeader heading="Property Form" description="Add new property" />
      <Tabs.Root
        variant={"enclosed"}
        colorPalette={"primary"}
        lazyMount
        unmountOnExit
        defaultValue={triggers[0].value}
      >
        <Tabs.List>
          {triggers.map((trigger, index) => (
            <Tabs.Trigger key={index} value={trigger.value}>
              {trigger.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value={triggers[0].value}>
          <General />
        </Tabs.Content>
        <Tabs.Content value={triggers[1].value}>
          <Images />
        </Tabs.Content>
        <Tabs.Content value={triggers[2].value}>
          <FAQs />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default PropertyForm;
