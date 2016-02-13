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
`string` MySQL timestamp date.

#### `first_name`
`string` Current first name. May be overwritten by OAuth API data.

#### `last_name`
`string` Current last name. May be overwritten by OAuth API data.

#### `phone`
`string` Phone number including country code.

#### `gender`
`string` Enum 'male' or 'female'.

#### `password`
`string` Password string hash from bcrypt.
