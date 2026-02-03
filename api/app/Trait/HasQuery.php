<?php

namespace App\Trait;

use Illuminate\Database\Eloquent\ModelNotFoundException;

trait HasQuery
{
    public function checkExistsModel(int $id = 0): self
    {
        $model = $this->repository->findByid($id);
        if (!$model) {
            dd($this->repository->findByid($id));
            throw new ModelNotFoundException('Không tồn tại record này');
        }
        return $this;
    }
    protected function beforeSave(): self
    {
        return $this;
    }
    protected function save(?int $id)
    {
        $this->model = ($id) ?
            $this->repository->update($id, $this->modelData) :
            $this->repository->create($this->modelData);
        return $this;
    }
    protected function afterSave(): self
    {
        return $this;
    }
    protected function handleRelation(): self
    {
        return $this;
    }
    protected function getResult()
    {
        // if($this->result instanceof Model){
        //     return $this->getResource(new)
        // }
        return $this->result;
    }
}
