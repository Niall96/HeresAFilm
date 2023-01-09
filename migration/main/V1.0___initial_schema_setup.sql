CREATE TABLE user (
    id serial PRIMARY KEY,
    email_address varchar NOT NULL,
    user_name varchar NOT NULL,
    password varchar NOT NULL,
    date_of_birth date,
    created timestamp DEFAULT CURRENT_TIMESTAMP
);