import {
  ConditionalValue,
  Image,
  ImageProps,
  SkeletonProps,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface LazyLoadImageProps {
  src: string;
  alt?: string;
  id?: string;
  borderRadius?: ConditionalValue<string | number>;
  [x: string]: any;
}

const LazyLoadImage: FC<LazyLoadImageProps & SkeletonProps & ImageProps> = ({
  src,
  alt = "",
  id,
  borderRadius,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Skeleton
      w={rest.w ?? "full"}
      loading={!isLoaded}
      borderRadius={borderRadius ?? 5}
      {...rest}
    >
      <Image
        src={src}
        alt={alt}
        borderRadius={borderRadius ?? 5}
        loading="lazy"
        objectFit={"cover"}
        objectPosition={"center"}
        onLoad={() => setIsLoaded(true)}
        w="full"
        {...rest}
      />
    </Skeleton>
  );
};

export default LazyLoadImage;
