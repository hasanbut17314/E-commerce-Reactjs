import React, { useState } from 'react';
import {
  Box, Button, Typography, TextField, Grid, Paper
} from '@mui/material';

const initialSettings = {
  aboutUs: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  email: 'admin@example.com',
  address: '123 Main Street, Anytown, USA',
  contact: '123-456-7890'
};

const Settings = () => {
  const [settings, setSettings] = useState(initialSettings);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSaveSettings = () => {
    // Logic to save the settings
    console.log('Settings saved:', settings);
  };

  return (
    <Box sx={{ px: { xs: 1, sm: 3} }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Website Settings
      </Typography>
      <Paper sx={{ p: { xs: 0, sm: 3 }, boxShadow: 'none' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="About Us"
              name="aboutUs"
              multiline
              rows={4}
              fullWidth
              value={settings.aboutUs}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={settings.email}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact"
              name="contact"
              fullWidth
              value={settings.contact}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              fullWidth
              value={settings.address}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveSettings}
            >
              Save Settings
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Settings;
