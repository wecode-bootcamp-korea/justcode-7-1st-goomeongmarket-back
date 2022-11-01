-- migrate:up
CREATE TABLE likes (
    id int not null auto_increment,
    user_id int not null,
    product_id int not null,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (user_id) references users (id),
    foreign key (product_id) references products (id),
    primary key (id)
)

-- migrate:down

