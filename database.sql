-- Active: 1673262665370@@127.0.0.1@3306@login_register
use login_register

create table users(
    id int not null auto_increment,
    email varchar(255) not null,
    password varchar(255) not null,
    primary key(id)
)

create table posts(
    id int not null auto_increment,
    user_id int not null,
    img text not null,
    sound TEXT not null,
    primary key(id),
    Foreign Key (user_id) REFERENCES users (id)
    )

CREATE table saved(
    userId int NOT NULL,
    postId int NOT NULL,
    Foreign Key (userId) REFERENCES users(id),
    Foreign Key (postId) REFERENCES posts(id),
    PRIMARY KEY (userId, postId)
)    