<?php
    include '../bd/connection.php';

    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        $sql = "SELECT * FROM cidades WHERE id_cidade = $id";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
        } else {
            echo "Cidade não encontrada.";
        }
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $id = $_POST['id'];
        $nome = $_POST['nome'];
        $habitantes = $_POST['habitantes'];
        $pais = $_POST['selected_country'];

        $sql = "UPDATE cidades SET nome='$nome', habitantes=$habitantes, id_pais=$pais WHERE id_cidade=$id";

        if ($conn->query($sql)) {
            echo "<script>alert('Cidade atualizada com sucesso!'); window.location.href='../cities_page.php';</script>";
        } else {
            echo "Erro ao atualizar: " . $conn->error;
        }
    }
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Editar Cidade</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="../style.css">
</head>
<body>
    <div class="header">CRUD Mundo</div>
    <div class="main">
		<a href="../index.php">Voltar</a><br>
        <div class="form-title">Editar cidade</div><br>
        <br>
        <form method="POST" class="update-form-content">
            <input class="text-input" type="hidden" name="id" value="<?php echo $row['id_cidade']; ?>">
            <div class="form-input-title">Nome</div>
            <input class="text-input" type="text" name="nome" value="<?php echo $row['nome']; ?>">
            <div class="form-input-title">Habitantes</div>
            <input class="text-input" type="number" name="habitantes" value="<?php echo $row['habitantes']; ?>">
            <?php
                $current_country_id = $row['id_pais']; 
                $sql = "SELECT id_pais, nome FROM paises";
                $result_countries = $conn->query($sql);
            ?>
            <select class="select-input" id="country_select" name="selected_country">
                <option value="">Selecione um país</option>
                <?php
                if ($result_countries && $result_countries->num_rows > 0) {
                    while ($country_row = $result_countries->fetch_assoc()) {
                        $id = $country_row['id_pais'];
                        $option_name = $country_row['nome'];
                        $selected = ($option_id == $current_country_id) ? 'selected' : '';
                        echo "<option value='{$id}' {$selected}>{$option_name}</option>";
                    }
                }
                else {
                    echo "<option value='' disabled>Nenhum país encontrado</option>";
                }
                ?>
            </select>
            <br>
            <input class="submit-input" type="submit" value="Atualizar cidade">
        </form>
    </div>
</body>
</html>