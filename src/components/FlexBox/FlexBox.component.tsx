type FlexDirection =
  | "-moz-initial"
  | "column"
  | "column-reverse"
  | "inherit"
  | "initial"
  | "revert"
  | "revert-layer"
  | "row"
  | "row-reverse"
  | "unset";

type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

type FlexJustify = "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";

type FlexAlign = "flex-start" | "center" | "flex-end" | "stretch" | "baseline";

type FlexAlignContent = "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "stretch";

interface FlexBoxProps {
  direction?: FlexDirection;
  wrap?: FlexWrap;
  justifyContent?: FlexJustify;
  alignItems?: FlexAlign;
  alignContent?: FlexAlignContent;
  gap?: number | string;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}

export const FlexBox: React.FC<FlexBoxProps> = ({
  direction = "row",
  wrap = "nowrap",
  justifyContent = "flex-start",
  alignItems = "stretch",
  alignContent = "stretch",
  gap = 0,
  style,
  className,
  children,
}) => {
  const gapStyle = direction.startsWith("row") ? { columnGap: gap } : { rowGap: gap };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        flexWrap: wrap,
        justifyContent: justifyContent,
        alignItems: alignItems,
        alignContent: alignContent,
        ...gapStyle,
        ...style,
      }}
      className={className}>
      {children}
    </div>
  );
};