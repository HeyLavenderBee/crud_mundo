drop database if exists crud_mundo;
create database crud_mundo;
use crud_mundo;

create table paises(
id_pais int auto_increment primary key,
nome varchar(100) unique not null,
habitantes int not null,
continente varchar(50) not null,
idioma varchar(100) not null
);

create table cidades(
id_cidade int auto_increment primary key,
nome varchar(100),
habitantes int not null,
id_pais int,
foreign key(id_pais) references paises(id_pais)
);

insert into paises(
nome, habitantes, continente, idioma)
values
("Botsuana", 2521000, "África", "Inglês"),
("Camarões", 29120000, "África", "Francês e Inglês"),
("Líbia", 7381000, "África", "Árabe"),
("Madagascar", 31960000, "África", "Malgaxe e Francês"),
("São Tomé e Príncipe", 235536, "África", "Português"),
("Brasil", 212600000, "América", "Português"),
("Panamá", 4516000, "América", "Espanhol"),
("Canadá", 41290000, "América", "Inglês e francês"),
("Suriname", 634431, "América", "Neerlandês"),
("Uruguai", 3387000, "América", "Espanhol"),
("Grécia", 10390000, "Europa", "Grego"),
("Irlanda", 5380000, "Europa", "Irlandês e inglês"),
("Polônia", 36550000, "Europa", "Polonês"),
("Suécia", 10570000, "Europa", "Polonês"),
("Turquia", 85520000, "Europa", "Turco");

/*
Paises p/ adicionar:
África - Botsuana, São Tomé e Principe, Madagascar, Camarões, Líbia
América - Brasil, Panamá, Canadá, Suriname, Uruguai
Ásia - Bangladesh, Hong Kong, Indonésia, Japão, Geórgia
Europa - Turquia, Irlanda, Suíça, Polônia, Grécia
Oceania - Nova Zelândia, Papua Nova Guiné, Ilhas Marshall, Austrália, Fiji
*/