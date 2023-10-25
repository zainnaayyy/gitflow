import React, { useState } from "react";
import { Grid } from "@mui/material";

import { Selector } from "react-redux";

const PersonalForm = ({data, updateFieldHandler}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [textInput, setTextInput] = useState('');
  
  return (
    <div>
      <Grid container spacing={2}>

        <Grid item xs={12} md={4}>
          <div className='form-control'>
            <label htmlFor='middle_name'>Username:</label>
            <input type='text' name='username' id='username' placeholder='john_doe' value={data.username || ''} onChange={(e) => updateFieldHandler('username', e.target.value)}/>
          </div>
        </Grid>

        <Grid item xs={12} md={4}>
        <div className='form-control'>
          <label htmlFor='first_name'>First Name:</label>
          <input type='text' name='first_name' id='first_name' placeholder='Jonh' value={data.first_name || ''} onChange={(e) => updateFieldHandler('first_name', e.target.value)} />
        </div>
        </Grid>

        <Grid item xs={12} md={4}>
          <div className='form-control'>
            <label htmlFor='last_name'>Last Name:</label>
            <input type='text' name='last_name' id='last_name' placeholder='Doe' value={data.last_name || ''} onChange={(e) => updateFieldHandler('last_name', e.target.value)}/>
          </div>
        </Grid>
        <Grid item xs={6} md={8}>
          <div className='form-control'>
              <label htmlFor='email'>Email:</label>
              <input type='email' name='email' id='email' placeholder='jonhdoe@gmail.com'  value={data.email || ''} onChange={(e) => updateFieldHandler('email', e.target.value)}/>
          </div>
        </Grid>
        <Grid item xs={6} md={4}>
            <div className='form-control'>
              <label htmlFor='phone_number'>Phone Number:</label>
              <input type='text' name='phone_number' id='phone_number' placeholder='9999999999'  value={data.phone_number || ''} onChange={(e) => updateFieldHandler('phone_number', e.target.value)}/>
          </div>
        </Grid>
        <Grid item xs={6} md={4}>
            <div className='form-control'>
              <label htmlFor='date_of_birth'>Date of Birth:</label>
              <input type='text' name='date_of_birth' id='date_of_birth' placeholder='09/13/1978'  value={data.date_of_birth || ''} onChange={(e) => updateFieldHandler('date_of_birth', e.target.value)}/>
          </div>
        </Grid>
        <Grid item xs={6} md={4}>
            <div className='form-control'>
              <label htmlFor='gender'>Gender:</label>
              <input type='text' name='gender' id='gender' placeholder='Male'  value={data.gender || ''} onChange={(e) => updateFieldHandler('gender', e.target.value)}/>
          </div>
        </Grid>
        <Grid item xs={6} md={4}>
            <div className='form-control'>
              <label htmlFor='language'>Language:</label>
              <input type='text' name='language' id='language' placeholder='English'  value={data.language || ''} onChange={(e) => updateFieldHandler('language', e.target.value)}/>
          </div>
        </Grid>


        <Grid item xs={6} md={4}>
            <div className='form-control'>
            <select value={selectedOption} onChange={(event) => setSelectedOption(event.target.value)}>
              <option value="">--Please choose an option--</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </Grid>


        
      </Grid>
    </div>
    
  );
};

export default PersonalForm;
