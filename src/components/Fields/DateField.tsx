'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { cn } from 'src/common/utils/cvaUtils';
import { Button } from 'src/components/ui/Button';
import { Calendar, CalendarProps } from 'src/components/ui/CalendarV2';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/Form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/ui/Popover';

type DateFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  control: Control<TFieldValues>;
  calendarProps?: Omit<CalendarProps, 'selected' | 'onSelect' | 'mode'>;
};

const DateField = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  description,
  className,
  calendarProps,
}: DateFieldProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 size-4" />
                  {field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  initialFocus
                  selected={field.value}
                  onSelect={(selectedDate) => {
                    field.onChange(selectedDate);
                  }}
                  toYear={new Date().getFullYear()}
                  disabled={(date) =>
                    Number(date) < Date.now() - 1000 * 60 * 60 * 24 ||
                    Number(date) > Date.now() + 1000 * 60 * 60 * 24 * 30
                  }
                  {...calendarProps}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateField;
