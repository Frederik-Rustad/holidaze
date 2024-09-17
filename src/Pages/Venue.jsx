import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Container } from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 

const Venue = () => {
  const { venueId } = useParams();
  const [venue, setVenue] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    fetch(`https://v2.api.noroff.dev/holidaze/venues/${venueId}?_bookings=true`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched venue data:", data); 
        setVenue(data.data);
        console.log("Bookings:", data.data.bookings);

        const bookings = data.data.bookings || [];
        const dates = bookings.map((booking) => ({
          start: new Date(booking.dateFrom),
          end: new Date(booking.dateTo),
        }));
        setBookedDates(dates);
      })
      .catch((error) => console.error("Error fetching venue details:", error));
  }, [venueId]);

  if (!venue) {
    return <div>Loading...</div>;
  }

    const isDateDisabled = (date) => {
    return bookedDates.some((booking) => {
      return date >= booking.start && date <= booking.end;
    });
  };

  return (
    <Container className="mt-5">
      <Card className="text-white bg-dark">
        {venue.media && venue.media.length > 0 && (
          <CardMedia
            component="img"
            height="400"
            image={
              typeof venue.media[0] === "string"
                ? venue.media[0]
                : venue.media[0].url
            }
            alt={venue.media[0].alt || "Venue Image"}
          />
        )}

        <CardContent>
          <Typography variant="h4" component="div">
            {venue.name}
          </Typography>

          <Typography variant="body1">
            {venue.description}
          </Typography>

          <Typography variant="h6" component="div" className="mt-3">
            Price: ${venue.price}
          </Typography>

          <Typography variant="body2" component="div" className="mt-2">
            Max Guests: {venue.maxGuests}
          </Typography>

          <Typography variant="body2" component="div" className="mt-2">
            Rating: {venue.rating}/5
          </Typography>

          <div className="mt-4">
            <Typography variant="h6">Check Availability</Typography>
            <Calendar
              tileDisabled={({ date }) => isDateDisabled(date)}
            />
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Venue;
