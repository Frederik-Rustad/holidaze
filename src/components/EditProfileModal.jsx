import React, { useState } from "react";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";

const EditProfileModal = ({ storedName, accessToken }) => {
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");  
  const API_KEY = "31b3b01a-fb9c-4371-84cc-86fbd8afe728";
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAvatarChange = (event) => setAvatarUrl(event.target.value);


  const handleSubmit = async () => { 
  
    try {
      const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${storedName}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: {
            url: avatarUrl,
            alt: 's avatar',
          },         
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Profile updated successfully:", data);
        handleClose();
        window.location.reload();
      } else {
        console.error("Failed to update profile:", response.statusText);        
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };  

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Edit Profile
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Edit Profile
          </Typography>

          <TextField
            label="Avatar URL"
            fullWidth
            margin="normal"
            value={avatarUrl}
            onChange={handleAvatarChange}
          />         

          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default EditProfileModal;
