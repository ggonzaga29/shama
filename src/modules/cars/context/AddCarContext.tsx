'use client';

import { createContext, FC, useContext, useState } from 'react';
import {
  CarVariant,
  CarVariantImage,
  CarVariantMetadata,
} from 'src/common/types';

type AddCarContext = {
  selectedVehicle: Partial<CarVariant> | null;
  setSelectedVehicle: (vehicle: Partial<CarVariant> | null) => void;
  selectedVariant: Partial<
    CarVariantMetadata & {
      vehicle_variant_images: Partial<CarVariantImage>[];
    }
  > | null;
  setSelectedVariant: (variant: Partial<CarVariantMetadata> | null) => void;
};

type AddCarProviderProps = {
  children: React.ReactNode;
};

const AddCarContext = createContext<AddCarContext>({
  selectedVehicle: null,
  setSelectedVehicle: () => {},
  selectedVariant: null,
  setSelectedVariant: () => {},
});

export const AddCarProvider: FC<AddCarProviderProps> = ({ children }) => {
  const [selectedVehicle, setSelectedVehicle] =
    useState<Partial<CarVariant> | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Partial<
    CarVariantMetadata & {
      vehicle_variant_images: Partial<CarVariantImage>[];
    }
  > | null>(null);

  return (
    <AddCarContext.Provider
      value={{
        selectedVehicle,
        setSelectedVehicle,
        selectedVariant,
        setSelectedVariant,
      }}
    >
      {children}
    </AddCarContext.Provider>
  );
};

export const useAddCarContext = () => {
  return useContext(AddCarContext);
};
