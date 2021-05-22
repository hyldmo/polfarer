create table wine_meta
(
	id int null,
	winery int null,
	ratingsCount int null,
	score float null,
	constraint wine_meta_wineries_id_fk
		foreign key (winery) references wineries (id)
);

create unique index wine_meta_id_uindex
	on wine_meta (id);

alter table wine_meta
	add constraint wine_meta_pk
		primary key (id);
