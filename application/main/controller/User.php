<?php

namespace app\main\controller;

use think\Controller;
use think\Exception;
use think\exception\DbException;
use think\Request;
use app\main\model\UserInfo as UserModel;

class User extends Controller
{
    public function index(Request $request)
    {
        return;
    }

    public function getUserInfo(Request $request){
        try {
            $user = UserModel::get(['uid' => $request->get('uid')]);
            $user->departments = json($user->departments);
            return json([
                'status' => true,
                'data' => $user
            ]);
        } catch (Exception $e) {
            return json([
                'status' => false,
                'msg' => '系统异常'
            ]);
        }
    }

    public function updateUserInfo(Request $request){
        $param = $request->get();
        try {
            $user = UserModel::get(['uid' => $request->get('uid')]);
            $user->save($param);
            return json([
                'status' => true
            ]);
        } catch (Exception $e) {
            return json([
                'status' => false,
                'msg' => '系统异常'
            ]);
        }
    }


    /*
     * 部长注册账号
     * */

    public function registerAdminAccount(Request $request){

    }
}
