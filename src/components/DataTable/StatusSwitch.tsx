import { useMutate } from "@realState/services/service-form-methods";
import { FC } from "react";
import { toastFail } from "../Toast";
import { Switch, SwitchProps } from "../ui/switch";

interface IStatusProps {
  model: string;
  id: number;
  invalidates?: string[];
}

const useUpdateStatus = ({ model, id, invalidates }: IStatusProps) => {
  return useMutate({
    url: `/admin/toggle-status/${model}/${id}`,
    invalidates: invalidates ?? [`${model}s`],
    enabled: !!id,
    method: "POST",
    queryKey: [`${model}s`],

    message: "Status updated successfully.",
  });
};

interface StatusSwitchProps {
  model: string;
  rowId: number;
  isActive: boolean;
}

const StatusSwitch: FC<StatusSwitchProps & SwitchProps> = ({
  isActive,
  rowId,
  model,
  ...rest
}) => {
  const { mutateAsync } = useUpdateStatus({ id: rowId, model });

  const handleChange = async () => {
    try {
      if (rowId !== null) {
        await mutateAsync({
          id: String(rowId),
          data: {
            is_active: !isActive,
          },
        });
      } else {
        toastFail("Something went wrong");
      }
      // Handle success if needed
    } catch (error) {
      toastFail("Something went wrong");
    }
  };

  return (
    <Switch
      colorPalette={"primary"}
      checked={isActive}
      onCheckedChange={handleChange}
      {...rest}
    />
  );
};

export default StatusSwitch;
