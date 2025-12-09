<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Http\Requests\App\DeleteMediaRequest;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class DeleteMediaController extends Controller
{
    //
    public function delete(DeleteMediaRequest $request) {
        $media = Media::find($request->id);

        if ($media == null) {
            return back();
        }

        $media->delete();

        return back();
    }
}
