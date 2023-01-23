INSERT INTO public.users ( email_address, username, user_password , date_of_birth, created) VALUES 
( 'niall@rooney.com', 'TheNiall96','password', '1996-11-12', CURRENT_TIMESTAMP),
('rooney@niall.com', 'FilmMeister', 'password', '2000-05-24', CURRENT_TIMESTAMP);

INSERT INTO public.film_review ( film_id, user_id, description, rating) VALUES
( 1, 1, 'This is an amazing film, changed my life', 9.5),
( 1, 2, 'Liked the Story, the acting not so much', 7.0),
( 9, 1, 'This movie is nostalgia, I watch it every year', 8.5),
( 6, 1, 'A good film to fall asleep to, boring', 5.0);

INSERT INTO public.user_films (user_id, film_id,  watched, watchlist, favorites) VALUES 
(1, 1, true, false, true),
(1, 2, true, false, false);
