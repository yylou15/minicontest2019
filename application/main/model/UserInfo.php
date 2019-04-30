<?php
/**
 * Created by PhpStorm.
 * User: lou
 * Date: 2019/3/14
 * Time: 12:38
 */

namespace app\main\model;


use think\Model;

class UserInfo extends Model
{
    protected $pk = 'uid';
//    protected $openid;
//    protected $nickname;

    public function departments(){
        return $this->hasMany('departments','creator_id');
    }
}
