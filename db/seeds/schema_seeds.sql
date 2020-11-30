INSERT INTO
  users(name, email, password)
VALUES
  ('John', 'joh@ymail.com', 'password');

INSERT INTO
  users(name, email, password)
VALUES
  ('Amy', 'amy@ymail.com', 'password');

INSERT INTO
  users(name, email, password)
VALUES
  ('Alice', 'alice@gmail.com', 'password');

INSERT INTO
  items(
    user_id,
    name,
    description,
    photo_url,
    price,
    condition
  )
VALUES
(
    1,
    'nike',
    'description',
    'https://vader-prod.s3.amazonaws.com/1570984353-structure22-1570984337.jpg',
    100,
    'unused'
  );

INSERT INTO
  items(
    user_id,
    name,
    description,
    photo_url,
    price,
    condition
  )
VALUES
(
    2,
    'adidas',
    'description',
    'https://i.insider.com/5e38419b5bc79c4c7d4e1192?width=906&format=jpeg',
    130,
    'unused'
  );

INSERT INTO
  items(
    user_id,
    name,
    description,
    photo_url,
    price,
    condition
  )
VALUES
(
    2,
    'adidas',
    'description',
    'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/6eebe93e-067a-4caf-b51e-b4b9583b3c2c/air-zoom-alphafly-next-racing-shoe-mGK8M0.jpg',
    100,
    'used'
  );

INSERT INTO
  item_reviews (user_id, item_id, review)
VALUES
(1, 1, 'Good');

INSERT INTO
  item_reviews (user_id, item_id, review)
VALUES
(1, 2, 'VGood');

INSERT INTO
  item_reviews (user_id, item_id, review)
VALUES
(2, 3, 'bad');

INSERT INTO
  favorites(item_id, user_id)
VALUES
(1, 2);

INSERT INTO
  favorites(item_id, user_id)
VALUES
(2, 2);

INSERT INTO
  favorites(item_id, user_id)
VALUES
(1, 3);
