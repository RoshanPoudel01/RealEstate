import { Button, Center, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PageNotFoundSvg from "../../assets/svgs/page_not_found.svg?react";
import { colorScheme } from "../../theme/colorScheme";
import { ServerError } from "./ServerError";

interface IPageNotFound {
  isLoading?: boolean;
  isError?: boolean;
}

export function PageNotFound({ isLoading, isError }: IPageNotFound) {
  const navigate = useNavigate();
  return isLoading ? null : isError ? (
    <ServerError />
  ) : (
    <Center height="100%" alignItems="center" maxH="90vh">
      <VStack>
        <PageNotFoundSvg width="50vw" height="50vh" />
        <VStack>
          <Text fontSize="2xl" color={colorScheme.primary_500} fontWeight="600">
            404: Nothing Found.
          </Text>
          <Text fontSize="xl" color="gray.500">
            We can’t seem to find the page you’re looking for.
          </Text>
        </VStack>
        <Button onClick={() => navigate("/", { replace: false })}>
          Go to Home
        </Button>
      </VStack>
    </Center>
  );
}
