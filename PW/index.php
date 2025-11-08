<?php
    include("bd/connection.php");
    session_start();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <title>Index</title>
</head>
<body>
    <!-- Cabeçalho -->
    <div class="header">CRUD Mundo</div>
    <div class="map-banner"></div>
    <div class="main">
        <h3>Bem-vindo ao CRUD Mundo!</h3>
        <div class="intro-text">
            Aqui você pode ver sobre as informações de várias cidades e países do mundo, e gerenciar eles.
            <br> Escolha uma das opções a seguir para navegar pelo sistema
        </div>
        <br><br>
        <div class="forms-link-container">
            <a href="countries_page.php" class="form-link">Gerenciar países</a>
            <a href="cities_page.php" class="form-link">Gerenciar cidades</a>
        </div>
        <div class="forms-link-container">
            <a href="forms/country_forms.php" class="form-link">Adicionar país</a>
            <a href="forms/city_forms.php" class="form-link">Adicionar cidade</a>
        </div>
        
    

    </div>
</body>
</html>

