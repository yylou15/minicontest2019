<?php

namespace app\main\controller;

use app\main\model\Organizations;
use think\Exception;
use think\Controller;
use think\Request;
use app\main\model\Departments as DepartmentsModel;

class Departments extends Controller
{
    public function index(Request $request)
    {
        return;
    }
    public function getDepartments(Request $request){
        try {
            return json(DepartmentsModel::getDepartments($request->get('name')));
        } catch (Exception $e) {
            return json([
                'status'=>false,
                'msg'=>'系统异常'
            ]);
        }
    }

    public function getDepartmentInfo(Request $request){
        try {
            $department = DepartmentsModel::get(['did' => $request->get('did')]);
            $department->organization->school = json($department->organization->school);
            $department->organization = json($department->organization);
            return json([
                'status' => true,
                'data' => $department
            ]);
        } catch (Exception $e) {
            return json([
                'status' => false,
                'msg' => '系统异常'
            ]);
        }
    }

    public function updateDepartmentInfo(Request $request){

        $param = $request->get();
        try {
            $user = DepartmentsModel::get(['did' => $request->get('did')]);
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

    public function deleteDepartmentInfo(Request $request){
        try {
            $user = DepartmentsModel::get(['did' => $request->get('did')]);
            $user->delete();
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

    public function createDepartment(Request $request){
        $params = $request->post();
        $newDepatment = new DepartmentsModel();
        $org = Organizations::get(['name' => $params['organizationName']]);
        $orgId = $org->oid;

//        部门数量上限检查
        if(count(DepartmentsModel::all(['organization_id' => $orgId])) >= $org->max_departments_allowed){
            return json([
                'status' => false,
                'msg' => '该组织下属部门数量已达上限！'
            ]);
        }

        $newDepatment->name = $params['name'];
        $newDepatment->creator_id = $params['uid'];
        $newDepatment->organization_id = $orgId;
        $newDepatment->introduction = $params['introduction'];
        $newDepatment->planned_enroll_amount = $params['planAmount'];
        $newDepatment->requirements = $params['requirements'];

        $newDepatment->save();

        return json([
            'status' => true
        ]);
    }

}
