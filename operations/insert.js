/**
 * Operations to create records
 */
const create = (db, data) => {
  return db.record.create(data)
}

exports.create = create