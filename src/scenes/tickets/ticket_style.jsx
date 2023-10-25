// MAKE A RESEARCH TO SOLVE THIS QUESTION OF EXPORTING AN OBJECT

import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Styles = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      color: "#495057",
      fontWeight: "600",
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
    ".MuiFab-circularizeLarge  ": {
      backgroundColor: `${colors.greenAccent[110]} !important`,
    },
  };

}
