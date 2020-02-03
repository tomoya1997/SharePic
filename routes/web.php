<?php

// anyというパスパラメーターを取得|?はあってもなくてもいいnullable|whereで正規表現
Route::get('/{any?}', fn() => view('index'))->where('any', '.+');

// 写真ダウンロード
Route::get('/photos/{photo}/download', 'PhotoController@download');
