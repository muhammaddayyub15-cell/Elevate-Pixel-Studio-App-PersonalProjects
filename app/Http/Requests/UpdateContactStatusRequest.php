<?php

namespace App\Http\Requests;
 
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
 
class UpdateContactStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
 
    public function rules(): array
    {
        return [
            // Status hanya boleh salah satu dari tiga nilai ini
            'status' => ['required', Rule::in(['new', 'contacted', 'closed'])],
        ];
    }
}
 