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

        $sql = "UPDATE cidades SET nome='$nome', habitantes=$habitantes WHERE id_cidade=$id";

        if ($conn->query($sql)) {
            echo "<script>alert('Cidade atualizada com sucesso!'); window.location.href='../index.php';</script>";
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
    <link rel="stylesheet" href="../style.css">
</head>
<body>
    <div class="header">CRUD Mundo</div>
    <div class="main">
		<a href="../index.php">Voltar</a>
        <h2>Editar Cidade</h2>
        <form method="POST" class="form-content">
            <input class="text-input" type="hidden" name="id" value="<?php echo $row['id_cidade']; ?>">
            Nome<br>
            <input class="text-input" type="text" name="nome" value="<?php echo $row['nome']; ?>"><br><br>

            Habitantes<br>
            <input class="text-input" type="number" name="habitantes" value="<?php echo $row['habitantes']; ?>"><br><br>

            <input class="submit-input" type="submit" value="Atualizar cidade">
        </form>
    </div>
</body>
</html>