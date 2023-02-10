-- CreateTable
CREATE TABLE "actors" (
    "id" SERIAL NOT NULL,
    "tmdb_id" INTEGER NOT NULL,
    "actor_name" VARCHAR NOT NULL,
    "image_location" VARCHAR NOT NULL,

    CONSTRAINT "actors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "film_review" (
    "id" SERIAL NOT NULL,
    "film_id" INTEGER,
    "user_id" INTEGER,
    "description" VARCHAR NOT NULL,
    "rating" DECIMAL NOT NULL,

    CONSTRAINT "film_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flyway_schema_history" (
    "installed_rank" INTEGER NOT NULL,
    "version" VARCHAR(50),
    "description" VARCHAR(200) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "script" VARCHAR(1000) NOT NULL,
    "checksum" INTEGER,
    "installed_by" VARCHAR(100) NOT NULL,
    "installed_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "execution_time" INTEGER NOT NULL,
    "success" BOOLEAN NOT NULL,

    CONSTRAINT "flyway_schema_history_pk" PRIMARY KEY ("installed_rank")
);

-- CreateTable
CREATE TABLE "user_films" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "film_id" INTEGER,
    "watched" BOOLEAN,
    "watchlist" BOOLEAN,
    "favorites" BOOLEAN,

    CONSTRAINT "user_films_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email_address" VARCHAR NOT NULL,
    "username" VARCHAR NOT NULL,
    "user_password" VARCHAR NOT NULL,
    "date_of_birth" DATE,
    "created" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "flyway_schema_history_s_idx" ON "flyway_schema_history"("success");

-- AddForeignKey
ALTER TABLE "film_review" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_films" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
