CREATE database if NOT EXISTS kiyapp;
USE kiyapp;

drop TABLE if exists `Student`;
drop table if exists `School`;
drop table if exists `Student_Progress`;
drop table if exists `Training`;
drop table if exists `Professional`;

CREATE TABLE `Student` (
  `Id` int auto_increment not null,
  `FirstName` varchar(50),
  `LastName` varchar(50),
  PRIMARY KEY (`Id`)
);

CREATE TABLE `School` (
  `Id` int auto_increment not null,
  `Name` varchar(75),
  `Address` varchar(50),
  `Website` varchar(150),
  `Phone` int(12),
  PRIMARY KEY (`Id`)
);

CREATE TABLE `Student_Progress` (
  `StudentId` int,
  `Belt` varchar(20),
  `Degree` int,
  `SchoolId` int,
  KEY `FK` (`StudentId`, `SchoolId`)
);

CREATE TABLE `Training` (
  `StudentId` int,
  `ProfessionalId` int,
  `SchoolId` int,
  KEY `FK` (`StudentId`, `ProfessionalId`, `SchoolId`)
);

CREATE TABLE `Professional` (
  `id` int auto_increment not null,
  `FirstName` varchar(75),
  `LastName` varchar(75),
  `SchoolId` int,
  PRIMARY KEY (`id`),
  KEY `FK` (`SchoolId`)
);