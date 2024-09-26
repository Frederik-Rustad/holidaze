import React from 'react';
import { Typography } from '@mui/material';

const DisplaySingleVenue = ({ venue }) => (
  <>
    <Typography variant="h4" component="div">
      {venue.name}
    </Typography>

    <Typography variant="body1">{venue.description}</Typography>

    <Typography variant="h6" component="div" className="mt-3">
      Price: ${venue.price} per day
    </Typography>

    <Typography variant="body2" component="div" className="mt-2">
      Max Guests: {venue.maxGuests}
    </Typography>

    <Typography variant="body2" component="div" className="mt-2">
      Rating: {venue.rating}/5
    </Typography>
  </>
);

export default DisplaySingleVenue;
