import User from '../classes/User';
import uuid from './uuid';

export default async function on_user_created(user: User) {

   await instance.mongos.collection('namespaces').insert({
      id: +user.get('id'),
      collection: 'users',
      namespace: null
   });

   user.set('coc_verification_code', uuid().substr(0,8).toUpperCase());

   if(!user.get('unsubscribe_all_token')) {
      user.set('unsubscribe_all_token', uuid());
   }

   await user.updateRecord();

   if(user.get('email_verified'))
      await postman.welcome(user);

};
