use kiyapp;

# Teacher's Certifications:
select
	concat(P.FirstName, ' ', P.LastName) as 'Teacher',
	#concat(ifnull(concat(Cert.Degree,'nd degree '), ''), Belt, ' belt') as 'Rank', Name as 'Teaches'  #fun, but not practical
	Name as 'Teaches', concat(Belt, ' belt') as 'Rank', Degree
	from Certification Cert
		join Professional P
		join Discipline D
		on Cert.ProfessionalId = P.Id and D.Id = Cert.DisciplineId;

# Students train with which pros:
select
	concat(S.FirstName, ' ', S.LastName) as 'Student',
	concat(P.FirstName, ' ', P.LastName) as 'Teacher'
		from Training T
		join Student S
		join Professional P
		on S.Id = T.StudentId and P.Id = T.ProfessionalId
	limit 10;

# Who is training in what?:
select
	concat(S.FirstName, ' ', S.LastName) as 'Student',
	Name as 'Discipline' from Discipline D
		join Training T
		on T.DisciplineId = D.Id
		join Student S
		on S.Id = T.StudentId;

# Who's training in what, with which pros?:
select
	concat(S.FirstName, ' ', S.LastName) as 'Student',
	concat(P.FirstName, ' ', P.LastName) as 'Teacher',
	Name as 'Discipline' from Discipline D
		join Training T
		on T.DisciplineId = D.Id
		join Student S
		join Professional P
		on S.Id = T.StudentId and
		P.Id = T.ProfessionalId;

# Student Progress:
select
	concat(S.FirstName, ' ', S.LastName) as 'Student',
	D.Name as 'Discipline', Belt, Degree,
	'at',
	SC.Name as 'School'
	from student_progress SP
		join School SC
		join Student S
		on SC.Id = SP.SchoolId
			and S.Id = SP.StudentId
		join Training T
		join Discipline D
		on T.DisciplineId = D.Id
	limit 10;