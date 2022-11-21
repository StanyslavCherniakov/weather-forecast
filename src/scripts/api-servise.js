import axios from 'axios';

export async function getWeather(city) {
  const coords = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=4e61d42aff974cc17d2ce0b25137b2df`,
  );
  const countryUa = coords.data.filter(el => el.country === 'UA');
  const lat = countryUa[0].lat;
  const lon = countryUa[0].lon;
  const weather = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4e61d42aff974cc17d2ce0b25137b2df&units=metric`,
  );
  return weather;
}
