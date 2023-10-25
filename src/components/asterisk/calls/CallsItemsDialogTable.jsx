import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import TinyAudioPlayer from "../../player/TinyAudioPlayer";


import {
  useGetChannelsActivityItemDetailQuery,
} from "../../../features/stasis/StasisActivity";


const CallsItemsDialogTable = (itemId) => {

  const {
    data: channel_item,
    isLoading,
    isSuccess,
  } = useGetChannelsActivityItemDetailQuery(itemId);

  console.log('itemId++', itemId)

  let content;

  const audioSource = '/assets/audio/recording.wav';
  // const audioSource = 'https://back.iqbot.live/media/recording/music.wav';

  const rows = [1, 2]

  if (isLoading) {
    content = "Loading Data ...";
  } else if (isSuccess) {
    content = (
      <Box>
        {/*
        <div>
          <h1>Tiny Audio Player</h1>
          <TinyAudioPlayer src={audioSource} />
        </div>
        */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
            <TableCell>Event</TableCell>
              <TableCell align="left">Extension</TableCell>
              <TableCell align="left">Channel</TableCell>
              <TableCell align="left">Recording</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {channel_item.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                {row.stasis_event}
                </TableCell>
                <TableCell align="center">{row.extension}</TableCell>
                <TableCell align="left">{row.connected_channel_id}</TableCell>
                { row.recording &&  (
                  <TableCell align="left"><TinyAudioPlayer src={`https://back.iqbot.live/media/recording/${row.recording}.wav`} /></TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    );
  }
  return content;
};

export default CallsItemsDialogTable;
