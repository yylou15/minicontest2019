<?php
/**
 * Created by PhpStorm.
 * User: lou
 * Date: 2019/4/10
 * Time: 0:09
 */

namespace app\main\model;


use think\Model;

class Organizations extends Model
{
    protected $pk = 'oid';

    public function school(){
        return $this->belongsTo('schools','school_id');
    }
}
