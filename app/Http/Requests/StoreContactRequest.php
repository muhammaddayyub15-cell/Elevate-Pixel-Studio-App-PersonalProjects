<?php

namespace App\Http\Requests;
 
use Illuminate\Foundation\Http\FormRequest;
 
class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Public endpoint
    }
 
    public function rules(): array
    {
        return [
            'name'             => ['required', 'string', 'max:255'],
            'email'            => ['required', 'email', 'max:255'],
            'phone'            => ['nullable', 'string', 'max:50'],
            'service_interest' => ['nullable', 'string', 'max:255'],
            'budget'           => ['nullable', 'string', 'max:100'],
            'message'          => ['required', 'string'],
        ];
    }
 
    public function messages(): array
    {
        return [
            'name.required'    => 'Name is required.',
            'email.required'   => 'Email is required.',
            'email.email'      => 'Invalid email format.',
            'message.required' => 'Message is required.',
        ];
    }
}
