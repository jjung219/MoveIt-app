  SELECT *
  FROM items
  JOIN favorites on favorites.item_id = items.id
  WHERE favorites.user_id = 2;



  -- With favoritesOverlap as
  --   (
  --     SELECT *, ROW_NUMBER() OVER(partition by id order by id) as rowNumber
  --     from favorites
  --   )
  -- delete from favoritesOverlap where rowNumber > 1;

  -- SELECT *
  -- from favorites;
