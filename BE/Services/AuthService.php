<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

// =============================================================
// AUTH SERVICE
// Bertanggung jawab untuk business logic autentikasi.
// Dipanggil oleh AuthController.
// Pattern: Controller → Service → Model
// =============================================================

class AuthService
{
    // -------------------------------------------------------------
    // LOGIN
    // Validasi kredensial, buat Sanctum token, return token + user.
    // -------------------------------------------------------------
    public function login(array $credentials): array
    {
        $user = User::where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password salah.'],
            ]);
        }

        // Hapus token lama agar tidak menumpuk
        $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user'  => $user,
            'token' => $token,
        ];
    }

    // -------------------------------------------------------------
    // LOGOUT
    // Hapus semua token milik user yang sedang login.
    // -------------------------------------------------------------
    public function logout(User $user): void
    {
        $user->tokens()->delete();
    }
}