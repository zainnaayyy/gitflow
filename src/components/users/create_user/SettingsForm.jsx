import React, { useState } from "react";
import { Grid } from "@mui/material";

import { useGetUserTypeQuery } from "../../../features/users/userApiSlice";

const SettingsForm = ({data, updateFieldHandler}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [textInput, setTextInput] = useState('');

  const {data: types, isLoading } = useGetUserTypeQuery()
  const types_list = []
  types && types.map((type) => {
    types_list.push(type['user_type'])
  })

  const selectedFunc = (e) => {
    console.log('eeeee', e.target.value) // ENVIAR JUNTO COM DATA
  }

  console.log('types_list:', types_list)
  
  return (
    <div>
      <Grid container spacing={2}>

        <Grid item xs={12} md={4}>
          <div className='form-control'>
            <label htmlFor='middle_name'>Username:</label>
            <input type='text' name='username' id='username' placeholder='john_doe' value={data.username || ''} onChange={(e) => updateFieldHandler('username', e.target.value)}/>
          </div>
        </Grid>

        <Grid item xs={6} md={4}>
            <div className='form-control'>
            <label htmlFor='middle_name'>Select User Type:</label>
            <select value={selectedOption} onChange={(e) => selectedFunc(e)}>
              <option value="">--Please choose an option--</option>
              {types_list.map((type, index) => {
                return (<option value={type}>{type}</option>)
              })}
            </select>

          </div>
        </Grid>


        
      </Grid>
    </div>
    
  );
};

export default SettingsForm;
