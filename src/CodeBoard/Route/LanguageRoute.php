<?php


namespace CodeBoard\Route;

use Silex\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class LanguageRoute implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        // $controllers->get("code/{id}", function(Application $app, $id){
        //     $code = $app['model.code']->select($id);
        //     return $app->json($code);

        // });

        $controllers->get("languages", function(Application $app){
            $languages = $app['model.language']->selectAll();
            return $app->json($languages);
        });     

        return $controllers;
    }

}