<?php

namespace CodeBoard\Model;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use CodeBoard\Base\AbstractBaseModel;


class LanguageModel extends AbstractBaseModel{

    /**
    *   inherit
    */
    public function selectAll(){
        $statement = $this->db->prepare('SELECT * FROM code_language ORDER BY code_language.order DESC');
        $statement->execute();
        $languages = $statement->fetchAll();

        return $languages;  
    }

    /**
    *   inherit
    */
    public function selectBy($condition){}

}