import {
  ConditionalValue,
  Image,
  ImageProps,
  Skeleton,
  SkeletonProps,
} from "@chakra-ui/react";
import { FC, useState } from "react";

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
      loading={!isLoaded}
      borderRadius={borderRadius ?? 5}
      w={"100px"}
      {...rest}
    >
      <Image
        src={src}
        alt={alt}
        borderRadius={borderRadius ?? 5}
        loading="lazy"
        w={"100px"}
        objectFit={"cover"}
        objectPosition={"center"}
        aspectRatio={1}
        onLoad={() => setIsLoaded(true)}
        {...rest}
      />
    </Skeleton>
  );
};

export default LazyLoadImage;
