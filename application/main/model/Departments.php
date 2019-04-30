<?php
/**
 * Created by PhpStorm.
 * User: lou
 * Date: 2019/4/9
 * Time: 23:59
 */

namespace app\main\model;


use think\Model;

class Departments extends Model
{
    protected $pk = 'did';

    public function organization()
    {
        return $this->belongsTo('Organizations','organization_id');
    }

    public static function getDepartments($keyword){
        $tmp = new Departments();
        return $tmp->table('departments')->where('name','like',"%$keyword%")->select();
    }
}
