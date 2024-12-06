// SingleFilePreview.tsx

import { Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { Trash } from "@phosphor-icons/react";
import LazyLoadImage from "@realState/components/Image";
import React from "react";

interface SingleFilePreviewProps {
  url: string;
  fileName: string;
  onDelete: () => void;
}

const SingleFilePreview: React.FC<SingleFilePreviewProps> = ({
  url,
  fileName,
  onDelete,
}) => {
  return (
    <Flex
      p={2}
      gap={2}
      flexDir="column"
      position="relative"
      overflow={"hidden"}
    >
      <LazyLoadImage
        w={"full"}
        aspectRatio={1}
        objectFit="cover"
        objectPosition={"center"}
        border={"1px solid"}
        borderColor={"gray.500"}
        borderRadius={"5px"}
        src={url}
      />
      <Text
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
      </Text>

      <IconButton
        alignSelf={"center"}
        aria-label="Delete Image"
        borderRadius={"sm"}
        colorPalette="red"
        size="sm"
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
