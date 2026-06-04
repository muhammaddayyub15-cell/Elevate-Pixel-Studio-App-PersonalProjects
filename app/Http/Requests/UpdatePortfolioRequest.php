<?php

namespace App\Http\Requests;
 
use Illuminate\Foundation\Http\FormRequest;
 
class UpdatePortfolioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
 
    public function rules(): array
    {
        $portfolioId = $this->route('id'); // Ambil ID dari route parameter
 
        return [
            'title'             => ['required', 'string', 'max:255'],
            'slug'              => ['required', 'string', 'max:255', 'unique:portfolios,slug,' . $portfolioId],
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