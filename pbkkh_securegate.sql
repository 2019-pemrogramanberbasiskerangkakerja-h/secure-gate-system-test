-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2019 at 06:47 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pbkkh_securegate`
--

-- --------------------------------------------------------

--
-- Table structure for table `gate`
--

CREATE TABLE `gate` (
  `gate_id` varchar(20) NOT NULL,
  `gate_start` datetime NOT NULL,
  `gate_end` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gate`
--

INSERT INTO `gate` (`gate_id`, `gate_start`, `gate_end`) VALUES
('ewewe', '2019-04-29 00:30:00', '2019-04-30 13:00:00'),
('owowo', '2011-04-20 14:30:00', '2011-04-25 02:45:00');

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `user_nrp` char(14) NOT NULL,
  `log_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `log_actions` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`user_nrp`, `log_timestamp`, `log_actions`) VALUES
('joko', '2019-04-28 16:48:36', 'mencoba login'),
('joko', '2019-04-28 16:48:56', 'mencoba login');

-- --------------------------------------------------------

--
-- Table structure for table `usergate`
--

CREATE TABLE `usergate` (
  `user_nrp` char(14) NOT NULL,
  `gate_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_nrp` char(14) NOT NULL,
  `user_password` varchar(32) NOT NULL,
  `user_role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_nrp`, `user_password`, `user_role`) VALUES
('awk', '5e4c8dfa9e20567e2655e847f68193b2', 'user'),
('joko', '9ba0009aa81e794e628a04b51eaf7d7f', 'user'),
('kyky', '6bcd4817088a4bc68bbee1d34d14b541', 'user'),
('undefined', '5e543256c480ac577d30f76f9120eb74', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gate`
--
ALTER TABLE `gate`
  ADD PRIMARY KEY (`gate_id`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD KEY `user_nrp` (`user_nrp`);

--
-- Indexes for table `usergate`
--
ALTER TABLE `usergate`
  ADD KEY `user_nrp` (`user_nrp`),
  ADD KEY `gate_id` (`gate_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_nrp`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `log_ibfk_1` FOREIGN KEY (`user_nrp`) REFERENCES `users` (`user_nrp`);

--
-- Constraints for table `usergate`
--
ALTER TABLE `usergate`
  ADD CONSTRAINT `usergate_ibfk_1` FOREIGN KEY (`user_nrp`) REFERENCES `users` (`user_nrp`),
  ADD CONSTRAINT `usergate_ibfk_2` FOREIGN KEY (`gate_id`) REFERENCES `gate` (`gate_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
