<?php

namespace CodeBoard\Base;

interface InterfaceOperateEntity{

	public function insert($insParams);

	public function delete($delParams);

	public function update($updParams, $selParams);

	public function select($id);

	public function selectAll();

	public function selectBy($condition);

}