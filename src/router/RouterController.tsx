import { useEffect, useState } from "react";

import { Router } from "./Router.router";
import { Loader } from "../components";
import { userProvider } from "../providers";

interface Props {}

export const RoutesController: React.FunctionComponent<Props> = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        await userProvider.loginByToken();
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  return <>{isLoading ? <Loader /> : <Router />}</>;
};
