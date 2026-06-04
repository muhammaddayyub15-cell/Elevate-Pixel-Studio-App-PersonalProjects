<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('portfolios', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')
              ->constrained()
              ->cascadeOnDelete();
        $table->string('title');
        $table->string('slug')->unique();
        $table->string('client_name')->nullable();
        $table->string('project_url')->nullable();
        $table->string('thumbnail')->nullable();
        $table->json('gallery')->nullable();
        $table->text('short_description')->nullable();
        $table->longText('description')->nullable();
        $table->json('technologies')->nullable();
        $table->boolean('featured')->default(false);
        $table->enum('status', [
            'draft',
            'published'
            ])->default('draft');
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolios');
    }
};
