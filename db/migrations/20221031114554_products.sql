-- migrate:up
CREATE TABLE products (
    id int not null auto_increment,
    name varchar(2000) not null,
    sub_name varchar(2000),
    brand varchar(1000) not null,
    category varchar(1000),
    price int not null,
    inventory_number int not null,
    scale varchar(500) not null,
    made_in varchar(500) not null,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    primary key(id)

)

-- migrate:down

