
## Prune the database of things like duplicate parts ###


# TODO: Refactor for KIYAPP Tables
use kiyapp;

-- delete from parts where 1=1;  #dumb kill-switch (use only in dev!)
-- delete from prefabs where 1=1;  #dumb kill-switch (use only in dev!)

# find duplicates:
select name, count(name) from Discipline group by name having count(name) > 1;

# replace duplicates, keep the lower id (because we autoincrement those):
delete t1 from Discipline t1
inner join Discipline t2
where t1.id > t2.id and t1.name = t2.NAME;

# Show that dups are all gone:
select name, count(name) from Discipline group by name having count(name) > 1;
--
# Print the current contents:
select * from Discipline;