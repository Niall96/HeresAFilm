# HeresAFilm

## What is the Application?

An iOS app that will give the user a random selection of film each day based on the user's personal favourites / predefined genres.
By giving a user a selection of films, the user will be introduced to films which they may not have seen before/ a film they've forgot about.
The app will provide a synopsis + details of the film and a star rating.

## Why?

The aim is to provide the user with new entertainment content for whenever they want something to watch. Providing this app will help reduce the amount of time a user will take picking a film to watch.

## MVP

- User Creation / Login
- User Favourite Movie List
- Random Movie Suggestion List
- Movie Detail Screen
- Movie Reviews + Star Rating

## Stretch Goals

- Allow User to write reviews / rate film
- Create a watched list so user's don't see repeated suggestions
- Video Player for Movie Trailers

## Domain Model

```mermaid
flowchart 
 USER --- FAVOURITE_LIST
 USER --- SUGGESTION_LIST
 USER --- WATCHED_LIST
 FAVOURITE_LIST --- FILM
 WATCHED_LIST --- FILM
 SUGGESTION_LIST --- FILM
 FILM --- DETAILS 
 FILM --- REVIEWS
 USER --- REVIEWS
```

# Entity Relationship Diagram

```mermaid
erDiagram 
 user ||--|| user_film_favourite_list : ""
 user ||--|| user_film_suggestion_list : ""
 user ||--|| user_film_watched_list: ""
 user_film_favourite_list ||--o{ film : ""
 user_film_watched_list ||--o{ film : ""
 user_film_suggestion_list ||--o{ film : ""
 film ||--o{ film_review : ""
 film ||--o{ film_actor : ""
 user ||--o{ film_review : ""
 
 user {
        serial id PK
        varchar email_address
        varchar user_name
        varchar password
        date date_of_birth
        timestamp created
    }
 user_film_favourite_list {
                 int user_id FK
                 array film_id FK
              }
 user_film_watched_list {
                 int user_id FK
                 array film_id FK
              }
 user_film_suggestion_list {
                  int user_id FK
                  array film_id FK
               }
 film {
      serial id PK
      varchar name
      varchar description
      varchar genre
      timestamp release_date
      double rating
      image image_location
      }
 film_review {
             serial id PK
             int film_id FK
             varchar user_id FK
             varchar description
             double rating
           }
 film_actor {
       serial id PK
       int film_id FK
       varchar actor_name
       image actor_image
     }
```
