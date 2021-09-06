console.log('Front script');
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations[0].coordinates);

let [lng, lat] = locations[0].coordinates;
const map = L.map('map').setView([lat, lng], 8);
let url = `https://geocode.xyz/${lat},${lng}?geoit=json`;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

locations.forEach((el) => {
  [lng, lat] = el.coordinates;
  L.marker([lat, lng]).addTo(map).bindPopup(el.description).openPopup();
});
