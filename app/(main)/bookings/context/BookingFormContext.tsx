'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { bookingFormSchema } from 'app/bookings/schema';
import { Infer } from 'next-safe-action/adapters/types';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useTransition,
} from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import {
  BusinessClient,
  Car,
  Driver,
  Enum,
  PersonalClient,
} from 'src/common/types';
import { mapInputToFormData } from 'src/common/utils/formUtils';

type State = {
  selectedCars: Car[];
  selectedDrivers: {
    carId: string;
    driver: Driver;
  }[];
  selectedClient: PersonalClient | BusinessClient | null;
};

const initialState: State = {
  selectedClient: null,
  selectedCars: [],
  selectedDrivers: [],
};

type Action =
  | { type: 'ADD_CAR'; payload: Car }
  | { type: 'REMOVE_CAR'; payload: Car }
  | {
      type: 'SET_DEFAULT_PRICE';
      payload: { id: string; default_price: number };
    }
  | {
      type: 'SET_DRIVER';
      payload: { carId: string; driver: Driver };
    }
  | {
      type: 'SET_CLIENT';
      payload: PersonalClient | BusinessClient;
    }
  | {
      type: 'REMOVE_CLIENT';
      payload: {
        type: Omit<Enum<'client_type'>, 'custom'>;
        id: string;
      };
    }
  | {
      type: 'CLEAR_CLIENT';
      payload: null;
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_CAR':
      console.log('Add vehicle', action.payload);
      return {
        ...state,
        selectedCars: [...state.selectedCars, action.payload],
      };
    case 'REMOVE_CAR':
      return {
        ...state,
        selectedCars: state.selectedCars.filter(
          (car) => car.id !== action.payload.id
        ),
        selectedDrivers: state.selectedDrivers.filter(
          (driver) => driver.carId !== action.payload.id
        ),
      };
    case 'SET_DEFAULT_PRICE':
      return {
        ...state,
        selectedCars: state.selectedCars.map((car) =>
          car.id === action.payload.id
            ? { ...car, default_price: action.payload.default_price }
            : car
        ),
      };
    case 'SET_DRIVER':
      return {
        ...state,
        selectedDrivers: [
          ...state.selectedDrivers,
          { carId: action.payload.carId, driver: action.payload.driver },
        ],
      };
    case 'SET_CLIENT':
      return {
        ...state,
        selectedClient: action.payload,
      };
    case 'REMOVE_CLIENT':
      return {
        ...state,
        selectedClient:
          action.payload.type === 'personal' ? null : state.selectedClient,
      };
    case 'CLEAR_CLIENT':
      return {
        ...state,
        selectedClient: null,
      };
    default:
      return state;
  }
};

export type FieldValues = Infer<typeof bookingFormSchema>;

const BookingFormContext = createContext<
  | {
      state: State;
      dispatch: React.Dispatch<Action>;
      totalPrice: number;
      form: UseFormReturn<FieldValues>;
      onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
      isPending: boolean;
    }
  | undefined
>(undefined);

const BookingFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isPending, startTransition] = useTransition();
  const totalPrice = useMemo(() => {
    return state.selectedCars.reduce(
      (acc, car) => acc + (car.default_price ?? 0),
      0
    );
  }, [state.selectedCars]);

  const form = useForm<FieldValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      rental_type: 'self-drive',
      client_type: 'personal',
      send_email: true,
    },
  });

  const { handleSubmit, watch, setValue } = form;

  // Watch for changes in the rental type and client type
  const clientType = watch('client_type');

  useEffect(() => {
    setValue('client_id', '');
    dispatch({ type: 'CLEAR_CLIENT', payload: null });
  }, [clientType, setValue]);

  useEffect(() => {
    setValue('selected_cars_json', JSON.stringify(state.selectedCars));
  }, [setValue, state.selectedCars]);

  const onSubmit = handleSubmit((input) => {
    startTransition(async () => {
      try {
        console.log('Submitting form', input);
        const formData = mapInputToFormData(input);
        console.log('Form data', formData);
      } catch (e) {
        console.error('Something went wrong with submitting the form. ', e);
      }
    });
  });

  return (
    <BookingFormContext.Provider
      value={{ state, dispatch, totalPrice, form, onSubmit, isPending }}
    >
      {children}
    </BookingFormContext.Provider>
  );
};

const useBookingForm = () => {
  const context = useContext(BookingFormContext);

  if (!context) {
    throw new Error('useBookingForm must be used within a BookingFormProvider');
  }

  return context;
};

export { BookingFormContext, BookingFormProvider, useBookingForm };
