import { Field } from "@realState/components/ui/field";
import { Switch, SwitchProps } from "@realState/components/ui/switch";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";
  interface ISwitchInputProps {
    name: string;
    control?: Control<any>;
    label?: string;
    helperText?: string;
    backendError?: string[];
  }
  
  const SwitchInput: FC<
    ISwitchInputProps & SwitchProps
  > = ({
    name,
    control,
    label,
    helperText,
    backendError,
    ...rest
  }) => {
    return (
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
                  <Switch
                    size={"lg"}
                    colorPalette={"primary"}
                    checked={value}
                    onCheckedChange={({ checked }) => onChange(checked)}
                    {...rest}
                  />
             
            </Field>
          )}
        />
      )
  };
  
  export default SwitchInput;
  