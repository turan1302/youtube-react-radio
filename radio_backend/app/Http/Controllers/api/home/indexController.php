<?php

namespace App\Http\Controllers\api\home;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\FavouriteModel;
use App\Models\RadioModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $client = $request->user();
        $radio = RadioModel::get()->map(function ($item) use ($client){
            $item['isFavourite'] = FavouriteModel::where([
                ["fw_radio","=",$item->rd_id],
                ["fw_user","=",$client->id]
            ])->count();

            return $item;
        });

        return parent::succes("Radyo listesi getirildi",$radio);
    }

    public function set_favourite(Request $request)
    {
        $client = $request->user();
        $data = $request->except("_token");

        $control = FavouriteModel::where([
            ["fw_user","=",$client->id],
            ["fw_radio","=",$data['fw_radio']],
        ])->first();

        if ($control){
            FavouriteModel::where([
                ["fw_user","=",$client->id],
                ["fw_radio","=",$data['fw_radio']],
            ])->delete();
        }else{
            FavouriteModel::create([
                "fw_user" => $client->id,
                "fw_radio" => $data['fw_radio']
            ]);
        }
    }
}
