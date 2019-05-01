<?php
/**
 * Created by PhpStorm.
 * User: lou
 * Date: 2019/5/1
 * Time: 12:04
 */

namespace app\api\controller;
use app\main\model\Organizations;
use OSS\OssClient;
use OSS\Core\OssException;
use think\Controller;
use think\Exception;
use think\Request;

class Alioss extends Controller
{
    public function uploadPostImage(Request $request){
        $organizationId = $request->post('organizationId');
        // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录 https://ram.console.aliyun.com 创建RAM账号。
        $accessKeyId = "LTAIC4OFgFvDIPqR";
        $accessKeySecret = "guB0TTfmQTwdZODSzd9tsKP3ktklLD";
// Endpoint以杭州为例，其它Region请按实际情况填写。
        $endpoint = "http://oss-cn-hangzhou.aliyuncs.com";
// 存储空间名称
        $bucket= "mini2019";
// 文件名称
        $object = $organizationId.'.jpg';
// <yourLocalFile>由本地文件路径加文件名包括后缀组成，例如/users/local/myfile.txt
        $filePath = request()->file('postImage')->getPathname();

        try{
            $organization = Organizations::get(['oid' => $organizationId]);
            if (!$organization)
                return json([
                    'status' => false,
                    'msg' => '参数错误'
                ]);

            $ossClient = new OssClient($accessKeyId, $accessKeySecret, $endpoint);
            $ossClient->uploadFile($bucket, $object, $filePath);
            $organization->save(['post_url' => "https://mini2019.oss-cn-hangzhou.aliyuncs.com/$organizationId.jpg"]);
            return json([
                'status' => true
            ]);
        } catch(Exception $e) {
            return json([
                'status' => false,
                'msg' => '系统异常'
            ]);
        } catch (OssException $e) {
            return json([
                'status' => false,
                'msg' => '图片服务器系统异常'
            ]);
        }
    }
}
