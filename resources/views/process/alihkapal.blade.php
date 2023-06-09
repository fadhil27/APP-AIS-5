@extends('layouts.main')

@section('content')
    <div class="row">

        <div class="col-12">

            <div class="portlet">
                <div class="portlet-header portlet-header-bordered">
                    <h3 class="portlet-title">{{ $title }}</h3>
                </div>
                <div class="portlet-body">
                    {{-- <div class="text-end">

                    <a href="planload/create" class="btn btn-success"> <i class="fa fa-plus"></i> Buat Job (Load)</a>
                </div> --}}
                    {{-- <p><strong>Fixed header</strong> can be initialised on a Datatable by using the <code>fixedheader</code> option in the Datatable options object.</p> --}}
                    <hr>

                    <!-- BEGIN Datatable -->
                    <div class="table-responsive">

                        <table id="planload" class="table mb-0 table-bordered table-striped table-hover autosize">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Date</th>
                                    <th>Activity</th>
                                    <th>Shipping Company</th>
                                    <th>Vessel</th>
                                    {{-- <th>POL</th>
                                <th>POT</th>
                                <th>POD</th>
                                <th>Pengirim</th>
                                <th>Penerima</th>
                                <th>Nama Barang</th> --}}
                                    <th>Jenis Container</th>
                                    <th>Size Container</th>
                                    <th>Jenis Container</th>
                                    <th>Nomor Surat</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($planloads as $planload)
                                    <tr>
                                        <td>
                                            {{ $loop->iteration }}
                                        </td>
                                        <td>
                                            {{ $planload->tanggal_planload }}
                                        </td>
                                        <td>
                                            {{ $planload->activity }}
                                        </td>
                                        <td>
                                            {{ $planload->select_company }}
                                        </td>
                                        <td>
                                            {{ $planload->vessel }}
                                        </td>
                                        {{-- <td>
                                    {{$planload->pol}}
                                </td>
                                <td>
                                    {{$planload->pot}}
                                </td>
                                <td>
                                    {{$planload->pod}}
                                </td>
                                <td>
                                    {{$planload->pengirim}}
                                </td>
                                <td>
                                    {{$planload->penerima}}
                                </td>
                                <td>
                                    {{$planload->nama_barang}}
                                </td> --}}

                                        <td align="top" valign="top">
                                            <ol type="1">
                                                @foreach ($containers as $container)
                                                    @if ($planload->id == $container->job_id)
                                                        <li>
                                                            {{ $container->kontainers->jenis_container }}
                                                        </li>
                                                    @endif
                                                @endforeach
                                            </ol>

                                        </td>
                                        <td align="top" valign="top">
                                            <ol start="1">
                                                @foreach ($containers as $container)
                                                    @if ($planload->id == $container->job_id)
                                                        <li>
                                                            {{ $container->size }}
                                                        </li>
                                                    @endif
                                                @endforeach
                                            </ol>

                                        </td>
                                        <td align="top" valign="top">
                                            <ol start="1">
                                                @foreach ($containers as $container)
                                                    @if ($planload->id == $container->job_id)
                                                        <li>
                                                            {{ $container->type }}
                                                        </li>
                                                    @endif
                                                @endforeach
                                            </ol>

                                        </td>
                                        <td align="top" valign="top">
                                            @if ($planload->status == 'Process-Load')
                                                <ol start="1">
                                                    @foreach ($containers as $container)
                                                        @if ($planload->id == $container->job_id)
                                                            <li>
                                                                {{ $container->nomor_surat }}
                                                            </li>
                                                        @endif
                                                    @endforeach

                                                </ol>
                                            @else
                                                -
                                            @endif


                                        </td>
                                        <td class="align-middle text-nowrap">
                                            @if ($planload->status == 'Process-Load')
                                            <i class="marker marker-dot text-success"></i>
                                                {{ $planload->status }}
                                            @endif
                                            @if ($planload->status == 'Plan-Load')
                                            <i class="marker marker-dot text-warning"></i>
                                                {{ $planload->status }}
                                            @endif
                                        </td>
                                        <td class="text-center text-nowrap">
                                            @if ($planload->status == 'Plan-Load')
                                            <a href="/processload-create/{{ $planload->slug }}"
                                                class="btn btn-label-success rounded-pill">Process Load <i
                                                    class="fa fa-pencil"></i>

                                            </a>
                                            @else
                                            <button disabled @readonly(true)
                                                class="btn btn-label-secondary rounded-pill">Process Load <i
                                                    class="fa fa-pencil"></i>

                                            </button>


                                            @endif
                                        </td>

                                        {{-- <button onclick="deletePlanload(this)" value="{{$planload->slug}}" type="button" class="btn btn-label-danger btn-icon btn-circle btn-sm"><i
                                    class="fa fa-trash"></i></button></td> --}}

                                    </tr>
                                @endforeach


                            </tbody>
                        </table>
                    </div>
                    <!-- END Datatable -->
                </div>
            </div>

            <!-- END Portlet -->
            <!-- BEGIN Portlet -->

            <!-- END Portlet -->
        </div>

    </div>
@endsection
