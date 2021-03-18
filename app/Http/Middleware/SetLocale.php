<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Contracts\Translation\HasLocalePreference;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $currentLocale = app()->getLocale();
        $locales = config('app.locales');

        // Get locale from route or session
        $session = $request->hasSession() ? $request->session() : null;
        $user = $request->user();
        $sessionLocale = !is_null($session) ? $session->get('locale') : null;
        $userLocale = !is_null($user) && $user instanceof HasLocalePreference ? $user->preferredLocale() : null;
        $routeLocale = data_get(
            $request->route()->getAction(),
            'locale',
            $request->route('locale') ?? 'auto'
        );
        $requestLocale = $request->input('locale', $routeLocale);
        $browserLocale = $this->getFromRequestHeaders($request, $locales);
        $detectedLocale = $sessionLocale ?? ($userLocale ?? ($browserLocale ?? $locales[0]));
        $newLocale = in_array($requestLocale, $locales) ? $requestLocale : $detectedLocale;

        if (!is_null($newLocale) && $newLocale !== $currentLocale) {
            app()->setLocale($newLocale);
        }

        if (!is_null($session) && $newLocale !== $sessionLocale) {
            $session->put('locale', $newLocale);
        }

        return $next($request);
    }

    protected function getFromRequestHeaders(Request $request, $locales)
    {
        $acceptLanguage = $request->headers->get('Accept-Language');
        $browserLang = !empty($acceptLanguage) ? strtok(strip_tags($acceptLanguage), ',') : '';
        $browserLang = strtolower(substr($browserLang, 0, 2));
        return in_array($browserLang, $locales) ? $browserLang : null;
    }
}
