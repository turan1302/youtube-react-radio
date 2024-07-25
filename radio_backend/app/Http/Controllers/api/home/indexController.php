<?php

namespace App\Http\Controllers\api\home;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\RadioModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $client = $request->user();
        $radio = RadioModel::all();

        return parent::succes("Radyo listesi getirildi",$radio);
    }
}
