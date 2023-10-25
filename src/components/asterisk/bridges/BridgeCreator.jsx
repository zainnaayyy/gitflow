import { Box, useTheme } from "@mui/material";
import { Button } from "@mui/material";
import { tokens } from "../../../theme";


import { useCreateBridgeMutation } from "../../../features/asterisk/asteriskApiSlice";

export const BridgeCreator = () => {
  const [createBridge, { isLoading }] = useCreateBridgeMutation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  function submitBridge(e) {
    e.preventDefault();
    createBridge();
    // e();
    // e.target.value();
  }

  return (
    <Box sx={{ ml: 5 }}>
      <form onSubmit={(e) => submitBridge(e)}>
        {/* <input type="submit" value="+ Add Bridge" disabled={isLoading} /> */}
        {isLoading && " Loading..."}
        {/* </div> */}
        <Button
          type="submit"
          className="btn-green"
        >
          +Bridge
        </Button>
      </form>
    </Box>
  );
};
