<?php

namespace App\View\Composers;

use Illuminate\View\View;
use Illuminate\Http\Request;
use Illuminate\Routing\Router;

class RoutesComposer
{
    protected $defaultRoutes = ['home'];

    protected $request;
    protected $router;

    public function __construct(Request $request, Router $router)
    {
        $this->request = $request;
        $this->router = $router;
        $this->routes = $router->getRoutes();
        $this->patterns = $router->getPatterns();
    }

    public function compose(View $view)
    {
        $locale = app()->getLocale();
        $view->routes = $this->getRoutes($locale);
    }

    protected function getRoutes($locale)
    {
        $routes = [];

        foreach ($this->defaultRoutes as $name) {
            $route = $this->routes->getByName($name);
            if (!is_null($route)) {
                $routes[$name] = $this->getRoutePath($route);
            }
        }

        return $routes;
    }

    protected function getRoutePath($route, $absolute = false)
    {
        $parameters = $route->parameterNames();
        $params = [];
        foreach ($parameters as $parameter) {
            $params[$parameter] = '__' . $parameter . '__';
        }
        $path = route($route->getName(), $params, $absolute);
        $paramsPattern =
            '/[\_]{2}(' .
            implode(
                '|',
                array_map(function ($param) {
                    return preg_quote($param, '/');
                }, $parameters)
            ) .
            ')[\_]{2}/';
        $path = sizeof($params) ? preg_replace($paramsPattern, ':$1', $path) : $path;
        if ($absolute) {
            $path = preg_replace(
                '/^(https?\:\/\/)([^\/]+?)(\:[0-9]+)(\/.*)?$/',
                '$1$2\\\\$3$4/',
                $path
            );
        }
        foreach ($parameters as $parameter) {
            if (isset($this->patterns[$parameter])) {
                $pattern = preg_replace('/^\(?(.*?)\)?$/', '$1', $this->patterns[$parameter]);
                $path = preg_replace(
                    '/(' . preg_quote(':' . $parameter) . ')\b/i',
                    '$1(' . $pattern . ')',
                    $path
                );
            }
        }
        return $path;
    }
}
