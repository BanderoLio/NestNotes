import type { SystemStyleObject } from '@chakra-ui/react';
import {
  AbsoluteCenter,
  ProgressCircle as ChakraProgressCircle,
} from '@chakra-ui/react';
import * as React from 'react';

type ProgressCircleRingProps = {
  trackColor?: SystemStyleObject['stroke'];
  cap?: SystemStyleObject['strokeLinecap'];
} & ChakraProgressCircle.CircleProps;

export const ProgressCircleRing = React.forwardRef<
  SVGSVGElement,
  ProgressCircleRingProps
>(function ProgressCircleRing(props, ref) {
  const { trackColor, cap, color, ...rest } = props;
  return (
    <ChakraProgressCircle.Circle {...rest} ref={ref}>
      <ChakraProgressCircle.Track stroke={trackColor} />
      <ChakraProgressCircle.Range stroke={color} strokeLinecap={cap} />
    </ChakraProgressCircle.Circle>
  );
});

export const ProgressCircleValueText = React.forwardRef<
  HTMLDivElement,
  ChakraProgressCircle.ValueTextProps
>(function ProgressCircleValueText(props, ref) {
  return (
    <AbsoluteCenter>
      <ChakraProgressCircle.ValueText {...props} ref={ref} />
    </AbsoluteCenter>
  );
});

export const ProgressCircleRoot = ChakraProgressCircle.Root;

type ProgressCircleProps = {
  showValueText?: boolean;
  valueText?: React.ReactNode;
  trackColor?: SystemStyleObject['stroke'];
  cap?: SystemStyleObject['strokeLinecap'];
  thickness?: SystemStyleObject['strokeWidth'];
} & ChakraProgressCircle.RootProps;

export const ProgressCircle = React.forwardRef<
  HTMLDivElement,
  ProgressCircleProps
>(function ProgressCircle(props, ref) {
  const {
    showValueText,
    valueText,
    trackColor,
    color,
    cap,
    thickness,
    ...rest
  } = props;

  return (
    <ChakraProgressCircle.Root {...rest} ref={ref}>
      <ChakraProgressCircle.Circle css={{ '--thickness': thickness }}>
        <ChakraProgressCircle.Track stroke={trackColor} />
        <ChakraProgressCircle.Range stroke={color} strokeLinecap={cap} />
      </ChakraProgressCircle.Circle>
      {showValueText && (
        <AbsoluteCenter>
          <ChakraProgressCircle.ValueText>
            {valueText}
          </ChakraProgressCircle.ValueText>
        </AbsoluteCenter>
      )}
    </ChakraProgressCircle.Root>
  );
});
