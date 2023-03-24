import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

import weatherCardTemplate from './templates/country-card.hbs';
// import countriesLists from './templates/country-list.hbs';


const DEBOUNCE_DELAY = 300;

const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const searchBox = document.querySelector('#search-box');
const body = document.querySelector('body');

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

// // const countriesListMarkup = event => {
// //     event.preventDefault();

// //     const listMarkup = event.target.value.trim();

// //     fetchCountries(listMarkup)
// //     .then(data => {
// //         countriesLists(data);
// //     });
// // }

function countriesListMarkup(result) {
    return listMarkup = result.map((({ name, flags }) => {
        return  `<li class="country-item">
                    <img src="${flags.svg}" alt="${name.official}" width="60" height="auto">
                    <span>${name.official}</span>
                </li>`;
    })).join('');
}

function renderCountries(result) {
    if (result.length === 1) {
    countriesList.innerHTML = '';
    countryInfo.innerHTML = weatherCardTemplate(result);
    }
    if (result.length > 1 && result.length < 11) {
    countryInfo.innerHTML = '';
    countriesList.innerHTML = countriesListMarkup(result) * result.length;
    }
}

function clearInterfaceUI() {
    countriesList.innerHTML = '';
    countryInfo.innerHTML = '';
}