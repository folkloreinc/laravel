@servers(['prod' => ['prod'], 'localhost' => 'localhost'])

@setup
    $gitRemote = trim(shell_exec('git remote get-url origin'));

    $server = 'prod';

    $version = \Carbon\Carbon::now()->format('Y-m-d-H-i-s');

    $wwwPath = '/var/www';

    $devBranch = 'develop';
    $devPath = $wwwPath.'/site';

    $prodBranch = 'master';
    $prodPath = $wwwPath.'/site';

    $staticPaths = [
        'public/static/',
        'resources/views/assets.blade.php',
    ];
@endsetup

@story('deploy')
    build
    sync-static-dev
    deploy-site-dev
@endstory

@story('deploy-all')
    build
    sync-static-dev
    deploy-site-dev
    sync-static-prod
    deploy-site-prod
@endstory

@story('deploy-dev')
    build
    sync-static-dev
    deploy-site-dev
@endstory

@story('deploy-prod', ['confirm' => true])
    build
    sync-static-prod
    deploy-site-prod
@endstory

@story('install')
    clone-dev
    permissions-dev
    bootstrap-dev
@endstory

@story('install-dev')
    clone-dev
    permissions-dev
    bootstrap-dev
@endstory

@task('clone-dev', ['on' => 'prod'])
    git clone {{ $gitRemote }} {{ $devPath }}
    cd {{ $devPath }}
    git checkout {{ $devBranch }}
@endtask

@task('permissions-dev', ['on' => 'prod'])
    cd {{ $devPath }}
    sudo chown -R $USER:www-data .
    sudo find . -type f -exec chmod 664 {} \;
    sudo find . -type d -exec chmod 775 {} \;
    sudo chgrp -R www-data storage bootstrap/cache
    sudo chmod -R ug+rwx storage bootstrap/cache
@endtask

@task('bootstrap-dev', ['on' => 'prod'])
    cd {{ $devPath }}
    git checkout {{ $devBranch }}
    cp .env.dev .env
    composer install
    php artisan key:generate
@endtask

@task('build', ['on' => 'localhost'])
    npm run build
@endtask

@task('sync-static-dev', ['on' => 'localhost'])
    @foreach ($staticPaths as $path)
        rsync -avh --delete -e ssh ./{{ ltrim($path, '/') }} {{$server}}:{{ rtrim($devPath, '/') }}/{{ ltrim($path, '/') }}
    @endforeach
@endtask

@task('deploy-site-dev', ['on' => 'prod'])
    cd {{ $devPath }}
    git checkout {{ $devBranch }}
    git pull origin {{ $devBranch }}
    cp resources/assets/robots.dev.txt public/robots.txt
    composer install
    sed -i 's/APP_VERSION=.*/APP_VERSION={{ $version }}/g' .env
    php artisan migrate --force
    php artisan db:seed --force
    php artisan cache:clear
    php artisan queue:restart
@endtask

@task('sync-static-prod', ['on' => 'localhost'])
    @foreach ($staticPaths as $path)
        rsync -avh --delete -e ssh ./{{ ltrim($path, '/') }} {{$server}}:{{ rtrim($prodPath, '/') }}/{{ ltrim($path, '/') }}
    @endforeach
@endtask

@task('deploy-site-prod', ['on' => 'prod'])
    cd {{ $prodPath }}
    git checkout {{ $prodBranch }}
    git pull origin {{ $prodBranch }}
    cp resources/assets/robots.txt public/robots.txt
    composer install
    sed -i 's/APP_VERSION=.*/APP_VERSION={{ $version }}/g' .env
    php artisan migrate --force
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    php artisan site:cache
    php artisan queue:restart
@endtask
