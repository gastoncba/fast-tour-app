import { observer } from "mobx-react";
import { useEffect } from "react";

import { loaderProvider } from "../providers/Loader.provider";
import { Router } from "./Router.component";
import { Loader } from "../components";

interface Props {}

export const RoutesController: React.FunctionComponent<Props> = observer(
  (props: Props) => {
    useEffect(() => {
      loaderProvider.init();
    }, []);

    return <>{loaderProvider.isStarting ? <Loader sx={{py: 4}}/> : <Router />}</>;
  }
);
