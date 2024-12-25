import { HStack, Icon, IconButton, IconButtonProps } from "@chakra-ui/react";
import { Eye, Pencil } from "@phosphor-icons/react";
import React from "react";
import { DeleteAlert } from "../Form/Modal";

interface IActionColumn {
  handleEdit?: () => void;
  handleView?: () => void;
  handleDelete?: () => void;
  deleteHeading?: string;
  deleteMessage?: string;
  deleteText?: string;
  isDeleteLoading?: boolean;
  deleteCancelText?: string;
  deleteTrigger?: React.ReactNode;
}

const ActionColumn: React.FC<IActionColumn & IconButtonProps> = ({
  handleEdit,
  handleDelete,
  handleView,
  deleteHeading,
  deleteMessage,
  deleteText,
  deleteCancelText,
  deleteTrigger,
  isDeleteLoading,
  ...rest
}) => {
  return (
    <HStack w={"max-content"} mx={"auto"}>
      {handleView && (
        <IconButton
          colorPalette={"teal"}
          variant={"subtle"}
          size={"sm"}
          aria-label="edit"
          onClick={handleView}
          {...rest}
        >
          <Icon asChild boxSize={6}>
            <Eye />
          </Icon>
        </IconButton>
      )}
      {handleEdit && (
        <IconButton
          colorPalette={"blue"}
          variant={"subtle"}
          size={"sm"}
          aria-label="edit"
          onClick={handleEdit}
          {...rest}
        >
          <Icon asChild boxSize={6}>
            <Pencil />
          </Icon>
        </IconButton>
      )}
      {handleDelete && (
        <DeleteAlert
          heading={deleteHeading}
          description={deleteMessage}
          deleteText={deleteText}
          onConfirm={handleDelete}
          isDeleteLoading={isDeleteLoading}
          cancelText={deleteCancelText}
          trigger={deleteTrigger}
        />
      )}
    </HStack>
  );
};

export default ActionColumn;
