// SingleFilePreview.tsx

import { ConditionalValue, Flex, Icon, IconButton } from "@chakra-ui/react";
import { Trash } from "@phosphor-icons/react";
import LazyLoadImage from "@realState/components/Image";
import React from "react";

interface SingleFilePreviewProps {
  url: string;
  fileName: string;
  onDelete: () => void;
  aspectRatio?: ConditionalValue<string | number>;
}

const SingleFilePreview: React.FC<SingleFilePreviewProps> = ({
  url,
  // fileName,
  onDelete,
  aspectRatio,
}) => {
  return (
    <Flex gap={2} flexDir="column" position="relative" overflow={"hidden"}>
      <LazyLoadImage
        w={"full"}
        objectFit="cover"
        objectPosition={"center"}
        border={"1px solid"}
        borderColor={"gray.500"}
        borderRadius={"5px"}
        overflow={"hidden"}
        src={url}
        aspectRatio={aspectRatio ?? 1}
      />
      {/* <Text
        pos={"absolute"}
        bottom={0}
        left={0}
        right={0}
        bg={"white"}
        opacity={0.9}
        color={"black"}
        fontSize={{ base: "xs", sm: "sm" }}
        p={2}
        overflow={"hidden"}
        whiteSpace={"nowrap"} // Prevent text wrapping
        textOverflow={"ellipsis"} // Truncate text with ellipsis
      >
        {fileName}
      </Text> */}

      <IconButton
        alignSelf={"center"}
        aria-label="Delete Image"
        borderRadius={2}
        colorPalette="red"
        size="xs"
        variant={"subtle"}
        position="absolute"
        top={0}
        right={0}
        onClick={(event) => {
          event.stopPropagation();
          onDelete();
        }}
      >
        <Icon boxSize={6} asChild>
          <Trash />
        </Icon>
      </IconButton>
    </Flex>
  );
};

export default SingleFilePreview;
