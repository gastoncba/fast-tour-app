import { useRef, useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { useLocation } from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { ConfigProvider } from "antd";

import { RoutesController } from "./routes/RouterController.routes";
import { Toaster } from "./components";
import { themeMaterial } from "./settings/materialTheme.setting";
import { themeAntd } from "./settings/antdTheme.setting";

const App = () => {
  const scrollbarRef = useRef<any>();
  let location = useLocation();

  useEffect(() => {
    scrollbarRef.current.scrollTop = 0;
  }, [location.pathname]);

  return (
    <>
      <ThemeProvider theme={themeMaterial}>
        <ConfigProvider theme={themeAntd}>
          <PerfectScrollbar style={{ height: "100vh" }} ref={scrollbarRef}>
            <RoutesController />
          </PerfectScrollbar>
          <Toaster />
        </ConfigProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
