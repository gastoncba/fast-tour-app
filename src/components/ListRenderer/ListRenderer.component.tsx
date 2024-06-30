import React, { CSSProperties } from "react";
import { FlexBox, Paragraph, Loader } from "..";

interface ListRendererProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getKey?: (item: T) => React.Key;
  isLoading?: boolean;
  loader?: { color: string; size?: "sm" | "md" };
  emptyMessage?: {
    text?: string;
    color?: string;
    size?: number | string;
    weight?: number | "bold" | "lighter" | "normal" | "bolder";
    justify?: "center" | "flex-start" | "flex-end";
    style?: CSSProperties;
  };
  customLoader?: React.ReactNode;
  customEmptyMessage?: React.ReactNode;
}

export const ListRenderer = <T,>({ items, renderItem, getKey, isLoading = false, loader, emptyMessage, customEmptyMessage, customLoader }: ListRendererProps<T>) => {
  const generateKey = (item: T): string => {
    try {
      return btoa(JSON.stringify(item));
    } catch (error) {
      return Math.random().toString(36).substring(2, 15);
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          {customLoader || (
            <FlexBox justifyContent="center">
              <Loader sx={{ color: loader ? loader.color : "primary" }} />
            </FlexBox>
          )}
        </>
      ) : (
        <>
          {items.length > 0 ? (
            <>
              {items.map((item) => (
                <React.Fragment key={getKey ? getKey(item) : generateKey(item)}>{renderItem(item)}</React.Fragment>
              ))}
            </>
          ) : (
            <>
              {customEmptyMessage ? (
                customEmptyMessage
              ) : (
                <FlexBox justifyContent={emptyMessage?.justify}>
                  <Paragraph text={emptyMessage?.text || "No data avaible"} fontSize={emptyMessage?.size} />
                </FlexBox>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
