<?php

namespace App\Http\Controllers;

use App\Models\PPN;
use App\Models\Spk;
use App\Models\Depo;
use App\Models\Seal;
use App\Models\Penerima;
use App\Models\Pengirim;
use App\Models\Stuffing;
use App\Models\AlihKapal;
use App\Models\BatalMuat;
use App\Models\Container;
use App\Models\Pelabuhan;
use App\Models\OngkoSupir;
use App\Models\InvoiceLoad;
use App\Models\VendorMobil;
use Illuminate\Support\Str;
use App\Models\BiayaLainnya;
use App\Models\RekeningBank;
use Illuminate\Http\Request;
use App\Models\SealContainer;
use App\Models\TypeContainer;
use App\Models\SiPdfContainer;
use Illuminate\Support\Carbon;
use App\Models\ShippingCompany;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\DetailBarangLoad;
use App\Models\OrderJobPlanload;
use App\Models\ContainerPlanload;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use PHPUnit\Framework\MockObject\Builder\InvocationMocker;

class InvoiceLoadController extends Controller
{

    public function invoice(Request $request){

        $planloads = OrderJobPlanload::orderby('created_at', 'desc')->where('status', 'Process-Load')->orWhere('status', 'Realisasi')->get();
        $containers = ContainerPlanload::all();
        $containers_group = ContainerPlanload::select('job_id', 'size', 'type', 'cargo', 'jumlah_kontainer' )->groupBy('job_id', 'size', 'type', 'cargo', 'jumlah_kontainer')->get();
        $select_company =  OrderJobPlanload::all()->unique('select_company');
        $vessel =  OrderJobPlanload::all()->unique('vessel');


        $biayas= BiayaLainnya::all();
        $alihkapal= AlihKapal::all();
        $batalmuat= BatalMuat::all();

        return view('invoice.pages.load', [

            'title'=> 'INVOICE LOAD',
            'active' => 'load',
            'loads' => $planloads,
            'containers' => $containers,
            'containers_group' => $containers_group,
            'select_company' => $select_company,
            'vessel' => $vessel,
            'biayas' => $biayas,
            'alihkapal' => $alihkapal,
            'batalmuat' => $batalmuat,


        ]);
    }

    public function create_invoice(Request $request)
    {
        $id = OrderJobPlanload::where('slug', $request->slug)->value('id');

        $activity = Stuffing::all();
        $shipping_company = ShippingCompany::all();
        $pol = Pelabuhan::all();
        $pot = Pelabuhan::all();
        $pod = Pelabuhan::all();
        $pengirim = Pengirim::all();
        $penerima = Penerima::all();
        $kontainer = Container::all();
        $lokasis = Depo::all();
        $seals = Seal::all();
        $sizes = Container::all();
        $types = TypeContainer::all();
        $danas = OngkoSupir::all();


        $containers = ContainerPlanload::where('job_id', $id)->where(function($query) {
            $query->where('status', '!=', 'Batal-Muat')
            ->where('status', '!=', 'Alih-Kapal')
            ->where('status', '!=', 'Realisasi-Alih');
        })->get();

        $sealsc = SealContainer::where('job_id', $id)->get();

        // dd($containers);

        $vendors = VendorMobil::orderBy('id', 'DESC')->get();

        $select_company = OrderJobPlanload::where('slug', $request->slug)->value('select_company');
        $pelayaran_id = ShippingCompany::where('nama_company', $select_company)->value('id');
        $spks = Spk::where('pelayaran_id', $pelayaran_id)->get();


        //
        return view('invoice.pages.load-create',[
            'title' => 'Invoice LOAD',
            'active' => 'invoice',
            'activity' => $activity,
            'shippingcompany' => $shipping_company,
            'pol' => $pol,
            'pot' => $pot,
            'pod' => $pod,
            'pengirims' => $pengirim,
            'penerimas' => $penerima,
            'kontainers' => $kontainer,
            'lokasis' => $lokasis,
            'seals' => $seals,
            'sizes' => $sizes,
            'types' => $types,
            'danas' => $danas,
            'sealsc' => $sealsc,
            'vendors' => $vendors,
            'spks' => $spks,
            'planload' => OrderJobPlanload::find($id),
            'containers' => $containers,
            'biayas' => BiayaLainnya::where('job_id', $id)->get(),
            'alihs' => AlihKapal::where('job_id', $id)->get(),
            'pdfs' => InvoiceLoad::where('job_id', $id)->get(),
            'batals' => BatalMuat::where('job_id', $id)->get(),
            'details' => DetailBarangLoad::where('job_id', $id)->get(),

        ]);
    }

