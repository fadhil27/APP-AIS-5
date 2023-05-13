<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\PlanLoadController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\DepoController;
use App\Http\Controllers\PlanDischargeController;
use App\Http\Controllers\ProcessLoadController;
use App\Http\Controllers\SealController;
use App\Http\Controllers\PelabuhanController;
use App\Http\Controllers\PengirimController;
use App\Http\Controllers\PenerimaController;
use App\Http\Controllers\BiayaController;
use App\Http\Controllers\TruckingController;
use App\Http\Controllers\ContainerController;
use App\Http\Controllers\StuffingController;
use App\Http\Controllers\StrippingController;
use App\Http\Controllers\AlihKapalController;
use App\Http\Controllers\TypeContainerController;
use App\Http\Controllers\RealisasiLoadController;
use App\Http\Controllers\PdfController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//DATA
Route::get('/', [DataController::class, 'index']);
Route::get('/data', [DataController::class, 'index']);

Route::post('/shipping-company', [ShippingController::class, 'store']);
Route::get('/company/{id}/edit', [ShippingController::class, 'edit']);
Route::put('/company/{id}', [ShippingController::class, 'update']);
Route::delete('/company/{id}', [ShippingController::class, 'destroy']);


Route::post('/add-depo', [DepoController::class, 'store']);
Route::get('/depo/{id}/edit', [DepoController::class, 'edit']);
Route::put('/depo/{id}', [DepoController::class, 'update']);
Route::delete('/depo/{id}', [DepoController::class, 'destroy']);

Route::post('/add-pelabuhan', [PelabuhanController::class, 'store']);
Route::get('/pelabuhan/{id}/edit', [PelabuhanController::class, 'edit']);
Route::put('/pelabuhan/{id}', [PelabuhanController::class, 'update']);
Route::delete('/pelabuhan/{id}', [PelabuhanController::class, 'destroy']);


Route::post('/add-pengirim', [PengirimController::class, 'store']);
Route::get('/pengirim/{id}/edit', [PengirimController::class, 'edit']);
Route::put('/pengirim/{id}', [PengirimController::class, 'update']);
Route::delete('/pengirim/{id}', [PengirimController::class, 'destroy']);

Route::post('/add-penerima', [PenerimaController::class, 'store']);
Route::get('/penerima/{id}/edit', [PenerimaController::class, 'edit']);
Route::put('/penerima/{id}', [PenerimaController::class, 'update']);
Route::delete('/penerima/{id}', [PenerimaController::class, 'destroy']);


Route::post('/add-biaya', [BiayaController::class, 'store']);
Route::get('/biaya/{id}/edit', [BiayaController::class, 'edit']);
Route::put('/biaya/{id}', [BiayaController::class, 'update']);
Route::delete('/biaya/{id}', [BiayaController::class, 'destroy']);

Route::post('/add-type', [TypeContainerController::class, 'store']);
Route::get('/type/{id}/edit', [TypeContainerController::class, 'edit']);
Route::put('/type/{id}', [TypeContainerController::class, 'update']);
Route::delete('/type/{id}', [TypeContainerController::class, 'destroy']);

Route::post('/add-container', [ContainerController::class, 'store']);
Route::get('/container/{id}/edit', [ContainerController::class, 'edit']);
Route::put('/container/{id}', [ContainerController::class, 'update']);
Route::delete('/container/{id}', [ContainerController::class, 'destroy']);

Route::post('/add-stuffing', [StuffingController::class, 'store']);
Route::get('/stuffing/{id}/edit', [StuffingController::class, 'edit']);
Route::put('/stuffing/{id}', [StuffingController::class, 'update']);
Route::delete('/stuffing/{id}', [StuffingController::class, 'destroy']);

Route::post('/add-stripping', [StrippingController::class, 'store']);
Route::get('/stripping/{id}/edit', [StrippingController::class, 'edit']);
Route::put('/stripping/{id}', [StrippingController::class, 'update']);
Route::delete('/stripping/{id}', [StrippingController::class, 'destroy']);

//ACTIVITY

//plan
Route::get('/planload', [PlanLoadController::class, 'index']);
Route::get('/planload/create', [PlanLoadController::class, 'create']);
Route::get('/planload-edit/{slug}', [PlanLoadController::class, 'edit']);
Route::post('/create-job-planload', [PlanLoadController::class, 'create_job_planload']);
Route::post('/update-job-planload', [PlanLoadController::class, 'update']);

