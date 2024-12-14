import { HStack, Stack, Text } from "@chakra-ui/react";

interface SectionWrapperProps {
  title: string;
  heading: string;
  filterText?: string;
  viewAllText?: string;
  content: any;
}
const SectionWrapper = ({
  title,
  heading,
  filterText,
  viewAllText,
  content,
}: SectionWrapperProps) => {
  return (
    <Stack>
      <Text color="#263640" fontSize="14px" fontWeight="bolder">
        {title}
      </Text>
      <Stack
        px={{
          base: "0",
          md: "70px",
        }}
      >
        <HStack justifyContent="space-between">
          <Text color="primary.500" fontSize="20px" fontWeight="bolder">
            {heading}
          </Text>
          <Text color="#263640" fontSize="16px" fontWeight="bolder">
            {filterText}
          </Text>
          <Text
            color="#263640"
            fontSize="16px"
            fontWeight="bolder"
            cursor="pointer"
          >
            {viewAllText}
          </Text>
        </HStack>
        {content}
      </Stack>
    </Stack>
  );
};

export default SectionWrapper;
