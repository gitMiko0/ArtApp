const API_URL = "https://api.com"; // Replace with actual API

export async function fetchGalleries() {
  const res = await fetch(`${API_URL}/galleries`);
  return res.json();
}

export async function fetchArtists() {
  const res = await fetch(`${API_URL}/artists`);
  return res.json();
}
