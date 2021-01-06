CREATE database if NOT EXISTS kiyapp;
USE kiyapp;

drop TABLE if exists `Student`;
drop table if exists `School`;
drop table if exists `Student_Progress`;
drop table if exists `Training`;
drop table if exists `Professional`;
drop table if exists `Discipline`;
drop table if exists `Certification`;

CREATE TABLE `Student` (
  `Id` int auto_increment not null,
  `FirstName` varchar(50),
  `LastName` varchar(50),
  PRIMARY KEY (`Id`)
);

CREATE TABLE `School` (
  `Id` int auto_increment not null,
  `Name` varchar(75) not null,
  `Address` varchar(50) not null,
  `Website` varchar(150) null,
  `Phone` varchar(12) null,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `Student_Progress` (
  `StudentId` int,
  `Belt` varchar(20),
  `Degree` int null,
  `SchoolId` int,
  `DisciplineId` int,
  KEY `FK` (`StudentId`, `SchoolId`, `DisciplineId`)
);

CREATE TABLE `Training` (
  `StudentId` int not null,
  `ProfessionalId` int not null,
  `SchoolId` int,
  `DisciplineId` int not null,
  KEY `FK` (`StudentId`, `ProfessionalId`, `SchoolId`, `DisciplineId`)
);

CREATE TABLE `Professional` (
  `Id` int auto_increment not null,
  `FirstName` varchar(75),
  `LastName` varchar(75),
  `SchoolId` int,
  PRIMARY KEY (`Id`),
  KEY `FK` (`SchoolId`)
);

CREATE TABLE `Certification` (
  `ProfessionalId` int not null,
 `DisciplineId` int not null, 
 `Belt` varchar(20) not null,
 `Degree` int null,
  KEY `FK` (`ProfessionalId`, `DisciplineId`)
);

CREATE TABLE `Discipline` (
  `Id` int auto_increment not null,
  `Name` varchar(100) not null,
  `Description` varchar(1500) null,
  PRIMARY KEY (`Id`, `Name`),
  KEY `PK,FK` (`Id`, `Name`)
);

ALTER TABLE Discipline ADD UNIQUE INDEX(Id, Name);
ALTER TABLE Certification ADD UNIQUE INDEX(ProfessionalId, DisciplineId);