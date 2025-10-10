<?php
    include("connection.php");
    session_start();

    #um condicional para quando o formulário for enviado
    if($_SERVER["REQUEST_METHOD"]=="POST"){
        #variáveis do formulário guardadas em outras, que vão ser usadas no insert
        $country_name = $_POST["country_name"];
        $country_population = $_POST["country_population"];
        $continent = $_POST["selected_continent"];
        $language = $_POST["language"];
        $city_name = $_POST["city_name"];

        #checa se o país já existe, pelo nome
        $sql = "SELECT * FROM paises WHERE nome = ?;";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $country_name);
        $stmt->execute();
        $result = $stmt->get_result();

        #se for achado um país ou mais com aquele nome, vai mandar a mensagem que já existe
        if ($result->num_rows > 0) {
            echo "<div class='wrong-password'>Já existe um país com esse nome.</div><br><br>";
        }
        #senão, o país é cadastrado no banco de dados
        else{
            $sql = "INSERT INTO paises(nome, habitantes, continente, idioma) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssss", $country_name, $country_population, $continent, $language);

            #condicionais para executar conexão com o banco de dados
            if ($stmt->execute()) {
                echo "País cadastrado com sucesso!";
                header("Location: index.php");
            } else {
                echo "Algo deu errado por nossa parte...";
            }
        }
    }
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
    <div class="main">
        <div class="forms-row">
            <div class="form-content">
                <h3>Forms país</h3><br>

                <!-- Formulário -->
                <form method="post">
                    Nome<br>
                    <input class="text-input" type="text" name="country_name" required>
                    <br>Habitantes<br>
                    <input class="text-input" type="number" name="country_population" min="0" required>

                    <!-- input para selecionar o continente, e limitar as opções do usuário -->
                    <select class="text-input" id="continent_select" name="selected_continent">
                        <option value="">Selecione um continente</option>
                        <option value="África">África</option>
                        <option value="América">América</option>
                        <option value="Ásia">Ásia</option>
                        <option value="Europa">Europa</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                    <br>Idioma<br>
                    <input class="text-input" type="text" name="language" required>
                    <br>
                    <input class="submit-input" type="submit" name="submit" value="Adicionar país">
                </form>
            </div>
        </div>

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
            $sql = "SELECT * FROM cidades";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                echo "<table class='table-content'>";
                echo "<tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Habitantes</th>
                <th>id_pais</th>
                </tr>";
                while($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<th>" . $row["id_cidade"] . "</th>";
                    echo "<th>" . $row["nome"] . "</th>";
                    echo "<th>" . $row["habitantes"] . "</th>";
                    echo "<th>" . $row["id_pais"] . "</th>";
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