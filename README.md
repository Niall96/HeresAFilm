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
 DETAILS --- ACTORS
 USER --- REVIEWS
```

# Entity Relationship Diagram

```mermaid
erDiagram 
 user ||--|| favourite_film_list : ""
 user ||--|| suggestion_film_list : ""
 user ||--|| watched_film_list: ""
 favourite_film_list ||--o{ film : ""
 watched_film_list ||--o{ film : ""
 suggestion_film_list ||--o{ film : ""
 film ||--o{ film_review : ""
 film ||--o{ actor : ""
 user ||--o{ film_review : ""
 
 user {
        serial id PK
        varchar email_address
        varchar user_name
        varchar password
        date date_of_birth
        timestamp created
    }
 favourite_film_list {
                 serial user_id FK
                 array film_id
              }
 watched_film_list {
                 serial user_id FK
                 array film_id
              }
 suggestion_film_list {
                  serial user_id FK
                  array film_id
               }
 film {
      serial film_id PK
      varchar film_name
      varchar film_description
      varchar film_genre
      timestamp film_release_date
      serial film_rating
      array actor
      array review
      image film_image
      }
 film_review {
             serial review_id PK
             serial film_id FK
             varchar user_id FK
             varchar review_description
             serial review_rating
           }
 actor {
       serial actor_id PK
       varchar actor_name
       image actor_image
     }
```
