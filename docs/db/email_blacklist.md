# email_blacklist
Used to store email addresses that email has been sent to. Too many emails will let a `postman` know when to stop.

#### `email`
`string` Email address.

#### `messages`
`number array` Contains `Date.now() + ttl`'s, or expiry dates. 
