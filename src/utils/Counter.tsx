/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const formatValue = (value: number) => {
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M+";
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, "") + "K+";
  }
  return value.toLocaleString();
};

const Counter = ({ initialValue }: any) => {
  const [counter, setCounter] = useState(initialValue);
  const { ref, inView } = useInView({ triggerOnce: true }); // Use react-intersection-observer

  useEffect(() => {
    if (inView) {
      const targetValue = parseInt(initialValue.replace(/[^\d]/g, ""), 10); // Extract numeric value
      let currentValue = 0;
      const interval = setInterval(() => {
        currentValue += Math.ceil(targetValue / 100); // Increment by a fraction of target value
        if (currentValue >= targetValue) {
          setCounter(formatValue(targetValue)); // Ensure final value matches the original
          clearInterval(interval);
        } else {
          setCounter(formatValue(currentValue)); // Update counter with formatted value
        }
      }, 10); // Update interval as needed for smoother animation

      return () => clearInterval(interval); // Cleanup function
    }
  }, [initialValue, inView]);

  return (
    <Text
      ref={ref}
      color={"red.400"}
      fontSize={{
        base: "24px",
        sm: "28px",
        md: "32px",
        lg: "36px",
      }}
      fontWeight={700}
    >
      {counter}
    </Text>
  );
};

export default Counter;
