# sessions
Active sessions.

#### `session_token` *index*
`string` The session token or secret cookie.

#### `user_id`
`string` The owner of this session token.

#### `csrf_token`
`string` The csrf token sent with this session's requests.

#### `expires`
`number` A `Date.now() + sessionDuration`.

#### `date_created`
`number` A `Date.now()`.

#### `type`
`string` Can be web/ios/android etc.
