import cities from './partials/ua.json';
import { getWeather } from './scripts/api-servise';
import getVideo from './scripts/background-video-api';
import { makeMarkUp, makeWeatherMarkUp, addBackGround } from './scripts/markup';
import getRandomHexColor from './scripts/random-color';

const LSKEY = 'recent-cities';
const inputRef = document.querySelector('input');
const datalistRef = document.querySelector('#city');
const getBtn = document.querySelector('.getweather-btn');
const contentRef = document.querySelector('.content');
const btnList = document.querySelector('.btn-list');
const videoRef = document.querySelector('.video-wrapper');


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
    const id = getIdOfWeather(response);
    const videodata = await getVideo(id);
    const src = videodata.data.hits[0].videos.medium.url;
    addBackGround(src, videoRef);
    makeWeatherMarkUp(response.data, inputRef.value, contentRef);
    citiesData.cities.push(inputRef.value);
    localStorage.setItem(LSKEY, JSON.stringify(citiesData));
    addRecentCities();
    inputRef.value = '';
  } catch (error) {
    alert('Enter corect city');
  }
}

addRecentCities();

function addRecentCities() {
  const dataFromLs = localStorage.getItem(LSKEY);
  const citiesFromLs = JSON.parse(dataFromLs);
  citiesData.cities = Array.from(new Set(citiesFromLs.cities));
  console.log(citiesData.cities);

  const markUpBtn = citiesData.cities
    .slice(-5)
    .map(
      el =>
        `<button type='button' class='btn recent-cities'>${el}</button>`,
    )
    .join('');
  btnList.innerHTML = markUpBtn;
}

function getIdOfWeather(response) {
  const weatherCondition = response.data.weather[0].main;
  let id = null;
  switch (weatherCondition) {
    case 'Clouds':
      id = 62249;
      break;
    case 'Rain':
      id = 26369;
      break;
    case 'Clear':
      id = 36816;
      break;
    case 'Snow':
      id = 54064;
      break;
    default:
      id = 45753;
  }
  return id;
}

