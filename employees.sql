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

 Date: 25/08/2021 22:13:57
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
INSERT INTO `employees` VALUES (14, 'Muhammad Ibrahim');
INSERT INTO `employees` VALUES (15, 'Ahmed ElSayed');

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
INSERT INTO `shifts` VALUES (18, 13, '2021-08-27', '11:00', '15:00');
INSERT INTO `shifts` VALUES (19, 8, '2021-08-26', '14:00', '16:40');
INSERT INTO `shifts` VALUES (20, 14, '2021-08-25', '21:00', '23:00');
INSERT INTO `shifts` VALUES (22, 15, '2021-08-26', '05:00', '14:00');
INSERT INTO `shifts` VALUES (23, 14, '2021-08-26', '14:00', '18:00');
INSERT INTO `shifts` VALUES (24, 14, '2021-08-29', '00:30', '12:00');
INSERT INTO `shifts` VALUES (25, 14, '2021-09-01', '12:00', '16:00');

SET FOREIGN_KEY_CHECKS = 1;
