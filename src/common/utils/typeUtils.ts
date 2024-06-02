import { ColumnDef } from '@tanstack/react-table';

export function getKeysFromArrayOfObjects<T extends object>(
  array: T[]
): string[] {
  return array[0] ? (Object.keys(array[0]) as string[]) : [];
}

export function generateReactTableColumns<T extends object>(
  array: T[]
): ColumnDef<T>[] {
  const keys = getKeysFromArrayOfObjects(array);

  return keys.map((key) => {
    const lowerKey = key
      .replace(/[_-]/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      accessorKey: key,
      header: key[0].toUpperCase() + lowerKey.slice(1),
    };
  });
}

export function removeObjectProperties<T extends { [key: string]: any }>(
  obj: T,
  keys: string[]
): T {
  const newObj = { ...obj };

  keys.forEach((key) => {
    delete newObj[key];
  });

  return newObj;
}
