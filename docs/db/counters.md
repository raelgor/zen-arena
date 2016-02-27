# counters
Used to store auto increment counters.

#### `collection`
`string` Name of the collection that the incremented key belongs to.

#### `seq`
`number` The sequence number.

#### `id`
`string` Name of the key.

## Example
```js
db.counters.insert(
   {
      id: "userid",
      collection: "users",
      seq: 0
   }
)

function getNextSequence(collection, name) {
   var ret = db.counters.findAndModify(
          {
            query: { id: name, collection },
            update: { $inc: { seq: 1 } },
            new: true
          }
   );

   return ret.seq;
}

db.users.insert(
   {
     id: getNextSequence("users", "userid"),
     name: "Sarah C."
   }
)

```

## Required data
`ns_id`: `id`
`posts`: `id`
