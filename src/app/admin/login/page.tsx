'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      const from = searchParams.get('from') || '/admin';
      router.push(from);
      router.refresh();
    } else {
      setError('Contraseña incorrecta');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-crema flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm border border-sand shadow-sm">
        <div className="text-center mb-8">
          <Image
            src="/logosolosimbolo.png"
            alt="Alma Sportt"
            width={56}
            height={56}
            className="mx-auto mb-4"
          />
          <h1 className="text-xl font-bold text-oscuro">Panel de Administración</h1>
          <p className="text-gray-500 text-sm mt-1">Alma Sportt</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="password" className="text-oscuro font-medium">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 bg-white border-sand text-oscuro focus:border-mocha"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-mocha hover:bg-mocha/90 text-white"
          >
            {loading ? 'Verificando...' : 'Ingresar'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
