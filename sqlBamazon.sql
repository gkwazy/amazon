create database bamazon;
use bamazon;
create table products
    item_id integer not null auto_increment,
    product_name varchar(50) not null,
    depertment_name varchar(50) not null,
    price decimal(13,2),
    stock_quantity integer(50) default 0,
    primary key (item_id)
    );