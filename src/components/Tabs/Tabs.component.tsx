import React from "react";
import { Tabs as TabsAntd } from "antd";
import type { TabsProps } from "antd";

interface PropsTabs {
  items: TabsProps["items"];
  defaultKey?: string;
  onChange?: (key: string) => void;
  styles?: React.CSSProperties;
}

export const Tabs: React.FC<PropsTabs> = ({ items, defaultKey, onChange, styles }) => {
  return <TabsAntd style={styles} items={items} defaultActiveKey={defaultKey} onChange={onChange} />;
};
