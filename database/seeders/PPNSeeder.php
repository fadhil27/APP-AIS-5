<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PPN;


class PPNSeeder extends Seeder
{
    /**
     * Run the da
     * tabase seeds.
     */
    public function run(): void
    {
        //
        PPN::create([
            'ppn' => 11,
        ]);
    }
}
