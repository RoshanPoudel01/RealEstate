import { Icon, IconButton } from "@chakra-ui/react";
import { Trash } from "@phosphor-icons/react";
import { Button } from "@realState/components/ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@realState/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

interface IDeleteAlertProps {
  onConfirm: () => void;
  heading?: string;
  description?: string;
  deleteText?: string;
  isDeleteLoading?: boolean;
  cancelText?: string;
  trigger?: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DeleteAlert: React.FC<IDeleteAlertProps> = ({
  onConfirm,
  heading,
  description,
  deleteText,
  isDeleteLoading,
  cancelText,
  trigger,
  open,
  setOpen,
}) => {
  return (
    <DialogRoot
      role="alertdialog"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      onInteractOutside={() => setOpen(false)}
      lazyMount
      unmountOnExit
    >
      <DialogTrigger asChild>
        {trigger ?? (
          <IconButton size={"sm"} colorPalette={"red"} aria-label="Delete">
            <Icon asChild boxSize={6} borderRadius={5}>
              <Trash />
            </Icon>
          </IconButton>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{heading ?? "Are you sure?"}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {description ??
            "Are you sure you want to delete this item? This cannot be undone."}
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">{cancelText ?? "Cancel"}</Button>
          </DialogActionTrigger>
          <Button
            colorPalette="red"
            loading={isDeleteLoading}
            onClick={onConfirm}
          >
            <Icon asChild boxSize={5}>
              <Trash />
            </Icon>
            {deleteText ?? "Delete"}
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default DeleteAlert;
