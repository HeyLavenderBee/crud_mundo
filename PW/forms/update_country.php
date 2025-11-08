<?php
    include '../bd/connection.php';

    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        $sql = "SELECT * FROM paises WHERE id_pais = $id";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
        } else {
            echo "País não encontrado.";
        }
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $id = $_POST['id'];
        $nome = $_POST['nome'];
        $habitantes = $_POST['habitantes'];
        $idioma = $_POST['idioma'];
        $continente = $_POST['selected_continent'];

        $sql = "UPDATE paises SET nome='$nome', habitantes=$habitantes, idioma='$idioma', continente='$continente' WHERE id_pais=$id";

        if ($conn->query($sql)) {
            echo "<script>alert('País atualizado com sucesso!'); window.location.href='../countries_page.php';</script>";
        } else {
            echo "Erro ao atualizar: " . $conn->error;
        }
    }
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Editar País</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../style.css">
</head>
<body>
    <div class="header">CRUD Mundo</div>
    <div class="main">
	<a href="../index.php">Voltar</a>
        <div class="form-title">Editar país</div><br>

        <form method="POST" class="form-content">
            <input type="hidden" name="id" value="<?php echo $row['id_pais']; ?>">
            <div class="form-input-title">Nome</div>
            <input class="text-input" type="text" name="nome" value="<?php echo $row['nome']; ?>">
            <div class="form-input-title">Habitantes</div>
            <input class="text-input" type="number" name="habitantes" value="<?php echo $row['habitantes']; ?>">
            <div class="form-input-title">Idioma</div>
            <input class="text-input" type="text" name="idioma" value="<?php echo $row['idioma']; ?>">
            <select class="select-input" id="continent_select" name="selected_continent">
                <?php $current_continent = $row['continente']; //mostra o continente selecionado com base no país escolhido ?> 
                <option value="">Selecione um continente</option>
                <!-- marca "selected" para a option que tiver o valor igual do país -->
                <option value="África" <?php echo ($current_continent == 'África') ? 'selected' : ""; ?>>África</option>
                <option value="América" <?php echo ($current_continent == 'América') ? 'selected' : ""; ?>>América</option>
                <option value="Ásia" <?php echo ($current_continent == 'Ásia') ? 'selected' : ""; ?>>Ásia</option>
                <option value="Europa" <?php echo ($current_continent == 'Europa') ? 'selected' : ""; ?>>Europa</option>
                <option value="Oceania" <?php echo ($current_continent == 'Oceania') ? 'selected' : ""; ?>>Oceania</option>
            </select>
            <br>
            <input class="submit-input" type="submit" value="Atualizar país">
        </form>
    </div>
</body>
</html>