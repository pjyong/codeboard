<?php
$loader = require_once __DIR__.'/vendor/autoload.php';
// register own CodeBoard App Namespace
$loader->add('CodeBoard', __DIR__.'/src');



$app = require_once __DIR__.'/src/bootstrap.php';
$app->run();


