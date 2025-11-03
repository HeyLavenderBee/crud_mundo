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
	<div class="forms-link-container">
		<a href="forms/city_forms.php" class="form-link">Adicionar cidade</a>
		<br>
		<a href="forms/country_forms.php" class="form-link">Adicionar país</a>
	</div>
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
				<th>Ações</th>
                </tr>";
                while($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . $row["id_pais"] . "</td>";
                    echo "<td>" . $row["nome"] . "</td>";
                    echo "<td>" . $row["habitantes"] . "</td>";
                    echo "<td>" . $row["continente"] . "</td>";
                    echo "<td>" . $row["idioma"] . "</td>";
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
				<th>Ações</th>
                </tr>";
                while($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . $row["id_cidade"] . "</td>";
                    echo "<td>" . $row["nome"] . "</td>";
                    echo "<td>" . $row["habitantes"] . "</td>";
                    echo "<td>" . $row["paises_nome"] . "</td>";
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