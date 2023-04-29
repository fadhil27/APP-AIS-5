<?php

namespace App\Http\Controllers;

use App\Models\PlanLoad;
use Illuminate\Http\Request;
use App\Models\Stuffing;
use App\Models\ShippingCompany;
use App\Models\Pelabuhan;
use App\Models\Pengirim;
use App\Models\Penerima;
use App\Models\OrderJobPlanload;
use App\Models\Container;
use App\Models\ContainerPlanload;
use App\Http\Requests\StorePlanLoadRequest;
use App\Http\Requests\UpdatePlanLoadRequest;
use Illuminate\Support\Str;


class PlanLoadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $planloads = OrderJobPlanload::all();
        return view('plan.planload', [
            'title' => 'Plan Load',
            'planloads' => $planloads,

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $activity = Stuffing::all();
        $shipping_company = ShippingCompany::all();
        $pol = Pelabuhan::all();
        $pot = Pelabuhan::all();
        $pod = Pelabuhan::all();
        $pengirim = Pengirim::all();
        $penerima = Penerima::all();
        $kontainer = Container::all();
        // dd($activity);
        return view('plan.planload-create', [
            'title' => 'Buat Job Order Plan Load',
            'activity' => $activity,
            'shippingcompany' => $shipping_company,
            'pol' => $pol,
            'pot' => $pot,
            'pod' => $pod,
            'pengirim' => $pengirim,
            'penerima' => $penerima,
            'kontainer' => $kontainer,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function create_job_planload(Request $request)
    {
        //
        $random = Str::random(15);

        $company = $request->select_company;
        $company = str_replace('.', '_', $company);
        $company = str_replace('/','-', $company);
        $company = str_replace(' ','-', $company);

        $vessel = $request->vessel;
        $vessel = str_replace('.', '_', $vessel);
        $vessel = str_replace('/','-', $vessel);
        $vessel = str_replace(' ','-', $vessel);

        $slug = $company.'-'.$vessel.'-'.$request->tanggal_planload.'-'.$random;

        $orderJob = [
            'tanggal_planload' => $request->tanggal_planload,
            'activity' => $request->activity,
            'select_company' => $request->select_company,
            'vessel' => $request->vessel,
            'pol' => $request->pol,
            'pot' => $request->pot,
            'pod' => $request->pod,
            'pengirim' => $request->pengirim,
            'penerima' => $request->penerima,
            'nama_barang' => $request->nama_barang,
            'slug' => $slug,
        ];

        OrderJobPlanload::create($orderJob);

        $id = OrderJobPlanload::where('slug', $slug)->value('id');

        $job_id = [];

        $tambah = $request->tambah;
        for ($i = 0; $i < $tambah; $i++) {
            $job_id[$i] = $id;
        }

        for ($j = 0; $j < $tambah; $j++) {
            $container = [
                'job_id' => $job_id[$j],
                'kontainer' => $request->kontainer[$j],
                'size' => $request->size[$j],
                'type' => $request->type[$j],
                // 'sub_deskripsi_id' => $sub_deskripsi_id[$j],
            ];
            ContainerPlanload::create($container);
        }

        return response()->json(['success' => true]);



    }

    /**
     * Display the specified resource.
     */
    public function show(PlanLoad $planLoad)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PlanLoad $planLoad)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlanLoadRequest $request, PlanLoad $planLoad)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PlanLoad $planLoad)
    {
        //
    }

    public function getJenisKontainer()
    {
        $kontainer = Container::all();
        return response()->json($kontainer);
    }

    public function getSizeTypeContainer(Request $request)
    {
        $id_container = (int)$request->post('id_container');
        $sizetype = Container::select('size_container', 'type_container')->where('id', $id_container)->get();
        return response()->json($sizetype);
    }
}