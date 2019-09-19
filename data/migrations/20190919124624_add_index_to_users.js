
exports.up = knex => 
  knex.schema.table('users', user => {
      user.specificType('searchIndex', 'tsvector')
      user.index('searchIndex', null, 'gin')
  })

exports.down = knex => 
  knex.schema.table('users', user => {
      user.dropIndex(null, 'searchIndex')
  })
