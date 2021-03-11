<?php

namespace App\View\Composers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class AppComposer
{
    /**
     * The request
     *
     * @var \Illuminate\Http\Request
     */
    protected $request;

    /**
     * Create a new profile composer.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $user = $this->request->user();

        $view->props = [
            'locale' => app()->getLocale(),
            'locales' => config('app.locales'),
            'routes' => $view->routes,
            'translations' => $view->translations,
            'user' => !is_null($user) ? new UserResource($user) : null,
        ];
    }
}
