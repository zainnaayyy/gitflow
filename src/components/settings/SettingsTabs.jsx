import React, { useState } from 'react';
import { Tabs, Tab, Box, Fade } from '@mui/material';
import SettingsCustomers from './SettingsCustomers';

const VerticalTabs = ({ colors }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabs = [
    { label: 'User', content: 'Content for Tab 1' },
    { label: 'Customer', content: <SettingsCustomers colors={colors}/> },
    { label: 'Voip', content: 'Content for Tab 3' },
    { label: 'Carriers', content: 'Content for Tab 4' },
  ];

  return (
    <Box display="flex">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedTab}
        onChange={handleTabChange}
        style={{ marginTop: '50px' }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            style={{
              minWidth: '60px',
              width: '100%',
              padding: '10px 16px',
              backgroundColor: selectedTab === index ? '#3c9dfa' : 'transparent',
              borderRadius: '10px',
              marginTop: '4px',
              marginLeft: '3px',
              color: colors.grey[200],
            }}
          />
        ))}
      </Tabs>

      <Box p={3} flexGrow={1}>
        <Fade in={true} timeout={500} key={selectedTab}>
          <div>
            {tabs[selectedTab].content}
          </div>
        </Fade>
      </Box>
    </Box>
  );
};

export default VerticalTabs;
