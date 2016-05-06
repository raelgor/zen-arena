'use strict';

module.exports = function(){

   const google = require('googleapis');

   var key = appConfig.google_service_account;
   var jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, [
      'https://www.googleapis.com/auth/analytics.readonly'
   ], null);

   jwtClient.authorize(() => {
      let analytics = google.analytics('v3');
      analytics.data.ga.get({
        'auth': jwtClient,
        'ids': 'ga:116229117',
        'metrics': 'ga:pageViews',
        'dimensions': 'ga:pagePath',
        'start-date': '260daysAgo',
        'end-date': 'yesterday',
        'sort': '-ga:pageViews',
        'max-results': 10,
        'filters': 'ga:pagePath=~/$',
      }, function (err, response) {
        if (err) {
          console.log(err);
          return;
        }
        //console.log(JSON.stringify(response, null, 4));
      });
   });

};
