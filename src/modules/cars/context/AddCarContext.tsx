'use client';

import { createContext, FC, useContext, useState } from 'react';
import useSupabaseBrowser from 'src/common/lib/supabase/useSupabaseClient';

type AddCarContext = {
  variantId: string | null;
  setVariantId: (variantId: string | null) => void;
};

type AddCarProviderProps = {
  children: React.ReactNode;
};

const AddCarContext = createContext<AddCarContext>({
  variantId: null,
  setVariantId: () => {},
});

export const AddCarProvider: FC<AddCarProviderProps> = ({ children }) => {
  const [variantId, setVariantId] = useState<string | null>(null);

  return (
    <AddCarContext.Provider value={{ variantId, setVariantId }}>
      {children}
    </AddCarContext.Provider>
  );
};

export const useAddCarContext = () => {
  return useContext(AddCarContext);
};
