<?php
    include("bd/connection.php");
    session_start();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Gerenciamento de cidades</title>
</head>
<body>
    <div class="header">Gerenciamento de cidades</div>
    <div class="main">
        <a href="../index.php" class="back-button">Voltar</a>
        <!-- Container com link do form de adicionar cidades -->
        <div class="forms-link-container">
            <a href="forms/city_forms.php" class="form-link">Adicionar cidade</a>
        </div>
        <h3>Tabela de cidades</h3>
            <?php
                //para mostrar cada valor dos países em uma tabela
                $sql = "SELECT cidades.id_cidade, cidades.id_pais, cidades.nome, cidades.habitantes, paises.nome as paises_nome FROM cidades INNER JOIN paises ON cidades.id_pais = paises.id_pais ORDER BY cidades.id_cidade;";
                $result = $conn->query($sql);

                //caso exista ao menos uma cidade cadastrada:
                if ($result->num_rows > 0) {
                    echo "<table class='table-content'>";
                    echo "<tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Habitantes</th>
                    <th>País</th>
                    <th>Ações</th>
                    </tr>";
                    //um while para colocar na tabela cada informação de cada cidade
                    while($row = $result->fetch_assoc()) {
                        echo "<tr>";
                        echo "<td>" . $row["id_cidade"] . "</td>";
                        echo "<td>" . $row["nome"] . "</td>";
                        echo "<td>" . $row["habitantes"] . "</td>";
                        echo "<td>" . $row["paises_nome"] . "</td>";
                        //botões de ação para editar e excluir cada cidade
                        echo "<th>
                            <a href='forms/update_city.php?id=" . $row["id_cidade"] . "' class='table-button'>Editar</a>
                            <a href='forms/delete_city.php?id=" . $row["id_cidade"] . "' class='table-button' onclick='return confirm(\"Tem certeza que quer excluir?\")'>Excluir</a>
                        </th>";
                        echo "</tr>";
                    }
                    echo "</table>";
                }
                //caso não exista nenhuma cidade cadastrada
                else {
                    echo "0 results";
                }

                $conn->close(); //fecha a conexão com o banco de dados por segurança
            ?>
        </div>
    </div>
</body>
</html>