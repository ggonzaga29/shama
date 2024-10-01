import { ChevronLeft } from '@carbon/icons-react';
import { cn } from 'src/common/utils/cvaUtils';
import { Button } from 'src/components/ui/Button';

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  toggleSidebar: () => void;
}

const SidebarToggle = ({ isOpen, toggleSidebar }: SidebarToggleProps) => {
  return (
    // eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values
    <div className="invisible absolute -right-[16px] top-[12px] z-20 lg:visible">
      <Button
        onClick={() => toggleSidebar()}
        className="size-8 rounded-md"
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            'h-4 w-4 transition-transform duration-400 ease-out',
            isOpen === false ? 'rotate-180' : 'rotate-0'
          )}
        />
      </Button>
    </div>
  );
};

export default SidebarToggle;
