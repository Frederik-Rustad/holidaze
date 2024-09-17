import React, { useEffect, useState } from "react";
import { Container, Card, CardContent, Typography, Avatar, Grid } from "@mui/material";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const accessToken = localStorage.getItem("accessToken");
    const API_KEY = "31b3b01a-fb9c-4371-84cc-86fbd8afe728";

    if (storedName && accessToken) {
      const fetchProfileData = async () => {
        try {
          const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${storedName}?_bookings=true&_venues=true`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "X-Noroff-API-Key": API_KEY,
              "Content-Type": "application/json",
            },
          });

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
            {/* Avatar */}
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
                <Typography variant="body1" color="primary" mt={2}>
                  This user is a venue manager.
                </Typography>
              )}
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      {/* Bookings Section */}
      <Typography variant="h5" component="div" className="mt-5">
        Your Bookings
      </Typography>

      <Grid container spacing={4} className="mt-2">
        {profileData.bookings && profileData.bookings.length > 0 ? (
          profileData.bookings.map((booking) => (
            <Grid item xs={12} md={6} lg={4} key={booking.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Venue: {booking.venue.name}
                  </Typography>
                  <Typography variant="body1" component="div" mt={2}>
                    Guests: {booking.guests}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    From: {booking.dateFrom.slice(0, 10)} 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    To: {booking.dateTo.slice(0, 10)} 
                  </Typography>
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
