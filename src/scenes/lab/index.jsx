import { Box } from "@mui/material";
import Header from "../../components/Header";
import { ApiQuery } from "../../components/dialer/lab/ApiQuery";

const Lab = () => {

    return (
        <Box m="20px">
        <Header title="Reemagine Lab Tests" subtitle="Beta Version" />
          <Box><ApiQuery /></Box>
        </Box>
    )
}

export default Lab;
