-- migrate:up
CREATE TABLE brands (
  id int not null auto_increment,
  name varchar(500) not null,
  primary key (id)
)

-- migrate:down

