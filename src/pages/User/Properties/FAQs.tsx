import { Heading, Stack, Text } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@realState/components/ui/accordion";
import { t } from "i18next";
import { FC } from "react";

interface IFaqs {
  id: number;
  question: string;
  answer: string;
}

interface IFaqs {
  faqs: IFaqs[];
  currentLanguage: string | null;
}

const FAQs: FC<IFaqs> = ({ faqs, currentLanguage }) => {
  return (
    <Stack
      w={"full"}
      maxW={{
        base: "90%",
        md: "70%",
        xl: "60%",
        "2xl": "50%",
      }}
      mx={"auto"}
      align={"center"}
      gap={4}
      mt={10}
      py={10}
    >
      <Heading color={"primary.500"} fontSize={{ base: "xl", md: "3xl" }}>
        {t("faq:heading")}
      </Heading>
      <Text>{t("faq:description")}</Text>
      {faqs?.map((item, index) => (
        <AccordionRoot
          size={"lg"}
          multiple
          defaultValue={[""]}
          variant={"enclosed"}
        >
          <AccordionItem key={index} value={item.question ?? ""}>
            <AccordionItemTrigger>{item.question}</AccordionItemTrigger>
            <AccordionItemContent>{item.answer}</AccordionItemContent>
          </AccordionItem>
        </AccordionRoot>
      ))}
    </Stack>
  );
};

export default FAQs;
