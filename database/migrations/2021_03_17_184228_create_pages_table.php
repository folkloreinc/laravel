<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pages', function (Blueprint $table) {
            $locales = config('app.locales');
            $table->id();
            $table
                ->string('handle')
                ->default(null)
                ->nullable()
                ->index();
            $table
                ->string('type')
                ->default('page')
                ->nullable();

            foreach ($locales as $locale) {
                $table
                    ->string('slug_' . $locale)
                    ->nullable()
                    ->index();
            }

            $table->longText('data')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pages');
    }
}
