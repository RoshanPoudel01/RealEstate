import { HStack, Input, InputProps, TextareaProps } from "@chakra-ui/react";
import { Field } from "@realState/components/ui/field";
import { Tag } from "@realState/components/ui/tag";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";

interface TagInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  isRequired?: boolean;
  isFloating?: boolean;
  required?: boolean;
  helperText?: ReactNode;
}
const TagInput: React.FC<TagInputProps & InputProps & TextareaProps> = ({
  name,
  control,
  label,
  isRequired,
  isFloating = true,
  required,
  helperText,
  ...extraProps
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [currentValue, setCurrentValue] = useState<string>("");
  const [dataInput, setDataInput] = useState<string[]>([]);

  const addTag = () => {
    if (currentValue.trim().length > 0) {
      setDataInput([...dataInput, currentValue.trim().replace(",", "")]);
      setCurrentValue("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "," || event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      addTag();
    } else if (
      event.key === "Backspace" &&
      currentValue.length === 0 &&
      dataInput.length > 0
    ) {
      setDataInput(dataInput.slice(0, -1));
    }
  };

  const handleDeleteItem = (index: number) => {
    const dataInputTemp = [...dataInput];
    dataInputTemp.splice(index, 1);
    setDataInput(dataInputTemp);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        useEffect(() => {
          onChange(dataInput);
        }, [dataInput]);

        useEffect(() => {
          if (value?.length > 0 && dataInput.length === 0) {
            setDataInput(value);
          }
        }, [value]);

        return (
          <Field
            id={name}
            required={!!isRequired}
            invalid={!!error}
            errorText={error?.message}
            label={label}
            helperText={helperText}
          >
            <HStack
              outline={"2px solid transparent"}
              outlineOffset={"2px"}
              transition={"outline-offset 0.15s, outline-width 0.15s"}
              border={"1px solid"}
              borderColor={"gray.200"}
              borderRadius={5}
              pos={"relative"}
              cursor={"text"}
              _focusWithin={{
                zIndex: 1,
                border: "2px solid",
                borderColor: "primary.500",
              }}
              w={"100%"}
              flexWrap={"wrap"}
              onBlur={() => {
                addTag();
              }}
              bg={"white"}
              fontSize={{ base: "14px", md: "16px" }}
              onClick={() => inputRef.current?.focus()}
              px={2}
              minH={"var(--chakra-sizes-11)"}
              data-has-value={dataInput?.length > 0}
            >
              {dataInput.map((text, i) => (
                <Tag
                  my={"4px"}
                  fontSize={{ base: "12px", md: "14px" }}
                  colorScheme="white"
                  borderRadius={5}
                  key={i + "_" + text}
                  alignItems={"center"}
                  closable
                  onClose={() => handleDeleteItem(i)}
                >
                  {text}
                </Tag>
              ))}
              <Input
                border={0}
                outline={0}
                width={`${currentValue?.length + 1}ch`}
                minH={"unset"}
                p={0}
                ref={inputRef}
                _hover={{ border: "none" }}
                _focus={{ border: "none" }}
                placeholder={""}
                onKeyDown={handleKeyPress}
                fontSize={{ base: "14px", md: "16px" }}
                onChange={(e) => setCurrentValue(e.target.value)}
                value={currentValue ?? ""}
                boxShadow="none !important"
                {...extraProps}
              />
            </HStack>
          </Field>
        );
      }}
    />
  );
};

export default TagInput;
