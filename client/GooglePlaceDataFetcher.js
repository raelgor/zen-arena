/*

Types:
   cities Brings cities
   countries Brings countries
   appCities Brings cities from the app's supported countries

*/
za.GooglePlaceDataFetcher = function(type){

   var bannedUntil = Date.now();
   var nextTimeout;
   var r = 0;

   var fn = this.fn = function($q, $i, callback){

      var t_r = ++r;
      if(bannedUntil > Date.now())
         return (nextTimeout = setTimeout(function(){
            t_r == r &&
            fn($q, $i, callback);
         },bannedUntil - Date.now()));

      // Max of 1 r/s
      bannedUntil = Date.now() + 1e3;

      if(!$q)
         return callback([]);

      var ac = new google.maps.places.AutocompleteService();
      var searchObject = {
         input: $q,
         types: [type == 'countries' ? '(regions)':'(cities)']
      };

      if(type==='appCities') {

         var promises = [];

         clientData.app_countries.forEach(function(country_code){
            promises.push(new Promise(function(resolve){
               ac.getPlacePredictions({
                  input: $q,
                  types: ['(cities)'],
                  componentRestrictions: {country: country_code}
               }, function(){

                  var responseResults = arguments[0] || [];
                  var results = [];

                  responseResults.forEach(function(r){
                     if(!results.filter(function(p){return p.place_id === r.place_id;})[0])
                        results.push(r);
                  });

                  resolve(results);

               });
            }));
         });

         Promise.all(promises).then(function(results){
            if(t_r != r) return;
            var result =
               []
               .concat
               .apply([],results)
               .sort(function(a,b){ return a.description > b.description; });

            callback(result);
         });

      } else
         ac.getPlacePredictions(searchObject, function(){

            var responseResults = arguments[0] || [];
            var results = [];

            type == 'cities' &&
            responseResults.forEach(function(r){
               if(
                  !results.filter(function(p){return p.place_id === r.place_id;})[0]
               )
                  results.push(r);
            });

            type == 'countries' &&
            responseResults.forEach(function(r){
               if(
                  !results.filter(function(p){return p.place_id === r.place_id;})[0] &&
                  ~r.types.indexOf("country")
               )
                  results.push(r);
            });

            callback(results);

         });

   };

};
