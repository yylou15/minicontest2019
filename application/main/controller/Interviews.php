<?php

namespace app\main\controller;

use think\Controller;
use think\Request;
use app\main\model\Interviews as InterviewsModel;

class Interviews extends Controller
{
    public function getInterviews(Request $request)
    {
        return json(InterviewsModel::all());
    }

    public function createInterview(Request $request){

    }
}
