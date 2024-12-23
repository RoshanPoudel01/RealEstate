import { Container, Stack, Text } from "@chakra-ui/react";
import { useFetchFrontSection } from "@realState/services/service-sections";
import Loader from "@realState/utils/Loader";
import parse from "html-react-parser";
import { t } from "i18next";

const TermsConditions = () => {
  const currentLang = localStorage.getItem("language") || "en";

  const { data: statSection, isLoading } = useFetchFrontSection(
    "terms-conditions-section",
    currentLang
  );
  return (
    <Container
      maxW={{ base: "95dvw", sm: "85dvw", md: "75dvw", xl: "65dvw" }}
      gap={4}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Stack
          py={{
            base: "10px",
            md: "50px",
          }}
          gap={4}
        >
          <Text
            fontSize={{ base: "32px", sm: "36px", md: "42px", xl: "50px" }}
            lineHeight={{ base: "50px", md: "69px" }}
            color={"primary.400"}
            fontWeight={700}
            textAlign={"center"}
          >
            {statSection?.data?.title ?? t("terms:heading")}
          </Text>
          <Text as={"div"}>{parse(statSection?.data?.description ?? "")}</Text>
        </Stack>
      )}
    </Container>
  );
};

export default TermsConditions;
