import { Card, CardContent } from "src/components/ui/Card";
import Hamburger from "src/components/Sidebar/components/Hamburger";
import { getCurrentUser } from "src/modules/users/actions";
import TopNavigationUserProfile from "src/components/TopNavigation/TopNavigationUserProfile";
import TopNavigationSearch from "src/components/TopNavigation/TopNavigationSearch";
import TopNavigationIcons from "src/components/TopNavigation/TopNavigationIcons";

const TopNavigation = async () => {
  const currentUser = await getCurrentUser();

  return (
    <Card className="flex-shrink-0 rounded-none border-none bg-navigation text-navigation-foreground select-none">
      <CardContent className="flex justify-between pl-2 pr-6 py-2">
        <div className="flex items-center gap-4">
          <Hamburger />
          <TopNavigationSearch />
        </div>

        <div className="flex space-x-4 items-center">
          <TopNavigationIcons />
          <TopNavigationUserProfile user={currentUser} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TopNavigation;
