--CREATE DATABASE playerlist;

CREATE TABLE player(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  codename VARCHAR(30),
  teamcolorRED VARCHAR(1)

);

CREATE TABLE playergreen(
  idgreen SERIAL PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  codename VARCHAR(30),
  teamcolorGREEN VARCHAR(1)

);