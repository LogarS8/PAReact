drop database if exists `parodri`;

CREATE DATABASE IF NOT EXISTS `parodri`
/*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */
/*!80016 DEFAULT ENCRYPTION='N' */
;

USE `parodri`;

DROP TABLE IF EXISTS `usuarios`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `usuarios` (
  `idUsu` int NOT NULL AUTO_INCREMENT,
  `nombreUsu` varchar(45) NOT NULL,
  `apellidosUsu` varchar(45) NOT NULL,
  `correoUsu` varchar(45) NOT NULL,
  `contraseñaUsu` varchar(255) NOT NULL,
  `imgurlUsu` longtext NOT NULL,
  `rolUsu` varchar(45) NOT NULL,
  `codiAluUsu` varchar(45) null DEFAULT NULL,
  PRIMARY KEY (`idUsu`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `actividades` (
  `idAct` int NOT NULL AUTO_INCREMENT,
  `tipoAct` varchar(100) NOT NULL,
  `respuestaAct` varchar(100) NOT NULL,
  `numeroAct` int NOT NULL,
  `idUsu` int NOT NULL,
  PRIMARY KEY (`idAct`),
  KEY `idUsu_idx` (`idUsu`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `codigos` (
  `idCodi` int NOT NULL AUTO_INCREMENT,
  `codi` varchar(10) NOT NULL,
  `idUsu` int NOT NULL,
  PRIMARY KEY (`idCodi`),
  KEY `idUsu_idx` (`idUsu`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `lecciones` (
  `idLec` int NOT NULL AUTO_INCREMENT,
  `urlLec` varchar(100) NULL,
  `tipoLec` varchar(45) NOT NULL,
  `respuestaLec` varchar(300) NOT NULL,
  `numeroLec` int NOT NULL,
  `idUsu` int NOT NULL,
  PRIMARY KEY (`idLec`),
  KEY `idUsu_idx` (`idUsu`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

create table `test`(
  `idTes` int not null AUTO_INCREMENT,
  `nombreTes` varchar(45) not null,
  `numeroTes` int not null,
  `preguntaTes` varchar(300) not null,
  `respuestaTes` varchar(300) null default null,
  `idUsu` int not null,
  primary key (`idTes`),
  key `idUsu_idx` (`idUsu`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

create table `material` (
  `idMat` int not null AUTO_INCREMENT,
  `nombreMat` varchar(45) not null,
  `textoMat` varchar(800) not null,
  `fileMat` varchar(100) null default null,
  `idUsu` int not null,
  primary key (`idMat`),
  key `idUsu_idx` (`idUsu`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
