create table libraries (
     library_id bigint not null,
     address varchar(255),
     latitude float(53),
     longitude float(53),
     name varchar(255),
     webpage varchar(255),
     primary key (library_id)
);
