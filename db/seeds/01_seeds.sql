INSERT INTO users (name, email, password)
VALUES ('Jenny Jung', 'a@aa.com', 'password'),
('Aaron Nole', 'b@bb.com', 'password'),
('Brian Tales', 'c@cc.com', 'password');


INSERT INTO items (user_id, name, description, photo_url, price, condition, favorite, active)
VALUES (4, 'table', 'table description', 'https://images.unsplash.com/photo-1499933374294-4584851497cc?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzB8fHRhYmxlfGVufDB8fDB8&auto=format&fit=crop&w=500&q=60', 70, 'New', FALSE, TRUE),
(4, 'clock', 'clock description', 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvY2t8ZW58MHx8MHw%3D&auto=format&fit=crop&w=500&q=60', 30, 'Used', FALSE, TRUE),
(5, 'clock', 'clock description', 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhaXJ8ZW58MHx8MHw%3D&auto=format&fit=crop&w=500&q=60', 40, 'New', FALSE, TRUE),
(5, 'book', 'book description', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3xlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60', 20, 'Used', FALSE, FALSE);


INSERT INTO item_reviews (user_id, item_id, review)
VALUES (6, 8, 'Book was great!');
