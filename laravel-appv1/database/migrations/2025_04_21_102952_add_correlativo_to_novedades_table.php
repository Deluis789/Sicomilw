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
        Schema::table('novedades', function (Blueprint $table) {
            $table->integer('correlativo')->nullable();
            $table->string('nrocorre', 10)->nullable(); // También agregas esta si tampoco existe
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('novedades', function (Blueprint $table) {
            $table->dropColumn('correlativo');
            $table->dropColumn('nrocorre');
        });
    }
};
