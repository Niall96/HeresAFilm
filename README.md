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
- Video Player for Movie Trailers

## Domain Model

```mermaid
flowchart TD
 USER --- FAVOURITE 
 USER --- SUGGESTION 
 FAVOURITE --- FILM
 SUGGESTION --- FILM
 FILM --- DETAILS 
 FILM --- REVIEWS 
 DETAILS --- CAST
```

# Entity Relationship Diagram

```mermaid
erDiagram 
 user ||--|| favourite_Film_List : ""
 user ||--|| suggestion_Film_List : ""
 favourite_Film_List ||--o{ film : ""
 suggestion_Film_List ||--o{ film : ""
 film ||--o{ film_Review : ""
 film ||--o{ actor : ""
 
 user {
        serial id PK
        varchar email_address
        varchar user_name
        varchar password
        date date_of_birth
        timestamp created
    }
 favourite_Film_List {
                 serial film_id FK
              }
 suggestion_Film_List {
                  serial fild_id FK
               }
 film {
      serial film_id PK
      varchar film_name
      varchar film_description
      timestamp film_release_date
      serial film_rating
      array actor
      array review
      image film_image
      }
 film_Review {
             serial review_id PK
             serial film_id FK
             varchar review_description
             varchar review_user
           }
 actor {
       serial actor_id PK
       varchar actor_name
       image actor_image
     }
```
