DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS item_reviews CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  photo_url VARCHAR(255),
  price VARCHAR  NOT NULL DEFAULT 0,
  condition VARCHAR (500) NOT NULL,
  favorite BOOLEAN NOT NULL DEFAULT FALSE,
  active BOOLEAN NOT NULL DEFAULT TRUE
);


CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE contact (
  id SERIAL PRIMARY KEY NOT NULL,
  from VARCHAR(255) NOT NULL,
  to VARCHAR(255) NOT NULL,
  content TEXT
)
