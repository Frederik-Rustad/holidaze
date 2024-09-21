import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const ManagerDashboard = () => {
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [editVenue, setEditVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const API_KEY = "31b3b01a-fb9c-4371-84cc-86fbd8afe728";

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const accessToken = localStorage.getItem("accessToken");

    if (storedName && accessToken) {
      const fetchVenues = async () => {
        try {
          const response = await fetch(
            `https://v2.api.noroff.dev/holidaze/profiles/${storedName}?_venues=true`,
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
            setVenues(result.data.venues);
            setLoading(false);
          } else {
            console.error("Failed to fetch venues:", response.statusText);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching venues:", error);
          setLoading(false);
        }
      };

      fetchVenues();
    }
  }, []);

  const handleEditVenue = (venue) => {
    setEditVenue(venue);
    setOpenEditDialog(true);
  };
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState(null);
  const handleOpenDeleteDialog = (venue) => {
    setVenueToDelete(venue);
    setOpenDeleteDialog(true);
  };

  const handleDeleteVenue = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${venueToDelete.id}`,
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
        setVenues((prevVenues) =>
          prevVenues.filter((venue) => venue.id !== venueToDelete.id)
        );
        console.log("Venue deleted successfully");
      } else {
        console.error("Failed to delete venue:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting venue:", error);
    } finally {
      setOpenDeleteDialog(false);
        }
  };

  const handleViewBookings = async (venueId) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${venueId}?_bookings=true`,
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
        setBookings(result.data.bookings);
        setSelectedVenue(venueId);
        console.log("Bookings:", result.data.bookings);
      } else {
        console.error("Failed to fetch bookings:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleUpdateVenue = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${editVenue.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editVenue),
        }
      );

      const data = await response.json();
      console.log("Response body:", data);

      if (response.ok) {
        setVenues((prevVenues) =>
          prevVenues.map((venue) =>
            venue.id === editVenue.id ? editVenue : venue
          )
        );
        setOpenEditDialog(false);
        console.log("Venue updated successfully");
      } else {
        console.error("Failed to update venue:", data);
      }
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  if (loading) {
    return <div>Loading venues...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" component="div" mt={4}>
        Venue Manager Dashboard
      </Typography>
      <Button
        component={Link}
        to="/Profile"
        variant="contained"
        className="bg-dark">
        ↩Back to Profile
      </Button>
      <br></br>
      <Grid container spacing={3} mt={2}>
        {venues.map((venue) => (
          <Grid item xs={12} md={6} lg={4} key={venue.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{venue.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {venue.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditVenue(venue)}
                  sx={{ mt: 2 }}>
                  Edit Venue
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleOpenDeleteDialog(venue)}
                  sx={{ mt: 2, ml: 2 }}>
                  Delete Venue
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleViewBookings(venue.id)}
                  sx={{ mt: 2, ml: 2 }}>
                  View Bookings
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedVenue && (
        <Container mt={4}>
          <Typography variant="h5" mt={3}>
            Bookings for Venue: {selectedVenue}
          </Typography>

          {bookings.length === 0 ? (
            <Typography variant="body1" mt={2}>
              This venue has no bookings.
            </Typography>
          ) : (
            bookings.map((booking) => (
              <Card key={booking.id} sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="body1">
                    Booking ID: {booking.id}
                  </Typography>
                  <Typography variant="body2">
                    Number of guests: {booking.guests}
                  </Typography>
                  <Typography variant="body2">
                    Customer: {booking.customer.name}
                  </Typography>
                  <Typography variant="body2">
                    From: {new Date(booking.dateFrom).toLocaleDateString()} To:{" "}
                    {new Date(booking.dateTo).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Container>
      )}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the venue: {venueToDelete?.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteVenue}
            color="secondary"
            variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Venue</DialogTitle>
        <DialogContent>
          <TextField
            label="Venue Name"
            fullWidth
            value={editVenue?.name || ""}
            onChange={(e) =>
              setEditVenue({ ...editVenue, name: e.target.value })
            }
            sx={{ mt: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            value={editVenue?.description || ""}
            onChange={(e) =>
              setEditVenue({ ...editVenue, description: e.target.value })
            }
            sx={{ mt: 2 }}
            multiline
            rows={4}
          />
          <TextField
            label="Image URL"
            fullWidth
            value={editVenue?.media?.[0]?.url || ""}
            onChange={(e) => {
              const updatedMedia = [
                { ...editVenue.media[0], url: e.target.value },
              ];
              setEditVenue({ ...editVenue, media: updatedMedia });
            }}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Price"
            fullWidth
            type="number"
            value={editVenue?.price || ""}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setEditVenue({
                ...editVenue,
                price: isNaN(value) ? 0 : value,
              });
            }}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Max Guests"
            fullWidth
            type="number"
            value={editVenue?.maxGuests || ""}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setEditVenue({
                ...editVenue,
                maxGuests: isNaN(value) ? 0 : value,
              });
            }}
            sx={{ mt: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editVenue?.meta?.wifi || false}
                onChange={(e) =>
                  setEditVenue({
                    ...editVenue,
                    meta: { ...editVenue.meta, wifi: e.target.checked },
                  })
                }
              />
            }
            label="WiFi"
            sx={{ mt: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editVenue?.meta?.parking || false}
                onChange={(e) =>
                  setEditVenue({
                    ...editVenue,
                    meta: { ...editVenue.meta, parking: e.target.checked },
                  })
                }
              />
            }
            label="Parking"
            sx={{ mt: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editVenue?.meta?.breakfast || false}
                onChange={(e) =>
                  setEditVenue({
                    ...editVenue,
                    meta: { ...editVenue.meta, breakfast: e.target.checked },
                  })
                }
              />
            }
            label="Breakfast"
            sx={{ mt: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editVenue?.meta?.pets || false}
                onChange={(e) =>
                  setEditVenue({
                    ...editVenue,
                    meta: { ...editVenue.meta, pets: e.target.checked },
                  })
                }
              />
            }
            label="Pets Allowed"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button
            onClick={handleUpdateVenue}
            variant="contained"
            color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManagerDashboard;
