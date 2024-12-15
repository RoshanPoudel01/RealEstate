import { HStack, Separator, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface SectionWrapperProps {
  title: string;
  heading: string;
  filterText?: string;
  viewAllText?: string;
  viewAllNavigation?: string;
  content: any;
}
const SectionWrapper = ({
  title,
  heading,
  filterText,
  viewAllText,
  viewAllNavigation,
  content,
}: SectionWrapperProps) => {
  const navigate = useNavigate();

  return (
    <Stack>
      <HStack color={"red.400"} align={"center"}>
        <Separator borderColor={"red.400"} w={"30px"} borderWidth={"1px"} />
        <Text fontSize="14px" fontWeight="bolder">
          {title}
        </Text>
      </HStack>
      <Stack>
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
            _hover={{
              textDecoration: "underline",
            }}
            onClick={() => navigate(viewAllNavigation ?? "#")}
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
