za.controllers.tournamentBrowserSelector = new za.Controller(function(element){

   var fav_game = localStorage.getItem('fav_game');
   var game_record = clientData.games.filter(function(g){return g.id == fav_game;})[0];

   var place_id = localStorage.getItem('place_id');
   var place_name = localStorage.getItem('place_name');

   if(!fav_game || !game_record) {
      fav_game = clientData.user_data.fav_game || clientData.games[0].id;
      game_record = clientData.games.filter(function(g){return g.id == fav_game;})[0];
      localStorage.setItem('fav_game', fav_game);
   }

   $(element).find('.opt-game').attr('data-selected-game', fav_game);
   $(element).find('.opt-game .option').html(clientData.core_text[game_record.title]);

   $(element).find('.opt-location').attr('data-selected-location', place_id);
   $(element).find('.opt-location .option').html(place_name);

   $(element).find('.opt-game').click(function(){
      var selector = new za.ui.DataSelector({
         title: 'select_game',
         message: 'select_game_message',
         search: true,
         searchPlaceholder: 'search',
         image: 'image_small',
         buffered: true,
         multiSelect: false,
         cancelable: true,
         dataSource: clientData.games,
         selection: fav_game ? [{id:fav_game}] : null,
         rowTitle: function(entry){ return clientData.core_text[entry.title]; }
      });

      selector.spawn();

      selector.on('new', function(selection){
         localStorage.setItem('fav_game', selection.id);
         fav_game = selection.id;
         game_record = clientData.games.filter(function(g){return g.id == fav_game;})[0];

         $('.opt-game .option').html(clientData.core_text[selection.title]);
         $('.opt-game').attr('data-selected-game', selection.id);
      });
   });

   $(element).find('.opt-location').click(function(){
      var selector = new za.ui.DataSelector({
         title: 'select_city',
         message: 'select_city_message',
         search: true,
         searchPlaceholder: 'type_city_name',
         multiSelect: false,
         cancelable: true,
         dataSource: new za.GooglePlaceDataFetcher('appCities').fn,
         selection: place_id ? [{place_id:place_id}] : null,
         rowTitle: 'description'
      });

      selector.spawn();

      selector.on('new', function(selection){
         localStorage.setItem('place_id', selection.place_id);
         localStorage.setItem('place_name', selection.description);
         place_id = selection.place_id;
         place_name = selection.description;

         $('.opt-location .option').html(selection.description);
         $('.opt-location').attr('data-selected-location', selection.place_id);
      });
   });

});
