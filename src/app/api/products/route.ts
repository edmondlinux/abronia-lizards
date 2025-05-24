
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Product from '@/lib/models/Product';

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
