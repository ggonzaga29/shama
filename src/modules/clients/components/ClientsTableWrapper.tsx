'use client';

import dynamic from 'next/dynamic';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'src/components/ui/Tabs';

const PersonalClientsTable = dynamic(
  () => import('src/modules/clients/components/PersonalClientsTable')
);

const BusinessClientsTable = dynamic(
  () => import('src/modules/clients/components/BusinessClientsTable')
);

const ClientsTableWrapper = () => {
  return (
    <div className="mt-6">
      <Tabs defaultValue={'personal'}>
        <TabsList>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <PersonalClientsTable />
        </TabsContent>
        <TabsContent value="business">
          <BusinessClientsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientsTableWrapper;
