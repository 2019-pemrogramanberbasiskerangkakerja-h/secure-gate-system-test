-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2019 at 07:25 AM
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
  `gate_start` time NOT NULL,
  `gate_end` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gate`
--

INSERT INTO `gate` (`gate_id`, `gate_start`, `gate_end`) VALUES
('ewewe', '00:30:00', '13:00:00'),
('jokowi', '10:00:00', '21:00:00'),
('mygate', '00:00:00', '10:00:00'),
('owowo', '14:30:00', '17:00:00');

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
('admin', '2019-04-29 16:49:54', 'mencoba login'),
('admin', '2019-04-29 16:52:09', 'mencoba login'),
('5', '2019-04-29 16:52:20', 'mencoba login'),
('admin', '2019-04-29 16:53:08', 'mencoba login'),
('admin', '2019-04-29 16:53:58', 'mencoba login'),
('5', '2019-04-29 16:55:20', 'mencoba login'),
('admin', '2019-04-29 16:56:17', 'mencoba login'),
('5', '2019-04-29 19:31:12', 'mencoba login'),
('admin', '2019-04-29 19:37:26', 'mencoba login'),
('admin', '2019-04-29 19:40:48', 'mencoba login'),
('5', '2019-04-29 19:50:25', 'mencoba login'),
('5', '2019-04-29 19:51:09', 'mencoba login'),
('admin', '2019-04-29 19:51:32', 'mencoba login'),
('admin', '2019-04-29 19:53:43', 'mencoba login'),
('admin', '2019-04-29 19:55:28', 'mencoba login'),
('admin', '2019-04-29 19:58:09', 'mencoba login'),
('5', '2019-04-30 01:34:45', 'mencoba login'),
('admin', '2019-04-30 01:35:12', 'mencoba login'),
('05111640000085', '2019-04-30 03:05:03', 'mencoba login'),
('05111640000085', '2019-04-30 03:23:34', 'mencoba login'),
('05111640000085', '2019-04-30 03:33:06', 'mencoba login di gate jokowi'),
('admin', '2019-04-30 03:42:50', 'mencoba login di gate ewewe');

-- --------------------------------------------------------

--
-- Table structure for table `usergate`
--

CREATE TABLE `usergate` (
  `user_nrp` char(14) NOT NULL,
  `gate_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usergate`
--

INSERT INTO `usergate` (`user_nrp`, `gate_id`) VALUES
('awk', 'ewewe'),
('awk', 'owowo'),
('5', 'ewewe'),
('5', 'owowo'),
('5', 'jokowi');

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
('05111640000085', '7d00ff54a263fe80825b9297804a982c', 'user'),
('05111640000099', '8fc9ea4323c75d30cd28d1ca854d56d8', 'user'),
('0511164000086', '60b48fed8fc21ba660b00022bc06f0ed', 'user'),
('5', 'e4da3b7fbbce2345d7772b0674a318d5', 'user'),
('admin', '21232f297a57a5a743894a0e4a801fc3', 'admin'),
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
