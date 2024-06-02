import { Input } from 'src/components/ui/Input';

const TopNavigationSearch = () => {
  return (
    <div>
      <Input
        placeholder="What are you looking for?"
        className="!focus-visible:ring-0 hidden w-64 border-none bg-navigation-button-hover text-navigation-foreground outline-none ring-0 transition-colors placeholder:text-foreground/50 focus-visible:bg-navigation-button-active focus-visible:ring-offset-0 lg:block"
      />
    </div>
  );
};

export default TopNavigationSearch;
