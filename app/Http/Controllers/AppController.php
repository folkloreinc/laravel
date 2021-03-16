<?php

namespace App\Http\Controllers;

use App\Http\Resources\PageResource;
use Illuminate\Http\Request;

class AppController extends Controller
{
    public function show(Request $request)
    {
        $pageResource = new PageResource([]);

        if ($this->requestIsJson($request)) {
            return $pageResource;
        }

        return view('app');
    }
}
