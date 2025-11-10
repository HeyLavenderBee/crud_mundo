<?php
    include("bd/connection.php");
    session_start();
    $country_name_english = ''; //vazio por enquanto
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <title>Gerenciamento de países</title>
</head>
<body>
    <div class="header">Gerenciamento de países</div>

    <!-- Container com link do form de adicionar países -->
    <div class="main">
        <a href="index.php" class="back-button">Voltar</a>
        <div class="search-container">
            <h3>Procurar País</h3>
            <form method="GET" class="search-form">
                <select class="select-input" id="search" name="search">
					<option value="">Escolha um país</option>
					<?php
					$sql = "SELECT * FROM paises;";
					$result = $conn->query($sql);
					while ($row = $result->fetch_assoc()) {
						echo "<option value='" . $row['nome'] . "'>" . $row['nome'] . "</option>";
					}
					?>
				</select>
                <input class="submit-input" type="submit" value="Buscar">
            </form>
            <div class="search-result-container">
                <?php
                    //verifica se o usuário enviou uma busca
                    if (isset($_GET['search']) && !empty($_GET['search'])) {
                        $search_word = $_GET['search'];

                        //prepara a consulta SQL para buscar o país pelo nome
                        $stmt = $conn->prepare("SELECT * FROM paises WHERE nome LIKE ?");
                        $like = "%" . $search_word . "%";
                        $stmt->bind_param("s", $like);
                        $stmt->execute();
                        $result = $stmt->get_result();

                        //verifica se encontrou algum país
                        if ($result->num_rows > 0) {
                            //exibe os países encontrados
                            while ($row = $result->fetch_assoc()) {
                                $country_name_english = $row['nome_ingles']; //pega o nome em inglês para a API
                                $country_name_portuguese = $row['nome'];
                                echo "<h3>".$row['id_pais']." - ".$row['nome']."</h3>";
                                echo "<strong>Habitantes</strong>: ".$row['habitantes']."<br>";
                                echo "<strong>Continente</strong>: " . $row['continente'];
                                echo "<br><strong>Idioma</strong>: ".$row['idioma']."<br><br>"; //separação extra (para aparecer as informações da API depois)
                            }
                        } else {
                            echo "<h4>Nenhum país encontrado com o nome '" . $search_word. "'</h4>";
                            echo "<br>Caso queira adicionar um novo país, clique no botão abaixo";
                        }
                        $stmt->close();
                    

                        /* =+=+=+= CÓDIGO PARA A API RESTCOUNTRIES =+=+=+= */

                        //pega as informações do país pela API
                        function getCountryInfo(string $countryName): ?array
                        {
                            //a api precisa usar o nome inglês do país na URL para funcionar, por isso o nome em ingles no banco de dados
                            $url = "https://restcountries.com/v3.1/name/" . urlencode($countryName) . "?fullText=true";
                            $curl = curl_init(); //começa o processo do curl
                            curl_setopt_array($curl, array(
                                CURLOPT_URL => $url,
                                CURLOPT_RETURNTRANSFER => true,
                                CURLOPT_ENCODING => '',
                                CURLOPT_MAXREDIRS => 10,
                                CURLOPT_TIMEOUT => 30,
                                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                                CURLOPT_CUSTOMREQUEST => 'GET',
                            ));
                            
                            $response = curl_exec($curl);
                            
                            //caso dê erro no curl
                            if (curl_errno($curl)) {
                                echo 'Erro cURL: ' . curl_error($curl);
                                curl_close($curl);
                                return null;
                            }
                            
                            $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
                            curl_close($curl);
                            
                            //dados pegos da API, sendo decodificados do json
                            $data = json_decode($response, true);
                            
                            if ($httpCode === 200 && is_array($data) && !isset($data['status']) && !empty($data)) {
                                return $data[0];
                            } 
                            
                            if (is_array($data) && isset($data['message'])) {
                                echo "<br>";
                            } else {
                                echo "Erro na requisição. Código HTTP: {$httpCode}.<br>";
                            }
                            return null;
                        }

                        //agora roda a função para pegar as informações do país, com base no nome em inglês
                        $info = getCountryInfo($country_name_english);
                        
                        //se a variavel tiver algo:
                        if ($info) {
                            if($info['capital']) {
                                echo "<strong>População:</strong> " . number_format($info['population'] ?? 0, 0, ',', '.');
                            }
                            $languages = $info['languages'] ?? [];
                            $languageName = 'N/A';
                            if (!empty($languages)) {
                                $lang_code = array_key_first($languages);
                                $languageName = htmlspecialchars($languages[$lang_code]);
                            }

                            $currencies = $info['currencies'] ?? [];
                            $currencyInfo = 'N/A';
                            if (!empty($currencies)) {
                                $currency_code = array_key_first($currencies);
                                $currency = $currencies[$currency_code];
                                $currencyInfo = htmlspecialchars($currency['name']) . " (" . htmlspecialchars($currency['symbol'] ?? '') . ")";
                            }
                            echo "<br><strong>Moeda:</strong> " . $currencyInfo;
                            
                            echo "<br><strong>Bandeira:</strong> <img src='" . htmlspecialchars($info['flags']['svg'] ?? '') . "' alt='Bandeira' style='height: 20px; border: 1px solid #ccc;'>";
                        } else {
                            echo "<p>Não foi possível exibir as informações adicionais para o país '{$country_name_portuguese}'.</p>";
                        }
                    }
                ?>
            </div>
        </div>
        
        <div class="forms-link-container">
            <a href="forms/country_forms.php" class="form-link">Adicionar país</a>
        </div>
        <h3>Tabela de países</h3>
            <?php
                //para mostrar cada valor dos países em uma tabela
                $sql = "SELECT * FROM paises";
                $result = $conn->query($sql);
                
                //caso tenha pelo menos um país cadastrado
                if ($result->num_rows > 0) {
                    //o cabeçalho da tabela
                    echo "<table class='table-content'>";
                    echo "<tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Habitantes</th>
                    <th>Continente</th>
                    <th>Idioma</th>
                    <th>Ações</th>
                    </tr>";
                    //um while para colocar na tabela cada informação de cada país
                    while($row = $result->fetch_assoc()) {
                        echo "<tr>";
                        echo "<td>" . $row["id_pais"] . "</td>";
                        echo "<td>" . $row["nome"] . "</td>";
                        echo "<td>" . $row["habitantes"] . "</td>";
                        echo "<td>" . $row["continente"] . "</td>";
                        echo "<td>" . $row["idioma"] . "</td>";
                        //os botões de ação para editar e excluir
                        echo "<th>
                            <a href='forms/update_country.php?id=" . $row["id_pais"] . "' class='table-button'>Editar</a>
                            <a href='bd/delete_country.php?id=" . $row["id_pais"] . "' class='table-button' onclick='return confirm(\"Tem certeza que quer excluir o país? Todas as cidades relacionadas a ele serão excluídas também\")'>Excluir</a>
                        </th>";
                        echo "</tr>";
                    }
                    echo "</table>";
                }
                //caso não exista nenhum país cadastrado
                else {
                    echo "0 results";
                }
            ?>
        </div>
    </div>
</body>
</html>