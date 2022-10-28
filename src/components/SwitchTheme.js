import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export default function SwitchTheme({ toggleTheme }) {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }} onClick={toggleTheme}>
      <Fab color="primary" sx={fabStyle} aria-label="theme">
        <DarkModeIcon />
      </Fab>
    </Box>
  );
}
