<?php


namespace CodeBoard\Route;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpKernel\Debug\ErrorHandler;
use Symfony\Component\HttpKernel\Debug\ExceptionHandler;
use Silex\MyException;


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
            $data['keycode'] = $requestData->keycode;
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

        // search
        $controllers->get("search/{searchType}/{searchKeywords}", function(Application $app, $searchType, $searchKeywords){
            if($searchType == 'keycodecount'){
                // get count from keycode
                $count = $app['model.code']->returnCountByKeyCode($searchKeywords);
                return $app->json($count);
            }else if($searchType == 'keycode'){
                // search by key code
                $codes = $app['model.code']->selectByKeyCode($searchKeywords);

                return $app->json($codes);

            }else if($searchType == 'keywordcount'){
                // get count from keyword

            }else{
                // search by key word
                $codes = $app['model.code']->selectByKeyWord($searchKeywords);
                return $app->json($codes);
            }

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

        // 
        $controllers->get("codes/{searchType}/{searchKeywords}/{page}", function(Application $app, $searchType, $searchKeywords, $page){
            if($searchType == 'keycode'){
                // search by key code
                $codes = $app['model.code']->selectByKeyCode($searchKeywords, $page);

                return $app->json($codes);

            }else{
                // search by key word
                $codes = $app['model.code']->selectByKeyWord($searchKeywords, $page);
                return $app->json($codes);
            }

        });

        // get statistic by date
        $controllers->get("statistic", function(Application $app){

            $statistic = $app['model.code']->generateStatistic();
            return $app->json($statistic);

        });

        // run php code
        $controllers->post("run", function(Application $app, Request $request){
            // ErrorHandler::register();
            // ExceptionHandler::register();
            // if($this->php_check_syntax($request->request->get('phpcode'))){
            // print_r($this->php_check_syntax($request->request->get('phpcode')));

            // }
            ob_start();
            $filePath = 'C:\xampp\tmp\tmp_eval'.mt_rand();
            file_put_contents($filePath, $request->request->get('phpcode'));
            register_shutdown_function('unlink', $filePath);
            require($filePath);
        
            // set_error_handler("my_handler");

            // eval($request->request->get('phpcode'));
            // print_r($this->php_syntax_error($request->request->get('phpcode')));
            $content = ob_get_contents();
            ob_end_clean();
            return new Response($content);
        });


		return $controllers;
	}

   
    

}