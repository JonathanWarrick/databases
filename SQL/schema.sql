CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  username VARCHAR(50),
  message VARCHAR(500),
  room VARCHAR(50),
  createdAt TIMESTAMP(6)
);

CREATE TABLE users (
  username VARCHAR(50)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




