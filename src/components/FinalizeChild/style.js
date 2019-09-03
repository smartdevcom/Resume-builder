import { makeStyles } from "@material-ui/core";

export const finalizeChildStyles = makeStyles({
  paper: {
    padding: 12,
    marginTop: 16,
    marginBottom: 32
  },
  selectedBlack: {
    padding: 2,
    border: "1px solid #00000087",
    borderRadius: 15
  },
  selectedTransparent: {
    padding: 2,
    border: "1px solid transparent",
    borderRadius: 15
  },
  selectedTeal: {
    padding: 2,
    border: "1px solid #008080bf",
    borderRadius: 15
  },
  selectedBlue: {
    padding: 2,
    border: "1px solid #3052eea8",
    borderRadius: 15
  },
  selectedYellow: {
    padding: 2,
    border: "1px solid #f8c000b0",
    borderRadius: 15
  },
  img: {
    width: "100%",
    height: 500,
    borderRadius: 4
  },
  wrapper: {
    padding: 20
  },
  success: {
    color: "teal",
    marginRight: 5
  },
  panel: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    marginBottom: 16
  },
  heading: {
    textTransform: "uppercase",
    fontWeight: "bold"
  },
  container: {
    marginTop: 32
  },
  person: { width: 65, height: 65, color: "grey" },
  leftWrapper: {
    marginTop: 32,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 450
  },
  icons: { color: "teal" }
});