    public function masukkan_invoice(Request $request)
    {

        $Container = ContainerPlanload::findOrFail($request->id);
        // $random = Str::random(15);

        $data = [

            "price_invoice" => $request->price_invoice,
            "kondisi_invoice" => $request->kondisi_invoice,
            "keterangan_invoice" => $request->keterangan_invoice,
            // 'status_invoice' => $random.time(),


        ];

        $Container->update($data);

        return response()->json(['success' => true]);

    }

    public function pdf_invoice(Request $request)
    {
        // dd($request);
        $random = Str::random(15);
        $old_slug = $request->old_slug;
        $old_id = OrderJobPlanload::where('slug', $old_slug)->value('id');
        $loads = OrderJobPlanload::where('id', $old_id)->get();

       


        $si_pdf =[
            'yth' => $request->yth,
            'km' => $request->km,
            'status' => $request->status,
            'nomor_invoice' => $nomor_invoice,
            'tahun_invoice' => $request->tahun,
            'tanggal_invoice' => $request->tanggal,
            'job_id' => $old_id,
            'container_id' => $random.time(),
            'path' => 'Invoice-'.$old_slug.'-'.$random.time(),

        ];

        $sis = InvoiceLoad::create($si_pdf);

        for ($i=0; $i < count($request->check_container) ; $i++) {
            $container = [
                'status' => "Realisasi",
            ];
            $container2 = [
                'invoice' => $sis->id,
                'status' => "Realisasi",
                'status_invoice' => $nomor_invoice,
            ];

            OrderJobPlanload::where('id', $old_id)->update($container);
            ContainerPlanload::where('id',$request->check_container[$i])->update($container2);
        }

        $checked = [];
        $containers = [];
        $get_container = [];


        for($i = 0; $i < count($request->check_container); $i++) {
            $checked[$i] =   $request->check_container[$i];
        }
        // dd($checked);

         for($j = 0; $j < count($checked); $j++) {
            $containers[$j] = [];
            $get_container[$j] = ContainerPlanload::where('id', $checked[$j])->get();
            // dd($get_container);
            for ($k=0; $k < count($get_container[$j]) ; $k++) {
                $containers[$j][$k] = ContainerPlanload::where('id',$get_container[$j][$k]->id)->get();
            }
        }



        $new_container = [];

        // dd($request->ppn);

        if((int)$request->ppn == 0) {
            $ppn = 0;
        } else {
            $ppn = PPN::first()->value('ppn');
        }

        // dd($ppn);

        if((int)$request->materai == 0) {
            $materai = 0;
        } else {
            $materai = $request->value_materai;
        }

        $total = 0;
        for($i = 0; $i < count($containers); $i++) {
            $total += (Float)$containers[$i][0][0]->price_invoice;
            $new_container[$i] = [
                'id' => $containers[$i][0][0]->id,
                'job_id' => $containers[$i][0][0]->job_id,
                'pengirim' => $containers[$i][0][0]->pengirim,
                'pod_container' => $containers[$i][0][0]->pod_container,
                'nomor_kontainer' => $containers[$i][0][0]->nomor_kontainer,
                'size' => $containers[$i][0][0]->size,
                'kondisi_invoice' => $containers[$i][0][0]->kondisi_invoice,
                'keterangan_invoice' => $containers[$i][0][0]->keterangan_invoice,
                'price_invoice' => $containers[$i][0][0]->price_invoice,
            ];
        }

        $total_with_ppn_materai = $total + round($total * ((Float)$ppn / (Float)100)) + (Float)$materai;
        // dd($new_container[0]['price_invoice']);

        $total_invoice = [
            "total" => $total_with_ppn_materai,
        ];

        InvoiceLoad::find($sis->id)->update($total_invoice);



        $rekenings = RekeningBank::orderBy('id', 'DESC')->get();


        $seal_container = [];
        $dt = Carbon::now()->isoFormat('YYYY-MMMM-DDDD-dddd-HH-mm-ss');

        $save1 = 'storage/load-invoice/Invoice-'.$old_slug.'-'.$random.time().'.pdf';

        $pdf1 = Pdf::loadview('invoice.pdf.invoice-load',[
            "loads" => $loads,
            "containers" => $new_container,
            "yth" => $request->yth,
            "nomor_invoice" => $nomor_invoice,
            "km" => $request->km,
            "report" => "MUATAN",
            "status" => $request->status,
            'rekenings' => $rekenings,
            'ppn' => round($total * ((Float)$ppn / (Float)100)),
            'persen_ppn' => $ppn,
            'materai' => $materai,
            'total' => $total_with_ppn_materai,
        ]);

        $pdf1->save($save1);
        return response()->download($save1);
    }
    public function preview_invoice(Request $request)

