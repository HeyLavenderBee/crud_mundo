<?php
    include("connection.php");
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
    <a href="forms/city_forms.php">forms cidade</a>
    <br>
    <a href="forms/country_forms.php">forms país</a>
    <div class="main">

        <h3>Tabela de países</h3>
        <?php
            //para mostrar cada valor dos países em uma tabela
            $sql = "SELECT * FROM paises";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                echo "<table class='table-content'>";
                echo "<tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Habitantes</th>
                <th>Continente</th>
                <th>Idioma</th>
                </tr>";
                while($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<th>" . $row["id_pais"] . "</th>";
                    echo "<th>" . $row["nome"] . "</th>";
                    echo "<th>" . $row["habitantes"] . "</th>";
                    echo "<th>" . $row["continente"] . "</th>";
                    echo "<th>" . $row["idioma"] . "</th>";
                    echo "<th>
                        <a href='forms/update_country.php?id=" . $row["id_pais"] . "' class='table-button'>Editar</a>
                        <a href='forms/delete_country.php?id=" . $row["id_pais"] . "' class='table-button' onclick='return confirm(\"Tem certeza que quer excluir o país? Todas as cidades relacionadas a ele serão excluídas também\")'>Excluir</a>
                    </th>";
                    echo "</tr>";
                }
                echo "</table>";
            }
            else {
                echo "0 results";
            }
        ?>

        <h3>Tabela de cidades</h3>
        <?php
            //para mostrar cada valor dos países em uma tabela
            $sql = "SELECT cidades.id_cidade, cidades.id_pais, cidades.nome, cidades.habitantes, paises.nome as paises_nome FROM cidades INNER JOIN paises ON cidades.id_pais = paises.id_pais ORDER BY cidades.id_cidade;";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                echo "<table class='table-content'>";
                echo "<tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Habitantes</th>
                <th>País</th>
                </tr>";
                while($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<th>" . $row["id_cidade"] . "</th>";
                    echo "<th>" . $row["nome"] . "</th>";
                    echo "<th>" . $row["habitantes"] . "</th>";
                    echo "<th>" . $row["paises_nome"] . "</th>";
                    echo "<th>
                        <a href='forms/update_city.php?id=" . $row["id_cidade"] . "' class='table-button'>Editar</a>
                        <a href='forms/delete_city.php?id=" . $row["id_cidade"] . "' class='table-button' onclick='return confirm(\"Tem certeza que quer excluir?\")'>Excluir</a>
                    </th>";
                    echo "</tr>";
                }
                echo "</table>";
            }
            else {
                echo "0 results";
            }

            $conn->close();
        ?>
    </div>
</body>
</html>