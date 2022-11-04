-- migrate:up
CREATE TABLE users (
    id int not null auto_increment,
    email varchar(200) unique not null,
    password varchar(300) not null,
    name varchar(100) not null,
    phoneNumber int,
    address varchar(1000),
    birthDate datetime,
    gender_id int,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (gender_id) references genders (id),
    primary key(id)
)

-- migrate:down

