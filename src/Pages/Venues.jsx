import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";

const Venues = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    fetch("https://v2.api.noroff.dev/holidaze/venues")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (Array.isArray(data.data)) {
          setVenues(data.data);
        } else {
          console.error("Expected array but got:", data);
        }
      })
      .catch((error) => console.error("Error fetching venues:", error));
  }, []);

  if (!Array.isArray(venues)) {
    return (
      <div>
        Error: Venues data is not available or is in an incorrect format.
      </div>
    );
  }

  return (
    <div>
      <Grid container spacing={4}>
        {venues.map((venue) => (
          <Grid item xs={12} sm={6} md={4} key={venue.id}>
            <Card>
              {venue.media && venue.media.length > 0 && (
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    typeof venue.media[0] === "string"
                      ? venue.media[0]
                      : venue.media[0].url
                  } 
                  alt={venue.media[0].alt || "Venue Image"}
                />
              )}

              <CardContent className="bg-dark text-white">
                <Typography variant="h5" component="div">
                {venue.name.length > 20
                    ? `${venue.name.slice(0, 20)}...`
                    : venue.name}
                </Typography>

                <Typography variant="body2" color="text.white">
                  {venue.description.length > 50
                    ? `${venue.description.slice(0, 50)}...`
                    : venue.description}
                </Typography>

                <Typography variant="h6" component="div">
                  Price: ${venue.price}
                </Typography>

                <Typography variant="body2" component="div">
                  Max Guests: {venue.maxGuests}
                </Typography>

                <Typography variant="body2" component="div">
                  Rating: {venue.rating}/5
                </Typography>
                <button type="button" class="btn btn-outline-warning" id={venue.id}>
                  Book Now
                </button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Venues;
