<?php

// address and port should be specified in the wp-config files ....

$msg = "gitpull " . dirname(__FILE__) . "\n";

$len = strlen($msg);

$port="12349";

$address="127.0.0.1";

$sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);

if(socket_connect($sock,$address,$port)){

        socket_write($sock,$msg,$len);

        echo $msg;

}else{

        echo "socket fail";

}

socket_close($sock);

?>
