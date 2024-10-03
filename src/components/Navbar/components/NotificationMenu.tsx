'use client';

import { Notification } from '@carbon/icons-react';
import { Button } from 'src/components/ui/Button';

const NotificationMenu = () => {
  return (
    <Button variant="ghost" size="icon">
      <Notification size={24} />
    </Button>
  );
};

export default NotificationMenu;
