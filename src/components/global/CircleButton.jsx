import { Button, Badge } from "@mui/material";

const styles = {
  button: {
    width: "0.4cm",
    height: "0.4cm",
    borderRadius: "50%",
    backgroundColor: "rgba(244, 67, 54, 0.85)",
    color: "rgb(26, 29, 33)",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
};

export const CircleButton = () => {
  return (
    <Badge variant="contained" style={styles.button}>

    </Badge>
  );
}