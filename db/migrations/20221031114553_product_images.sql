-- migrate:up
CREATE TABLE product_images (
  id int not null auto_increment,
  product_id int not null,
  image_url varchar(5000) not null,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  primary key (id),
  foreign key (product_id) references products (id)
)


-- migrate:down

