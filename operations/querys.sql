-- Get users that have a edge called 'UserGroup'
select *, inE('UserGroup') from V where in_UserGroup is not null 

-- Ǵet user group name
select *, out('UserGroup').name[0] as user_group from V where out_UserGroup is not null