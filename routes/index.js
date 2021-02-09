const express = require('express');
const axios = require('axios');
const router = express.Router();

const url = "https://www.metaweather.com/api/";

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST users listing. */
router.post('/', function (req, res, next) {

  let city = req.body.inputCity;
  let date = req.body.inputDate;

  const cityURL = url + "location/search/?query=" + city;

  axios.get(cityURL)
    .then((response) => {
      if(response.data.length > 1 || response.data.length < 1) res.send({msg: "Searched City Not Found!"});
      else {
      const woeid = response.data[0].woeid;

      const reqURL = url + `location/${woeid}/${date}`;

      axios.get(reqURL)
        .then((response) => {
          try {
            const result = response.data[0];
  
            let jsonResult = JSON.stringify({
              min_temp: Math.round(result.min_temp),
              max_temp: Math.round(result.max_temp),
              temp: Math.round(result.the_temp),
              state: result.weather_state_name,
              icon: result.weather_state_abbr,
              date: result.applicable_date,
              msg: ""
            });
  
            res.send(jsonResult);
            
          } catch (error) {
            next(error);
          }
        });
      }
    });

});

module.exports = router;
