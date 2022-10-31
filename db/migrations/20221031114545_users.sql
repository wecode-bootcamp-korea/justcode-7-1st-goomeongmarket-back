-- migrate:up
CREATE TABLE users (
    id int not null auto_increment,
    email varchar(200) unique not null,
    password varchar(300) not null,
    name varchar(100) not null,
    phoneNumber varchar(500) not null,
    address varchar(1000) not null,
    birthDate varchar(300),
    male boolean,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    primary key(id)
)

-- migrate:down

