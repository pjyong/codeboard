<?php

namespace CodeBoard\Base;

use Doctrine\DBAL\Connection;

abstract class AbstractBaseModel implements InterfaceOperateEntity
{
    // abstract public function getTableName();

    public $db;

    public function __construct(Connection $db = null)
    {
        $this->db = $db;
    }

    public function insert($insParams){}

	public function delete($delParams){}

	public function update($updParams, $selParams){}

	public function select($id){}

	public function selectAll(){}

	public function selectBy($condition){}

}