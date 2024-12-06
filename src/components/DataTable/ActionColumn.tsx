import { HStack, Icon, IconButton, IconButtonProps } from "@chakra-ui/react";
import { Eye, Pencil, Trash } from "@phosphor-icons/react";
import React from "react";

interface IActionColumn {
  handleEdit?: () => void;
  handleView?: () => void;
  handleDelete?: () => void;
}

const ActionColumn: React.FC<IActionColumn & IconButtonProps> = ({
  handleEdit,
  handleDelete,
  handleView,
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
        <IconButton
          colorPalette={"red"}
          variant={"subtle"}
          size={"sm"}
          aria-label="delete"
          onClick={handleDelete}
          {...rest}
        >
          <Icon asChild boxSize={5} color={"red.500"}>
            <Trash />
          </Icon>
        </IconButton>
      )}
    </HStack>
  );
};

export default ActionColumn;
