<?php

namespace app\main\controller;

use think\Controller;
use think\Request;
use app\main\model\Schools as SchoolsModel;

class Schools extends Controller
{
    public function getSchools(Request $request)
    {
        return json(SchoolsModel::getSchools($request->get('name')));
    }
}
