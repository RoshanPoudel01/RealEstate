import {
  Icon,
  Input,
  InputProps,
  NativeSelectRootProps,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { Field } from "@realState/components/ui/field";
import { InputGroup } from "@realState/components/ui/input-group";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@realState/components/ui/native-select";
import { PasswordInput } from "@realState/components/ui/password-input";
import { FC, ReactNode } from "react";
import { Control, Controller } from "react-hook-form";
interface ITextInputProps {
  name: string;
  control?: Control<any>;
  isControlled?: boolean;
  label?: string;
  helperText?: string;
  backendError?: string[];
  type?: string;
  startElement?: ReactNode;
  endElement?: ReactNode;
  options?: ReactNode;
}

const TextInput: FC<
  ITextInputProps & InputProps & TextareaProps & NativeSelectRootProps
> = ({
  name,
  control,
  isControlled = true,
  label,
  helperText,
  backendError,
  type,
  startElement,
  endElement,
  options,
  ...rest
}) => {
  return (
    isControlled && (
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Field
            label={label}
            invalid={!!error || !!backendError?.length}
            errorText={backendError?.[0] ?? error?.message}
            helperText={helperText}
            readOnly={rest.readOnly}
            required={rest.required}
          >
            <InputGroup
              flex={"1"}
              startElement={
                startElement && (
                  <Icon boxSize={5} asChild>
                    {startElement}
                  </Icon>
                )
              }
              endElement={
                endElement && (
                  <Icon boxSize={5} asChild>
                    {endElement}
                  </Icon>
                )
              }
              w={"full"}
            >
              {type === "textarea" ? (
                <Textarea
                  size={"xl"}
                  colorPalette={"primary"}
                  value={value}
                  onChange={onChange}
                  {...rest}
                />
              ) : type === "password" ? (
                <PasswordInput
                  size={"lg"}
                  colorPalette={"primary"}
                  value={value}
                  onChange={onChange}
                  {...rest}
                />
              ) : type === "select" ? (
                <NativeSelectRoot {...rest}>
                  <NativeSelectField value={value} onChange={onChange}>
                    {options}
                  </NativeSelectField>
                </NativeSelectRoot>
              ) : (
                <Input
                  size={"lg"}
                  colorPalette={"primary"}
                  value={value}
                  type={type}
                  onChange={onChange}
                  onWheel={(e) => {
                    const target = e.target as HTMLInputElement;
                    type == "number" && target.blur();
                  }}
                  {...rest}
                />
              )}
            </InputGroup>
          </Field>
        )}
      />
    )
  );
};

export default TextInput;
