/**
 * Operations to get Users and Groups
 */
const get = (db, rid) => {
  return db.record.get(rid)
}

const getAllUsers = (db) => {
  return db.query("select *, out('UserGroup').name as user_group from User")
}

const getAllGroups = (db) => {
  return db.query("select from Group")
}

const getGroup = (db, group) => {
  return db.query(`select from Group where name = '${group}'`)
}

const getByGroup = (db, group_name) => {
  return db.query(`select *, out('UserGroup').name as user_group 
                    from User 
                    where out('UserGroup').name = '${group_name}' and out_UserGroup is not null`)
}


exports.get = get
exports.getAllUsers = getAllUsers
exports.getAllGroups = getAllGroups
exports.getGroup = getGroup
exports.getByGroup = getByGroup