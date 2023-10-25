// https://www.youtube.com/watch?v=bJXATRVdKKg - THIS ONE IS TYPESCRIPT, FOUND A JS VERSION
import React, { useState } from "react";
import { Snackbar, Button } from "@mui/material";

const SnackAuthorizeIP = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}></Button>
      <Snackbar
        message="IP Added to Firewall"
        autoHideDuration={4000}

      />
    </div>
  );
};

export default SnackAuthorizeIP;
