import { CheckboxGroup, ConditionalValue, HStack } from "@chakra-ui/react";
import {
  CheckboxCard,
  CheckboxCardProps,
} from "@realState/components/ui/checkbox-card";
import { Field } from "@realState/components/ui/field";
import React, { ReactElement } from "react";
import { Control, Controller } from "react-hook-form";

interface ICheckboxInputProps {
  name: string;
  label?: string;
  control: Control<any>;
  backendError?: string[];
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  width?: ConditionalValue<number | string>;
  my?: ConditionalValue<number | string>;
  options: { label: string | ReactElement; value: string }[]; // List of options
}

const CheckboxInput: React.FC<ICheckboxInputProps & CheckboxCardProps> = ({
  name,
  label,
  control,
  options,
  backendError,
  isDisabled,
  isReadOnly,
  isRequired,
  width,
  my,
  ...rest
}) => {
  console.log({ options });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Field
          invalid={!!error || !!backendError}
          errorText={backendError?.[0] ?? error?.message}
          required={isRequired}
          disabled={isDisabled}
          readOnly={isReadOnly}
          width={width}
          my={my}
          label={label}
        >
          <CheckboxGroup
            value={value}
            onValueChange={onChange} // Chakra CheckboxGroup automatically handles the array of selected values
            name={name}
          >
            <HStack flexWrap="wrap" gap={4}>
              {options.map((option, index) => (
                <CheckboxCard
                  key={index}
                  label={option.label}
                  value={option.value}
                  {...rest}
                />
              ))}
            </HStack>
          </CheckboxGroup>
        </Field>
      )}
    />
  );
};

export default CheckboxInput;
