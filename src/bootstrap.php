<?php
use Silex\Application;
use Silex\Provider\UrlGeneratorServiceProvider;
use Silex\Provider\SessionServiceProvider;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

date_default_timezone_set('America/New_York');
define('ROOT_PATH',    __DIR__ . '/..');
define('CODEBOARD_PATH',   ROOT_PATH . '/src/CodeBoard');

$app = new Application();

// enabled debug mode
$app['debug'] = false;


$app->register(new UrlGeneratorServiceProvider());
$app->register(new SessionServiceProvider());
// load config
$app['database.connection'] = array(
	'driver'    => 'pdo_mysql',
    'host'      => 'localhost',
    'dbname'    => 'silex',
    'user'      => 'root',
    'password'  => '',
    'charset'   => 'utf8',
);

// create connection to database if configured
if($app->offsetExists('database.connection')){
	$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
		'db.options' => $app['database.connection'],
	));
}

// load routes
// $app->mount("/", new CodeBoard\Route\CodeRoute());
$routesDir = CODEBOARD_PATH.'/Route';
$routes = scandir($routesDir);
foreach($routes as $file){
	if (pathinfo($file, PATHINFO_EXTENSION) === 'php'){
		$exploded = explode('.', $file);
		$routeToLoad = 'CodeBoard\\Route\\'.$exploded[0];
		$app->mount("/", new $routeToLoad);
	}
}

// load models
$modelsDir = CODEBOARD_PATH.'/Model';
$models = scandir($modelsDir);
$arryToLoad = array();
foreach($models as $file){
	if (pathinfo($file, PATHINFO_EXTENSION) === 'php'){
		$exploded = explode('.', $file);
		$arryToLoad[strtolower($exploded[0])] = "CodeBoard\\Model\\".$exploded[0];
	}
}

// add all models into services
$app->register(new CodeBoard\Base\ServiceProvider(), array("models.container" =>  $arryToLoad));

// print_r($app[]);

return $app;