'use client';

import { FC } from 'react';
import { toast } from 'sonner';
import { CarVariant, CarVariantMetadata } from 'src/common/types';
import { Label } from 'src/components/ui/Label';
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
import { useAddCarContext } from 'src/modules/cars/context/AddCarContext';

type VariantList = Awaited<ReturnType<typeof getCarVariantList>>;

type PrefillSelectProps = {
  variantList: VariantList;
};

/**
 * Prefill form values with the selected vehicle and variant metadata.
 */
const PrefillSelect: FC<PrefillSelectProps> = ({ variantList }) => {
  const { selectedVehicle, setSelectedVariant, setSelectedVehicle } =
    useAddCarContext();

  const handleChange = (value: string) => {
    let selectedVehicle: Partial<CarVariant> | null = null;
    let selectedVariant: Partial<CarVariantMetadata> | null = null;

    for (const vehicle of variantList || []) {
      for (const variant of vehicle.vehicle_variant_metadata) {
        if (variant.id === value) {
          selectedVehicle = vehicle;
          selectedVariant = variant;
          break;
        }
      }

      if (selectedVehicle && selectedVariant) {
        break;
      }
    }

    setSelectedVehicle(selectedVehicle);
    setSelectedVariant(selectedVariant);
    toast.success(
      `Form pre-filled: ${selectedVehicle?.name}, ${selectedVariant?.name}`
    );
  };

  return (
    <div className="space-y-2">
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-80">
          <span className="font-bold">
            {selectedVehicle?.name ?? 'Select a vehicle'}
          </span>
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

      <div className="max-w-prose">
        <Label>
          <span className="text-sm font-medium text-foreground/50">
            Select a vehicle to automatically fill in the rest of the form. Data
            may be incomplete. This will overwrite any existing data.
          </span>
        </Label>
      </div>
    </div>
  );
};

export default PrefillSelect;
