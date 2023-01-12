CREATE TABLE IF NOT EXISTS Users(
id SERIAL PRIMARY KEY,
email_address varchar NOT NULL,
user_name varchar NOT NULL,
user_password varchar NOT NULL,
date_of_birth date,
created timestamp DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS Film(
id SERIAL PRIMARY KEY,
film_name VARCHAR NOT NULL,
synopsis VARCHAR NOT NULL,
genre VARCHAR NOT NULL,
release_date DATE,
rating DECIMAL NOT NULL,
image VARCHAR NOT NULL,
tmdb_id int NOT NULL
);

CREATE TABLE IF NOT EXISTS Film_review(
id SERIAL PRIMARY KEY,
film_id int,
CONSTRAINT film_id FOREIGN KEY (film_id) REFERENCES film (id),
user_id int,
CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users (id),
description VARCHAR NOT NULL,
rating DECIMAL NOT NULL
);

CREATE TABLE IF NOT EXISTS actors(
id SERIAL PRIMARY KEY,
tmdb_id int NOT NULL,
actor_name VARCHAR NOT NULL,
image VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS Film_actors(
film_id int,
CONSTRAINT film_id FOREIGN KEY (film_id) REFERENCES film (id),
actor_id int ARRAY
);

CREATE TABLE IF NOT EXISTS user_film_suggestion_list(
user_id int, 
CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users (id),
film_id int ARRAY
);

CREATE TABLE IF NOT EXISTS user_film_watched_list(
user_id int, 
CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users (id),
film_id int ARRAY
);

CREATE TABLE IF NOT EXISTS user_film_favourite_list(
user_id int, 
CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users (id),
film_id int ARRAY
);