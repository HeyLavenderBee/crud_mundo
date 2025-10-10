<?php
    include("../connection.php");
    session_start();

    #um condicional para quando o formulário for enviado
    if($_SERVER["REQUEST_METHOD"]=="POST"){
        #variáveis do formulário guardadas em outras, que vão ser usadas no insert
        $city_name = $_POST["city_name"];
        $city_population = $_POST["city_population"];
        $country = $_POST["selected_country"];
        echo $country;

        #checa se a cidade já existe, pelo nome
        $sql = "SELECT * FROM cidades WHERE nome = ?;";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $city_name);
        $stmt->execute();
        $result = $stmt->get_result();

        #se for achado uma cidade ou mais com aquele nome, vai mandar a mensagem que já existe
        if ($result->num_rows > 0) {
            echo "<div class='wrong-password'>Já existe uma cidade com esse nome.</div><br><br>";
        }
        #senão, a cidade é cadastrada no banco de dados
        else{
            $sql = "INSERT INTO cidades(nome, habitantes, id_pais) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sss", $city_name, $city_population, $country);

            #condicionais para executar conexão com o banco de dados
            if ($stmt->execute()) {
                echo "Cidade cadastrada com sucesso!";
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
    <link rel="stylesheet" href="../style.css">
    <title>Adicionar cidade</title>
</head>
<body>
    <!-- Cabeçalho -->
    <div class="header">Formulário de cidades</div>
    <a href="../index.php">Voltar</a>
    <div class="main">
        <div class="forms-row">
            <div class="form-content">
                <h3>Forms cidade</h3><br>

                <!-- Formulário cidades -->
                <form method="post">
                    Nome<br>
                    <input class="text-input" type="text" name="city_name" required>
                    <br>Habitantes<br>
                    <input class="text-input" type="number" name="city_population" min="0" required><br>
                    <!-- input para selecionar o país relacionado -->
                    <select class="text-input" id="country_select" name="selected_country">
                        <option value="">Selecione o país relacionado</option>
                        <option value="1">Brasil</option>
                    </select>
                    <br>
                    <input class="submit-input" type="submit" name="submit" value="Adicionar cidade">
                </form>
            </div>
        </div>
    </div>
</body>
</html>