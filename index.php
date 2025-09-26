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
    <link rel="stylesheet" href="style.css">
    <title>Index</title>
</head>
<body>
    <div class="header">Cabeçalho</div>
    <div class="main">
        <div class="forms-row">
            <div class="form-content">
                <h3>Forms país</h3><br>
                <form>
                    Nome<br>
                    <input class="text-input" type="text" name="nome" required>
                    <br>Habitantes<br>
                    <input class="text-input" type="number" name="habitantes" min="0" required>
                    <br>
                    <input class="submit-input" type="submit" name="submit" value="Adicionar país">
                </form>
            </div>

            <div class="form-content">
                <h3>Forms cidade</h3><br>
                <form>
                    Nome<br>
                    <input class="text-input" type="text" name="nome" required>
                    <br>Habitantes<br>
                    <input class="text-input" type="number" name="habitantes" min="0" required>
                    <br>
                    <input class="submit-input" type="submit" name="submit" value="Adicionar cidade">
                </form>
            </div>
        </div>

        <?php
            //código de adicionar países e cidades do formulário vai ficar aqui
        ?>

        <h3>Tabela de países</h3>
        <table class="table-content">
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Habitantes</th>
                <th>Continente</th>
                <th>Idioma</th>
            </tr>
            <tr>
                <th>0</th>
                <th>Brasil</th>
                <th>212</th>
                <th>América</th>
                <th>Português</th>
            </tr>
        </table>

        <h3>Tabela de cidades</h3>
        <table class="table-content">
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Habitantes</th>
                <th>id_pais</th>
            </tr>
            <tr>
                <th>0</th>
                <th>Curitiba</th>
                <th>12</th>
                <th>0</th>
            </tr>
        </table>
    </div>
</body>
</html>