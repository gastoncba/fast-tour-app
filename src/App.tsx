import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Router } from "./routing/Router.component";
import { Sidebar, Paragraph, List } from "./components";

function App() {
  let navigate = useNavigate();

  const items: { title: string; onClick: () => void }[] = [
    {
      title: "Home",
      onClick: () => navigate("/home"),
    },
    {
      title: "Top lugares",
      onClick: () => navigate("/places"),
    },
    {
      title: "Top paises",
      onClick: () => navigate("/countries"),
    },
  ];

  return (
    <Box sx={{ px: 2, py: 1 }}>
      <Sidebar>
        <Paragraph
          type="title"
          levelTitle={2}
          text="Fast Tour"
          style={{ paddingLeft: "50px" }}
        />
        <List items={items} />
      </Sidebar>
      <Router />
    </Box>
  );
}

export default App;
