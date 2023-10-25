import React from 'react'
import MoodBadIcon from '@mui/icons-material/MoodBad';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import './ReviewForm.css'

const ReviewForm = ({data, updateFieldHandler}) => {
  return (
    <div className='review-form'>
      <div className='form-control score-container'>
        <label className='radio-container'>
          <input type='radio' value='unsestified' name='review' required/>
          <MoodBadIcon />
          <span>Insatisfied</span>
        </label>

        <label className='radio-container'>
          <input type='radio' value='neutral' name='review' required/>
          <SentimentSatisfiedIcon />
          <span>Neutral</span>
        </label>

        <label className='radio-container'>
          <input type='radio' value='good' name='review' required/>
          <SentimentSatisfiedAltIcon />
          <span>Good</span>
        </label>

        <label className='radio-container'>
          <input type='radio' value='excelent' name='review' required/>
          <SentimentVerySatisfiedIcon />
          <span>Excelent</span>
        </label>
      </div>
      <div className='form-control'>
        <label htmlFor='comment'>
          <textarea name="comment" id="comment" placeholder='Tell us about your feelings'></textarea>
        </label>
      </div>
    </div>
  )
}

export default ReviewForm;
