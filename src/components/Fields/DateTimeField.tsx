'use client';

import { useMemo, useState } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { cn } from 'src/common/utils/cvaUtils';
import { CalendarProps } from 'src/components/ui/CalendarV2';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/Form';
import { Input } from 'src/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/Select';

type DateTimePickerProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  control: Control<TFieldValues>;
  calendarProps?: Omit<CalendarProps, 'selected' | 'onSelect' | 'mode'>;
};

const DateTimeField = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  description,
  className,
}: DateTimePickerProps<TFieldValues>) => {
  const [time, setTime] = useState<string | null>('09:30');
  const [date, setDate] = useState<Date | null>(null);

  const timeSlots = useMemo(() => {
    return Array.from({ length: 96 }).map((_, i) => {
      const hour = Math.floor(i / 4)
        .toString()
        .padStart(2, '0');
      const minute = ((i % 4) * 15).toString().padStart(2, '0');
      return `${hour}:${minute}`;
    });
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className, 'flex flex-col')}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={date?.toISOString().split('T')[0] || ''}
                onChange={(e) => {
                  const newDate = new Date(e.target.value);
                  setDate(newDate);
                  field.onChange(newDate);
                }}
                className="basis-3/4"
              />
              <Select
                defaultValue={time!}
                onValueChange={(e) => {
                  setTime(e);
                  if (date) {
                    const [hours, minutes] = e.split(':');
                    const newDate = new Date(date.getTime());
                    newDate.setHours(parseInt(hours), parseInt(minutes));
                    setDate(newDate);
                    field.onChange(newDate);
                  }
                }}
              >
                <SelectTrigger className="basis-1/4">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((timeSlot, i) => (
                    <SelectItem key={i} value={timeSlot}>
                      {timeSlot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateTimeField;
