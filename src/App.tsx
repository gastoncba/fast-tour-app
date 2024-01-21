import { useRef, useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import { useLocation } from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

import { RoutesController } from "./routing/RouterController.component";
import { Toaster } from "./components";
import { THEME } from "./settings/materialStyles.setting";

const App = () => {
  const scrollbarRef = useRef<any>();
  let location = useLocation();

  useEffect(() => {
    scrollbarRef.current.scrollTop = 0;
  }, [location.pathname]);

  return (
    <>
    <ThemeProvider theme={THEME}>
      <PerfectScrollbar style={{ height: "100vh" }} ref={scrollbarRef}>
        <RoutesController />
      </PerfectScrollbar>
      <Toaster />
    </ThemeProvider>
    </>
  );
};

export default App;
