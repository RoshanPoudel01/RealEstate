import { Field } from "@realState/components/ui/field";
import { Slider, SliderProps } from "@realState/components/ui/slider";
import { Control, Controller } from "react-hook-form";

interface RangeSliderProps extends SliderProps {
  control: Control<any>;
  name: string;
  label: string;
  defaultValue?: number[];
  steps?: number;
  indicators?: Array<number | { value: number; label: React.ReactNode }>;
}
const RangeSlider = ({
  control,
  name,
  label,
  defaultValue,
  steps,
  indicators,
}: RangeSliderProps) => {
  return (
    <Controller
      name="value"
      control={control}
      render={({ field, formState: { errors } }) => (
        <Field
          //   label={label}
          invalid={!!errors}
          errorText={errors?.root?.message}
        >
          <Slider
            width="full"
            onFocusChange={({ focusedIndex }) => {
              if (focusedIndex !== -1) return;
              field.onBlur();
            }}
            name={name}
            value={field.value}
            onValueChange={({ value }) => {
              field.onChange(value);
            }}
            defaultValue={defaultValue}
            step={steps}
            marks={indicators}
            colorPalette={"primary"}
            size={"lg"}
          />
        </Field>
      )}
    />
  );
};
export default RangeSlider;
