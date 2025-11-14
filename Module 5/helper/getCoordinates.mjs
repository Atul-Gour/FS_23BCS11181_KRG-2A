import fetch from "node-fetch";

const LOCATIONIQ_API_KEY = "pk.98bd9b4307031aa93ba94bef9f4adb7c";

export async function getCoordinates(address) {
  try {
    const url = `https://us1.locationiq.com/v1/search.php?key=${LOCATIONIQ_API_KEY}&q=${encodeURIComponent(
      address
    )}&format=json`;

    const response = await fetch(url);
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    const { lat, lon, display_name } = data[0];

    return {
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      mapLink: `https://www.google.com/maps?q=${lat},${lon}`,
      displayName: display_name
    };
  } catch (err) {
    console.error("Error fetching coordinates:", err);
    return null;
  }
}