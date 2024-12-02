import { Center, Text, VStack } from "@chakra-ui/react";
import ServerErrorSvg from "../../assets/svgs/server-error.svg?react";
import { colorScheme } from "../../theme/colorScheme";

export function ServerError() {
  return (
    <Center height="100%" alignItems="center">
      <VStack>
        <ServerErrorSvg width="50vw" height="50vh" />
        <VStack>
          <Text fontSize="2xl" color={colorScheme.primary_500} fontWeight="600">
            Error 500: Internal Server Error
          </Text>
          <Text fontSize="xl" color="gray.500">
            Please reload the page or check your internet connection and try
            again.
          </Text>
        </VStack>
      </VStack>
    </Center>
  );
}
