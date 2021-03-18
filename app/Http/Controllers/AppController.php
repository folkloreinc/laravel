<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppController extends Controller
{
    public function show(Request $request)
    {
        return view('app');
    }
}
