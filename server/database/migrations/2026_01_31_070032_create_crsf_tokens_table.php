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
        Schema::create('crsf_tokens', function (Blueprint $table) {
            $table->id();
            $table->string('crsf_token')->unique();
            $table->boolean('was_used')->default(false);
            $table->boolean('is_revoked')->default(false);
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->index(['crsf_token', 'is_revoked']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crsf_tokens');
    }
};
