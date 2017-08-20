-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 20, 2017 at 01:22 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testportaldb`
--

-- --------------------------------------------------------

--
-- Table structure for table `questionpaper`
--

CREATE TABLE `questionpaper` (
  `id` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `paper` varchar(3072) DEFAULT NULL,
  `owner` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questionpaper`
--

INSERT INTO `questionpaper` (`id`, `title`, `paper`, `owner`) VALUES
('drahsA', 'Arshad', '{"questions":[{"questionNumber":1,"text":"Arshad","Options":[{"number":1,"text":"Arshad"},{"number":2,"text":"Arshad"},{"number":3,"text":"Arshad"},{"number":4,"text":"Arshad"}],"marks":1,"correctAnswer":"3"},{"questionNumber":2,"text":"Arshad2","Options":[{"number":1,"text":"Arshad2"},{"number":2,"text":"Arshad2"},{"number":3,"text":"Arshad2"},{"number":4,"text":"Arshad2"}],"marks":1,"correctAnswer":"2"}],"title":"Arshad","time":60}', 'ansariarshad21@yahoo.in'),
('msouoplioCdlernC', 'Compilers on Cloud', '{"questions":[{"questionNumber":1,"text":"What is Cloud?","Options":[{"number":1,"text":"Cloud"},{"number":2,"text":"Cloud"},{"number":3,"text":"Cloud"},{"number":4,"text":"Cloud"}],"marks":1,"correctAnswer":"2"},{"questionNumber":2,"text":"What is compiler?","Options":[{"number":1,"text":"compiler"},{"number":2,"text":"compiler"},{"number":3,"text":"compiler"},{"number":4,"text":"compiler"}],"marks":1,"correctAnswer":"2"},{"questionNumber":3,"text":"What is Compilers on Cloud?","Options":[{"number":1,"text":"Compilers on Cloud"},{"number":2,"text":"Compilers on Cloud"},{"number":3,"text":"Compilers on Cloud"},{"number":4,"text":"Compilers on Cloud"}],"marks":1,"correctAnswer":"3"}],"title":"Compilers on Cloud","time":60}', 'ansariarshad21@yahoo.in');

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `paper` varchar(3072) NOT NULL,
  `candidate` varchar(255) NOT NULL,
  `result` text NOT NULL,
  `testID` varchar(255) NOT NULL,
  `marks` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`paper`, `candidate`, `result`, `testID`, `marks`) VALUES
('{"questions":[{"questionNumber":1,"text":"What is Cloud?","Options":[{"number":1,"text":"Cloud"},{"number":2,"text":"Cloud"},{"number":3,"text":"Cloud"},{"number":4,"text":"Cloud"}],"marks":1,"correctAnswer":"2","answer":"2"},{"questionNumber":2,"text":"What is compiler?","Options":[{"number":1,"text":"compiler"},{"number":2,"text":"compiler"},{"number":3,"text":"compiler"},{"number":4,"text":"compiler"}],"marks":1,"correctAnswer":"2","answer":"2"},{"questionNumber":3,"text":"What is Compilers on Cloud?","Options":[{"number":1,"text":"Compilers on Cloud"},{"number":2,"text":"Compilers on Cloud"},{"number":3,"text":"Compilers on Cloud"},{"number":4,"text":"Compilers on Cloud"}],"marks":1,"correctAnswer":"3","answer":"2"}],"title":"Compilers on Cloud","time":60,"scoredMarks":2,"totalMarks":3}', 'arshadansari530@gmail.com', 'pass', 'msouoplioCdlernC', 2),
('{"questions":[{"questionNumber":1,"text":"What is Cloud?","Options":[{"number":1,"text":"Cloud"},{"number":2,"text":"Cloud"},{"number":3,"text":"Cloud"},{"number":4,"text":"Cloud"}],"marks":1,"correctAnswer":"2","answer":"2"},{"questionNumber":2,"text":"What is compiler?","Options":[{"number":1,"text":"compiler"},{"number":2,"text":"compiler"},{"number":3,"text":"compiler"},{"number":4,"text":"compiler"}],"marks":1,"correctAnswer":"2","answer":"2"},{"questionNumber":3,"text":"What is Compilers on Cloud?","Options":[{"number":1,"text":"Compilers on Cloud"},{"number":2,"text":"Compilers on Cloud"},{"number":3,"text":"Compilers on Cloud"},{"number":4,"text":"Compilers on Cloud"}],"marks":1,"correctAnswer":"3","answer":"2"}],"title":"Compilers on Cloud","time":60,"scoredMarks":2,"totalMarks":3}', 'arshad.engineer21@gmail.com', 'pass', 'msouoplioCdlernC', 2),
('{"questions":[{"questionNumber":1,"text":"Arshad","Options":[{"number":1,"text":"Arshad"},{"number":2,"text":"Arshad"},{"number":3,"text":"Arshad"},{"number":4,"text":"Arshad"}],"marks":1,"correctAnswer":"3","answer":"2"},{"questionNumber":2,"text":"Arshad2","Options":[{"number":1,"text":"Arshad2"},{"number":2,"text":"Arshad2"},{"number":3,"text":"Arshad2"},{"number":4,"text":"Arshad2"}],"marks":1,"correctAnswer":"2","answer":"2"}],"title":"Arshad","time":60,"scoredMarks":1,"totalMarks":2}', 'arshad.engineer21@gmail.com', 'pass', 'drahsA', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Name` varchar(255) NOT NULL,
  `Gender` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Mobile` int(255) NOT NULL,
  `Type` varchar(256) NOT NULL DEFAULT 'Examiner'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Name`, `Gender`, `Email`, `Password`, `Mobile`, `Type`) VALUES
('Arshad', 'Mr.', 'abc@gmail.com', '7890', 2147483647, 'Examiner'),
('Arshad', 'Mr.', 'ansariarshad21@yahoo.in', '123456', 2147483647, 'Examiner'),
('Arshad', 'Mr.', 'arshad.engineer21@gmail.com', '5678', 2147483647, 'Candidate'),
('Arshad', 'Mr.', 'arshadansari530@gmail.com', '9870', 2147483647, 'Candidate');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Email`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
