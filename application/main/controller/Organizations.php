<?php

namespace app\main\controller;

use think\Controller;
use think\Request;
use app\main\model\Organizations as OrganizationModel;

class Organizations extends Controller
{
    public function index(Request $request)
    {

    }

    public function getOrganization(Request $request){
        $organization = OrganizationModel::get(1);
        return json($organization);
    }

}
