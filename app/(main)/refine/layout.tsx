import { Refine } from '@refinedev/core';
import routerProvider from '@refinedev/nextjs-router';
import { dataProvider } from '@refinedev/supabase';
import { supabaseClient } from 'src/refine/supabaseClient';

export default function RefineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(supabaseClient)}
      resources={[
        {
          name: 'products',
          list: '/refine/products',
        },
      ]}
      options={{ syncWithLocation: true }}
    >
      {children}
    </Refine>
  );
}