    {
        $id = InvoiceLoad::where('path', $request->path)->value('id');
        $job_id = InvoiceLoad::where('path', $request->path)->value('job_id');
        $pdf= InvoiceLoad::findOrFail($id);

        return view('invoice.pdf.preview-invoice-load', [
            'title' => 'Preview Invoice LOAD',
            'active' => 'Realisasi',
            'pdf' => $pdf,
            'planload' => OrderJobPlanload::find($job_id),


        ]);
    }

    public function delete_invoice(Request $request)
    {

        $job_id = InvoiceLoad::where('id',$request->id)->value('job_id');
        $nomor_invoice = InvoiceLoad::where('id',$request->id)->value('nomor_invoice');
        $pdf = InvoiceLoad::findOrFail($request->id);
        $path = InvoiceLoad::where('id',$request->id)->value('path');

        $alihorno = ContainerPlanload::where('status_invoice', $nomor_invoice)->value('harga_alih');

        if ($alihorno != null) {
            $status1 = [
                "status"=> "Alih-Kapal",
                // "status_invoice"=> null,
            ];

        } else {
            $status1 = [
                "status"=> "Process-Load",
                // "status_invoice"=> null,
            ];
        }
        Storage::delete('public/load-invoice/'.$path.'.pdf');

        $container = ContainerPlanload::where('status_invoice', $nomor_invoice)->update($status1);


        $invoice = [
            "job_id"=> null,
            "container_id"=> null,
            "tanggal_invoice"=> null,
            "path"=> null,
            "yth"=> null,
            "km"=> null,
            "status"=> null,

        ];
        $pdf->update($invoice);





        return response()->json([
            'success'   => true
        ]);

    }

    public function getPod(Request $request){
        $pod = [];

        for($i = 0; $i < count($request->pod); $i++) {
            $pod[$i] = ContainerPlanLoad::where('id', $request->pod[$i])->value('pod_container');
        }

        $pod = array_unique($pod);

        return response()->json($pod);
    }

    public function getInvoice(Request $request){
        // dd($request);
        $old_slug = $request->old_slug;

        $invoice_tahun = InvoiceLoad::where('tahun_invoice', $request->tahun)->get();

        $sum_invoice_tahun = count($invoice_tahun) + 1;

        $order_job = OrderJobPlanLoad::where('slug', $old_slug)->get();

        $pol_area_code = Pelabuhan::where('nama_pelabuhan', $order_job[0]->pol)->value('area_code');
        $vessel = $order_job[0]->vessel;
        $pod_area_code = Pelabuhan::where('nama_pelabuhan', $request->pod)->value('area_code');

        return response()->json([
            'pol' => $pol_area_code,
            'vessel' => $vessel,
            'pod' => $pod_area_code,
            'jumlah' => $sum_invoice_tahun
        ]);

    }

    public function selisih(Request $request)
    {
        $tabel_kontainer = [];
        for ($i = 0; $i < count($request->id); $i++) {
            $tabel_kontainer[$i] = InvoiceLoad::find($request->id[$i]);
        }

        $selisih = [];
        for ($i = 0; $i < count($tabel_kontainer); $i++) {
            $selisih[$i] = $tabel_kontainer[$i]->total - $tabel_kontainer[$i]->terbayar;
        }

        $total_selisih = 0;
        for ($i = 0; $i < count($selisih); $i++) {
            $total_selisih += $selisih[$i];
        }

        return response()->json($total_selisih);
    }

    public function dibayar(Request $request) {
        // dd(count($request->id));
        $container = [];
        for ($i = 0; $i < count($request->id); $i++) {
            $container[$i] = InvoiceLoad::find($request->id[$i]);
        }

        $selisih = [];
        for ($i = 0; $i < count($container); $i++) {
            $selisih[$i] = $container[$i]->total - (float)$container[$i]->terbayar;
        }

        $total_selisih = (float)$request->selisih;
        for ($i = 0; $i < count($selisih); $i++) {
            $total_selisih -= $selisih[$i];
            if ($total_selisih > 0) {
                $terbayar = (float)$container[$i]->terbayar + $selisih[$i];
                $dibayar = [
                    "terbayar" => $terbayar
                ];

                InvoiceLoad::where('id', $request->id[$i])->update($dibayar);
            } else {
                $terbayar = (float)$container[$i]->terbayar + $selisih[$i] + $total_selisih;
                $dibayar = [
                    "terbayar" => $terbayar
                ];

                InvoiceLoad::where('id', $request->id[$i])->update($dibayar);
                break;
            }
        }

        return response()->json([
            'success'   => true
        ]);
    }

}
