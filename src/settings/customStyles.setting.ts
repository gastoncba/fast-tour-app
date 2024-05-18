import { themeMaterial } from "./materialTheme.setting";

export const styles = {
  containerView: {
    background: "white",
    borderRadius: "10px",
    boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);",
  },
  color: {
    yellow: "#F4B400",
    background: "#eeeeee",
    green: "#0F9D58",
    favorite: "#ff7b7b",
    red: "#DB4437",
    blueberry: "#4285f4",
  },
  navGroup: {
    marginTop: "10px",
    padding: "6px",
    textTransform: "capitalize",
    color: "rgb(33,33,33)",
    lineHeight: "1.66",
    fontWeight: 500,
  },
  navItem: {
    alignItems: "flex-start",
    mb: 0.5,
    py: "10px",
    pl: "24px",
    borderRadius: "8px",
    backgroundColor: "transparent",
    ":hover": {
      background: "primary.light",
      color: "primary.main",
      ".setting-item-icon": {
        color: "primary.main",
      },
    },
    "&.Mui-selected": {
      background: "primary.light",
      color: "primary.main",
      ".setting-item-icon": {
        color: "primary.main",
      },
      ".setting-item-text": {
        fontWeight: 590,
      },
    },
  },
  borderRadius: {
    radius: "8px",
  },
  stylesItemSelected: {
    border: 1,
    borderColor: themeMaterial.palette.primary.light,
    borderRadius: "8px",
  },
  navCollapse: {
    position: "relative",
    "&:after": {
      content: "''",
      position: "absolute",
      left: "32px",
      top: 0,
      height: "100%",
      width: "1px",
      opacity: 0.2,
      background: themeMaterial.palette.primary.light,
    },
  },
  cardStyles: { border: "1px solid rgb(227, 232, 239)", borderRadius: "4px", px: 2, py: 1, ":hover": { boxShadow: "rgba(32, 40, 45, 0.08) 0px 2px 14px 0px" }, transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms" },
};
