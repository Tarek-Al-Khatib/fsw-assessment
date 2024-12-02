<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
});



Route::group([
    'middleware' => 'requests',
    'prefix' => 'user'
], function() {

});