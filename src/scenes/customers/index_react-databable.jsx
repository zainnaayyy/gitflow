// https://react-data-table-component.netlify.app/?path=/docs/performance-examples-hook-component--hook-component

import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

import DataTable from "react-data-table-component";
import FixedHeaderStory from "react-data-table-component";

import Header from "../../components/Header";
import { useGetCustomersQuery } from "../../features/users/customerApiSlice";

const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
  },
  {
    name: "First Name",
    selector: (row) => row.first_name,
  },
  {
    name: "Middle Name",
    selector: (row) => row.middle_name,
  },
  {
    name: "Last Name",
    selector: (row) => row.last_name,
  },
  {
    name: "Age",
    selector: (row) => row.age,
  },
  {
    name: "Phone Type",
    selector: (row) => row.phone_number_type,
  },
  {
    name: "Phone Number",
    selector: (row) => row.phone_number,
  },
  {
    name: "Plan",
    selector: (row) => row.plan,
  },
  {
    name: "Enroll Date",
    selector: (row) => row.enroll_date,
  },
];

const Customers = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data, isLoading, isSuccess, isError, error } = useGetCustomersQuery();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      cellClassName: "id-column-cell",
    },
    {
      field: "first_name",
      headerName: "First Name",
      flex: 0.7,
      cellClassName: "general-column-cell",
    },
    {
      field: "middle_name",
      headerName: "Middle Name",
      flex: 0.7,
      cellClassName: "name-column-cell",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 0.7,
      cellClassName: "general-column-cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAling: "left",
      align: "center",
      flex: 0.4,
      cellClassName: "general-column-cell",
    },
    {
      field: "phone_number_type",
      headerName: "Phone Type",
      flex: 0.7,
      cellClassName: "general-column-cell",
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      flex: 1,
      cellClassName: "general-column-cell",
    },
    {
      field: "plan",
      headerName: "Plan",
      flex: 1,
      cellClassName: "general-column-cell",
    },
    {
      field: "enroll_date",
      headerName: "Enroll Date",
      flex: 1,
      cellClassName: "general-column-cell",
    },
  ];

  const table_style = {
    "& .MuiDataGrid-root": {
      border: "none",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "none",
    },
    "& .name-column-cell": {
      color: colors.greenAccent[110],
      fontSize: "16px",
    },
    "& .id-column-cell": {
      color: colors.blueAccent[110],
      fontSize: "16px",
    },
    "& .general-column-cell": {
      color: colors.blueAccent[210],
      fontSize: "16px",
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: colors.contentCard[900],
      borderBottom: "none",
      fontSize: "16px",
      color: "#ffffff",
      fontWeight: "600",
    },
    "& .MuiButtonBase-root ": {
      color: colors.grey[200],
      fontSize: "13px",
    },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: colors.contentCard[800],
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: "none",
      backgroundColor: colors.contentCard[900],
      borderBottomLeftRadius: "4px",
      borderBottomRightRadius: "4px",
    },
    "& .MuiTablePagination-selectLabel ": {
      fontWeight: "600",
      color: "#ffffff",
    },
    "& .MuiTablePagination-displayedRows": {
      fontWeight: "600",
      color: "#ffffff",
    },
    "& .MuiSelect-select  ": {
      fontWeight: "600",
      color: "#ffffff",
    },
    "& .MuiCheckbox-root": {
      color: `${colors.greenAccent[110]} !important`,
    },
  };
  if (isSuccess) {
    console.log("data:", data);
  }

  let content;

  if (isLoading) {
    content = (
      <Box m="20px">
        <h1>Fetching Backend ...</h1>
      </Box>
    );
  } else if (isSuccess) {
    content = (
      <div>
        <Box m="20px">
          <Header title="Customers" subtitle="Manage Customers" />
          <Box m="40px 0 0 0" height="75vh">
            <FixedHeaderStory
              data={data}
              columns={columns}
              fixedHeader
              fixedHeaderScrollHeight="300px"
            />
          </Box>
        </Box>
      </div>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return content;
};

export default Customers;
