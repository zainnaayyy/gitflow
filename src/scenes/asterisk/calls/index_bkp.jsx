import { useState } from "react";
import { useTheme, Box, Typography } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { 
  useGetCallsActivityQuery,
  useGetChannelsActivityItemQuery
} from "../../../features/stasis/StasisActivity";

const Calls = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);



  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchKey, setSearchKey] = useState('');

  const { data: calls, isLoading, isError } = useGetCallsActivityQuery({page, pageSize, search: searchKey});

  console.log('calls', calls)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleSearch = (event) => {
    setSearchKey(event.target.value);
    setPage(1); // Reset page to 1 when performing a new search
  };

  return (
    <Box m="20px">
      <Header title="Calls Reports" subtitle="Beta Version" />

      <Typography variant="h3" color={colors.grey[200]} marginTop="20px">
        Channels
      </Typography>

      <div>
      <h1>Paginated Dummy Data</h1>
      <div>
        <input type="text" value={searchKey} onChange={handleSearch} placeholder="Search by name" />
      </div>
      <div>
        <button disabled={page === 1} onClick={handlePreviousPage}>
          Previous Page
        </button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Extension</th>
            <th>Caller Number</th>
            <th>Channel ID</th>
          </tr>
        </thead>
        <tbody>
          {calls.results.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.extension}</td>
              <td>{item.caller_number}</td>
              <td>{item.channel_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </Box>
  );
};

export default Calls;

