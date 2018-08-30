-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 30, 2018 at 09:28 PM
-- Server version: 5.7.21
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foody`
--
CREATE DATABASE IF NOT EXISTS `foody` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `foody`;

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
CREATE TABLE IF NOT EXISTS `coupons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `discount` smallint(6) NOT NULL,
  `usage_limit` tinyint(4) NOT NULL,
  `used_coupons` tinyint(4) NOT NULL DEFAULT '0',
  `start_date` timestamp NOT NULL,
  `end_date` timestamp NOT NULL,
  `status` varchar(9) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `code`, `type`, `discount`, `usage_limit`, `used_coupons`, `start_date`, `end_date`, `status`) VALUES
(2, 'K67TN397', 'fixed', 22, 2, 0, '2018-08-14 22:00:00', '2018-09-14 22:00:00', 'inactive');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fname` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `lname` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `date_registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `email`, `password`, `phone`, `fname`, `lname`, `date_registered`) VALUES
(3, 'edincedin@gmail.com', '123', '', 'Daniel', 'Tesmanovic', '2018-08-30 21:13:10'),
(4, 'dani@gmail.com', '111', '', 'Marko', 'Markovic', '2018-08-30 21:13:10');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
CREATE TABLE IF NOT EXISTS `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `lname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `fname`, `lname`, `username`, `password`) VALUES
(8, 'Daniel', 'Tesmanovic', 'danites', '123'),
(9, 'Aleksandar', 'Mamuzic', 'mamuza', '111');

-- --------------------------------------------------------

--
-- Table structure for table `food_category`
--

DROP TABLE IF EXISTS `food_category`;
CREATE TABLE IF NOT EXISTS `food_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `food_category`
--

INSERT INTO `food_category` (`id`, `name`, `description`) VALUES
(13, 'povrce', 'eheh'),
(18, 'slatko', 'hahaha');

-- --------------------------------------------------------

--
-- Table structure for table `food_items`
--

DROP TABLE IF EXISTS `food_items`;
CREATE TABLE IF NOT EXISTS `food_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `category` int(11) NOT NULL,
  `image` varchar(30) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no_image.png',
  `price` smallint(6) NOT NULL,
  `quantity` smallint(6) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `food_items`
--

INSERT INTO `food_items` (`id`, `name`, `description`, `category`, `image`, `price`, `quantity`) VALUES
(1, 'Margarita', 'opis', 13, '', 22, 3),
(2, 'Testenina', 'ovo je opis', 13, '', 48, 2),
(7, 'palacinka', 'slatka palacinka', 18, '0.50_najukusnije_palacinke.jpg', 24, 34);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_order` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `item` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `quantity` tinyint(4) NOT NULL,
  `price` smallint(6) NOT NULL,
  `total` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_order` (`id_order`),
  KEY `id_item` (`id_item`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `id_order`, `id_item`, `item`, `quantity`, `price`, `total`) VALUES
(1, 48, 1, 'Margarita', 1, 22, 22),
(2, 48, 2, 'Testenina', 1, 48, 48),
(3, 49, 2, 'Testenina', 1, 48, 48),
(4, 50, 1, 'Margarita', 1, 22, 22);

--
-- Triggers `order_items`
--
DROP TRIGGER IF EXISTS `quantityUpdate`;
DELIMITER $$
CREATE TRIGGER `quantityUpdate` AFTER INSERT ON `order_items` FOR EACH ROW BEGIN
	UPDATE food_items SET quantity = quantity - NEW.quantity WHERE food_items.id = NEW.id_item;
	END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `order_payments`
--

DROP TABLE IF EXISTS `order_payments`;
CREATE TABLE IF NOT EXISTS `order_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_customer` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `price` smallint(15) NOT NULL DEFAULT '0',
  `order_no` bigint(15) NOT NULL,
  `status` enum('Canceled','Pending','Ready','Completed') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Pending',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `order_payments`
--

INSERT INTO `order_payments` (`id`, `id_customer`, `date`, `price`, `order_no`, `status`) VALUES
(48, 8, '2018-08-27 08:23:29', 70, 58208651, 'Canceled'),
(49, 8, '2018-08-27 09:08:09', 48, 60888626, 'Completed'),
(50, 8, '2018-08-27 09:19:44', 22, 61583967, 'Pending');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `order_payments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`id_item`) REFERENCES `food_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
