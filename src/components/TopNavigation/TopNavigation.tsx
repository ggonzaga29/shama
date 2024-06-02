import Hamburger from 'src/components/Sidebar/components/Hamburger';
import TopNavigationIcons from 'src/components/TopNavigation/TopNavigationIcons';
import TopNavigationSearch from 'src/components/TopNavigation/TopNavigationSearch';
import TopNavigationUserProfile from 'src/components/TopNavigation/TopNavigationUserProfile';
import { Card, CardContent } from 'src/components/ui/Card';

const TopNavigation = async () => {
  return (
    <Card className="shrink-0 select-none rounded-none border-none bg-navigation text-navigation-foreground">
      <CardContent className="flex justify-between py-2 pl-2 pr-6">
        <div className="flex items-center gap-4">
          <Hamburger />
          <TopNavigationSearch />
        </div>

        <div className="flex items-center space-x-4">
          <TopNavigationIcons />
          <TopNavigationUserProfile />
        </div>
      </CardContent>
    </Card>
  );
};

export default TopNavigation;
