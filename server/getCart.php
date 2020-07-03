<?php

/* 1、连接数据库 */
include_once "./connectDB.php";

$user_id = $_REQUEST["user_id"];

/* 多表查询 */
$sql = "SELECT cart.*,good.img,good.price,good.shopName,good.name FROM cart , good WHERE cart.good_id = good.good_id AND user_id=$user_id";

$result = mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);
?>