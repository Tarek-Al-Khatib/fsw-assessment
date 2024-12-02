<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request){
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
        ]);
    }

    public function register(Request $request)
    {
        $validatedData = $request->validate([
            "name" => "required|string|max:255",
            "email" => "required|string|email|unique:users,email",
            "password" => "required|string|min:6",
        ]);

        $user = User::create([
            "name" => $validatedData["name"],
            "email" => $validatedData["email"],
            "password" => Hash::make($validatedData["password"]),
        ]);

        return response()->json([
            "message" => "User registered successfully",
            "user" => $user
        ], 200);
    }

}
