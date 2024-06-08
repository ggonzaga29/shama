'use client';

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { useState } from 'react';
import useSupabaseBrowser from 'src/common/lib/supabase/useSupabaseClient';
import { CarVariantMetadata } from 'src/common/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/Select';
import { getCarVariantList } from 'src/modules/cars/actions';

const CarForm = () => {
  const client = useSupabaseBrowser();
  const { data: variantList } = useQuery(getCarVariantList(client));
  // Abstract this into another component to avoid refetching the list every time because this will cause a rerender
  const [selectedVariant, setSelectedVariant] =
    useState<Partial<CarVariantMetadata> | null>(null);

  const handleChange = (value: string) => {
    const selected: Partial<CarVariantMetadata> | null =
      variantList?.find((variant) =>
        variant.vehicle_variant_metadata.find(
          (metadata) => metadata.id === value
        )
      ) || null;

    console.log(selected);

    setSelectedVariant(selected);
  };

  return (
    <div className="w-full rounded-lg bg-white p-6">
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-[320px]">
          <span className="font-bold">{selectedVariant?.name}</span>
          <SelectValue placeholder="Select a variant" />
          <SelectContent>
            <SelectGroup>
              {variantList?.map(
                (variant) =>
                  variant.vehicle_variant_metadata.length > 0 && (
                    <>
                      <SelectLabel key={variant.id}>{variant.name}</SelectLabel>
                      <div>
                        {variant.vehicle_variant_metadata.map((metadata) => (
                          <SelectItem
                            key={metadata.id}
                            value={metadata.id}
                            className="ml-2"
                          >
                            {metadata.name}
                          </SelectItem>
                        ))}
                      </div>
                    </>
                  )
              )}
            </SelectGroup>
          </SelectContent>
        </SelectTrigger>
      </Select>
    </div>
  );
};

export default CarForm;
