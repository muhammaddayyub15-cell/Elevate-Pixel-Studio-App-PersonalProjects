<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

// =============================================================
// AUTH CONTROLLER
// Menangani endpoint autentikasi admin.
// Endpoint: POST /login, POST /logout
// Pattern: Controller → AuthService → User Model
// =============================================================

class AuthController extends Controller
{
    public function __construct(
        protected AuthService $authService
    ) {}

    // -------------------------------------------------------------
    // LOGIN
    // POST /api/login
    // Public route — tidak butuh autentikasi.
    // -------------------------------------------------------------
    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->login($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'token'   => $result['token'],
            'user'    => [
                'id'    => $result['user']->id,
                'name'  => $result['user']->name,
                'email' => $result['user']->email,
                'role'  => $result['user']->role,
            ],
        ]);
    }

    // -------------------------------------------------------------
    // LOGOUT
    // POST /api/logout
    // Protected route — butuh Sanctum token.
    // -------------------------------------------------------------
    public function logout(Request $request): JsonResponse
    {
        $this->authService->logout($request->user());

        return response()->json([
            'success' => true,
            'message' => 'Logout successful',
        ]);
    }
}