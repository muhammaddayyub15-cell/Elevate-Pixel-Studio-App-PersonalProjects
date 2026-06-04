<?php

namespace App\Http\Requests;
 
use Illuminate\Foundation\Http\FormRequest;
 
class StorePortfolioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Sudah diproteksi middleware Sanctum di route
    }
 
    public function rules(): array
    {
        return [
            'title'             => ['required', 'string', 'max:255'],
            'slug'              => ['required', 'string', 'max:255', 'unique:portfolios,slug'],
            'client_name'       => ['nullable', 'string', 'max:255'],
            'project_url'       => ['nullable', 'url', 'max:255'],
            'thumbnail'         => ['nullable', 'string', 'max:255'],
            'gallery'           => ['nullable', 'array'],
            'short_description' => ['nullable', 'string'],
            'description'       => ['nullable', 'string'],
            'technologies'      => ['nullable', 'array'],
            'featured'          => ['boolean'],
        ];
    }
}