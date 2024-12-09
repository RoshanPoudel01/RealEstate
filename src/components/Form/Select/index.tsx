"use client";

import {
  FieldErrorText,
  ListCollection,
  SelectContent,
  SelectIndicator,
  SelectItem,
  SelectRoot,
  SelectRootProps,
  SelectTrigger,
  SelectValueText,
  Stack,
} from "@chakra-ui/react";
import { Field } from "@realState/components/ui/field";

import { Control, Controller } from "react-hook-form";

// const formSchema = z.object({
//   framework: z.string({ message: "Framework is required" }).array(),
// });

interface CustomSelectProps extends SelectRootProps {
  name: string;
  control: Control<any>;
  collection: ListCollection<{
    label: string;
    value: string;
  }>;
  label?: string;
  hasError?: boolean;
  placeholder: string;
  isMulti?: boolean;
}
const Select = ({
  name,
  control,
  collection,
  label,
  hasError,
  placeholder,
  isMulti,
}: CustomSelectProps) => {
  //   const {
  //     handleSubmit,
  //     formState: { errors },
  //     control,
  //   } = useForm({});

  return (
    <Stack gap="4" align="flex-start">
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Field label={label} invalid={hasError} errorText={""} width="320px">
            <SelectRoot
              multiple={isMulti}
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => field.onChange(value)}
              onInteractOutside={() => field.onBlur()}
              collection={collection}
            >
              <SelectTrigger>
                <SelectValueText placeholder={placeholder} />
                <SelectIndicator />
              </SelectTrigger>
              <SelectContent>
                {collection.items.map((movie) => (
                  <SelectItem item={movie} key={movie.value}>
                    {movie.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <FieldErrorText>{error?.message}</FieldErrorText>
          </Field>
        )}
      />
    </Stack>
  );
};

export default Select;
