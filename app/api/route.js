import { get } from "mongoose";
import { NextResponse } from "next/server";
export async function GET(){
    return NextResponse.json({
       test:'working [/app/api/route.js]'
    })
}
//for testing of correct routing
//use 