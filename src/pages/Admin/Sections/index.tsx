import { Card, Collapsible, HStack, Icon, Stack } from "@chakra-ui/react";
import { CaretDown } from "@phosphor-icons/react";
import PageHeader from "@realState/utils/PageHeader";
import { FC, useState } from "react";
import SectionFrom from "./Form";

interface SectionProps {
  heading: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Section: FC<SectionProps> = ({ heading, defaultOpen, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card.Root>
      <Collapsible.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        defaultOpen={defaultOpen}
      >
        <Collapsible.Trigger asChild>
          <Card.Header
            cursor={"pointer"}
            py={4}
            borderBottom={"1px solid"}
            borderColor={"gray.200"}
            textAlign={"center"}
          >
            <HStack justify={"space-between"} w={"full"}>
              <Card.Title>{heading}</Card.Title>
              <Icon
                asChild
                transform={open ? "rotate(180deg)" : ""}
                transition={"transform .25s ease"}
                boxSize={8}
              >
                <CaretDown />
              </Icon>
            </HStack>
          </Card.Header>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Card.Body>{children}</Card.Body>
        </Collapsible.Content>
      </Collapsible.Root>
    </Card.Root>
  );
};

const Sections = () => {
  return (
    <Stack gap={8}>
      <PageHeader
        heading="Sections"
        description="Manage the sections of the website"
      />
      <Section heading="Hero Section" defaultOpen>
        <SectionFrom slug="hero-section" />
      </Section>
      <Section heading="Statistics Section">
        <SectionFrom slug="statistics-section" />
      </Section>
      <Section heading="Contact Section">
        <SectionFrom slug="contact-section" />
      </Section>
    </Stack>
  );
};

export default Sections;
