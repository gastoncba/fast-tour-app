import React from "react";

import { Travels } from "./Travels.screen";

interface Props {}

export const HomeScreen: React.FC<Props> = (props: Props) => {
  return (
    <>
      <Travels />
    </>
  );
};
