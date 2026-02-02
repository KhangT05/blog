<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    protected $fillable = [
        'name',
        'canonical',
        'publish',
        'description'
    ];
    public function user_role(): BelongsToMany
    {
        return $this->belongsToMany('users_roles', 'role_id', 'user_id');
    }
}
