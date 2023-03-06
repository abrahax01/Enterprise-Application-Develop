const express = require('express')
const router = express.Router()
const axios = require('axios')


router.get('/fetch', async (req, res) => {
    try {
        // uses Axios to get the country data 
        const capitalData = await axios.get('https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-capital-city.json');
        const continentData = await axios.get('https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-continent.json');
        const coastData = await axios.get('https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-costline.json');
        const currencyData = await axios.get('https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-currency-name.json');
        const domainData = await axios.get('https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-domain-tld.json');
        const flagData = await axios.get('https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-flag.json');
    
        // maps over the returned data and creates a new array of objects that contain country data from the JSON files
        const result = capitalData.data.map((country) => {
            const continent = continentData.data.find((item) => item.country === country.country);
            const coast = coastData.data.find((item) => item.country === country.country);
            const currency = currencyData.data.find((item) => item.country === country.country);
            const domain = domainData.data.find((item) => item.country === country.country);
            const flag = flagData.data.find((item) => item.country === country.country);
    
            return {
                country: country.country || '-',
                continent: continent?.continent || '-',
                currency: currency?.currency_name || '-',
                domain: domain?.tld || '-',
                flag: flag?.flag_base64 || '-',
                coastLine: coast?.costline || '-',
            };
        });
    
        res.json(result);

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
    }
});
  
module.exports = router