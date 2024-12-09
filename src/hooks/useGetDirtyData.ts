import { FieldValues, FormState } from "react-hook-form";

const useGetDirtyData = <T extends FieldValues>(
  formState: FormState<T>,
  data: T
): Record<string, any> => {
  const dirtyFields: Partial<
    Readonly<{
      [x: string]: any;
    }>
  > = formState.dirtyFields;
  return Object.keys(dirtyFields).reduce((acc: Record<string, any>, key) => {
    // Type assertion to satisfy TypeScript
    if (dirtyFields[key]) {
      acc[key] = data[key as keyof T];
    }
    return acc;
  }, {});
};

export default useGetDirtyData;
