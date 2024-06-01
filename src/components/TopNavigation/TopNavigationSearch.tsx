import { Input } from "src/components/ui/Input";

const TopNavigationSearch = () => {
  return (
    <div>
      <Input
        placeholder="What are you looking for?"
        className="w-64 bg-navigation-button-hover text-navigation-foreground transition-colors placeholder-foreground/50 outline-none border-none !focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus-visible:bg-navigation-button-active hidden lg:block"
      />
    </div>
  );
};

export default TopNavigationSearch;
