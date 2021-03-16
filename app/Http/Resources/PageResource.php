<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $locale = $request->locale();
        $data = $this->data();
        return [
            'id' => $this->id(),
            'type' => $this->type(),
            'title' => $this->title($locale),
            'description' => $this->description($locale),
            'slug' => $this->slug($locale),
            'url' => $this->url($locale),
            'url_locales' => collect(config('app.locales'))->mapWithKeys(function ($locale) {
                return [
                    $locale => $this->url($locale),
                ];
            }),
            'body' => $this->body($locale),
            $this->mergeWhen(!is_null($data), $data),
        ];
    }
}
