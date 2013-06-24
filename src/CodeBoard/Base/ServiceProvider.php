<?php
namespace CodeBoard\Base;

use Silex\Application;
use Silex\ServiceProviderInterface;

class ServiceProvider implements ServiceProviderInterface
{
    public function register(Application $app)
    {
        $app->before(function() use ($app) {
            foreach ($app["models.container"] as $label => $class) {
                // remove the suffix of "model"
                $label = str_replace('model', '', $label);
                $app["model.".$label] = $app->share(function() use ($class, $app) {
                    // if the db connection object exist
                	if ($app->offsetExists("db")){
                	   return new $class($app['db']);
                	}else{
                	   return new $class;
                	}
                });
            }
        });
    }
    public function boot(Application $app)
    {

    }
}