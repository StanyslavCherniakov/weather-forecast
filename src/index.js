import axios from 'axios';
import { throttle } from 'throttle-debounce';
import { debounce } from 'throttle-debounce';

const inputRef = document.querySelector('input');
const datalistRef = document.querySelector('#city');
const getBtn = document.querySelector('.get-weather');

// inputRef.addEventListener('click', onInput);

// function onInput(e) {
//   e.target.value = '';
// }

getCity().then(makeMarkUp);

getBtn.addEventListener('click', onClick);

function onClick() {
  console.log(inputRef.value);
  getWeather(inputRef.value);
  inputRef.value = '';
}

async function getCity() {
  const response = await axios.get(
    'https://countriesnow.space/api/v0.1/countries'
  );
  console.log(response.data.data[215].cities);
  return response.data.data[215].cities;
}

async function getWeather(city) {
  const coords = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=4e61d42aff974cc17d2ce0b25137b2df`
  );
  const countryUa = coords.data.filter(el => el.country === 'UA');
  const lat = countryUa[0].lat;
  const lon = countryUa[0].lon;
  const weather = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4e61d42aff974cc17d2ce0b25137b2df&units=metric`
  );
}

function makeMarkUp(data) {
  const markUp = data.map(el => `<option value=${el}></option>`).join('');
  datalistRef.insertAdjacentHTML('beforeend', markUp);
}
