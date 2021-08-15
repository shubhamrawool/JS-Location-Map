// returning dummy data as Google Maps API requires to be setup with credit card which I don't want to expose here

export async function getAddressFromCoords(coords) {
  return "Mumbai";
}

export async function getCoordsFromAddress(address) {
  return { lat: 47.01, lng: 33.55 };
}