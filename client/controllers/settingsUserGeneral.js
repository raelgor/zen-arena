za.controllers.settingsUserGeneral = new za.Controller(function(element){

   var country_place_id = $(element).find('[name="country_place_id"]').val();
   var city_place_id = $(element).find('[name="city_place_id"]').val();

   if(window._g_autoComplete)
      initSelects();
   else
      za.on('GoogleAutoCompleteLoaded', function(){
         if(!$('.selected[href="/settings"]').length) return;
         initSelects();
      });

   function initSelects(){

      var ps = new google.maps.places.PlacesService(document.createElement('div'));

      country_place_id ?
      ps.getDetails({
         placeId: country_place_id,
         language: clientData.lang_country_code
      }, initCountrySelect) :
      initCountrySelect();

      city_place_id ?
      ps.getDetails({
         placeId: city_place_id,
         language: clientData.lang_country_code
      }, initCitySelect) :
      initCitySelect();

   }

   function initCountrySelect(place){

      $(element).find('.prop-select.country').append(new za.ui.Select({
         title: 'select_country',
         search: true,
         searchPlaceholder: 'type_country_name',
         cancelable: true,
         dataSource: new za.GooglePlaceDataFetcher('countries').fn,
         selection: country_place_id ? [{place_id:country_place_id}] : null,
         rowTitle: 'description',
         name: country_place_id ? place.address_components[0].long_name : clientData.core_text.select + '...'
      }).element);

   }

   function initCitySelect(place){

      $(element).find('.prop-select.city').append(new za.ui.Select({
         title: 'select_city',
         search: true,
         searchPlaceholder: 'type_city_name',
         cancelable: true,
         dataSource: new za.GooglePlaceDataFetcher('cities').fn,
         selection: city_place_id ? [{place_id:city_place_id}] : null,
         rowTitle: 'description',
         name: city_place_id ? place.address_components[0].long_name : clientData.core_text.select + '...'
      }).element);

   }

   var langSelect = new za.ui.Select({
      title: 'select_language',
      message: 'select_language_message',
      buffered: true,
      cancelable: true,
      dataSource: '/api/selector/language/$i?q=$q',
      selection: [{ code: clientData.lang }],
      rowTitle: 'name',
      name: clientData.lang_name
   });

   $(element).find('.prop-select.language').append(langSelect.element);

   langSelect.on('change', function(selection){
      if(selection.code != clientData.lang){
         za.send('/api/text/' + selection.code).success(function(response){
            za._language_change_handler(response, selection.code);
            if($('.logged-in').length)
               za.send('/api/set/language/' + selection.code).success(function(r){
                  if(r.message === 'ok')
                     clientData.user_data.lang = selection.code;
               });
         });
      }
   });

   $(element).find('button.submit').click(function(){
      
   });

});
