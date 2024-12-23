import {
  Center,
  ConditionalValue,
  Spinner,
  SpinnerProps,
} from "@chakra-ui/react";
import { FC } from "react";

interface LoaderProps {
  height?: ConditionalValue<string | number>;
  width?: ConditionalValue<string | number>;
}

const Loader: FC<LoaderProps & SpinnerProps> = ({ height, width, ...rest }) => {
  return (
    <Center h={height ?? "70dvh"} w={width ?? "full"}>
      <Spinner
        borderWidth="4px"
        animationDuration="0.65s"
        size={"xl"}
        color={"primary.500"}
        {...rest}
      />
    </Center>
  );
};

export default Loader;
