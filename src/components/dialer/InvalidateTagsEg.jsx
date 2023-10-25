import { Button, useTheme } from '@mui/material'
import { tokens } from "../../theme"
import React from 'react'
import { useDispatch } from 'react-redux'
import { asteriskSlice } from '../../app/api/asteriskSlice'
import { stasisActivityApiSlice } from '../../features/stasis/StasisActivity'


export const InvalidateTagsEg = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch()

  const invalidate = () => {

    dispatch(asteriskSlice.util.invalidateTags(['Asterisk']))
    dispatch(stasisActivityApiSlice.util.invalidateTags(['StatisActivity']))
    
    console.log('InvalidateTagsEg Executed')

  }

  return (
    <div>
      <Button 
      onClick={invalidate}
      className="btn-green"
      >
        INVALIDATE
      </Button>
    </div>
  )
}
