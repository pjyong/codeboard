<?php


namespace CodeBoard\Route;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use CodeBoard\Base\InterfaceRenderTemplate;

class IndexRoute implements ControllerProviderInterface
{
	public function connect(Application $app)
	{
		$controllers = $app['controllers_factory'];

		$controllers->get("/", function (Application $app) {
			return new Response($this->render($app));
		});

		return $controllers;
	}

	public function render(Application $app){

		// get some global data from server and persist them into hidden input tag

		// get the eariest date of posted code
		$code = $app['model.code']->getEariestDate();
        $beginDate = date('Y-m', strtotime($code['created']));
        $endDate = date('Y-m');

		

		require ROOT_PATH . '/src/layout.php';
	}

}