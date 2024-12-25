/* eslint-disable @typescript-eslint/no-explicit-any */
// import { BaseURL } from "@/api/axiosSetup";
import {
  ConditionalValue,
  Flex,
  FlexProps,
  Icon,
  Text,
} from "@chakra-ui/react";
import { CloudArrowUp } from "@phosphor-icons/react";
import { Field, FieldProps } from "@realState/components/ui/field";
import convert from "convert";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Dropzone, { Accept, FileRejection } from "react-dropzone";
import { Control, Controller } from "react-hook-form";
import MultipleFilePreviews from "./MultipleFilePreview";
import SingleFilePreview from "./SingleFilePreview";

interface FileErrorProps {
  type: string;
  message: string;
}

interface IPrevFiles {
  id: number;
  url: string;
}

interface PreviewProps {
  url: string;
  fileName: string;
  fileType: string;
}

type DropzoneProps = {
  name: string;
  prevFiles?: IPrevFiles[];
  setPrevFiles?: Dispatch<SetStateAction<IPrevFiles[]>>;
  setRemoveImage?: Dispatch<SetStateAction<boolean>>;
  control?: Control<any>;
  label?: string;
  setDeleteImages?: Dispatch<SetStateAction<string[]>>;
  backendError?: string[];
  file?: string | null;
  required?: boolean;
  helperText?: string;
  message?: string;
  isMultiple?: boolean;
  padding?: ConditionalValue<string | number>;
  containerWidth?: ConditionalValue<string | number>;
  boxWidth?: ConditionalValue<string | number>;
  boxHeight?: ConditionalValue<string | number>;
  boxAspectRatio?: ConditionalValue<string | number>;
  marginX?: ConditionalValue<string | number>;
  noMaxSize?: boolean;
  options: {
    accept?: Accept;
    maxSize?: number;
  };
};

const ReactDropzone: FC<DropzoneProps & FieldProps & FlexProps> = ({
  name,
  control,
  isMultiple,
  message,
  label,
  file,
  required,
  helperText,
  prevFiles,
  setPrevFiles,
  setDeleteImages,
  setRemoveImage,
  noMaxSize,
  backendError,
  boxWidth,
  boxHeight,
  options,
  boxAspectRatio,
  ...rest
}) => {
  const { accept, maxSize } = options;

  const [acceptedFileList, setAcceptedFileList] = useState<Blob[]>([]);
  // const [rejectedFileList, setRejectedFileList] = useState<FileRejection[]>([]);

  const [preview, setPreview] = useState<PreviewProps[]>([]);
  const [fileError, setFileError] = useState<FileErrorProps | undefined>(
    undefined
  );

  useEffect(() => {
    if (file) {
      setPreview([
        {
          url: file,
          fileName: file.split("/").pop()!,
          fileType: file.split(".").pop()!,
        },
      ]);
    }
    1;
  }, [file]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => {
        useEffect(() => {
          if (file) {
            onChange(file);
          }
        }, [file]);

        const handleFileDrop: <T extends File>(
          acceptedFiles: T[],
          rejectedFiles: FileRejection[]
        ) => void | undefined = (acceptedFiles, rejectedFiles) => {
          if (rejectedFiles.length > 0) {
            const errorCode = rejectedFiles[0].errors[0].code;
            const errorMessage =
              errorCode === "file-too-large"
                ? `File size should be less than ${maxSize ?? 10} MB`
                : rejectedFiles[0].errors[0].message;
            setFileError({ type: errorCode, message: errorMessage });
          } else {
            setFileError(undefined);
          }

          acceptedFiles.forEach((file) => {
            const filePreview = {
              url: URL.createObjectURL(file),
              fileName: file.name,
              fileType: file.type,
            };

            if (isMultiple) {
              setAcceptedFileList((prev) => [...prev, file]);
              setPreview((prev) => [...prev, filePreview]);
            } else {
              setAcceptedFileList([file]);
              setPreview([filePreview]);
            }
            onChange(
              isMultiple
                ? [...acceptedFileList, ...acceptedFiles]
                : acceptedFiles[0]
            );
          });
        };
        return (
          <Field
            label={label}
            helperText={helperText}
            invalid={!!error || !!fileError || !!backendError}
            errorText={
              fileError?.message ?? error?.message ?? backendError?.[0]
            }
            required={required}
            {...rest}
          >
            <Flex
              flexDir={isMultiple ? "row" : "column"}
              gap={4}
              w={rest.w ?? "full"}
              maxW={rest.maxW ?? "full"}
              flexWrap={"wrap"}
              {...rest}
            >
              {isMultiple &&
                (preview.length > 0 ||
                  (prevFiles && prevFiles?.length > 0)) && (
                  <MultipleFilePreviews
                    files={preview}
                    prevFiles={prevFiles || []}
                    setDeleteImages={setDeleteImages}
                    setPrevFiles={setPrevFiles}
                    width={boxWidth ?? "200px"}
                    aspectRatio={boxAspectRatio ?? 1}
                    onDelete={(index) => {
                      setPreview(preview.filter((_, i) => i !== index));
                      setAcceptedFileList(
                        acceptedFileList.filter((_, i) => i !== index)
                      );
                    }}
                  />
                )}
              <Dropzone
                onDrop={(acceptedFiles, rejectedFiles) => {
                  handleFileDrop(acceptedFiles, rejectedFiles);
                }}
                maxSize={
                  maxSize
                    ? convert(maxSize, "MB").to("bytes")
                    : noMaxSize
                      ? undefined
                      : convert(10, "MB").to("bytes")
                }
                accept={accept ?? { "*/*": [".*"] }}
                multiple={!!isMultiple}
              >
                {({ getRootProps, getInputProps }) => (
                  <Flex
                    flexDir="column"
                    {...getRootProps()}
                    w={"full"}
                    maxW={boxWidth ?? "200px"}
                    aspectRatio={boxAspectRatio ?? 1}
                    border={"2px dashed rgba(200, 204, 209, 0.70)"}
                    bg={"gray.50"}
                    _hover={{ bg: "gray.100" }}
                    cursor={"pointer"}
                    borderColor={"gray.300"}
                    gap={4}
                    align={"center"}
                    textAlign={"center"}
                    justify={"center"}
                    borderRadius={"sm"}
                    p={1}
                  >
                    <input {...getInputProps()} />
                    <Flex
                      display={
                        !isMultiple && preview.length > 0 ? "none" : "flex"
                      }
                      flexDir="column"
                      gap={2}
                      align="center"
                    >
                      <Icon asChild boxSize={10}>
                        <CloudArrowUp />
                      </Icon>
                      <Text>
                        {isMultiple ? "Select file/s" : "Select a file"}
                      </Text>
                      {message && (
                        <Text color="gray.800" fontSize="sm">
                          {message}
                        </Text>
                      )}
                    </Flex>

                    {!isMultiple && preview.length > 0 && (
                      <SingleFilePreview
                        url={preview[0].url}
                        fileName={preview[0].fileName ?? ""}
                        aspectRatio={boxAspectRatio ?? 1}
                        onDelete={() => {
                          setPreview([]); // Clear the preview
                          setAcceptedFileList([]); // Clear the accepted files list
                          setRemoveImage && setRemoveImage(true); // Clear the remove image
                        }}
                      />
                    )}
                  </Flex>
                )}
              </Dropzone>
            </Flex>
          </Field>
        );
      }}
    />
  );
};

export default ReactDropzone;
