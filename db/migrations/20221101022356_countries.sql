-- migrate:up
CREATE TABLE coutries (
  id int not null auto_increment,
  name varchar(500) not null,
  primary key (id)
)

-- migrate:down

