DROP DATABASE if exists `family-edu`;
CREATE DATABASE if not exists `family-edu` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
use `family-edu`;

# 管理员表
CREATE TABLE family_admin
(
    id           BIGINT       NOT NULL COMMENT '逻辑主键',
    name         VARCHAR(10) NOT NULL COMMENT '管理员名字',
    password     VARCHAR(50) NOT NULL COMMENT '密码',
    salt VARCHAR(50) NOT NULL COMMENT '盐',
    create_time  DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time  DATETIME DEFAULT CURRENT_TIMESTAMP On update CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id)
) COMMENT = '管理员表';
CREATE UNIQUE INDEX admin_id ON family_admin (id);

# 教师表
CREATE TABLE family_teacher
(
    id           BIGINT       NOT NULL COMMENT '逻辑主键',
    name         VARCHAR(10) NOT NULL COMMENT '教师姓名',
    birthday     DATETIME NOT NULL COMMENT '生日',
    sex INTEGER(10) NOT NULL COMMENT '性别',
    identity_card_number VARCHAR(50) NOT NULL COMMENT '身份证号码',
    qq VARCHAR(50)  COMMENT 'qq',
    weixin VARCHAR(50) COMMENT '微信',
    email VARCHAR(50) NOT NULL COMMENT '邮箱',
    phone VARCHAR(20) NOT NULL COMMENT '手机号码',
    subject_id VARCHAR(20) NOT NULL COMMENT '所属学科id（可能兼职多个学科）',
    subject_name VARCHAR(50) NOT NULL COMMENT '所属学科名（可能兼职多个学科）',
    grade_id VARCHAR(20) NOT NULL COMMENT '所属年级id（可能兼职多个年级）',
    grade_name VARCHAR(50) NOT NULL COMMENT '所属年级名（可能兼职多个年级）',
    address VARCHAR(255) NOT NULL COMMENT '家庭地址',
    entry_time     DATETIME NOT NULL COMMENT '入职时间',
    education_id INTEGER(10) NOT NULL COMMENT '学历id',
    education_name VARCHAR(10) NOT NULL COMMENT '学历',
    personality_id VARCHAR(50) NOT NULL COMMENT '性格id',
    personality_name VARCHAR(100) NOT NULL COMMENT '性格',
    status INTEGER(10) DEFAULT '0' COMMENT '0-在职 1-离职 2-已删除',
    description VARCHAR(255)  COMMENT '个人描述',
    create_time  DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time  DATETIME DEFAULT CURRENT_TIMESTAMP On update CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id)
) COMMENT = '教师表';
CREATE UNIQUE INDEX teacher_id ON family_admin (id);

# 学生表
CREATE TABLE family_student
(
    id           BIGINT       NOT NULL COMMENT '逻辑主键',
    name         VARCHAR(10) NOT NULL COMMENT '学生姓名',
    birthday     DATETIME NOT NULL COMMENT '生日',
    sex INTEGER(10) NOT NULL COMMENT '性别',
    identity_card_number VARCHAR(50) NOT NULL COMMENT '身份证号码',
    weixin VARCHAR(50) COMMENT '微信',
    email VARCHAR(50) NOT NULL COMMENT '邮箱',
    phone VARCHAR(20) NOT NULL COMMENT '手机号码',
    subject_id VARCHAR(20) NOT NULL COMMENT '所属学科id（可能兼职多个学科）',
    subject_name VARCHAR(50) NOT NULL COMMENT '所属学科名（可能兼职多个学科）',
    grade_id VARCHAR(20) NOT NULL COMMENT '所属年级id（可能兼职多个年级）',
    grade_name VARCHAR(50) NOT NULL COMMENT '所属年级名（可能兼职多个年级）',
    address VARCHAR(255) NOT NULL COMMENT '家庭地址',
    entry_time     DATETIME NOT NULL COMMENT '入职时间',
    education_id INTEGER(10) NOT NULL COMMENT '学历id',
    education_name VARCHAR(10) NOT NULL COMMENT '学历',
    personality_id VARCHAR(50) NOT NULL COMMENT '性格id',
    personality_name VARCHAR(100) NOT NULL COMMENT '性格',
    status INTEGER(10) DEFAULT '0' COMMENT '0-在职 1-离职 2-已删除',
    description VARCHAR(255)  COMMENT '个人描述',
    create_time  DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time  DATETIME DEFAULT CURRENT_TIMESTAMP On update CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id)
) COMMENT = '教师表';
CREATE UNIQUE INDEX teacher_id ON family_admin (id);