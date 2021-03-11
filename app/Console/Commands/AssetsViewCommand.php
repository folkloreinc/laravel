<?php

namespace App\Console\Commands;

use Illuminate\Filesystem\Filesystem;
use Illuminate\Console\Command;
use Illuminate\Contracts\View\Factory as FactoryContract;

class AssetsViewCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'assets:view {--output_path=assets.blade.php}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate a view from commands';

    /**
     * The filesystem instance.
     *
     * @var \Illuminate\Filesystem\Filesystem
     */
    protected $files;

    /**
     * The view factory
     *
     * @var \Illuminate\Contracts\View\Factory
     */
    protected $view;

    /**
     * Create a new controller creator command instance.
     *
     * @param  \Illuminate\Filesystem\Filesystem  $files
     * @param  \Illuminate\Contracts\View\Factory  $files
     * @return void
     */
    public function __construct(Filesystem $files, FactoryContract $view)
    {
        parent::__construct();

        $this->files = $files;
        $this->view = $view;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $assetManifest = public_path('asset-manifest.json');
        $stubPath = __DIR__.'/stubs/assets.blade.php';
        $outputPath = resource_path('views/'.$this->option('output_path'));
        $manifest = json_decode($this->files->get($assetManifest), true);
        $view = $this->view->file($stubPath, $manifest);
        $this->files->put($outputPath, $view->render());
    }
}
