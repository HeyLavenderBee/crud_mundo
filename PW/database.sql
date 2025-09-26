create database crud_mundo;
use crud_mundo;

create table paises(
id_pais int auto_increment primary key,
nome varchar(100) not null,
habitantes int not null,
continente varchar(50) not null,
idioma varchar(100) not null,
);

create table cidades(
id_cidade int auto_increment primary key,
nome varchar(100),
habitantes int not null,
id_pais int,
foreign key(id_pais) references paises(id_pais)
);

insert into paises(
nome, habitantes)
values
("Brasil", 212600000, "América", "Português");

/*
Paises p/ adicionar:
África - Botsuana, São Tomé e Principe, Madagascar, Camarões, Líbia
América - Brasil, Panamá, Canadá, Suriname, Uruguai
Europa - Turquia, Irlanda, Suíça, Polônia, Grécia
Ásia - Bangladesh, Hong Kong, Indonésia, Japão, Geórgia
Oceania - Nova Zelândia, Papua Nova Guiné, Ilhas Marshall, Austrália, Fiji
*/