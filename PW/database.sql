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
("Bangladesh", 173600000, "Ásia", "Bengali"),
("Geórgia", 3674000, "Ásia", "Georgiano"),
("Indonésia", 283500000, "Ásia", "Indonésio"),
("Japão", 124000000, "Ásia", "Japonês"),
("Nepal", 29650000, "Ásia", "Nepalês"),
("Grécia", 10390000, "Europa", "Grego"),
("Irlanda", 5380000, "Europa", "Irlandês e inglês"),
("Polônia", 36550000, "Europa", "Polonês"),
("Suécia", 10570000, "Europa", "Polonês"),
("Turquia", 85520000, "Europa", "Turco"),
("Austrália", 27200000, "Oceania", "Inglês"),
("Fiji", 928784, "Oceania", "Língua fijiana"),
("Ilhas Marshall", 37548, "Oceania", "Língua marshallesa e Inglês"),
("Nova Zelândia", 5338000, "Oceania", "Inglês e Maori"),
("Papua Nova Guiné", 12540000, "Oceania", "Inglês, Língua hiri motu");

INSERT INTO cidades (nome, habitantes, id_pais) VALUES
-- 1 Botsuana
("Gaborone", 269000, 1),
("Francistown", 101500, 1),
("Molepolole", 73600, 1),
("Serowe", 60000, 1),
("Maun", 56000, 1),

-- 2 Camarões
("Yaoundé", 2800000, 2),
("Dualá", 3200000, 2),
("Garoua", 600000, 2),
("Maroua", 400000, 2),
("Bamenda", 350000, 2),

-- 3 Líbia
("Trípoli", 1150000, 3),
("Bengazi", 650000, 3),
("Misrata", 520000, 3),
("Sabha", 160000, 3),
("Zawiya", 200000, 3),

-- 4 Madagascar
("Antananarivo", 1470000, 4),
("Toamasina", 320000, 4),
("Antsirabe", 260000, 4),
("Fianarantsoa", 200000, 4),
("Mahajanga", 240000, 4),

-- 5 São Tomé e Príncipe
("São Tomé", 72000, 5),
("Santana", 11000, 5),
("Trindade", 16000, 5),
("Neves", 10000, 5),
("Santo António", 9000, 5),

-- 6 Brasil
("São Paulo", 12330000, 6),
("Rio de Janeiro", 6748000, 6),
("Brasília", 3094000, 6),
("Salvador", 2887000, 6),
("Fortaleza", 2687000, 6),

-- 7 Panamá
("Cidade do Panamá", 880000, 7),
("San Miguelito", 370000, 7),
("David", 165000, 7),
("Colón", 78000, 7),
("La Chorrera", 200000, 7),

-- 8 Canadá
("Toronto", 2930000, 8),
("Montreal", 1780000, 8),
("Vancouver", 675000, 8),
("Calgary", 1400000, 8),
("Ottawa", 1010000, 8),

-- 9 Suriname
("Paramaribo", 250000, 9),
("Lelydorp", 18000, 9),
("Nieuw Nickerie", 13000, 9),
("Moengo", 10000, 9),
("Albina", 5000, 9),

-- 10 Uruguai
("Montevidéu", 1370000, 10),
("Salto", 105000, 10),
("Paysandú", 76000, 10),
("Las Piedras", 69000, 10),
("Rivera", 64000, 10),

-- 11 Bangladesh
("Daca", 10350000, 11),
("Chittagong", 3900000, 11),
("Khulna", 660000, 11),
("Rajshahi", 520000, 11),
("Sylhet", 530000, 11),

-- 12 Geórgia
("Tbilisi", 1200000, 12),
("Batumi", 155000, 12),
("Kutaisi", 147000, 12),
("Rustavi", 125000, 12),
("Zugdidi", 75000, 12),

-- 13 Indonésia
("Jacarta", 10500000, 13),
("Surabaya", 2800000, 13),
("Bandung", 2400000, 13),
("Medan", 2300000, 13),
("Semarang", 1600000, 13),

-- 14 Japão
("Tóquio", 13960000, 14),
("Yokohama", 3700000, 14),
("Osaka", 2700000, 14),
("Nagoya", 2300000, 14),
("Sapporo", 1900000, 14),

-- 15 Nepal
("Katmandu", 845000, 15),
("Pokhara", 550000, 15),
("Lalitpur", 330000, 15),
("Biratnagar", 250000, 15),
("Bharatpur", 280000, 15),

-- 16 Grécia
("Atenas", 3150000, 16),
("Tessalônica", 1100000, 16),
("Patras", 215000, 16),
("Heraclião", 210000, 16),
("Larissa", 145000, 16),

-- 17 Irlanda
("Dublin", 1200000, 17),
("Cork", 210000, 17),
("Limerick", 102000, 17),
("Galway", 86000, 17),
("Waterford", 53000, 17),

-- 18 Polônia
("Varsóvia", 1800000, 18),
("Cracóvia", 780000, 18),
("Łódź", 680000, 18),
("Wrocław", 640000, 18),
("Poznań", 540000, 18),

-- 19 Suécia
("Estocolmo", 980000, 19),
("Gotemburgo", 580000, 19),
("Malmö", 350000, 19),
("Uppsala", 230000, 19),
("Västerås", 130000, 19),

-- 20 Turquia
("Istambul", 15800000, 20),
("Ancara", 5600000, 20),
("Esmirna", 4400000, 20),
("Bursa", 3100000, 20),
("Adana", 2200000, 20),

-- 21 Austrália
("Sydney", 5200000, 21),
("Melbourne", 5100000, 21),
("Brisbane", 2600000, 21),
("Perth", 2100000, 21),
("Adelaide", 1400000, 21),

-- 22 Fiji
("Suva", 94000, 22),
("Lautoka", 71000, 22),
("Nadi", 42500, 22),
("Labasa", 28000, 22),
("Ba", 15000, 22),

-- 23 Ilhas Marshall
("Majuro", 31000, 23),
("Rita", 9000, 23),
("Laura", 2500, 23),
("Ebeye", 15000, 23),
("Jaluit", 1700, 23),

-- 24 Nova Zelândia
("Auckland", 1700000, 24),
("Wellington", 215000, 24),
("Christchurch", 375000, 24),
("Hamilton", 180000, 24),
("Tauranga", 160000, 24),

-- 25 Papua Nova Guiné
("Port Moresby", 380000, 25),
("Lae", 200000, 25),
("Arawa", 40000, 25),
("Madang", 62000, 25),
("Mount Hagen", 46000, 25);

