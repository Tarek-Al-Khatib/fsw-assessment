<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\UpdateRequestsNum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
});

Route::post("/login", [UserController::class, "login"]);
Route::post("/register", [UserController::class, "register"]);
Route::middleware([UpdateRequestsNum::class])->group(function () {
    Route::prefix("projects")->group(function () {
        Route::get("/", [ProjectController::class, "getProjects"]);
        Route::get("/user/{id}", [ProjectController::class, "getProjectOfUser"]);  
        Route::post("/", [ProjectController::class, "addProject"]);
        Route::put("/{id}", [ProjectController::class, "updateProject"]);
        Route::delete("/{id}", [ProjectController::class, "deleteProject"]);
    });
});