import React, { useEffect, useState } from "react";
import { Container, Card, CardContent, Typography, Avatar, Grid } from "@mui/material";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const accessToken = localStorage.getItem("accessToken");   
    const API_KEY = "31b3b01a-fb9c-4371-84cc-86fbd8afe728";
    console.log("Stored name:", storedName);
    console.log("Access token:", accessToken);

    if (storedName && accessToken) {
      const fetchProfileData = async () => {
        try {
          const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${storedName}`, {
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
          } else {
            console.error("Failed to fetch profile data:", response.statusText);
          }

          setLoading(false); // Set loading to false when data is fetched
        } catch (error) {
          console.error("Error fetching profile data:", error);
          setLoading(false); // Set loading to false in case of error
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
    </Container>
  );
};

export default Profile;
