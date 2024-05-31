import connectDB from "@/lib/connectDB";
import { Listing } from "@/app/models/Listing";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await connectDB();
    try {
        const items = await Listing.find({})
        return NextResponse.json({ success: true, data: items });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 })
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    await connectDB();
    try {
        const data = await req.json();
        const listing = new Listing(data);
        await listing.save();
        return NextResponse.json({ success: true, data: listing });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 })
    }
}