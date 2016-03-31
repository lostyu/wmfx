<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/3/30 0030
 * Time: 16:30
 */

$str = $_POST['dt'];
$img = base64_decode($str);
$imgName = '/img/'.time().'.jpg';
$a = file_put_contents('.'.$imgName, $img);
$host = $_SERVER['SERVER_NAME'];
echo 'http://'.$host.$imgName;