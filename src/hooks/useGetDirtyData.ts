import { FieldValues, FormState } from "react-hook-form";

const useGetDirtyData = <T extends FieldValues>(
  formState: FormState<T>,
  data: T,
  defaultValues: T
): Record<string, any> => {
  const dirtyFields: Partial<
    Readonly<{
      [x: string]: any;
    }>
  > = formState.dirtyFields;
  console.log({ formState, data, dirtyFields });

  return Object.keys(data).reduce((acc: Record<string, any>, key) => {
    if (
      dirtyFields[key] || // Dirty fields tracking
      data[key as keyof T] !== defaultValues[key as keyof T] // Fallback: compare with defaultValues
    ) {
      acc[key] = data[key as keyof T];
    }
    return acc;
  }, {});
};

export default useGetDirtyData;
