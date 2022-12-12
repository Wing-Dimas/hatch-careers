<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function sendEmail(Request $request){
        Mail::send(new ContactMail($request->all()));

        return redirect()->back()->with([
            "message" => 'Great! Successfully send in your mail'
        ]);
    }
}
