<?php

namespace CodeBoard\Model;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use CodeBoard\Base\AbstractBaseModel;



class CodeModel extends AbstractBaseModel{

	/**
	*	inherit
	*/
	public function insert($insParams){
        // print_r($insParams);
		$this->db->insert('code', $insParams);
        return $this->db->lastInsertId();
	}

	/**
	*	inherit
	*/
	public function delete($delParams){
		$this->db->delete('code', $delParams);
	}

	/**
	*	inherit
	*/
	public function update($updParams, $selParams){
		$this->db->update('code', $updParams, $selParams);
	}

	/**
	*	inherit
	*/
	public function select($id){
		$statement = $this->db->prepare('SELECT * FROM code WHERE id= :id');
		$statement->bindValue('id', $id);
		$statement->execute();
		$code = $statement->fetch();

		return $code;
	}

	/**
	*	inherit
	*/
	public function selectAll(){
		$statement = $this->db->prepare("SELECT * FROM code");
		$statement->execute();
		$codes = $statement->fetchAll();

		return $codes;	
	}

	public function returnCountByKeyCode($keycode){
		$statement = $this->db->prepare("SELECT count(*) AS total FROM code WHERE code.keycode= :keycode");
		$statement->bindValue('keycode', $keycode, 'string');
		$statement->execute();
		$count = $statement->fetch();

		return $count['total'];	
	}

	public function selectByKeyCode($keycode, $offset = 0, $count = 10){
		$offsetStart = $offset * $count;
		$statement = $this->db->prepare("SELECT * FROM code WHERE code.keycode= ? ORDER BY created DESC LIMIT ?,?");
		$statement->bindValue(1, $keycode, 'string');
		$statement->bindValue(2, $offsetStart, 'integer');
		$statement->bindValue(3, $count, 'integer');
		$statement->execute();
		$codes = $statement->fetchAll();

		return $codes;	
	}
	public function selectByKeyWord($keyword, $offset = 0, $count = 10){
		$offsetStart = $offset * $count;
		$statement = $this->db->prepare("SELECT * FROM code WHERE code.fragment LIKE ? ORDER BY created DESC LIMIT ?,?");
		$statement->bindValue(1, '%' . $keyword . '%', 'string');
		$statement->bindValue(2, $offsetStart, 'integer');
		$statement->bindValue(3, $count, 'integer');
		$statement->execute();
		$codes = $statement->fetchAll();

		return $codes;	
	}

	/**
	*	inherit
	*/
	public function selectBy($condition){

	}

	// get codes by date
	public function seleteByDate($date, $offset = 0, $count = 10){
		$time = strtotime($date);
		$lastDayOfMonth = date('t', $time);
		$start_time = date('Y-m-1 ', $time) . '00:00:00';
		$end_time = date("Y-m-$lastDayOfMonth ", $time) . '23:59:59';
        $offsetStart = $offset * $count;
		$statement = $this->db->prepare('SELECT * FROM code WHERE created >= ? AND created <= ? ORDER BY created DESC LIMIT ?,?');
        // why i can't use datetime
		$statement->bindValue(1, $start_time);
		$statement->bindValue(2, $end_time);
        $statement->bindValue(3, $offsetStart, 'integer');
        $statement->bindValue(4, $count, 'integer');
		$statement->execute();
		$codes = $statement->fetchAll();

		return $codes;
	}

	// get codes by page
	public function selectByPage($offset = 0, $count = 10){
		$offsetStart = $offset * $count;
		$statement = $this->db->prepare("SELECT * FROM code ORDER BY created DESC LIMIT :offsetStart,:count");
		$statement->bindValue(':offsetStart', $offsetStart, 'integer');
		$statement->bindValue(':count', $count, 'integer');
		$statement->execute();
		$codes = $statement->fetchAll();

		return $codes;	
	}


	// get eariest date of posted codes
	public function getEariestDate(){
        $statement = $this->db->prepare("SELECT created FROM code ORDER BY created ASC LIMIT 1");
        $statement->execute();
        $code = $statement->fetch();

        return $code;
	}

    public function generateStatistic(){
        // get current time
        $currentTime = date('Y-m-d H:i:s', time());
        // get the begin time
        $beginTodayTime = date('Y-m-d 00:00:00', time());
        // get this week begin time
        $beginWeekTime = date('Y-m-d 00:00:00', mktime(0,0,0,date('m'),date('d')-date("w", time())+1,date('Y')));
        // get this month begin time
        $beginMonthTime = date('Y-m-d 00:00:00', mktime(0,0,0,date('m'),1,date('Y')));
        // get this year begin time
        $beginYearTime = date('Y-m-d 00:00:00', mktime(0,0,0,1,1,date('Y')));
        $statistic = array();
        $statement = $this->db->prepare('SELECT count(*) as total FROM code WHERE created >= ? AND created <= ?');
        $statement->bindValue(1, $beginTodayTime);
        $statement->bindValue(2, $currentTime);
        $statement->execute();
        $result = $statement->fetch();
        $statistic['today'] = $result['total'];
        $statement->bindValue(1, $beginWeekTime);
        $statement->bindValue(2, $currentTime);
        $statement->execute();
        $result = $statement->fetch();
        $statistic['week'] = $result['total'];
        $statement->bindValue(1, $beginMonthTime);
        $statement->bindValue(2, $currentTime);
        $statement->execute();
        $result = $statement->fetch();
        $statistic['month'] = $result['total'];
        $statement->bindValue(1, $beginYearTime);
        $statement->bindValue(2, $currentTime);
        $statement->execute();
        $result = $statement->fetch();
        $statistic['year'] = $result['total'];

        return $statistic;
    }
}