/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 10.4.11-MariaDB : Database - portal
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`portal` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `portal`;

/*Table structure for table `categorias` */

DROP TABLE IF EXISTS `categorias`;

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `fecha_eliminado` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `categorias` */

insert  into `categorias`(`id`,`nombre`,`fecha_eliminado`) values 
(1,'Tecnologia',NULL),
(2,'Alimentos',NULL),
(3,'Deportes',NULL),
(4,'Oficina',NULL),
(5,'Juguetes',NULL),
(6,'Educación',NULL);

/*Table structure for table `estados_pedidos` */

DROP TABLE IF EXISTS `estados_pedidos`;

CREATE TABLE `estados_pedidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `estados_pedidos` */

insert  into `estados_pedidos`(`id`,`nombre`) values 
(1,'Pendiente'),
(2,'Rechazado'),
(3,'En camino');

/*Table structure for table `estados_productos` */

DROP TABLE IF EXISTS `estados_productos`;

CREATE TABLE `estados_productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `estados_productos` */

insert  into `estados_productos`(`id`,`nombre`) values 
(1,'Aprobado'),
(2,'Desaprobado'),
(3,'Pendiente');

/*Table structure for table `pedidos` */

DROP TABLE IF EXISTS `pedidos`;

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_eliminado` datetime DEFAULT NULL,
  `id_estado` int(11) DEFAULT 2,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `pedidos` */

insert  into `pedidos`(`id`,`id_usuario`,`fecha_creacion`,`fecha_eliminado`,`id_estado`) values 
(1,2,'2020-05-01 00:06:11',NULL,2),
(2,2,'2020-05-05 00:14:45',NULL,2),
(3,2,'2020-05-15 00:14:45',NULL,2),
(4,2,'2020-05-20 00:14:45',NULL,2),
(5,2,'2020-05-25 00:14:45',NULL,2),
(6,2,'2020-05-30 00:14:45',NULL,2);

/*Table structure for table `pedidos_has_productos` */

DROP TABLE IF EXISTS `pedidos_has_productos`;

CREATE TABLE `pedidos_has_productos` (
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `precio` double(15,5) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `pedidos_has_productos` */

insert  into `pedidos_has_productos`(`id_pedido`,`id_producto`,`precio`,`cantidad`) values 
(1,1,984000.00000,2),
(2,9,2000000.00000,1),
(2,1,984000.00000,1),
(2,4,150000.00000,1),
(3,4,160000.00000,3),
(4,1,350000.00000,2),
(5,3,1500000.00000,2),
(6,2,500000.00000,3);

/*Table structure for table `productos` */

DROP TABLE IF EXISTS `productos`;

CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `precio` double(15,5) NOT NULL,
  `cantidad` int(10) NOT NULL,
  `img` varchar(150) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_estado` int(11) NOT NULL DEFAULT 3,
  `id_categoria` int(11) NOT NULL,
  `fecha_eliminado` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `productos` */

