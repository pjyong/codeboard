<?php


namespace CodeBoard\Route;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class CodeRoute implements ControllerProviderInterface
{
	public function connect(Application $app)
	{
		$controllers = $app['controllers_factory'];

		$controllers->get("test", function (Application $app) {
			$post = $app['model.code']->select();
			return $app->json(array($post));
		});

		// add code
        $controllers->post("code/add", function(Application $app, Request $request){
            // 
            $data = array();
            // get the model json
            $requestData = json_decode($request->request->get('model'));
            // print_r($request->request);
            $data['fragment'] = $requestData->fragment;
            $data['language'] = $requestData->language;
            $data['status'] = $requestData->status;
            // $data['created'] = (new \DateTime())->format("Y-m-d\TH:i:s");
            $data['created'] = $requestData->created;
            // insert code
            $code = $app['model.code']->insert($data);
	        
            return $app->json($code);
        });

        // update code
        $controllers->post("code/update", function(Application $app, Request $request){
            // 
            $data = array();
            // get the model json
            $requestData = json_decode($request->request->get('model'));
            // print_r($request->request);
            $data['fragment'] = $requestData->fragment;
            $data['language'] = $requestData->language;
            $data['status'] = $requestData->status;
            // $data['created'] = (new \DateTime())->format("Y-m-d\TH:i:s");
            $data['created'] = $requestData->created;
			// update code
            $code = $app['model.code']->update($data, array('id' => (int)($requestData->id)));
            
            return $app->json($code);
        });

        // get code by id
		$controllers->get("code/{id}", function(Application $app, $id){
			$code = $app['model.code']->select($id);
			return $app->json($code);

		});

        $controllers->get("code/text/{id}.txt", function(Application $app, $id){
            $code = $app['model.code']->select($id);

            // ob_start();
            // require ROOT_PATH . '/src/text.php';
            // $content
            // ob_end_clean();
            $response = new Response();
            $response->setContent($code['fragment']);
            $response->headers->set('Content-Type', 'text/plain');
            return $response;
        });

         $controllers->get("code/javascript/{id}.js", function(Application $app, $id){
            $code = $app['model.code']->select($id);

            // ob_start();
            // require ROOT_PATH . '/src/text.php';
            // $content
            // ob_end_clean();
            $response = new Response();
            $response->setContent($code['fragment']);
            $response->headers->set('Content-Type', 'application/x-javascript');
            return $response;
        });

        $controllers->get("code/{id}/download", function(Application $app, $id){
            $code = $app['model.code']->select($id);

            $response = new Response($code['fragment']);
            $response->headers->set('Content-Type', 'text/plain');
            $d = $response->headers->makeDisposition(ResponseHeaderBag::DISPOSITION_ATTACHMENT, $code['id'] . '.txt');

            $response->headers->set('Content-Disposition', $d);

            return $response;
        });

		// get all code
		$controllers->get("codes", function(Application $app){
			$codes = $app['model.code']->selectAll();
			return $app->json($codes);

		});	

        // get codes by page
        $controllers->get("codes/{page}", function(Application $app, $page){
            $codes = $app['model.code']->selectByPage((int)$page);
            return $app->json($codes);

        }); 

        // get codes by date and page
        $controllers->get("codes/{date}/{page}", function(Application $app, $date, $page){

            $codes = $app['model.code']->seleteByDate($date, (int)$page);
            return $app->json($codes);

        });

        // get statistic by date
        $controllers->get("statistic", function(Application $app){

            $statistic = $app['model.code']->generateStatistic();
            return $app->json($statistic);

        });


		return $controllers;
	}

}