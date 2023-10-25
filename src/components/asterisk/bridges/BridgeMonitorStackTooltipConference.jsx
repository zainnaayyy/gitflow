import { Box, Tooltip, Chip } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import Slide from '@mui/material/Slide';

const ToolTipSize = (size) => {
  switch (size) {
    case 3:
      return '200';
    case 4:
      return '250';
    case 5:
      return '300';
    default:
      return 0; // Set default tooltip width to 0 or some other value as needed
  }
};

const BridgeMonitorStackTooltipConference = ({ bridge, colors }) => {

  const tooltipWidth = ToolTipSize(bridge['extensions_list'].length);

  const useStyles = makeStyles((theme) => ({
    customTooltip: {
      backgroundColor: '#252b32',
      fontSize: "14px",
      height: `50px`,
      width: `${tooltipWidth}px`,
    },
  }));
  const classes = "";

  const TooltipContent = ({extension}) => {
    return (<div>{extension}</div>)
  }

  const TooltipObject = (bridge) => {
    console.log('bridgee ::==::', bridge)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '14px'}}>
        { bridge['bridge']['extensions_list'].map((extension) => {
          return (
            <Chip 
              style={{ 
                marginTop: '-10px', 
                marginBottom: '-10px', 
                marginLeft: '5px', 
                marginRight: '5px', 
                fontSize: '14px',
            }} 
              className="card-shadow shadow" 
              label={<TooltipContent extension={extension}/>} 
              variant="outlined"  />
          )
        })}
      </Box>
    )
  }

  const Participants = (bridge) => {
    return (
      <Box>
        Conference - {bridge['bridge']['channels_list'].length}
      </Box>
    )
  }

  return (

    <Tooltip
      sx={{ cursor: "pointer" }}
      title={<TooltipObject bridge={bridge}/>}
      arrow
      // classes={{
      //   tooltip: classes.customTooltip,
      // }}
      placement="top"
    >
      <Box>
        <Chip style={{ 
          fontSize: '14px',
          margin: '-10px', 
          backgroundImage: colors.gradient[200]}} 
          className="card-shadow shadow" 
          label={<Participants bridge={bridge}/>} 
          
           />
          </Box>
    </Tooltip>
    
  );
};

export default BridgeMonitorStackTooltipConference;
