import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  widgetContainer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '200px',
    backgroundColor: '#f2f2f2',
    overflow: 'hidden',
    transition: 'transform 0.5s ease-out',
    transform: 'translateY(200px)',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    fontSize: '24px',
  },
  button: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px',
    backgroundColor: '#ccc',
    borderRadius: '5px',
    cursor: 'pointer',
  },
});

const DialTop = () => {
  // const classes = "";
  const [showWidget, setShowWidget] = useState(false);

  const toggleWidget = () => {
    setShowWidget(!showWidget);
  };

  return (
    <div>
      <div
        // className={classes.widgetContainer}
        style={{ transform: showWidget ? 'translateY(0)' : 'translateY(200px)' }}
      >
        {/* <div className={classes.content}> */}
        <div >
          <h2>Sliding Widget Content</h2>
        </div>
      </div>
      {/* <button className={classes.button} onClick={toggleWidget}> */}
      <button >
        Toggle Widget
      </button>
    </div>
  );
};

export default DialTop;
