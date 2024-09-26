
const handleBooking = async (
  venue,
  selectedDateRange,
  guests,
  venueId,
  accessToken,
  setLoading
) => {
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

export default handleBooking;
