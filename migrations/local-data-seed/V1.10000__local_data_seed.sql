INSERT INTO public.users ( email_address, username, user_password , date_of_birth, created) VALUES 
( 'niall@rooney.com', 'TheNiall96','password', '1996-11-12', CURRENT_TIMESTAMP),
('rooney@niall.com', 'FilmMeister', 'password', '2000-05-24', CURRENT_TIMESTAMP);

INSERT INTO public.film_review ( film_id, user_id, username, description, created) VALUES
( 1, 1,'TheNiall96', 'This is an amazing film, changed my life', CURRENT_TIMESTAMP),
( 1, 2,'FilmMeister', 'Liked the Story, the acting not so much', CURRENT_TIMESTAMP),
( 9, 1, 'TheNiall96','This movie is nostalgia, I watch it every year', CURRENT_TIMESTAMP),
( 6, 1,'TheNiall96', 'A good film to fall asleep to, boring', CURRENT_TIMESTAMP);

INSERT INTO public.user_films (user_id, film_id,  watched, watchlist, favorites) VALUES 
(1, 1, true, false, true),
(1, 2, true, false, false);
