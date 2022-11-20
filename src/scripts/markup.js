export function makeMarkUp(data, datalistRef) {
  const markUp = data
    .map(el => `<option value='${el.city}'></option>`)
    .join('');
  datalistRef.insertAdjacentHTML('beforeend', markUp);
}

export function makeWeatherMarkUp(data, loc, contentRef) {
  const date = new Date();
  const localDate = date.toLocaleTimeString();
  let windDirrection = '';
  if (data.wind.deg <= 45 || data.wind.deg >= 315) {
    windDirrection = '&#8659; North wind';
  }
  if (data.wind.deg > 45 && data.wind.deg <= 135) {
    windDirrection = '&#8656; East wind';
  }
  if (data.wind.deg > 135 && data.wind.deg <= 225) {
    windDirrection = '&#8657; South wind';
  }
  if (data.wind.deg > 225 && data.wind.deg < 315) {
    windDirrection = '&#8658; West wind';
  }
  const weatherMarkUp = `<div class='weather-card'>
  <div class='wrapper-top'>
    <p class='city-name'>${loc}</p>
    <img src='http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png' alt='' width='150px' height='150px'>
  </div>
  <ul class='data-list'>
    <li class='real-temp'>Real temperature: ${Math.round(
    data.main.temp,
  )} &#8451;</li>
    <li class='wind-speed'>Wind speed: ${Math.round(data.wind.speed)} m/s</li>
    <li class='wind-direction'>Wind direction: ${windDirrection}</li>
  </ul>
</div>`;
  
  contentRef.insertAdjacentHTML('beforeend', weatherMarkUp);
}

