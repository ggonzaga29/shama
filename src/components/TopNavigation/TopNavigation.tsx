import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "src/components/ui/Card";

const TopNavigation = () => {
  return (
    <Card className="flex-shrink-0 rounded-none border-none bg-navigation text-navigation-foreground">
      <CardContent className="flex justify-between px-6 py-6">
        <div className="flex gap-4 items-center"></div>

        <div>
          <p>User Profile</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopNavigation;
