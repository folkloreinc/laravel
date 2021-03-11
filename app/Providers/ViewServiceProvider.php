<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use Illuminate\Contracts\View\Factory as ViewFactory;

class ViewServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->bootComposers();
    }

    public function bootShare()
    {
    }

    public function bootComposers()
    {
        $view = $this->app[ViewFactory::class];
        if ($this->app->environment() !== 'production') {
            $view->composer('app', \App\View\Composers\DevComposer::class);
        }
        $view->composer('app', \App\View\Composers\TranslationsComposer::class);
        $view->composer('app', \App\View\Composers\RoutesComposer::class);
        $view->composer('app', \App\View\Composers\AppComposer::class);
        $view->composer('tags.*', \App\View\Composers\TagsComposer::class);
    }
}
