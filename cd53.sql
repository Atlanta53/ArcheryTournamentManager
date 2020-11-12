-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 18 juin 2020 à 15:11
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `cd53`
--

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `ID_category` int(11) NOT NULL AUTO_INCREMENT,
  `categoryname` text DEFAULT NULL,
  PRIMARY KEY (`ID_category`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`ID_category`, `categoryname`) VALUES
(1, 'Poussin'),
(2, 'Benjamin'),
(3, 'Minime'),
(4, 'Cadet'),
(5, 'Junior'),
(6, 'Senior 1'),
(7, 'Senior 2'),
(8, 'Senior 3');

-- --------------------------------------------------------

--
-- Structure de la table `city`
--

DROP TABLE IF EXISTS `city`;
CREATE TABLE IF NOT EXISTS `city` (
  `ID_city` int(11) NOT NULL AUTO_INCREMENT,
  `name` text DEFAULT NULL,
  `postal_code` text DEFAULT NULL,
  PRIMARY KEY (`ID_city`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `city`
--

INSERT INTO `city` (`ID_city`, `name`, `postal_code`) VALUES
(1, 'Laval', '53000');

-- --------------------------------------------------------

--
-- Structure de la table `club`
--

DROP TABLE IF EXISTS `club`;
CREATE TABLE IF NOT EXISTS `club` (
  `ID_club` int(11) NOT NULL AUTO_INCREMENT,
  `clubname` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  PRIMARY KEY (`ID_club`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `club`
--

INSERT INTO `club` (`ID_club`, `clubname`, `address`, `city`, `email`) VALUES
(1, 'USLaval Tir à l\'arc', 'palindrome', 'Laval', 'tiralarc@gmail.com'),
(2, 'TAL Changé', 'Parc des sports', 'Changé', NULL),
(3, 'TAL Genest', 'Parc des sports', 'Genest saint Isle', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `competition`
--

DROP TABLE IF EXISTS `competition`;
CREATE TABLE IF NOT EXISTS `competition` (
  `ID_competition` int(11) NOT NULL AUTO_INCREMENT,
  `date_begin` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `date_end_inscription` date DEFAULT NULL,
  `ID_type` int(11) DEFAULT NULL,
  `ID_club` int(11) DEFAULT NULL,
  `nb_depart` int(11) DEFAULT 1,
  `path_pdf` text DEFAULT NULL,
  PRIMARY KEY (`ID_competition`)
) ENGINE=MyISAM AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `competition`
--

INSERT INTO `competition` (`ID_competition`, `date_begin`, `date_end`, `date_end_inscription`, `ID_type`, `ID_club`, `nb_depart`, `path_pdf`) VALUES
(3, '2020-05-16', '2020-05-18', '2020-07-14', 2, 1, 3, 'mandat1.pdf'),
(56, '2020-01-01', '2020-01-01', '2020-01-01', 4, 1, 1, 'mandat1.pdf'),
(49, '2020-01-01', '2020-01-01', '2020-01-01', 1, 1, 1, 'mandat1.pdf'),
(33, '2020-01-01', '2020-01-09', '2020-01-09', 1, 3, 3, 'mandat3.pdf'),
(32, '2020-01-01', '2020-01-01', '2020-01-01', 1, 3, 3, 'mandat3.pdf'),
(34, '2020-01-01', '2020-01-09', '2020-01-09', 1, 2, 3, 'mandat2.pdf'),
(35, '2020-01-01', '2020-01-09', '2020-01-09', 1, 2, 1, 'mandat2.pdf'),
(36, '2020-01-09', '2020-01-09', '2020-01-09', 1, 2, 1, 'mandat2.pdf' );

-- --------------------------------------------------------

--
-- Structure de la table `inscription`
--

DROP TABLE IF EXISTS `inscription`;
CREATE TABLE IF NOT EXISTS `inscription` (
  `ID_inscription` int(11) NOT NULL AUTO_INCREMENT,
  `ID_competition` int(11) DEFAULT NULL,
  `ID_user` int(11) DEFAULT NULL,
  `ID_depart` int(11) DEFAULT NULL,
  `ID_weapon` int(11) DEFAULT NULL,
  `ID_category` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_inscription`)
) ENGINE=MyISAM AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `inscription`
--

INSERT INTO `inscription` (`ID_inscription`, `ID_competition`, `ID_user`, `ID_depart`, `ID_weapon`, `ID_category`) VALUES
(91, 3, 5, 2, 3, 1),
(95, 49, 5, 1, 2, 5),
(94, 3, 5, 2, 3, 5),
(93, 3, 5, 3, 2, 4),
(86, 3, 5, 3, 1, 1),
(92, 3, 5, 2, 2, 4),
(98, 3, 5, 3, 3, 8),
(85, 3, 5, 2, 1, 1),
(96, 3, 5, 1, 3, 3),
(88, 3, 5, 2, 3, 4),
(97, 3, 5, 2, 3, 8),
(100, 3, 5, 2, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `type`
--

DROP TABLE IF EXISTS `type`;
CREATE TABLE IF NOT EXISTS `type` (
  `ID_type` int(11) NOT NULL AUTO_INCREMENT,
  `typename` text DEFAULT NULL,
  PRIMARY KEY (`ID_type`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `type`
--

INSERT INTO `type` (`ID_type`, `typename`) VALUES
(1, 'Salle'),
(2, 'Salle départemental'),
(3, 'Extérieur'),
(4, 'Extérieur départemental'),
(5, 'Campagne'),
(6, 'Campagne départemental');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `ID_user` int(11) NOT NULL AUTO_INCREMENT,
  `name` text DEFAULT NULL,
  `firstname` text DEFAULT NULL,
  `licence` text DEFAULT NULL,
  `ID_club` int(11) DEFAULT NULL,
  `admin` int(11) NOT NULL DEFAULT 0,
  `sel` text DEFAULT NULL,
  `hash` text DEFAULT NULL,
  PRIMARY KEY (`ID_user`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`ID_user`, `name`, `firstname`, `licence`, `ID_club`, `admin`, `sel`, `hash`) VALUES
(1, 'BORDEAU--AUBERT', 'Korantin', '789243y', 1, 1, '321266f1f9c82104', 'f50d53b936a8bd0a2ea8ec3c453dde8e63f62f7e7b79cac493bac66279c37c3746b713cd864ba505e502d00a47aab856a1157cbef3cd7e5708d3286d9e3867da');

-- --------------------------------------------------------

--
-- Structure de la table `weapon`
--

DROP TABLE IF EXISTS `weapon`;
CREATE TABLE IF NOT EXISTS `weapon` (
  `ID_weapon` int(11) NOT NULL AUTO_INCREMENT,
  `weaponname` text DEFAULT NULL,
  PRIMARY KEY (`ID_weapon`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `weapon`
--

INSERT INTO `weapon` (`ID_weapon`, `weaponname`) VALUES
(1, 'CL'),
(2, 'CO'),
(3, 'BB');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
