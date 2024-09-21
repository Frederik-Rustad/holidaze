import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Button,
  TextField,
  Collapse,
  Checkbox,
  FormControlLabel, 
} from "@mui/material";
import VenueManager from "../Assets/Images/Venue_Manager.png";
import EditProfileModal from "../components/EditProfileModal.jsx";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creatingVenue, setCreatingVenue] = useState(false);
  const storedName = localStorage.getItem("name");
  const accessToken = localStorage.getItem("accessToken")
  const [venueForm, setVenueForm] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    media: [{ url: "", alt: "" }],
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
  });
  

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const accessToken = localStorage.getItem("accessToken");
    const API_KEY = "31b3b01a-fb9c-4371-84cc-86fbd8afe728";

    if (storedName && accessToken) {
      const fetchProfileData = async () => {
        try {
          const response = await fetch(
            `https://v2.api.noroff.dev/holidaze/profiles/${storedName}?_bookings=true&_venues=true`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Noroff-API-Key": API_KEY,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const result = await response.json();
            setProfileData(result.data);
            console.log("Fetched profile data:", result);
          } else {
            console.error("Failed to fetch profile data:", response.statusText);
          }

          setLoading(false);
        } catch (error) {
          console.error("Error fetching profile data:", error);
          setLoading(false);
        }
      };

      fetchProfileData();
    } else {
      console.error("No name or access token found in localStorage");
      setLoading(false);
    }
  }, []);

    const handleDelete = async (bookingId) => {
    const accessToken = localStorage.getItem("accessToken");
    const API_KEY = "31b3b01a-fb9c-4371-84cc-86fbd8afe728";

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setProfileData((prevData) => ({
          ...prevData,
          bookings: prevData.bookings.filter(
            (booking) => booking.id !== bookingId
          ),
        }));
        console.log("Booking deleted successfully");
      } else {
        console.error("Failed to delete booking:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleVenueFormChange = (e) => {
    const { name, value } = e.target;
    setVenueForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleCreateVenue = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const API_KEY = "31b3b01a-fb9c-4371-84cc-86fbd8afe728";
    const formattedVenueForm = {
      ...venueForm,
      price: Number(venueForm.price),
      maxGuests: Number(venueForm.maxGuests),
      media: [
        {
          url: venueForm.media[0].url,
          alt: venueForm.media[0].alt || "Venue image",
        },
      ],
    };

    try {
      const response = await fetch(
        "https://v2.api.noroff.dev/holidaze/venues",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedVenueForm),
        }
      );

      if (response.ok) {
        console.log("Venue created successfully");
        setVenueForm({
          name: "",
          description: "",
          price: "",
          maxGuests: "",
          media: [{ url: "", alt: "" }],
          meta: { wifi: false, parking: false, breakfast: false, pets: false },
          location: {
            address: "",
            city: "",
            zip: "",
            country: "",
            continent: "",
            lat: 0,
            lng: 0,
          },
        });
        setCreatingVenue(false);
      } else {
        const errorData = await response.json();
        console.error(
          "Failed to create venue:",
          errorData.message || response.statusText
        );
      }
    } catch (error) {
      console.error("Error creating venue:", error);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!profileData) {
    return <div>Error loading profile data.</div>;
  }

  return (
    <Container className="mt-5">
      <Card>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} className="text-center">
            {profileData.avatar && profileData.avatar.url ? (
              <Avatar
                alt={profileData.avatar.alt || "User Avatar"}
                src={profileData.avatar.url}
                sx={{ width: 150, height: 150, margin: "auto", mt: 3 }}
              />
            ) : (
              <Avatar sx={{ width: 150, height: 150, margin: "auto", mt: 3 }}>
                {profileData.name.charAt(0)}
              </Avatar>
            )}
          </Grid>
          <Grid item xs={12} md={8}>
            <CardContent>
              <Typography variant="h4" component="div">
                {profileData.name}
              </Typography>             
           <EditProfileModal storedName={storedName} accessToken={accessToken} />
              <Typography variant="body1" color="text.secondary">
                Email: {profileData.email}
              </Typography>
              {profileData.bio && (
                <Typography variant="body2" color="text.secondary" mt={2}>
                  Bio: {profileData.bio}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary" mt={2}>
                Venues Managed: {profileData._count.venues}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Bookings Made: {profileData._count.bookings}
              </Typography>
              {profileData.venueManager && (
                <>
                  <Typography variant="body1" color="primary" mt={2}>
                    This user is a venue manager. <br></br>
                    <img src={VenueManager} alt="Venue Manager" />
                  </Typography>
                  <Button component={Link} to="/venue-manager" variant="contained" color="primary">
                     Venue Manager Dashboard
                  </Button><br></br>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setCreatingVenue(!creatingVenue)}
                    sx={{ mt: 3 }}>
                    {creatingVenue ? "Cancel" : "Create a New Venue"}
                  </Button>

                  <Collapse in={creatingVenue}>
                    <CardContent>
                      <TextField
                        label="Venue Name"
                        name="name"
                        fullWidth
                        value={venueForm.name}
                        onChange={handleVenueFormChange}
                        sx={{ mt: 2 }}
                      />
                      <TextField
                        label="Description"
                        name="description"
                        fullWidth
                        value={venueForm.description}
                        onChange={handleVenueFormChange}
                        multiline
                        rows={4}
                        sx={{ mt: 2 }}
                      />

                      <TextField
                        label="Image URL"
                        name="media"
                        fullWidth
                        value={venueForm.media[0].url}
                        onChange={(e) =>
                          setVenueForm((prevForm) => ({
                            ...prevForm,
                            media: [{ url: e.target.value, alt: "" }],
                          }))
                        }
                        sx={{ mt: 2 }}
                      />
                      <TextField
                        label="Price"
                        name="price"
                        fullWidth
                        type="number"
                        value={venueForm.price}
                        onChange={handleVenueFormChange}
                        sx={{ mt: 2 }}
                      />
                      <TextField
                        label="Max Guests"
                        name="maxGuests"
                        fullWidth
                        type="number"
                        value={venueForm.maxGuests}
                        onChange={handleVenueFormChange}
                        sx={{ mt: 2 }}
                      />
                      <Container className="mt-5">
                        <Typography variant="h6" component="div" mt={3}>
                          Amenities
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={venueForm.meta.wifi}
                                  onChange={(e) =>
                                    setVenueForm((prevForm) => ({
                                      ...prevForm,
                                      meta: {
                                        ...prevForm.meta,
                                        wifi: e.target.checked,
                                      },
                                    }))
                                  }
                                  name="wifi"
                                  color="primary"
                                />
                              }
                              label="WiFi"
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={venueForm.meta.parking}
                                  onChange={(e) =>
                                    setVenueForm((prevForm) => ({
                                      ...prevForm,
                                      meta: {
                                        ...prevForm.meta,
                                        parking: e.target.checked,
                                      },
                                    }))
                                  }
                                  name="parking"
                                  color="primary"
                                />
                              }
                              label="Parking"
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={venueForm.meta.breakfast}
                                  onChange={(e) =>
                                    setVenueForm((prevForm) => ({
                                      ...prevForm,
                                      meta: {
                                        ...prevForm.meta,
                                        breakfast: e.target.checked,
                                      },
                                    }))
                                  }
                                  name="breakfast"
                                  color="primary"
                                />
                              }
                              label="Breakfast"
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={venueForm.meta.pets}
                                  onChange={(e) =>
                                    setVenueForm((prevForm) => ({
                                      ...prevForm,
                                      meta: {
                                        ...prevForm.meta,
                                        pets: e.target.checked,
                                      },
                                    }))
                                  }
                                  name="pets"
                                  color="primary"
                                />
                              }
                              label="Pets Allowed"
                            />
                          </Grid>
                        </Grid>
                      </Container>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCreateVenue}
                        sx={{ mt: 3 }}>
                        Submit
                      </Button>
                    </CardContent>
                  </Collapse>
                </>
              )}
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      <Typography variant="h5" component="div" className="mt-5">
        Your Bookings
      </Typography>

      <Grid container spacing={4} className="mt-2">
        {profileData.bookings && profileData.bookings.length > 0 ? (
          profileData.bookings.map((booking) => (
            <Grid item xs={12} md={6} lg={4} key={booking.id}>
              <Card className="bg-dark text-white">
                <CardContent>
                  <Typography variant="h6" component="div">
                    Venue: {booking.venue.name}
                  </Typography>
                  <Typography variant="body1" component="div" mt={2}>
                    Guests: {booking.guests}
                  </Typography>
                  <Typography variant="body2" color="text.light" mt={1}>
                    From: {booking.dateFrom.slice(0, 10)}
                  </Typography>
                  <Typography variant="body2" color="text.light">
                    To: {booking.dateTo.slice(0, 10)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(booking.id)}
                    className="mt-3">
                    Delete Booking
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary" mt={2}>
            No bookings found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Profile;
