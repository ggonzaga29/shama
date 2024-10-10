'use client';

const CountButton = ({ count }: { count: number }) => {
  return (
    <button
      className="ml-2 size-8 rounded-[100%] border-2 border-green-500 text-sm text-green-500 transition-colors hover:border-green-700 hover:text-green-700"
      title="Notificiations"
    >
      {count}
    </button>
  );
};

const NotificationMenu = () => {
  const count = 6;

  return (
    <CountButton count={count} />

    // <Button variant="ghost" size="icon">
    //   {/* <Notification size={24} /> */}
    // </Button>
  );
};

export default NotificationMenu;
