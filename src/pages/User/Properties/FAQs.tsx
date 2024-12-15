import { Heading, Stack, Text } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@realState/components/ui/accordion";
import { FaqResponse } from "@realState/services/service-properties";
import { FC } from "react";

interface IFaqs {
  faqs: FaqResponse[];
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
        Frequently Asked Questions
      </Heading>
      <Text>
        Have any questions? We have answers to some of the most common queries.
      </Text>
      <AccordionRoot
        size={"lg"}
        multiple
        defaultValue={[""]}
        variant={"enclosed"}
      >
        {faqs?.map((item, index) => (
          <AccordionItem
            key={index}
            value={
              currentLanguage === "en"
                ? (item.question_en ?? "")
                : (item.question_np ?? "")
            }
          >
            <AccordionItemTrigger>
              {currentLanguage === "en" ? item.question_en : item.question_np}
            </AccordionItemTrigger>
            <AccordionItemContent>
              {currentLanguage === "en" ? item.answer_en : item.answer_np}
            </AccordionItemContent>
          </AccordionItem>
        ))}
      </AccordionRoot>
    </Stack>
  );
};

export default FAQs;