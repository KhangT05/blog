<?php

namespace App\Services;

use App\Repositories\BaseRepository;
use App\Trait\HasQuery;
use App\Trait\HasTransaction;
use Illuminate\Http\Request;

abstract class BaseService
{
    use HasTransaction, HasQuery;
    protected $repository;
    protected $modelData;
    protected $result;
    public function __construct(
        BaseRepository $repository
    ) {
        $this->repository = $repository;
    }
    abstract protected function perpageModelData(Request $request): self;
    public function baseSave(Request $request, ?int $id = 0)
    {
        try {
            dd($this->repository->getFillable());
            return $this
                ->beginTransaction()
                ->perpageModelData($request)
                ->beforeSave()
                ->save($id)
                ->afterSave()
                ->handleRelation()
                ->commit()
                ->getResult();
        } catch (\Throwable $th) {
            $this->rollback();
            throw $th;
        }
    }
    public function show(int $id = 0)
    {
        $this->checkExistsModel($id);
        $dd = $this->repository->findByid($id);
        return $dd;
    }
}
