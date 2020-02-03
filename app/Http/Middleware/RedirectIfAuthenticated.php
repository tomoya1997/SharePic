<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure; // 無名関数、マジック変数を使用するためのクラス
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->check()) {
            return redirect()->route('user');
        }

        return $next($request);
    }
}
