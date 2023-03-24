const BASE_URL = 'https://restcountries.com/v3.1/name/';

export const fetchCountries = countryName => 
    fetch(`${BASE_URL}${countryName}
    `).then(response => {
        if (response.status === 404) {
            throw new Error(response.status);
        }

        return response.json();
    });