Route::post('/getJenisKontainer', [PlanLoadController::class, 'getJenisKontainer']);
Route::post('/getSizeTypeContainer', [PlanLoadController::class, 'getSizeTypeContainer']);


Route::get('/plandischarge', [PlanDischargeController::class, 'index']);
Route::get('/plandischarge/create', [PlanDischargeController::class, 'create']);
Route::post('/create-job-plandischarge', [PlanDischargeController::class, 'create_job_plandischarge']);
Route::get('/processdischarge', [PlanDischargeController::class, 'process']);
Route::get('/processdischarge-create/{slug}', [PlanDischargeController::class, 'create_process']);
Route::post('/create-job-processdischarge', [PlanDischargeController::class, 'store_process']);
Route::get('/realisasi-discharge', [PlanDischargeController::class, 'realisasi']);
Route::get('/realisasi-discharge-create/{slug}', [PlanDischargeController::class, 'realisasi_create']);
Route::post('/getNoSurat-discharge', [PlanDischargeController::class, 'getNoSurat_discharge']);
Route::post('/getBiayaLain-discharge', [PlanDischargeController::class, 'getBiayaLain']);
Route::post('/getSealProcessDischarge', [PlanDischargeController::class, 'getSealProcessLoad']);
Route::post('/getNoContainer-discharge', [PlanDischargeController::class, 'getNoContainer']);

//process
Route::get('/processload-create/{slug}', [ProcessLoadController::class, 'create']);
Route::get('/processload', [ProcessLoadController::class, 'index']);
Route::post('/create-job-processload', [ProcessLoadController::class, 'store']);
Route::post('/getBiayaLain', [ProcessLoadController::class, 'getBiayaLain']);
Route::post('/getNoSurat', [ProcessLoadController::class, 'getNoSurat']);
Route::post('/getSealProcessLoad', [ProcessLoadController::class, 'getSealProcessLoad']);
Route::post('/getNoContainer', [ProcessLoadController::class, 'getNoContainer']);
Route::post('/getpelayaran', [ProcessLoadController::class, 'getpelayaran']);



//realisasi
Route::get('/realisasi-load', [RealisasiLoadController::class, 'index']);
Route::get('/realisasi-load-create/{slug}', [RealisasiLoadController::class, 'create']);
Route::post('/create-si-container', [PdfController::class, 'create_si']);
Route::get('/invoice-load/{slug}', [PdfController::class, 'invoice_load']);
Route::post('/create-si-discharge', [PdfController::class, 'si_discharge']);


//ALih Kapal
Route::get('/alih-kapal', [AlihKapalController::class, 'index']);
Route::get('/batal-muat', [AlihKapalController::class, 'index']);


//seal
Route::get('/seal', [SealController::class, 'index']);
Route::post('/tambah-seal', [SealController::class, 'store']);
Route::post('/getSeal', [SealController::class, 'getSeal']);
Route::post('/getCodeSeal', [SealController::class, 'getCodeSeal']);
Route::post('/getKodeSeal', [SealController::class, 'getKodeSeal']);

//TRUCKING
Route::get('/truckingplan', [TruckingController::class, 'index']);
Route::get('/truckingplan/create', [TruckingController::class, 'create']);
Route::post('/create-job-truckingplan', [TruckingController::class, 'create_job_plandischarge']);
Route::get('/truckingprocess', [TruckingController::class, 'process']);
Route::get('/truckingprocess-create/{slug}', [TruckingController::class, 'create_process']);
Route::post('/create-job-truckingprocess', [TruckingController::class, 'store_process']);
Route::get('/realisasi-trucking', [TruckingController::class, 'realisasi']);
Route::get('/realisasi-trucking-create/{slug}', [TruckingController::class, 'realisasi_create']);
Route::post('/getNoSurat-trucking', [TruckingController::class, 'getNoSurat_discharge']);
Route::post('/getBiayaLain-trucking', [TruckingController::class, 'getBiayaLain']);
Route::post('/getSealProcessTrucking', [TruckingController::class, 'getSealProcessLoad']);
Route::post('/getNoContainer-trucking', [TruckingController::class, 'getNoContainer']);
