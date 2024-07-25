import LogoWithText from 'src/assets/LogoWithText';
import Hamburger from 'src/components/Sidebar/components/Hamburger';
import TopNavigationIcons from 'src/components/TopNavigation/TopNavigationIcons';
import TopNavigationSearch from 'src/components/TopNavigation/TopNavigationSearch';
import TopNavigationUserProfile from 'src/components/TopNavigation/TopNavigationUserProfile';
import { Card, CardContent } from 'src/components/ui/Card';

const TopNavigation = async () => {
  return (
    <Card className="shrink-0 select-none rounded-none border-none bg-[#0d1120] text-navigation-foreground shadow-lg">
      <CardContent className="flex justify-between px-6 py-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <LogoWithText className="mb-2 mr-2 h-10 w-auto" />
          </div>
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
