delete from Student where 1=1;
delete from Professional where 1=1;
delete from School where 1=1;
delete from Student_Progress where 1=1;
delete from Training where 1=1;
delete from Disciplines where 1=1;
delete from Certification where 1=1;

ALTER TABLE Student AUTO_INCREMENT = 1;
ALTER TABLE Professional AUTO_INCREMENT = 1;
ALTER TABLE School AUTO_INCREMENT = 1;
ALTER TABLE Disciplines AUTO_INCREMENT = 1;

insert into Disciplines
	values 	(null, 'Taekwondo', null),
			(null, 'Brazilian Jiu-Jitsu', null),
			(null, 'Kickboxing', null),
			(null, 'Karate', null),
			(null, 'Jeet Kun Do', null),
			(null, 'Kung Fu', null),
			(null, 'Tai Chi', null),
			(null, 'Fencing', null),
			(null, 'Krav Maga', null),
			(null, 'Muay Thai', null),
			(null, 'Arnis', null),
			(null, 'Aikido', null),
			(null, 'Mixed Martial Arts', null),
			(null, 'Boxing', null),
			(null, 'Capoeira', null),
			(null, 'Wrestling', null),
			(null, 'Jojutso', null),
			(null, 'Judo', null),
			(null, 'Kendo', null),
			(null, 'Ninjutsu', null),
			(null, 'Sambo', null),
			(null, 'Sumo', null),
			(null, 'Wing Chun', null);

insert into Student (`FirstName`,`LastName`)
    values  ('Jackie', 'Chan'),
            ('Bruce', 'Lee'),
            ('Michael', 'Wazowski'),
            ('Jenny', 'Matrix'),
            ('Janet', 'Johnson'),
            ('Peter', 'Parker'),
            ('Bruce', 'Wayne'),
            ('Jet', 'Li'),
            ('Keanu', 'Reeves'),
            ('Laurence', 'Fishburne');

insert into `Professional` (`FirstName`,`LastName`, `SchoolId`)
    values 	('Jorge', 'Silveus', 1),
			('Dave', 'Johnson', 2),
			('Daniel', 'Hines', 3),
			('Jenny', 'Lacy', 4),
			('Ip', 'Man', 5);

insert into `School` (`name`, `address`, `website`)
    values  ('Silveus Taekwondo', '2630 Northaven Rd # 114, Dallas, TX 75229', ''),
			('Texas Blackbelt Academy', '425 N Cooper St, Arlington, TX 76011', ''),
            ('Krav Maga DFW', '2650 Midway Rd #204 Carrollton, TX 7`5006', ''),
			('Lacy Taekwondo', '9454 N MacArthur Blvd, Irving, TX 75063', '');

insert into Student_Progress (`StudentId`, `Belt`,`Degree`,`DisciplinesId`, `SchoolId`)
	values  (1, 'Black', 3, 1, 4),
			(1, 'Blue', null, 1, 3),
			(2, 'Green', null, 1, 2),
			(3, 'Yellow', null, 1, 3),
			(4, 'Blue', null, 1, 2),
			(5, 'Blue', null, 1, 1),
			(5, 'Purple', null, 1, 4)
			;

insert into Training
	values 	(1, 1, 3, 1),
			(2, 3, 2, 5),
			(2, 5, 2, 10),
			(5, 6, 7, 8),
			(1, 2, 3, 4),
			(1, 1, null, 1)
	;
insert into Certification
	values 	(1, 1, 'Black', 3),
			(1, 2, 'Black', 2),
			(1, 14, 'Black', null),
			(2, 2, 'Black', 4),
			(2, 1, 'Black', 2),
			(5, 23,'Black', 6),
			(3, 9,'Black', 6),
			(3, 10,'Black', 6),
			(4, 1, 'Black', 1),
			(4, 2, 'Black', 1)
			;



select * from School;
select * from Training;
select * from Student;
select * from Professional;
select * from Student_Progress;
select * from Disciplines;

