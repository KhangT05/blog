<?php

namespace App\Trait;

use Illuminate\Support\Facades\DB;

trait HasTransaction
{
    public function beginTransaction(): self
    {
        DB::beginTransaction();
        return $this;
    }
    public function commit(): self
    {
        DB::commit();
        return $this;
    }
    public function rollback()
    {
        DB::rollBack();
    }
}
