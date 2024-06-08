'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { FC, useState } from 'react';
import useSupabaseBrowser from 'src/common/lib/supabase/useSupabaseClient';
import { CarVariant } from 'src/common/types';
import { cn } from 'src/common/utils/cvaUtils';
import { Button } from 'src/components/ui/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'src/components/ui/Command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/Dialog';
import { EnhancedButton } from 'src/components/ui/EnhancedButton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/ui/Popover';
import {
  getCarVariantList,
  getCarVariantMetadata,
} from 'src/modules/cars/actions';
import {
  AddCarProvider,
  useAddCarContext,
} from 'src/modules/cars/context/AddCarContext';

type CarVariantSelectProps = {
  variants: Partial<CarVariant>[] | undefined | null;
};

const CarVariantSelect: FC<CarVariantSelectProps> = ({ variants }) => {
  const [open, setOpen] = useState(false);
  const { variantId, setVariantId } = useAddCarContext();

  if (!variants) {
    return null;
  }

  console.log('variantId', variantId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {variantId
            ? variants.find((variant) => variant.id === variantId)?.name ?? ''
            : 'Select variant...'}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search variant..." />
          <CommandEmpty>No variant found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {variants.map((variant) => (
                <CommandItem
                  key={variant.id}
                  value={variant.id!}
                  onSelect={(currentValue) => {
                    setVariantId(
                      currentValue === variantId ? null : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      variantId === variant.name ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {variant.name}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const AddCarModalForm = () => {
  const client = useSupabaseBrowser();
  const { data: carVariants } = useQuery(getCarVariantList(client));
  const { variantId } = useAddCarContext();
  const { data: variantMetadata, isLoading } = useQuery(
    getCarVariantMetadata(client, variantId ?? ''),
    {
      enabled: !!variantId, // Only fetch if variantId is not null
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <EnhancedButton variant="gooeyRight" Icon={Plus}>
          Add Car
        </EnhancedButton>
      </DialogTrigger>
      <DialogContent className="max-w-2xl translate-y-[-120%]">
        <DialogHeader>
          <DialogTitle>Add a Car</DialogTitle>
          <DialogDescription>
            Add a new car to your inventory. Some fields are required, while
            others are optional. You can also choose to add a photo of the car
            to your inventory, or select from the list of available cars.
          </DialogDescription>
        </DialogHeader>

        <div className="my-2 flex flex-col gap-2">
          <CarVariantSelect variants={carVariants} />
          <span className="text-sm text-muted-foreground">
            Select a variant to automatically fill in the rest of the form.
          </span>
          current variant: {variantMetadata?.name}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AddCarModal = () => {
  return (
    <AddCarProvider>
      <AddCarModalForm />
    </AddCarProvider>
  );
};

export default AddCarModal;
