import {
  Box,
  Card,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
} from "@phosphor-icons/react";
import { imageAssets } from "@realState/assets/images";
import LoadingCard from "@realState/components/Cards/LoadingCard";
import LazyLoadImage from "@realState/components/Image";
import { useFetchFrontTeams } from "@realState/services/service-teams";
import { t } from "i18next";
import { Link } from "react-router-dom";

const OurTeam = () => {
  const currentLang = localStorage.getItem("language") || "en";
  const { data: teams, isLoading } = useFetchFrontTeams({
    language: currentLang,
  });
  return (
    <Stack align={"center"} gap={4}>
      <Heading
        color={"red.400"}
        fontSize={"35px"}
        lineHeight={"69px"}
        textAlign={"center"}
      >
        {t("team:heading")}
      </Heading>
      <Flex
        gap={4}
        maxW={{ base: "100%", sm: "95%", md: "60%", "2xl": "50%" }}
        w={"full"}
      >
        <Stack align={"center"} justify={"center"} w={"full"} gap={4}>
          {isLoading
            ? [...Array(2)]
                .fill(0)
                .map(() => (
                  <LoadingCard
                    flexDir={{ base: "column", sm: "row" }}
                    gap={4}
                    key={Math.random()}
                    skeletonWidth={"200px"}
                    skeletonAspectRatio={1}
                  />
                ))
            : teams?.data?.rows.slice(0, 2).map((team, index) => (
                <Card.Root
                  key={index}
                  borderColor={"gray.300"}
                  borderRadius={2}
                  _hover={{
                    transform: "translateY(-5px)",
                  }}
                  w={"full"}
                  transition={"transform 0.3s ease"}
                  flexDir={"row"}
                >
                  <Card.Header p={0} bg={team?.image ? "gray.200" : "gray.100"}>
                    <HStack h={"100%"} gap={0}>
                      <Box w={"10px"} bg={"primary.400"} h={"100%"} />
                      <LazyLoadImage
                        pos={"relative"}
                        w={{ base: "100px", sm: "200px" }}
                        h={{ base: "100%", sm: "200px" }}
                        aspectRatio={1}
                        borderRadius={0}
                        src={team?.image ?? imageAssets.DefaultAvatar}
                      />
                    </HStack>
                  </Card.Header>
                  <Card.Body
                    px={1}
                    alignItems={"center"}
                    gap={2}
                    textAlign={"center"}
                  >
                    <Card.Title
                      fontSize={{ base: "14px", sm: "16px", lg: "18px" }}
                      color={"gray.900"}
                    >
                      {team.name}
                    </Card.Title>
                    <Card.Description
                      color={"gray.900"}
                      fontSize={{ base: "12px", md: "14px" }}
                    >
                      {team.position}
                    </Card.Description>
                    <Card.Description fontSize={{ base: "12px", md: "14px" }}>
                      {team.description}
                    </Card.Description>
                    <HStack>
                      {team?.facebook && (
                        <IconButton
                          rounded={"full"}
                          variant={"subtle"}
                          colorPalette={"gray"}
                          asChild
                        >
                          <Link to={team.facebook} target="_blank">
                            <Icon asChild boxSize={6}>
                              <FacebookLogo />
                            </Icon>
                          </Link>
                        </IconButton>
                      )}
                      {team?.instagram && (
                        <IconButton
                          rounded={"full"}
                          variant={"subtle"}
                          colorPalette={"gray"}
                          asChild
                        >
                          <Link to={team.instagram} target="_blank">
                            <Icon asChild boxSize={6}>
                              <InstagramLogo />
                            </Icon>
                          </Link>
                        </IconButton>
                      )}
                      {team?.twitter && (
                        <IconButton
                          rounded={"full"}
                          variant={"subtle"}
                          colorPalette={"gray"}
                          asChild
                        >
                          <Link to={team.twitter} target="_blank">
                            <Icon asChild boxSize={6}>
                              <TwitterLogo />
                            </Icon>
                          </Link>
                        </IconButton>
                      )}
                    </HStack>
                  </Card.Body>
                </Card.Root>
              ))}
        </Stack>
      </Flex>
    </Stack>
  );
};

export default OurTeam;
