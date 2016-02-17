# users
Core user data storage.

#### `id` *index*
`number` Main auto increment identifier.

#### `_id` *index*
`ObjectId` Default auto unique id of MongoDB.

#### `fbid` *index*
`string` Facebook Id as returned by API.

#### `email` *index*
`string` Unique index.

#### `date_joined`
`ISODate` Timestamp.

#### `first_name`
`string` Current first name. May be overwritten by OAuth API data.

#### `last_name`
`string` Current last name. May be overwritten by OAuth API data.

#### `phone`
`string` Phone number including country code.

#### `gender`
`string` Enum 'male' or 'female'.

#### `image_type`
`string` Enum 'g_plus_link' || 'fb_link' || 'upload' || 'none'.

#### `image`
`string` Link to the user's image.

#### `password`
`string` Password string hash from bcrypt.

#### `sessions`
`object` Session information. Keys are the session tokens.
   * `session_token` **string** The session token or secret cookie.
   * `csrf_token` **string** The csrf token sent with this session's requests.
   * `expires` **number** A `Date.now() + sessionDuration`.
   * `date_created` **number** A `Date.now()`.

#### `fpass_cd`
`number` A `Date.now() + offset` describing the minimum date a user can receive another forgot password email.

#### `unsubscribe_all_token`
`string` A `uuid()` that can be used for 1-click unsubscribe from all emails for the user.

#### `unsubscribe_all_email`
`boolean` Whether or not the user has unsubscribed from all eimail.
