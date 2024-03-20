CREATE DATABASE reelbook;

CREATE TABLE clients(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    description VARCHAR(255)
);