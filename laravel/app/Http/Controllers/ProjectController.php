<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function getProjects(){
        $projects = Project::all();
        return response()->json([$projects]);
    }


    public function getProjectOfUser($id){
        $user = User::find($id);

        if(!$user){
            return response()->json(["message" => "You do not exist"]);
        }

        $projects = Project::where("user_id", "=", $user->id);

        return response()->json($projects);
    }


}
