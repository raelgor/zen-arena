/* global za, clientData */

/**
 * Attempts to get user geolocation information.
 * @memberof za
 * @returns undefined
 */
za.geoRequest = function(){
   if(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(updateClientGeoInfo);

   function updateClientGeoInfo(Geoposition) {
      if(!Geoposition || !Geoposition.coords)
         return;

      var long = Geoposition.coords.longitude;
      var lat = Geoposition.coords.latitude;

      if(long && lat)
         za.send('/api/updategeo', {
            longitude: long,
            latitude: lat
         }).success(function(response){
            if(response.data.geolocation)
               clientData.geolocation = response.data.geolocation;
         });
   }
};
