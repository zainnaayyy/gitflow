import React from "react";
import { Grid } from "@mui/material";

const PersonalForm = ({data, updateFieldHandler}) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
        <div className='form-control'>
          <label htmlFor='address'>Address:</label>
          <input type='text' name='address' id='address' placeholder='7801 NW 37th Street' value={data.address || ''} onChange={(e) => updateFieldHandler('address', e.target.value)} />
        </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className='form-control'>
            <label htmlFor='city'>City:</label>
            <input type='text' name='city' id='city' placeholder='Doral' value={data.city || ''} onChange={(e) => updateFieldHandler('city', e.target.value)}/>
          </div>
        </Grid>
        <Grid item xs={6} md={8}>
          <div className='form-control'>
              <label htmlFor='state'>State / Province:</label>
              <input type='text' name='state' id='state' placeholder='Florida' value={data.state || ''} onChange={(e) => updateFieldHandler('state', e.target.value)}/>
          </div>
        </Grid>
        <Grid item xs={6} md={4}>
            <div className='form-control'>
              <label htmlFor='zip_code'>ZIP Code:</label>
              <input type='text' name='zip_code' id='zip_code' placeholder='33195' value={data.zip_code || ''} onChange={(e) => updateFieldHandler('zip_code', e.target.value)}/>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default PersonalForm;
