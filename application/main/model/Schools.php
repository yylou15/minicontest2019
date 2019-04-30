<?php
/**
 * Created by PhpStorm.
 * User: lou
 * Date: 2019/3/18
 * Time: 8:16
 */

namespace app\main\model;


use think\Model;

class Schools extends Model
{
    protected $pk = 'sid';

    public static function getSchools($keyword){
        $tmp = new Schools();
        return $tmp->table('schools')->where('school_name','like',"%$keyword%")->order('priority')->select();
    }
}