insert  into `productos`(`id`,`nombre`,`fecha`,`descripcion`,`precio`,`cantidad`,`img`,`id_usuario`,`id_estado`,`id_categoria`,`fecha_eliminado`) values 
(1,'Xiaomi Redmi Note 8 Pro','2020-05-27','Muy lejos, más allá de las montañas de palabras, alejados de los países de las vocales y las consonantes, viven los textos simulados. Viven aislados en casas de letras, en la costa de la semántica, un gran océano de lenguas. Un riachuelo llamado Pons',984000.00000,10,'producto_1product-3.jpg',1,1,1,NULL),
(2,'Camisa xl','2020-05-27','Reina en mi espíritu una alegría admirable, muy parecida a las dulces alboradas de la primavera, de que gozo aquí con delicia. Estoy solo, y me felicito de vivir en este país, el más a propósito para almas como la mía, soy tan dichoso, mi querido ami',59000.00000,30,'producto_1product-6-white.jpg',1,1,3,NULL),
(3,'Portatil acer gamer','2020-05-27','Una mañana, tras un sueño intranquilo, Gregorio Samsa se despertó convertido en un monstruoso insecto. Estaba echado de espaldas sobre un duro caparazón y, al alzar la cabeza, vio su vientre convexo y oscuro, surcado por curvadas callosidades, sobre.',3000000.00000,15,'producto_1product-3.jpg',1,1,1,NULL),
(4,'Audifonos senhaiser hd 306','2020-05-27','Y, viéndole don Quijote de aquella manera, con muestras de tanta tristeza, le dijo: Sábete, Sancho, que no es un hombre más que otro si no hace más que otro. Todas estas borrascas que nos suceden son señales de que presto ha de serenar el tiempo y ha',150000.00000,60,'producto_1home-featured-2.jpg',1,1,1,NULL),
(5,'Gafas protectoras','2020-05-27','Y, viéndole don Quijote de aquella manera, con muestras de tanta tristeza, le dijo: Sábete, Sancho, que no es un hombre más que otro si no hace más que otro. Todas estas borrascas que nos suceden son señales de que presto ha de serenar el tiempo y ha',15000.00000,123,'producto_1product-8.jpg',1,1,4,NULL),
(6,'Capucha tropel','2020-05-27','Muy lejos, más allá de las montañas de palabras, alejados de los países de las vocales y las consonantes, viven los textos simulados. Viven aislados en casas de letras, en la costa de la semántica, un gran océano de lenguas. Un riachuelo llamado Pons',25000.00000,100,'producto_1product-8.jpg',1,1,6,NULL),
(7,'Lavado de hot wheels','2020-05-27','Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos dire',250000.00000,19,'producto_1product-5-white.jpg',1,1,5,NULL),
(8,'Ratone al mause','2020-05-28','Quiere la boca exhausta vid, kiwi, piña y fugaz jamón. Fabio me exige, sin tapujos, que añada cerveza al whisky. Jovencillo emponzoñado de whisky, ¡qué figurota exhibes! La cigüeña tocaba cada vez mejor el saxofón y el búho pedía kiwi y queso. El jef',140000.00000,123,'producto_1product-2.jpg',1,1,2,NULL),
(9,'Audifonos beats','2020-05-28','Reina en mi espíritu una alegría admirable, muy parecida a las dulces alboradas de la primavera, de que gozo aquí con delicia. Estoy solo, y me felicito de vivir en este país, el más a propósito para almas como la mía, soy tan dichoso, mi querido ami',2000000.00000,50,'producto_2home-featured-3.jpg',2,1,1,NULL),
(10,'Audifonos senhaiser hd 206','2020-05-28','Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos dire',150000.00000,25,'producto_2product-1.jpg',2,3,1,NULL);

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `roles` */

insert  into `roles`(`id`,`nombre`) values 
(1,'administrador'),
(2,'usuario');

/*Table structure for table `sessions` */

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sessions` */

insert  into `sessions`(`session_id`,`expires`,`data`) values 
('qWVZY_AMGTbWEakx09hRF6dPfNMAjgcE',1590729536,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":1}}'),
('tjJG0xg4WoenJrffS28YrZSQJ-rO9Ey-',1590729563,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":2},\"carrito\":[]}');

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `fecha_eliminado` datetime DEFAULT NULL,
  `id_rol` int(11) NOT NULL DEFAULT 2,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `usuarios` */

insert  into `usuarios`(`id`,`nombres`,`apellidos`,`email`,`password`,`fecha_eliminado`,`id_rol`) values 
(1,'Pulpo','Store','pulpo@gmail.com','$2a$10$6au2O1Pa2h4A4UhIrwIqqu0IUQ2qH2J7Elcxj7c4v0zEoh8m4HsaC',NULL,1),
(2,'Karlita','Diaz','karla@gmail.com','$2a$10$meJ55VdkJs.dPesenS/0vukevw0B/Sct7N34Y9NzxZ/PIDgumhMsy',NULL,2);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
