import React from 'react';

type Theme = "default" | "material" | "neumorphic" | "dark";
type Direction = "ltr" | "rtl";
interface BaseSliderProps {
    min: number;
    max: number;
    step?: number;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    theme?: Theme;
    trackColor?: string;
    rangeColor?: string;
    thumbColor?: string;
    labelColor?: string;
    trackStyle?: React.CSSProperties;
    rangeStyle?: React.CSSProperties;
    thumbStyle?: React.CSSProperties;
    labelStyle?: React.CSSProperties;
    showTooltip?: boolean;
    showLabels?: boolean;
    formatLabel?: (value: number) => string;
}
interface SingleSliderProps extends BaseSliderProps {
    value?: number;
    defaultValue?: number;
    onChange: (value: number) => void;
    onChangeStart?: (value: number) => void;
    onChangeComplete?: (value: number) => void;
    ariaLabel?: string;
}
type RangeValue = {
    min: number;
    max: number;
};
interface RangeSliderProps extends BaseSliderProps {
    value?: RangeValue;
    defaultValue?: RangeValue;
    onChange: (value: RangeValue) => void;
    onChangeStart?: (value: RangeValue) => void;
    onChangeComplete?: (value: RangeValue) => void;
    minDistance?: number;
    allowOverlap?: boolean;
    direction?: Direction;
    ariaLabelMin?: string;
    ariaLabelMax?: string;
}
interface VerticalSliderProps extends BaseSliderProps {
    value?: number;
    defaultValue?: number;
    onChange: (value: number) => void;
    onChangeStart?: (value: number) => void;
    onChangeComplete?: (value: number) => void;
    height?: number | string;
    ariaLabel?: string;
}
interface MultiPointSliderProps extends BaseSliderProps {
    values: number[];
    defaultValues?: number[];
    onChange: (values: number[]) => void;
    onChangeStart?: (values: number[]) => void;
    onChangeComplete?: (values: number[]) => void;
    minDistance?: number;
    ariaLabels?: string[];
}
interface CircularSliderProps {
    min: number;
    max: number;
    value?: number;
    defaultValue?: number;
    onChange: (value: number) => void;
    onChangeStart?: (value: number) => void;
    onChangeComplete?: (value: number) => void;
    size?: number;
    strokeWidth?: number;
    trackColor?: string;
    progressColor?: string;
    thumbColor?: string;
    labelColor?: string;
    disabled?: boolean;
    step?: number;
    showLabel?: boolean;
    formatLabel?: (value: number) => string;
    ariaLabel?: string;
    theme?: Theme;
    className?: string;
    style?: React.CSSProperties;
}
type MultiRangeSliderValue = RangeValue;
interface MultiSliderProps extends RangeSliderProps {
    type?: "multi";
    sliderStyle?: React.CSSProperties;
    title?: string;
    ariaLabelMin?: string;
    ariaLabelMax?: string;
}
interface LegacySingleSliderProps extends SingleSliderProps {
    type: "single";
    sliderStyle?: React.CSSProperties;
    title?: string;
}
type MultiRangeSliderProps = MultiSliderProps | LegacySingleSliderProps;

export type { BaseSliderProps as B, CircularSliderProps as C, Direction as D, LegacySingleSliderProps as L, MultiPointSliderProps as M, RangeSliderProps as R, SingleSliderProps as S, Theme as T, VerticalSliderProps as V, MultiRangeSliderProps as a, MultiRangeSliderValue as b, MultiSliderProps as c, RangeValue as d };
