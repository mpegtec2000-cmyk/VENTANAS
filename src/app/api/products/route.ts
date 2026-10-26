import { NextRequest, NextResponse } from 'next/server';
import { getLocalProducts, saveLocalProduct, deleteLocalProduct } from '@/lib/store';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Product } from '@/lib/types';

export async function GET() {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('is_active', { ascending: false });

      if (!error && data && data.length > 0) {
        return NextResponse.json({ ok: true, products: data });
      }
    }

    const products = getLocalProducts();
    return NextResponse.json({ ok: true, products });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const product: Product = {
      id: body.id || `prod-${Date.now()}`,
      name: body.name,
      category: body.category || 'ventanas',
      description: body.description || '',
      material: body.material || 'Aluminio',
      price_type: body.price_type || 'm2',
      price_clp: Number(body.price_clp) || 0,
      is_active: body.is_active ?? true,
      featured: body.featured ?? false,
      image: body.image || '',
    };

    const updated = saveLocalProduct(product);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('products').upsert([product]);
    }

    return NextResponse.json({ ok: true, products: updated, product });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Error saving product' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ ok: false, error: 'ID es requerido' }, { status: 400 });
    }

    const updated = deleteLocalProduct(id);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('products').delete().eq('id', id);
    }

    return NextResponse.json({ ok: true, products: updated });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Error deleting product' }, { status: 500 });
  }
}
