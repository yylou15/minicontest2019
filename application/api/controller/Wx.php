<?php
/**
 * Created by PhpStorm.
 * User: lou
 * Date: 2019/3/14
 * Time: 12:20
 */

namespace app\api\controller;


use think\Config;
use think\Controller;
use think\Exception;
use think\Request;
use app\user\model\UserInfo;

class wx extends Controller
{
    public function login(Request $request){
        $code = $request->post('code');
        try{
            $openid = $this->getOpenid($code);
            if($user = UserInfo::get(['openid' => $openid])){
                return json([
                    'status' => true,
                    'uid' => $user->uid
                ]);
            }else{
                $newUser = new UserInfo([
                    'openid' => $openid
                ]);
                $newUser->save();
                return json([
                    'status' => true,
                    'uid' => $newUser->uid
                ]);
            }
        }catch (Exception $exception){
            return json([
                'status' => false,
                'message' => '网络异常！'
            ]);
        }
    }

    /*
     * 获取openid
     * */
    private function getOpenid($code)
    {
        $appid = config::get('app_id');
        $secret = config::get('secret');
        $openid = file_get_contents(
            'https://api.weixin.qq.com/sns/jscode2session?'.
            "appid=$appid&".
            "secret=$secret&".
            "js_code=$code&".
            "grant_type=authorization_code"
        );
        return json_decode($openid)->openid;
    }

}
