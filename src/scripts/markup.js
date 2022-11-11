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
  const weatherMarkUp = `<div class="card" style="width: 18rem;">
  <img src="https://pixabay.com/get/gd71eeccd1554140901506feeef2850ecd49be1be3522c36989f435392936096b9bf8a7f2a3deedafb5fda3a7839fe286395d2bf88f062d47a883a88d45c1e974_1280.jpg" class="card-img-top" width = 600 alt="...">
  <div class="card-body">
    <h5 class="card-title">Ukraine, ${loc}</h5>
    <p class="card-text">${data.weather[0].description}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Real temperature: ${Math.round(
      data.main.temp
    )} &#8451;</li>
    <li class="list-group-item">Wind dirrection: ${windDirrection}</li>
    <li class="list-group-item">Wind speed: ${data.wind.speed} m/s</li>
  </ul>
  <div class="card-body">
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>`;

  console.log(weatherMarkUp);

  contentRef.insertAdjacentHTML('beforeend', weatherMarkUp);
}
