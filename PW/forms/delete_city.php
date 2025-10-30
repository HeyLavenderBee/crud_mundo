<?php
    include '../connection.php'; // seu arquivo de conexão

    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        $sql = "DELETE FROM cidades WHERE id_cidade = $id";

        if ($conn->query($sql) === TRUE) {
            echo "<script> alert('Cidade excluída com sucesso!'); window.location.href='../index.php'; </script>";
        } else {
            echo "Erro ao excluir: " . $conn->error;
        }

        $conn->close();
    } else {
        echo "Não foi recebido um ID...";
    }
?>