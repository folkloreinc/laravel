<?php

namespace App\Contracts\Resources;

interface Page
{
    public function handle(): ?string;

    public function title(string $locale): string;

    public function description(string $locale): string;

    public function slug(string $locale): ?string;

    public function body(string $locale): string;

    public function data(): ?array;
}
