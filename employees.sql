/*
 Navicat Premium Data Transfer

 Source Server         : MySQL localhost
 Source Server Type    : MySQL
 Source Server Version : 80017
 Source Host           : localhost:3306
 Source Schema         : emp

 Target Server Type    : MySQL
 Target Server Version : 80017
 File Encoding         : 65001

 Date: 25/08/2021 19:34:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for employees
-- ----------------------------
DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of employees
-- ----------------------------
INSERT INTO `employees` VALUES (8, 'Muhammad Ibrahim');
INSERT INTO `employees` VALUES (9, 'Saiid Ahmed');
INSERT INTO `employees` VALUES (10, 'Ahmed Yassen');
INSERT INTO `employees` VALUES (11, 'Hebatullah Sabry');
INSERT INTO `employees` VALUES (12, 'The Avengerss');

-- ----------------------------
-- Table structure for shifts
-- ----------------------------
DROP TABLE IF EXISTS `shifts`;
CREATE TABLE `shifts`  (
  `ShiftId` int(11) NOT NULL AUTO_INCREMENT,
  `EmployeeId` int(11) NULL DEFAULT NULL,
  `Date` date NULL DEFAULT NULL,
  `StartTime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `EndTime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ShiftId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shifts
-- ----------------------------
INSERT INTO `shifts` VALUES (1, 8, '2021-08-25', '11:00', '12:00');
INSERT INTO `shifts` VALUES (7, 9, '2021-08-22', '06:30', '10:30');
INSERT INTO `shifts` VALUES (13, 8, '2021-08-25', '12:30', '15:00');
INSERT INTO `shifts` VALUES (15, 8, '2021-08-26', '16:40', '21:00');
INSERT INTO `shifts` VALUES (16, 11, '2021-09-02', '01:30', '12:50');

SET FOREIGN_KEY_CHECKS = 1;
