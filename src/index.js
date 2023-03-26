import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const searchBox = document.querySelector('#search-box');

searchBox.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
    const value = e.target.value.trim();
    console.log(value);

    if (!value) {
    clearInterfaceUI();
    return;
    }

    fetchCountries(value)
    .then(data => {
        if (data.length > 10) {
        Notify.info(
            'Too many matches found. Please enter a more specific name.'
        );
        }
        renderCountries(data);
    })
    .catch(err => {
        clearInterfaceUI();
        Notify.failure('Oops, there is no country with that name');
    });
}

function countriesListMarkup(result) {
    return result.map((({ name, flags }) => {
        return `<li class="country-item">
                    <img src="${flags.svg}" alt="${name.official}" width="60" height="auto">
                    <span>${name.official}</span>
                </li>`;
    })).join('');
}

function countryCardMarkup(result) {
    return cardMarkup = result.map(({ flags, name, capital, population, languages }) => {
        languages = Object.values(languages).join(", ");
        return `<ul class="weather-info list">
                    <li class="weather-info-item-map">
                        <img src="${flags.svg}" alt="${name}" width="90" height="auto">
                        <p class="temp">${name.official}</p>
                    </li>
                    <li class="weather-info-item">
                        <p class="sunrise-time"><span class="bold">Capital:</span> ${capital}</p>
                    </li>
                    <li class="weather-info-item">
                        <p class="sunset-time"><span class="bold">Population:</span> ${population}</p>
                    </li>
                    <li class="weather-info-item">
                        <p class="clouds"><span class="bold">Languages:</span> ${languages}</p>
                    </li>
                </ul>`;
    }).join('');
}

function renderCountries(result) {
    if (result.length === 1) {
    countriesList.innerHTML = '';
    countryInfo.innerHTML = countryCardMarkup(result);
    }
    if (result.length > 1 && result.length < 11) {
    countryInfo.innerHTML = '';
    countriesList.innerHTML = countriesListMarkup(result);
    }
}

function clearInterfaceUI() {
    countriesList.innerHTML = '';
    countryInfo.innerHTML = '';
}