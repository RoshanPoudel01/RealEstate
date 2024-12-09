import {
  DialogContentProps,
  Flex,
  Icon,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { Pencil, Plus } from "@phosphor-icons/react";
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
import React, { FC } from "react";
import { SubmitHandler } from "react-hook-form";
interface IModalFormProps {
  onSubmit: SubmitHandler<any>;
  heading?: string;
  submitText?: string;
  isSubmitting?: boolean;
  cancelText?: string;
  trigger?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose?: () => void;
  id?: string | number | null;
  children: React.ReactNode;
  formId?: string;
  isFetching?: boolean;
}
const ModalForm: FC<IModalFormProps & DialogContentProps> = ({
  onSubmit,
  id,
  heading,
  children,
  submitText,
  isSubmitting,
  isFetching,
  cancelText,
  trigger,
  open,
  onOpenChange,
  onClose,
  formId = "modal-form",
  ...rest
}) => {
  return (
    <DialogRoot
      open={open}
      onOpenChange={(e) => {
        onClose && onClose();
        onOpenChange(e.open);
      }}
      scrollBehavior={"inside"}
      lazyMount
      unmountOnExit
      motionPreset={"slide-in-top"}
      preventScroll
    >
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : id ? (
          <IconButton borderRadius={5} colorPalette={"teal"} aria-label="Edit">
            <Icon asChild boxSize={6}>
              <Pencil />
            </Icon>
          </IconButton>
        ) : (
          <Button colorPalette={"primary"} aria-label="Delete">
            <Icon asChild boxSize={6}>
              <Plus />
            </Icon>
            Add
          </Button>
        )}
      </DialogTrigger>
      <DialogContent {...rest} mx={2}>
        <DialogHeader>
          <DialogTitle>
            {heading && !id ? heading : id ? "Edit" : "Add"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody asChild>
          {isFetching && !!id ? (
            <Flex justify={"center"} align={"center"} h={"50vh"}>
              <Spinner
                size={"xl"}
                borderWidth="2px"
                animationDuration="0.65s"
                color="primary.500"
              />
            </Flex>
          ) : (
            <form id={formId} onSubmit={onSubmit} noValidate>
              {children}
            </form>
          )}
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">{cancelText ?? "Close"}</Button>
          </DialogActionTrigger>
          <Button
            colorPalette="primary"
            loading={isSubmitting}
            type="submit"
            form={formId}
          >
            {submitText ?? "Submit"}
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default ModalForm;
