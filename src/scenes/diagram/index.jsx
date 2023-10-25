import { useTheme, Box } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import VoipFlow from "../../components/dialer/VoipFlow";


const Diagram = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
        <Header title="Reemagine VoIP Diagram" subtitle="Beta Version" />
          <Box>

            <Box display='flex'>
                <Box>
                    <h1>Actual Status</h1>
                </Box>
                <Box sx={{ mt: 4, ml: 6 }}>
                    coisa
                </Box>
            </Box>
            <VoipFlow />
            
        </Box>
    </Box>
    )
}

export default Diagram;
