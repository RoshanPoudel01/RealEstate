// MultipleFilePreviews.tsx

import { ConditionalValue, Flex, Icon, IconButton } from "@chakra-ui/react";
import { File, FileVideo, Trash } from "@phosphor-icons/react";
import LazyLoadImage from "@realState/components/Image";
import React, { Dispatch, SetStateAction } from "react";

interface IPrevFiles {
  id: number;
  url: string;
}

interface FilePreview {
  url: string;
  fileType: string;
  fileName: string;
}

interface MultipleFilePreviewsProps {
  files: FilePreview[];
  prevFiles?: IPrevFiles[];
  setPrevFiles?: Dispatch<SetStateAction<IPrevFiles[]>>;
  setDeleteImages?: Dispatch<SetStateAction<string[]>>;
  onDelete: (index: number) => void;
  aspectRatio?: ConditionalValue<string | number>;
  width?: ConditionalValue<string | number>;
  height?: ConditionalValue<string | number>;
}

const flexProps = {
  position: "relative",
  flexDir: "column" as const,
  gap: 4,
  flexShrink: 0,
  border: "1px solid",
  borderColor: "gray.200",
  borderRadius: "sm",
  overflow: "hidden",
  bg: "rgba(241,242,244,0.40)",
  role: "files",
  cursor: "pointer",
  align: "center",
  justify: "center",
  textAlign: "center" as const,
};

// const textProps = {
//   pos: "absolute",
//   bottom: 0,
//   left: 0,
//   right: 0,
//   bg: "white",
//   opacity: 0.9,
//   textColor: "black",
//   fontSize: {
//     base: "xs",
//     sm: "sm",
//   },
//   p: 2,
//   overflow: "hidden",
//   whiteSpace: "nowrap",
//   textOverflow: "ellipsis",
// };

const buttonProps = {
  alignSelf: "center",
  "aria-label": "Delete Image",
  borderRadius: 2,
  colorPalette: "red",
  variant: "subtle" as const,
  size: "xs" as const,

  position: "absolute",
  top: 0,
  right: 0,
};

const MultipleFilePreviews: React.FC<MultipleFilePreviewsProps> = ({
  files,
  prevFiles,
  setPrevFiles,
  setDeleteImages,
  onDelete,
  width,
  height,
  aspectRatio,
}) => {
  return (
    <>
      {prevFiles &&
        prevFiles?.length > 0 &&
        prevFiles?.map((file, index) => {
          const isVideo = /\.(mp4|webm|ogg|mkv)$/i.test(file.url); // Check for common video extensions
          const isImage = /\.(jpe?g|png|gif|bmp)$/i.test(file.url); // Check for common image extensions
          return (
            <Flex {...flexProps} key={index}>
              {isVideo ? (
                <Flex
                  w={width}
                  h={height}
                  aspectRatio={aspectRatio ?? 1}
                  align="center"
                  justify="center"
                >
                  <Icon asChild boxSize={16}>
                    <FileVideo />
                  </Icon>
                </Flex>
              ) : isImage ? (
                <LazyLoadImage
                  w={width}
                  h={height}
                  objectFit={"cover"}
                  aspectRatio={aspectRatio ?? 1}
                  src={file.url}
                />
              ) : (
                <Flex
                  w={width}
                  h={height}
                  aspectRatio={aspectRatio ?? 1}
                  align="center"
                  justify="center"
                >
                  <Icon asChild boxSize={16}>
                    <File />
                  </Icon>
                </Flex>
              )}
              {/* <Text {...textProps}>{file.url.split("/").pop()!}</Text> */}

              <IconButton
                {...buttonProps}
                onClick={(e) => {
                  e.stopPropagation();
                  if (setPrevFiles) {
                    setPrevFiles((prevFiles) =>
                      prevFiles.filter((prevFile) => prevFile.id !== file.id)
                    );
                    setDeleteImages &&
                      setDeleteImages((ids) => [...ids, String(file.id)]);
                  }
                }}
              >
                <Icon asChild boxSize={6}>
                  <Trash />
                </Icon>
              </IconButton>
            </Flex>
          );
        })}
      {files.map((file, index) => {
        const isVideo = file.fileType.includes("video");
        const isImage = file.fileType.includes("image");
        return (
          <Flex {...flexProps} key={index}>
            {isVideo ? (
              <Flex
                w={width}
                h={height}
                aspectRatio={aspectRatio ?? 1}
                align="center"
                justify="center"
              >
                <Icon asChild boxSize={16}>
                  <FileVideo />
                </Icon>
              </Flex>
            ) : isImage ? (
              <LazyLoadImage
                w={width}
                h={height}
                objectFit={"cover"}
                aspectRatio={aspectRatio ?? 1}
                src={file.url}
              />
            ) : (
              <Flex
                w={width}
                h={height}
                aspectRatio={aspectRatio ?? 1}
                align="center"
                justify="center"
              >
                <Icon asChild boxSize={16}>
                  <File />
                </Icon>
              </Flex>
            )}

            {/* <Text {...textProps}>{file.fileName}</Text> */}
            <IconButton
              {...buttonProps}
              onClick={(e) => {
                e.stopPropagation();
                if (onDelete) {
                  onDelete(index);
                }
              }}
            >
              <Icon asChild boxSize={6}>
                <Trash />
              </Icon>
            </IconButton>
          </Flex>
        );
      })}
    </>
  );
};

export default MultipleFilePreviews;
