/* global get, APIRoute, routes, co, appConfig */
'use strict';

/**
 * Returns the core application text for a specified language.
 * @method api.updategeo
 * @param {JSONResponse} response The response object.
 * @returns undefined
 */
var route = new APIRoute((response, req, res) => co(function*(){

   var valid_request =
      req.body &&
      req.body.message &&
      req.body.message.latitude &&
      req.body.message.longitude;

   if(!valid_request)
      return response.error('error_invalid_request');

   var lat = req.body.message.latitude;
   var lng = req.body.message.longitude;

   // If valid cookies exist, abort
   if(req.cookies.country_code && req.cookies.city_code)
      return response.error('error_geoinfo_exists');

   var url = 'https://maps.googleapis.com/maps/api/geocode/json';
   var key = appConfig.google_maps_server_key;
   var options = 'result_type=country|locality';

   // Get geo info
   var geoInfo =
      yield get(`${url}?key=${key}&sensor=false&latlng=${lat},${lng}&${options}`);

   if(geoInfo)
      try { geoInfo = JSON.parse(geoInfo); } catch(e) {}

   var country, city;

   try {
      let found = [];

      geoInfo.results.forEach(
         e => e.address_components.forEach(
            e => ~e.types.indexOf('country') && found.push(e)));

      country = found[0].short_name;
   } catch(e) { }

   try {
      let found = [];

      geoInfo.results.forEach(
         e => e.address_components.forEach(
            e => ~e.types.indexOf('locality') && found.push(e)));

      city = found[0].short_name;
   } catch(e) { }
console.log(geoInfo);
   if(typeof geoInfo !== 'object' || (!country && !city))
      return response.error('error_get_geoinfo_failed');

   if(req.__user) {
      let user = req.__user;

      country && user.set('country', country);
      city && user.set('city', city);

      (country || city) && (yield user.updateRecord());
   }

   // Set cookies
   if(country)
      res.cookie('country_code', country, {
         maxAge: 200 * 24 * 60 * 60 * 1000,
         httpOnly: true,
         secure: true
      });

   if(city)
      res.cookie('city_code', city, {
         maxAge: 200 * 24 * 60 * 60 * 1000,
         httpOnly: true,
         secure: true
      });

   // Return geo info
   response.responseData = { country, city };

   response.end();

}));

route.prependRoute(routes.authentication.route);

module.exports = route;
