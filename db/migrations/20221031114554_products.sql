-- migrate:up
CREATE TABLE products (
    id int not null auto_increment,
    name varchar(2000) not null,
    sub_name varchar(2000),
    product_img varchar(5000) not null,
    brand_id int not null,
    category_id int not null,
    price decimal(4,2) not null,
    inventory_number int not null,
    scale varchar(500) not null,
    country_id int not null,
    sale decimal not null DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    primary key(id)
    foreign key (brand_id) references brands (id),
    foreign key (category_id) references categories (id),
    foreign key (country_id) references countries (id),
)

-- migrate:down

