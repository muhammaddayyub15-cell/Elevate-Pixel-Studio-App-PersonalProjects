<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Portfolio extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'client_name',
        'project_url',
        'thumbnail',
        'gallery',
        'short_description',
        'description',
        'technologies',
        'featured',
        'status',
    ];

    protected $casts = [
        'gallery' => 'array',
        'technologies' => 'array',
        'featured' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}