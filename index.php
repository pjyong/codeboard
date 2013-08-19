<?php

use Symfony\Component\HttpFoundation\Response;
$loader = require_once __DIR__.'/vendor/autoload.php';
// register own CodeBoard App Namespace
$loader->add('CodeBoard', __DIR__.'/src');


$app = require_once __DIR__.'/src/bootstrap.php';

ini_set('display_errors',0);
register_shutdown_function('shutdownFunction');
function shutDownFunction() { 
    $error = error_get_last();
    if ($error['type'] == 1) {
        //do your stuff    
        $content = 'Error: '. $error['message']. ' on line '. $error['line'];
        echo $content;
        exit;
    } 
}
$app->run();




