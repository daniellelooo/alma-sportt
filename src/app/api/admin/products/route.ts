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

export async function GET() {
  const products = readProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json() as Omit<Producto, 'id'>;
  const products = readProducts();
  const newId = String(Math.max(0, ...products.map((p) => Number(p.id))) + 1);
  const newProduct: Producto = { ...body, id: newId };
  products.push(newProduct);
  writeProducts(products);
  return NextResponse.json(newProduct, { status: 201 });
}
