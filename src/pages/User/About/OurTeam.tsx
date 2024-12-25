import {
  Card,
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
import Masonry from "react-layout-masonry";
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

      <Masonry
        style={{ width: "100%" }}
        gap={12}
        columns={{ 0: 1, 340: 2, 720: 3, 1280: 4 }}
      >
        {isLoading
          ? [...Array(4)].fill(0).map(() => <LoadingCard key={Math.random()} />)
          : teams?.data?.rows.map((team, index) => (
              <Card.Root key={index} borderColor={"gray.300"} borderRadius={2}>
                <Card.Header
                  bg={team?.image ? "transparent" : "gray.100"}
                  p={team?.image ? 0 : 6}
                >
                  <LazyLoadImage
                    pos={"relative"}
                    w={"full"}
                    aspectRatio={4 / 3}
                    borderRadius={0}
                    src={team?.image ?? imageAssets.DefaultAvatar}
                    objectFit={team?.image ? "cover" : "contain"}
                  />
                </Card.Header>
                <Card.Body gap={2}>
                  <Card.Title
                    fontSize={{ base: "14px", sm: "16px", lg: "18px" }}
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
                </Card.Body>
                {team?.facebook && team?.instagram && team?.twitter && (
                  <Card.Footer>
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
                  </Card.Footer>
                )}
              </Card.Root>
            ))}
      </Masonry>
    </Stack>
  );
};

export default OurTeam;
