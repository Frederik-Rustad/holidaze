import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Container } from "@mui/material";

const Venue = () => {
  const { venueId } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    fetch(`https://v2.api.noroff.dev/holidaze/venues/${venueId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched venue data:", data); 
        setVenue(data.data); 
      })
      .catch((error) => console.error("Error fetching venue details:", error));
  }, [venueId]);

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
        </CardContent>
      </Card>
    </Container>
  );
};

export default Venue;
