import {
  Card,
  Heading,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
} from "@phosphor-icons/react";
import { imageAssets } from "@realState/assets/images";
import LazyLoadImage from "@realState/components/Image";
import { Skeleton, SkeletonText } from "@realState/components/ui/skeleton";
import { useFetchFrontTeams } from "@realState/services/service-teams";

const OurTeam = () => {
  const { data: teams, isLoading } = useFetchFrontTeams();
  const currentLang = localStorage.getItem("language") || "en";
  return (
    <Stack align={"center"} gap={4}>
      <Heading
        color={"red.400"}
        fontSize={"35px"}
        lineHeight={"69px"}
        textAlign={"center"}
      >
        {currentLang === "np" ? "हाम्रो संघ" : "Meet Our Team"}
      </Heading>

      <SimpleGrid
        w={"full"}
        columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
        gapX={6}
        gapY={8}
      >
        {isLoading ? (
          <>
            {...Array(4)
              .fill(0)
              .map(() => (
                <Card.Root h={"full"} w={"full"}>
                  <Card.Header p={0}>
                    <Skeleton w={"full"} h={"200px"} />
                  </Card.Header>
                  <Card.Body gap={2}>
                    <SkeletonText noOfLines={1} w={"full"} />
                    <SkeletonText noOfLines={1} w={"full"} />
                    <SkeletonText h={"50px"} noOfLines={1} w={"full"} />
                  </Card.Body>
                </Card.Root>
              ))}
          </>
        ) : (
          <>
            {teams?.data?.rows.map((team, index) => (
              <Card.Root key={index} borderColor={"gray.300"} borderRadius={2}>
                <Card.Header
                  bg={team?.image ? "transparent" : "gray.100"}
                  p={team?.image ? 0 : 6}
                >
                  <LazyLoadImage
                    pos={"relative"}
                    w={"full"}
                    aspectRatio={4 / 3}
                    src={team?.image ?? imageAssets.DefaultAvatar}
                    objectFit={team?.image ? "cover" : "contain"}
                  />
                </Card.Header>
                <Card.Body gap={2}>
                  <Card.Title>
                    {currentLang === "en" ? team.name_en : team.name_np}
                  </Card.Title>
                  <Card.Description color={"gray.900"} fontSize={"15px"}>
                    {currentLang === "en" ? team.position_en : team.position_np}
                  </Card.Description>
                  <Card.Description>
                    {currentLang === "en"
                      ? team.description_en
                      : team.description_np}
                  </Card.Description>
                </Card.Body>
                <Card.Footer>
                  <HStack>
                    <IconButton
                      rounded={"full"}
                      variant={"subtle"}
                      colorPalette={"gray"}
                    >
                      <Icon asChild boxSize={6}>
                        <FacebookLogo />
                      </Icon>
                    </IconButton>
                    <IconButton
                      rounded={"full"}
                      variant={"subtle"}
                      colorPalette={"gray"}
                    >
                      <Icon asChild boxSize={6}>
                        <InstagramLogo />
                      </Icon>
                    </IconButton>
                    <IconButton
                      rounded={"full"}
                      variant={"subtle"}
                      colorPalette={"gray"}
                    >
                      <Icon asChild boxSize={6}>
                        <TwitterLogo />
                      </Icon>
                    </IconButton>
                  </HStack>
                </Card.Footer>
              </Card.Root>
            ))}
          </>
        )}
      </SimpleGrid>
    </Stack>
  );
};

export default OurTeam;
