<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RefreshToken extends Model
{
    protected $fillable = [
        'refresh_token',
        'expires_at',
        'is_revoked',
        'was_used',
        'user_id'
    ];
}
