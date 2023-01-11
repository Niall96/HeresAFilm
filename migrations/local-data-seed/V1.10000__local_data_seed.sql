INSERT INTO public.users (id, email_address, user_name, user_password , date_of_birth, created) VALUES 
(1, 'niall@rooney.com', 'TheNiall96','password', '1996-11-12', CURRENT_TIMESTAMP),
(2, 'rooney@niall.com', 'FilmMeister', 'password', '2000-05-24', CURRENT_TIMESTAMP);

INSERT INTO public.film_review (id, film_id, user_id, description, rating) VALUES
(1, 1, 1, 'This is an amazing film, changed my life', 9.5),
(2, 1, 2, 'Liked the Story, the acting not so much', 7.0),
(3, 9, 1, 'This movie is nostalgia, I watch it every year', 8.5),
(4, 6, 1, 'A good film to fall asleep to, boring', 5.0);

INSERT INTO public.user_film_favourite_list (user_id, film_id) VALUES 
(1, array[2,1,10]),
(2, array[7,8,9]);

INSERT INTO public.user_film_watched_list (user_id, film_id) VALUES 
(1, array[3,5,6,2,1,10]),
(2, array[7,8,9]);

INSERT INTO public.user_film_suggestion_list (user_id, film_id) VALUES  
(1, array[7,8,9]),
(2, array[2,10,4,5]);