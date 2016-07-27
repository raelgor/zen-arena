export default async function increment_email(email) {

   var emailIsAllowed;

   // Maximum pending expiry dates
   var max = appConfig.max_emails_per_interval;

   // TTL for each message record
   var interval = appConfig.email_blacklist_interval;

   var record = await dataTransporter.get({
      query: { email },
      database: instance.config.systemDatabase.name,
      collection: 'email_blacklist'
   });

   var messages = [];
   record = record[0];

   // If there is a record of this email
   if(record)
      // Make a new array with just the expiry dates pending
      for(let expiry of record.messages)
         expiry > Date.now() && messages.push(expiry);
   // Otherwise create record
   else
      record = { email, messages };

   emailIsAllowed = messages.length < max;

   // Add this attempt if valid
   if(emailIsAllowed)
      messages.push(Date.now() + interval);

   // Delete object _id
   delete record._id;

   // Update or insert
   await dataTransporter.update({
      query: { email },
      update: { $set: record },
      options: { upsert: true },
      database: instance.config.systemDatabase.name,
      collection: 'email_blacklist'
   });

   return emailIsAllowed;

};
