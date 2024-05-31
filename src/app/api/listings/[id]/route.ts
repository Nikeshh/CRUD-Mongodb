import connectDB from "@/lib/connectDB";
import { Listing } from "@/app/models/Listing";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const { id } = params;

  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: listing });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    await connectDB();
    const { id } = params;
  
    try {
      const data = await req.json();
      const updatedListing = await Listing.findByIdAndUpdate(id, data, { new: true });
      if (!updatedListing) {
        return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: updatedListing });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await connectDB();
    const { id } = params;
  
    try {
      const deletedListing = await Listing.findByIdAndDelete(id);
      if (!deletedListing) {
        return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Listing deleted successfully' });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
  }