import * as fb from 'fb';

export default async function(token: string) {

   fb.setAccessToken(token);

   return new Promise(resolve => fb.api('/me', {
      fields: [
         'id',
         'name',
         'first_name',
         'last_name',
         'gender',
         'email'
      ]
   }, resolve));

}
