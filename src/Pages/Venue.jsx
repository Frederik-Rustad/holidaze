import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Button,
  TextField,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Venue = () => {
  const { venueId } = useParams();
  const [venue, setVenue] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);

    fetch(`https://v2.api.noroff.dev/holidaze/venues/${venueId}?_bookings=true`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched venue data:", data);
        setVenue(data.data);
        console.log("bookings", data.data.bookings);

        const bookings = data.data.bookings || [];
        const dates = bookings.map((booking) => ({
          start: new Date(booking.dateFrom),
          end: new Date(booking.dateTo),
        }));
        setBookedDates(dates);
      })
      .catch((error) => console.error("Error fetching venue details:", error));
  }, [venueId]);

  const isDateDisabled = (date) => {
    return bookedDates.some((booking) => {
      return date >= booking.start && date <= booking.end;
    });
  };

  const handleBooking = async () => {
    if (!selectedDateRange[0] || !selectedDateRange[1]) {
      alert("Please select a valid date range.");
      return;
    }

    if (guests < 1 || guests > venue.maxGuests) {
      alert(`Please select between 1 and ${venue.maxGuests} guests.`);
      return;
    }

    const payload = {
      dateFrom: selectedDateRange[0],
      dateTo: selectedDateRange[1],
      guests,
      venueId,
    };
    const API_KEY = "31b3b01a-fb9c-4371-84cc-86fbd8afe728";
    try {
      setLoading(true);
      const response = await fetch(
        "https://v2.api.noroff.dev/holidaze/bookings",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Booking successful!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error making booking:", error);
      alert("Booking failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!venue) {
    return <div>Loading...</div>;
  }

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

          <Typography variant="body1">{venue.description}</Typography>

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
            <Typography variant="h6">Availability</Typography>
            <Calendar
              selectRange={true}
              tileDisabled={({ date }) => isDateDisabled(date)}
              onChange={setSelectedDateRange}
              value={selectedDateRange}
            />
          </div>

          {accessToken && (
            <div className="mt-4">
              <Typography variant="h6">Make a Booking</Typography>
              <TextField
                label="Guests"
                type="number"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                inputProps={{ min: 1, max: venue.maxGuests }}
                fullWidth
                className="mt-2"
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
                InputLabelProps={{
                  style: { color: "white" },
                }}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleBooking}
                className="mt-3"
                disabled={loading}>
                {loading ? "Booking..." : "Book Now"}
              </Button>
            </div>
          )}

          {!accessToken && (
            <Typography variant="body2" color="warning" className="mt-4">
              Please log in to make a booking.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Venue;
