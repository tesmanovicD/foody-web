-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 14, 2018 at 10:05 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
CREATE TABLE IF NOT EXISTS `coupons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `type` enum('fixed','percentage') COLLATE utf8_unicode_ci NOT NULL,
  `discount` smallint(6) NOT NULL,
  `usage_limit` tinyint(4) NOT NULL,
  `used_coupons` tinyint(4) NOT NULL DEFAULT '0',
  `start_date` timestamp NOT NULL,
  `end_date` timestamp NOT NULL,
  `status` enum('active','inactive') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `code`, `type`, `discount`, `usage_limit`, `used_coupons`, `start_date`, `end_date`, `status`) VALUES
(2, 'K67TN397', 'fixed', 22, 2, 2, '2018-08-14 22:00:00', '2018-09-14 22:00:00', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(129) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fname` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `lname` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `date_registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `email`, `password`, `phone`, `fname`, `lname`, `date_registered`) VALUES
(9, 'zpopic@gmail.com', 'a078b1e15dbf17feb3eeebd900984c55c1551c2e9f23965c3d6613fd018c5c5b58929332f7c8c0957ef030253b243aa9ac1279480d99eada2883e5b3ad648a77', '06593242', 'Zoran', 'Popic', '2018-09-14 21:40:58'),
(10, 'sradovanovic@gmail.com', 'a078b1e15dbf17feb3eeebd900984c55c1551c2e9f23965c3d6613fd018c5c5b58929332f7c8c0957ef030253b243aa9ac1279480d99eada2883e5b3ad648a77', '', 'Stevica', 'Radovanovic', '2018-09-14 21:41:11'),
(11, 'dtesmanovic@gmail.com', 'a950175e333938c82f78ce3fcd7ea845b0037eb61890f159cf9aeda4c49808cbcced51413a55c031231b0ed6acf39104a73eea169bcc859917bd660618e6e646', '', 'Daniel', 'Tesmanovic', '2018-09-14 21:41:35');

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
  `password` varchar(129) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `fname`, `lname`, `username`, `password`) VALUES
(16, 'Admin', 'Korisnik', 'admin', 'a950175e333938c82f78ce3fcd7ea845b0037eb61890f159cf9aeda4c49808cbcced51413a55c031231b0ed6acf39104a73eea169bcc859917bd660618e6e646'),
(15, 'Daniel', 'Tesmanovic', 'dtesmanovic', 'f2fabb723907fae9b89013eb30b0080807b48b3e9ba050e114bb9cd3721b10af77451e193bd3186bdeae4b3f783180a07a636a94044a32d6746744aa40127c54');

-- --------------------------------------------------------

--
-- Table structure for table `food_category`
--

DROP TABLE IF EXISTS `food_category`;
CREATE TABLE IF NOT EXISTS `food_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` varchar(30) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no_image.png',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `food_category`
--

INSERT INTO `food_category` (`id`, `name`, `description`, `image`) VALUES
(13, 'povrce', 'opis neki', 'no_image.png'),
(18, 'slatko', 'hahaha', 'no_image.png'),
(19, 'test', 'teqtqew', '0.60_img_3820.jpg');

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
(1, 'Margarita', 'opis', 13, 'no_image.png', 22, 0),
(2, 'Testenina', 'ovo je opis', 13, 'no_image.png', 48, 3),
(7, 'palacinka', 'slatka palacinka', 18, '0.50_najukusnije_palacinke.jpg', 28, 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
  `pickup_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
