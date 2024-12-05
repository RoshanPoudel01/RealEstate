import { Field } from "@realState/components/ui/field";
import {
  FileUploadDropzone,
  FileUploadDropzoneProps,
  FileUploadList,
  FileUploadRoot,
} from "@realState/components/ui/file-upload";
import { FC, useState } from "react";
import { Controller } from "react-hook-form";

interface IReactDropzoneProps {
  name: string;
  control: any;
  label: string;
  maxFileSize?: number;
  isMultiple?: boolean;
  maxFiles?: number;
  accept?: string[];
  required?: boolean;
  backendError?: string[];
}

const ReactDropzone: FC<IReactDropzoneProps & FileUploadDropzoneProps> = ({
  name,
  control,
  label,
  isMultiple,
  maxFiles,
  maxFileSize,
  accept,
  required,
  backendError,
  ...rest
}) => {
  const [fileError, setFileError] = useState<string | null>(null);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Field
          invalid={!!error || !!fileError || !!backendError}
          errorText={error?.message ?? backendError?.[0] ?? fileError}
          label={label}
          required={required}
        >
          <FileUploadRoot
            allowDrop
            onFileAccept={(file) => {
              onChange(isMultiple ? file.files : file.files[0]);
              setFileError(null);
            }}
            onFileReject={(file) => {
              setFileError(file.files[0]?.errors[0] ?? "");
            }}
            maxW="lg"
            required={required}
            accept={accept ?? ["image/*"]}
            alignItems="stretch"
            maxFiles={isMultiple ? maxFiles ?? 10 : 1}
            maxFileSize={maxFileSize && maxFileSize * 1024 * 1024}
            invalid={!!error || !!fileError || !!backendError}
          >
            <FileUploadDropzone
              label="Drag and drop here to upload"
              {...rest}
            />

            <FileUploadList maxW={"inherit"} clearable />
          </FileUploadRoot>
        </Field>
      )}
    />
  );
};

export default ReactDropzone;
