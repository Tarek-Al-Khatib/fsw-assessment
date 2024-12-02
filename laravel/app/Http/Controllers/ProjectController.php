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

    public function addProject(Request $request){
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $project = Project::create($validated);
        return response()->json($project, 200);
    }


    public function updateProject(Request $request, $id){ 
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $project = Project::find($id);

        if(!$project){
            return response()->json(["message"=> "Project is not found"]);
        }
        $project->update($validated);
        return response()->json($project, 200);
    }

    public function deleteProject($id) {
        $project = Project::find($id);

        
        if(!$project){
            return response()->json(["message"=> "Project is not found"]);
        }

        $project->delete();
        return response()->json(["message" => "Deleted"], 200);
    }
}
