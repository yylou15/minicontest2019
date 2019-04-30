<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// [ 应用入口文件 ]

// 定义应用目录
define('APP_PATH', __DIR__ . '/../application/');
//网站根目录
define('WEB_ROOT', 'http://' . $_SERVER['HTTP_HOST'].'/');
//库目录
define('LIB_RES', WEB_ROOT . 'library/');
//静态文件目录
define('STC_RES', WEB_ROOT . 'static/');
// 加载框架引导文件
require __DIR__ . '/../thinkphp/start.php';
