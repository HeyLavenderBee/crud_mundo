<?php
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de país</title>
</head>
<body>
     <div class="forms-row">
            <div class="form-content">
                <h3>Forms país</h3><br>

                <!-- Formulário de países -->
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
</body>
</html>