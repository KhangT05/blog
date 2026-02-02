<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CrsfToken extends Model
{
    protected $fillable = [
        'crsf_token',
        'is_revoked',
        'was_used',
        'user_id'
    ];
}
