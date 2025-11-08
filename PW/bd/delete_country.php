<?php
    include 'connection.php';

    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        $sql = "DELETE FROM paises WHERE id_pais = $id";

        if ($conn->query($sql) === TRUE) {
            echo "<script> alert('País e cidades relacionadas excluídos com sucesso!'); window.location.href='../countries_page.php'; </script>";
        } else {
            echo "Erro ao excluir: " . $conn->error;
        }

        $conn->close();
    } else {
        echo "Não foi recebido um ID...";
    }
?>