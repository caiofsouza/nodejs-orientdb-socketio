const getAll = (db) => {
  return db.query('select from V')
}

const get = (db, rid) => {
  return db.record.get(rid)
}


exports.getAll = getAll
exports.get = get