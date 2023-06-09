<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::table('invoice_loads', function (Blueprint $table) {
            $table->string('total')->nullable()->after('km');
            $table->string('terbayar')->default('0')->after('total');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invoice_loads', function (Blueprint $table) {
            //
        });
    }
};
