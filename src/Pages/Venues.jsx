import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, Grid, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Venues = () => {
  const [venues, setVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleVenuesCount, setVisibleVenuesCount] = useState(12);
  const navigate = useNavigate();

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

  const handleBookNow = (venueId) => {
    if (venueId) {
      navigate(`/venues/${venueId}`);
    } else {
      console.error("Venue ID is undefined");
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLoadMore = () => {
    setVisibleVenuesCount((prevCount) => prevCount + 12);
  };

  const filteredVenues = venues
    .filter((venue) => venue.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, visibleVenuesCount); 
  if (!Array.isArray(venues)) {
    return (
      <div>
        Error: Venues data is not available.
      </div>
    );
  }

  return (
    <div>
      <Box mb={4}>
        <TextField
          label="Search Venues"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by venue name"
        />
      </Box>

      <Grid container spacing={4}>
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
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
                  <button
                    type="button"
                    className="btn btn-outline-warning"
                    onClick={() => handleBookNow(venue.id)}
                  >
                    View more
                  </button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" component="div" className="text-center">
            No matching venues found.
          </Typography>
        )}
      </Grid>

      {filteredVenues.length < venues.length && (
        <Box mt={4} textAlign="center">
          <button className="btn btn-outline-primary" onClick={handleLoadMore}>
            Load More
          </button>
        </Box>
      )}
    </div>
  );
};

export default Venues;
