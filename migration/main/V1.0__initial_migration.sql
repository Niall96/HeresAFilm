CREATE TABLE user (
    id serial PRIMARY KEY,
    email_address varchar NOT NULL,
    user_name varchar NOT NULL,
    password varchar NOT NULL,
    date_of_birth date,
    created timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_film_suggestion_list (
  user_id integer, 
  film_id array, 
  CONSTRAINT fk_user FOREIGN KEY (user_id)
      REFERENCES user(id)
  CONSTRAINT fk_film FOREIGN KEY (film_id)
      REFERENCES film(id)
  );
  
  CREATE TABLE user_film_watched_list (
  user_id integer, 
  film_id array, 
  CONSTRAINT fk_user FOREIGN KEY (user_id)
      REFERENCES user(id)
  CONSTRAINT fk_film FOREIGN KEY (film_id)
      REFERENCES film(id)
  );
  
  CREATE TABLE user_film_favourite_list (
  user_id integer, 
  film_id array, 
  CONSTRAINT fk_user FOREIGN KEY (user_id)
      REFERENCES user(id)
  CONSTRAINT fk_film FOREIGN KEY (film_id)
      REFERENCES film(id)
  );

  CREATE TABLE film (
    
  );
