<?php

namespace App\Services;

use App\Repositories\BaseRepository;
use App\Trait\HasTransaction;
use Illuminate\Http\Request;

class BaseService
{
    use HasTransaction;
    protected $repository;
    public function __construct(
        BaseRepository $repository
    ) {
        $this->repository = $repository;
    }
    public function beforeSave(): self
    {
        return $this;
    }
    public function save(Request $request, int $id)
    {
        if ($id) {
            $this->repository->update($id, $request);
        } else {
            $this->repository->create($request);
        }
    }
    public function afterSave(): self
    {
        return $this;
    }
    public function handleRelation(): self
    {
        return $this;
    }
    public function baseSave()
    {
        try {
            return $this->beginTransaction()
                ->beforeSave()
                ->save()
                ->afterSave()
                ->handleRelation()
                ->commit();
        } catch (\Throwable $th) {
            $this->rollback();
            throw $th;
        }
    }
}
