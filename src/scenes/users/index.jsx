import { useState } from "react";
import { Box, useTheme, Grid, Fade, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import ReorderIcon from "@mui/icons-material/Reorder";
import GridViewIcon from "@mui/icons-material/GridView";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from "@mui/icons-material/Search";
import MapIcon from '@mui/icons-material/Map';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { DraggableCreateUser } from "../../components/users/DraggableCreateUser";
import { tokens } from "../../theme";
import { useGetUsersQuery } from "../../features/users/userApiSlice";
import Header from "../../components/Header";
import UsersListView from "../../components/users/UsersListView";
import UsersCardView from "../../components/users/UsersCardView";
import UsersMapView from "../../components/users/UsersMapView";

const Users = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchKey, setSearchKey] = useState("");

  const [viewMode, setViewMode] = useState('list');

  const {
    data: users,
    isLoading,
    isSuccess,
  } = useGetUsersQuery({ page, pageSize, search: searchKey });

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleSearch = (event) => {
    console.log('event.target.value:', event.target.value)
    setSearchKey(event.target.value);
    setPage(1); // Reset page to 1 when performing a new search
  };

  const useStyles = makeStyles((theme) => ({
    customTooltip: {
      backgroundColor: colors.tooltip[100],
      fontSize: "14px",
      border: '1px solid #5a5a5a',
      borderRadius: '8px',
    },
  }));

  return (
    <Box>
      <Box m="20px">

      <Grid container spacing={2} sx={{ marginTop: '-30px', marginBottom: '-40px' }}>
        <Grid item xs={6} md={7}>
          <Header title="Employees" subtitle="Manage Employees" />
        </Grid>
        <Grid item xs={6} md={5}>

          <Box sx={{ mt: 16, display: 'flex', justifyContent: 'right'}}>
            <Tooltip title="Next Page" arrow className="bg-[#252b32] text-sm border-[#5a5a5a] rounded-lg" placement='top'>
              <IconButton sx={{ color: colors.grey[400] }} aria-label="grid view">
                <NavigateBeforeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Previous Page" arrow className="bg-[#252b32] text-sm border-[#5a5a5a] rounded-lg" placement='top'>
              <IconButton sx={{ color: colors.grey[400], mr: 1}} aria-label="grid view">
                <NavigateNextIcon />
              </IconButton>
            </Tooltip>
            <Box
              display="flex"
              backgroundColor={colors.grey[80]}
              borderRadius="3px"
              className="card-shadow-2"
              sx={{borderRadius: "10px", mr: 1}}
            >
              <InputBase value={searchKey} onChange={handleSearch} sx={{ ml: 2, flex: 1 }} placeholder="Page Search..." />
              <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon />
              </IconButton>
            </Box>
            <Tooltip title="Filter" arrow className="bg-[#252b32] text-sm border-[#5a5a5a] rounded-lg" placement='top'>
              <IconButton sx={{ color: colors.grey[400] }} aria-label="grid view">
                <FilterAltIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="List View" arrow className="bg-[#252b32] text-sm border-[#5a5a5a] rounded-lg" placement='top'>
            <IconButton sx={{ color: viewMode === 'list' ? (colors.icons[400]) : (colors.grey[400]) }} aria-label="list view"  onClick={() => setViewMode('list')}>
              <ReorderIcon />
            </IconButton>
            </Tooltip>
            <Tooltip title="Card View" arrow className="bg-[#252b32] text-sm border-[#5a5a5a] rounded-lg" placement='top'>
              <IconButton sx={{ color: viewMode === 'grid' ? (colors.icons[400]) : (colors.grey[400]) }} aria-label="grid view"  onClick={() => setViewMode('grid')}>
                <GridViewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Map View" arrow className="bg-[#252b32] text-sm border-[#5a5a5a] rounded-lg" placement='top'>
              <IconButton sx={{ color: viewMode === 'map' ? (colors.icons[400]) : (colors.grey[400]) }} aria-label="map view"  onClick={() => setViewMode('map')}>
                <MapIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
      <Fade in={viewMode === 'list'} timeout={500}>
        <Box>
          {viewMode === 'list' ? <UsersListView colors={colors} users={users} isLoading={isLoading} isSuccess={isSuccess}/> : null}
        </Box>
      </Fade>
      <Fade in={viewMode === 'grid'} timeout={500}>
        <Box>
          {viewMode === 'grid' ? <UsersCardView colors={colors} users={users} isLoading={isLoading} isSuccess={isSuccess}/> : null}
        </Box>
      </Fade>
      {/** 
      <Fade in={viewMode === 'map'} timeout={500}>
        <Box>
          {viewMode === 'map' ? <UsersMapView colors={colors} users={users} isLoading={isLoading} isSuccess={isSuccess}/> : null}
        </Box>
      </Fade>
      */}
      </Box>
      <DraggableCreateUser />
    </Box>
  );
};

export default Users;
