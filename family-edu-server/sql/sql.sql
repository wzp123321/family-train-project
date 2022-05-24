DROP DATABASE if exists `family-edu`;
CREATE DATABASE if not exists `family-edu` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
use `family-edu`;

# 管理员表
CREATE TABLE family_admin
(
    id           BIGINT       NOT NULL COMMENT '逻辑主键',
    name         VARCHAR(128) NOT NULL COMMENT '管理员名字',
    password     VARCHAR(128) NOT NULL COMMENT '密码',
    salt VARCHAR(128) NOT NULL COMMENT '盐',
    create_time  DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time  DATETIME DEFAULT CURRENT_TIMESTAMP On update CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id)
) COMMENT = '设备型号表';
CREATE UNIQUE INDEX uk_code ON family_admin (id);

# 教师表
CREATE TABLE family_teacher
(
    id           BIGINT       NOT NULL COMMENT '逻辑主键',
    name         VARCHAR(128) NOT NULL COMMENT '管理员名字',
    password     VARCHAR(128) NOT NULL COMMENT '密码',
    salt VARCHAR(128) NOT NULL COMMENT '盐',
    create_time  DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time  DATETIME DEFAULT CURRENT_TIMESTAMP On update CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id)
) COMMENT = '设备型号表';
CREATE UNIQUE INDEX uk_code ON family_admin (id);