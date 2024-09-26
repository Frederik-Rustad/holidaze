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
import Tags from "../utils/Tags";
import DisplaySingleVenue from "../utils/DisplaySingleVenue";
import handleBooking from "../utils/HandleBooking"; 

const Venue = () => {
  const { venueId } = useParams();
  const [venue, setVenue] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

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

  useEffect(() => {
    if (selectedDateRange[0] && selectedDateRange[1] && venue?.price) {
      const startDate = new Date(selectedDateRange[0]);
      const endDate = new Date(selectedDateRange[1]);
      const timeDifference = endDate.getTime() - startDate.getTime();
      const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
      const calculatedTotalPrice = numberOfDays * venue.price;
      setTotalPrice(calculatedTotalPrice);
    } else {
      setTotalPrice(0);
    }
  }, [selectedDateRange, venue?.price]);

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
          <DisplaySingleVenue key={venue.id} venue={venue} />
          <Tags venue={venue} />
          
          <div className="mt-4">
            <Typography variant="h6">Make a Booking</Typography>
            <Calendar
              selectRange={true}
              tileDisabled={({ date }) => isDateDisabled(date)}
              onChange={setSelectedDateRange}
              value={selectedDateRange}
            />
          </div>

          {accessToken && (
            <div className="mt-4">
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

              <Typography variant="h6" className="mt-3">
                Total Price: ${totalPrice}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleBooking(
                    venue,
                    selectedDateRange,
                    guests,
                    venueId,
                    accessToken,
                    setLoading
                  )
                }
                className="mt-3"
                disabled={loading}
              >
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
