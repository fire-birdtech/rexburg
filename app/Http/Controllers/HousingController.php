<?php

namespace App\Http\Controllers;

use App\Models\Housing;
use Illuminate\Http\Request;

class HousingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'housing_type' => 'required',
        ]);

        Housing::create($request->all());

        return redirect()->route('admin.housing.index');
    }
}
