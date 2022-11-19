import cities from './partials/ua.json';
import { getWeather } from './scripts/api-servise';
import { makeMarkUp, makeWeatherMarkUp } from './scripts/markup';

console.log(makeMarkUp);

const LSKEY = 'recent-cities';
const inputRef = document.querySelector('input');
const datalistRef = document.querySelector('#city');
const getBtn = document.querySelector('.getweather-btn');
const contentRef = document.querySelector('.content');
const btnList = document.querySelector('.btn-list');
console.log(contentRef);

const citiesData = {
  cities: [],
};

makeMarkUp(cities, datalistRef);

getBtn.addEventListener('click', onClick);
btnList.addEventListener('click', onBtnClick);

function onBtnClick(e) {
  if (!e.target.classList.contains('btn')) {
    return;
  }
  inputRef.value = e.target.textContent;
}

async function onClick() {
  try {
    const response = await getWeather(inputRef.value);
    contentRef.innerHTML = '';
    makeWeatherMarkUp(response.data, inputRef.value, contentRef);
    citiesData.cities.push(inputRef.value);
    console.log(citiesData);
    localStorage.setItem(LSKEY, JSON.stringify(citiesData));
    addRecentCities();
    inputRef.value = '';
  } catch (error) {
    alert('Enter coorect city');
  }
}

addRecentCities();

function addRecentCities() {
  const dataFromLs = localStorage.getItem(LSKEY);
  const citiesFromLs = JSON.parse(dataFromLs);
  citiesData.cities = citiesFromLs.cities;
  const filteredCities = Array.from(new Set(citiesData.cities));
  console.log(filteredCities);

  const markUpBtn = filteredCities
    .slice(-5)
    .map(
      el =>
        `<button type='button' class='btn recent-cities'>${el}</button>`,
    )
    .join('');
  console.log(markUpBtn);
  btnList.innerHTML = markUpBtn;
}
