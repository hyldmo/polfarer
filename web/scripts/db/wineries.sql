create table wineries
(
    id              int          not null
        primary key,
    name            varchar(100) not null,
    website         varchar(100) null,
    ratings_average float        null,
    ratings_count   int          null,
    wines_count     int          null
);
