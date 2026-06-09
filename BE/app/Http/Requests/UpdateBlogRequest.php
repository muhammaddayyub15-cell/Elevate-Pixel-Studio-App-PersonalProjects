<?php

namespace App\Http\Requests;
 
use Illuminate\Foundation\Http\FormRequest;
 
class UpdateBlogRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
 
    public function rules(): array
    {
        $blogId = $this->route('id');
 
        return [
            'blog_category_id' => ['required', 'exists:blog_categories,id'],
            'title'            => ['required', 'string', 'max:255'],
            'slug'             => ['required', 'string', 'max:255', 'unique:blogs,slug,' . $blogId],
            'featured_image'   => ['nullable', 'string', 'max:255'],
            'excerpt'          => ['nullable', 'string'],
            'content'          => ['required', 'string'],
            'meta_title'       => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string'],
            'published_at'     => ['nullable', 'date'],
        ];
    }
}