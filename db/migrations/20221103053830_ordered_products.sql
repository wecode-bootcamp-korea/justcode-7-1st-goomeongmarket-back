-- migrate:up
  CREATE TABLE ordered_products (
    id int not null auto_increment,
    user_id int not null,
    product_id int not null,
    ordered_number int not null,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    foreign key (user_id) references users (id),
    foreign key (product_id) references products (id),
    primary key (id)
)

-- migrate:down

