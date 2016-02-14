# configuration
Core app variables.

#### `_id` *index*
`ObjectId` Main index by MongoDb.

#### `key` *index*
`string` A unique key describing the property.

#### `value`
`any` Any form of data.

## Required keys
`domain_name` **string** The application's head domain name.

`site_name` **string** Application name.

`bind_ip` **string** Address to bind application server.

`port` **number** Port to bind application server.

`geoip_timeout` **number** Time in milliseconds before aborting a request for an address's location.

`use_geoip` **boolean** Whether or not to use a GeoIP server.

`geoip_url` **string** Url to GeoIP service.

`grecaptcha` **object** Google Recaptcha credentials.
   * `site_key` **string** Site key.
   * `secret_key` **string** Secret key.

`use_xfwd` **boolean** Whether or not to use `x-forwarded-for` header.

`default_lang` **string** Default application language.

`app_languages` **string array** Supported language codes.

`main_menu` **object array** Main menu settings.
   * `core_id` **string** Text collection reference.
   * `href` **string** Menu item link.
   * `sub_menu` **object array** Array of menu objects like this one.

`protocol` **string** Protocol used by the application server.

`site_protocol` **string** Protocol that the application is served by (used in urls).

`ssl` **object** Certificates if `protocol` is set to `https`. This object will be passed to node's `https`.

`ga_tracking_code` **string** Google Analytics tracking code.

`max_web_sessions` **number** Maximum number of active web sessions a user can have.

`web_session_lifespan` **number** Milliseconds that a web session lasts before logging the user out.
