<?php
    include("../bd/connection.php"); //inclui o arquivo de conexão com o banco de dados
    session_start();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="../style.css">
    <title>Cadastro de país</title>
</head>
<body>
	<div class="header">CRUD Mundo</div>
    <div class="main">
        <a href="../index.php" class="back-button">Voltar</a>
		<div class="form-title">Cadastrar país</div><br>
		<div class="forms-row">
			<!-- Formulário de países -->
			<form method="post" class="form-content">
                <?php
                    #um condicional para quando o formulário for enviado
                    if($_SERVER["REQUEST_METHOD"]=="POST"){
                        #variáveis do formulário guardadas em outras, que vão ser usadas no insert
                        $country_name = $_POST["country_name"];
                        $country_population = $_POST["country_population"];
                        $continent = $_POST["selected_continent"];
                        $language = $_POST["language"];

                        #checa se o país já existe, pelo nome
                        $sql = "SELECT * FROM paises WHERE nome = ?;";
                        $stmt = $conn->prepare($sql);
                        $stmt->bind_param("s", $country_name);
                        $stmt->execute();
                        $result = $stmt->get_result();

                        #se for achado um país ou mais com aquele nome, vai mandar a mensagem que já existe
                        if ($result->num_rows > 0) {
                            echo "<div class='error'>Já existe um país com esse nome.</div>";
                        }
                        #senão, o país é cadastrado no banco de dados
                        else{
                            $sql = "INSERT INTO paises(nome, habitantes, continente, idioma) VALUES (?, ?, ?, ?)";
                            $stmt = $conn->prepare($sql);
                            $stmt->bind_param("ssss", $country_name, $country_population, $continent, $language);

                            #condicionais para executar conexão com o banco de dados
                            if ($stmt->execute()) {
                                echo "<script>";
                                echo "alert('País cadastrado com sucesso!');";
                                echo "window.location.href='../countries_page.php';";
                                echo "</script>";
                            } else {
                                echo "Algo deu errado por nossa parte...";
                            }
                        }
                    }   
                ?>
				<div class="form-input-title">Nome</div>
				<input class="text-input" type="text" name="country_name" required>
				<div class="form-input-title">Habitantes</div>
				<input class="text-input" type="number" name="country_population" min="0" required>
                <div class="form-input-title">Idioma</div>
				<input class="text-input" type="text" name="language" required>

				<!-- input para selecionar o continente, e limitar as opções do usuário -->
				<select class="select-input" id="continent_select" name="selected_continent">
					<option value="">Selecione um continente</option>
					<option value="África">África</option>
					<option value="América">América</option>
					<option value="Ásia">Ásia</option>
					<option value="Europa">Europa</option>
					<option value="Oceania">Oceania</option>
				</select>
				
				<br>
				<input class="submit-input" type="submit" name="submit" value="Adicionar país">
            </form>
        </div>
	</div>
</body>
</html>
