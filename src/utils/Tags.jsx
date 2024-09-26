import React from 'react';
import { Typography } from '@mui/material';
import Breakfast from '../Assets/Images/Breakfast_tag.png';
import Parking from '../Assets/Images/Parking_tag.png';
import Pets from '../Assets/Images/Pet_tag.png';
import Wifi from '../Assets/Images/Wifi_tag.png';

const Tags = ({ venue }) => ( 
<Typography variant="body2" component="div" className="mt-2">
{venue.meta.breakfast && (
  <span className="d-inline-flex align-items-center m-2 bg-warning text-dark p-1 rounded-pill fw-bold">
    <img src={Breakfast} alt="Breakfast" />
    Breakfast
  </span>
)}
{venue.meta.parking && (
  <span className="d-inline-flex align-items-center m-2 bg-warning text-dark p-1 rounded-pill fw-bold">
    <img src={Parking} alt="Parking" />
    Parking
  </span>
)}
<br />
{venue.meta.pets && (
  <span className="d-inline-flex align-items-center m-2 bg-warning text-dark p-1 rounded-pill fw-bold">
    <img src={Pets} alt="Pets Allowed" />
    Pets
  </span>
)}
{venue.meta.wifi && (
  <span className="d-inline-flex align-items-center m-2 bg-warning text-dark p-1 rounded-pill fw-bold">
    <img src={Wifi} alt="Wi-Fi" />
    Wi-Fi
  </span>
)}
</Typography>
);

export default Tags;