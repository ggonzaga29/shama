import { getCarVariantList } from 'src/modules/cars/actions';
import CarForm from 'src/modules/cars/components/CarForm/CarForm';
import PrefillSelect from 'src/modules/cars/components/CarForm/PrefillSelect';
import { AddCarProvider } from 'src/modules/cars/context/AddCarContext';

export default async function CarFormWrapper() {
  const variantList = await getCarVariantList();

  return (
    <AddCarProvider>
      <div className="w-full rounded-lg bg-white p-6">
        <PrefillSelect variantList={variantList} />
        <hr className="my-4" />
        <CarForm />
      </div>
    </AddCarProvider>
  );
}
