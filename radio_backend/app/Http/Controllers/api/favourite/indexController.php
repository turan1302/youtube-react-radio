<?php

namespace App\Http\Controllers\api\favourite;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\FavouriteModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $client = $request->user();

        $radios = FavouriteModel::leftJoin("radios","radios.rd_id","=","favourites.fw_radio")
            ->where("favourites.fw_user",$client->id)
            ->get();

        return parent::succes("Favori Radyo Listesi Getirildi",$radios);
    }

    public function remove_favourite(Request $request)
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
        }
    }
}
