'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Infer } from 'next-safe-action/adapters/types';
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
  useTransition,
} from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { Car, Driver } from 'src/common/types';
import { mapInputToFormData } from 'src/common/utils/formUtils';
import { bookingFormSchema } from 'src/modules/bookings/schema';

type State = {
  selectedCars: Car[];
  selectedDrivers: {
    carId: string;
    driver: Driver;
  }[];
};

const initialState: State = {
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
    },
  });

  const { handleSubmit } = form;

  const onSubmit = handleSubmit((input) => {
    startTransition(async () => {
      try {
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
