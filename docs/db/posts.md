# posts
Posts by places, events and people.

#### `id` *index*
`number` Main auto increment identifier.

#### `type`
`string` Can be any of the following:
   - `bulletin`: Plain text.
   - `article`: Bulletin with a title.
   - `carousel`: Article or bulletin with photos.

#### `publisher`
`number` Id of the publisher.

#### `published`
`boolean` Whether or not the post is visible.

#### `title`
`string` Post title if applicable.

#### `text`
`string` Post text.

#### `album`
`number` Id of the album that contains the images to be displayed by this post.

#### `date_created`
`number` A `Date.now()`.

#### `date_published`
`number` A `Date.now()`.
