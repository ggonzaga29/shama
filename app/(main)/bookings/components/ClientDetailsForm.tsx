'use client';

import { useBookingForm } from 'app/bookings/context/BookingFormContext';
import { useState } from 'react';
import { TextField } from 'src/components/Fields';
import RadioGroupField from 'src/components/Fields/RadioGroupField';
import { Input } from 'src/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/Select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/Table';
import { useSearchSupabaseTable } from 'src/hooks/useSearchSupabaseTable';

const rentalTypeOptions = [
  {
    value: 'self-drive',
    label: 'Self Drive',
  },
  {
    value: 'with-driver',
    label: 'With Driver',
  },
];

const clientTypeOptions = [
  {
    value: 'personal',
    label: 'Personal',
  },
  {
    value: 'business',
    label: 'Business',
  },
  {
    value: 'custom',
    label: 'Custom',
  },
];

const SelectPersonalClient = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const {
    form: { setValue },
    dispatch,
  } = useBookingForm();

  const {
    data: personalClients,
    isLoading,
    search,
    setSearch,
  } = useSearchSupabaseTable({
    table: 'personal_clients',
    columns: ['first_name', 'last_name'],
  });

  return (
    <Select
      open={isOpen}
      onOpenChange={setIsOpen}
      value={selectedId}
      onValueChange={(value) => {
        setSelectedId(value);
        setValue('client_id', value);

        const client = personalClients?.find(
          (client) => client.id.toString() === value
        );

        if (client) {
          dispatch({
            type: 'SET_CLIENT',
            payload: client,
          });
        }
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder={`Select a personal client`} />
      </SelectTrigger>
      <SelectContent>
        <div className="w-full border-b">
          <Input
            placeholder="Search..."
            value={search}
            className="w-full border-0 focus-visible:ring-0"
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>
        {!isLoading ? (
          personalClients?.map((client) => (
            <SelectItem
              value={client.id.toString()}
              key={client.id}
              className="px-6 py-1"
            >
              <div className="flex items-center gap-2">
                <span>
                  {client.first_name} {client.middle_name} {client.last_name}
                </span>
                <span className="text-muted-foreground">
                  ({client.email}) ({client.phone})
                </span>
              </div>
            </SelectItem>
          ))
        ) : (
          <SelectItem value="loading" disabled>
            Loading...
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

const SelectBusinessClient = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const {
    form: { setValue },
    dispatch,
  } = useBookingForm();

  const {
    data: businessClients,
    isLoading,
    search,
    setSearch,
  } = useSearchSupabaseTable({
    table: 'business_clients',
    columns: ['business_name'],
  });

  return (
    <Select
      open={isOpen}
      onOpenChange={setIsOpen}
      value={selectedId}
      onValueChange={(value) => {
        setSelectedId(value);
        setValue('client_id', value);

        const client = businessClients?.find(
          (client) => client.id.toString() === value
        );

        if (client) {
          dispatch({
            type: 'SET_CLIENT',
            payload: client,
          });
        }
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a business client" />
      </SelectTrigger>
      <SelectContent>
        <div className="w-full border-b">
          <Input
            placeholder="Search..."
            value={search}
            className="w-full border-0 focus-visible:ring-0"
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>
        {!isLoading ? (
          businessClients?.map((client) => (
            <SelectItem
              value={client.id.toString()}
              key={client.id}
              className="px-6 py-1"
            >
              <div className="flex items-center gap-2">
                <span>{client.business_name}</span>
                <span className="text-muted-foreground">
                  ({client.email}) ({client.phone})
                </span>
              </div>
            </SelectItem>
          ))
        ) : (
          <SelectItem value="loading" disabled>
            Loading...
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

const RenderClientForms = () => {
  const {
    form: { watch },
  } = useBookingForm();

  const clientType = watch('client_type');

  switch (clientType) {
    case 'personal':
      return (
        <div className="space-y-3">
          <h3 className="text-lg font-bold">Personal Client</h3>
          <SelectPersonalClient />
        </div>
      );
    case 'business':
      return (
        <div className="space-y-3">
          <h3 className="text-lg font-bold">Business Client</h3>
          <SelectBusinessClient />
        </div>
      );
    case 'custom':
      return <div>Custom Client Form</div>;
    default:
      return null;
  }
};

const ClientDetailsForm = () => {
  const {
    form: { control },
    state: { selectedClient },
  } = useBookingForm();

  const clientKeys = Object.keys(selectedClient ?? {});
  const clientValues = Object.values(selectedClient ?? {});

  return (
    <div>
      <h3 className="text-xl font-bold">Client Details</h3>

      <div className="mt-4 space-y-4">
        <RadioGroupField
          label="Rental Type"
          control={control}
          name="rental_type"
          options={rentalTypeOptions}
          layout="horizontal"
        />
        <RadioGroupField
          label="Client Type"
          control={control}
          name="client_type"
          options={clientTypeOptions}
          layout="horizontal"
        />

        <hr />
        <RenderClientForms />
        <TextField name="client_id" control={control} type="text" />

        <div className="overflow-x-auto">
          {selectedClient && (
            <Table className="mx-0">
              <TableHeader>
                <TableRow>
                  {clientKeys.map((key) => (
                    <TableHead key={key}>{key}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  {clientValues.map((value, index) => (
                    <TableCell key={index}>{value}</TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsForm;
