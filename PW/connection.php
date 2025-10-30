<?php
    $server = "localhost:3307"; //atualizar pra :3306 depois, pois meu notebook roda no 3307
    $user = "root";
    $password = "";
    $db = "crud_mundo";

    $conn = new mysqli($server, $user, $password, $db);
?>