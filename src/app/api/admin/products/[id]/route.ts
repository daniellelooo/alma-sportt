import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { Producto } from '@/types';

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'products.json');

function readProducts(): Producto[] {
  return JSON.parse(readFileSync(DATA_PATH, 'utf-8'));
}

function writeProducts(products: Producto[]) {
  writeFileSync(DATA_PATH, JSON.stringify(products, null, 2), 'utf-8');
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json() as Partial<Producto>;
  const products = readProducts();
  const idx = products.findIndex((p) => p.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  products[idx] = { ...products[idx], ...body, id: params.id };
  writeProducts(products);
  return NextResponse.json(products[idx]);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const products = readProducts();
  const filtered = products.filter((p) => p.id !== params.id);
  if (filtered.length === products.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  writeProducts(filtered);
  return NextResponse.json({ success: true });
}
