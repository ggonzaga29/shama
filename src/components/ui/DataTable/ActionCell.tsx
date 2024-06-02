import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import { Button } from 'src/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'src/components/ui/DropdownMenu';

type Action = {
  label: string;
  onClick: () => void;
};

type ActionCellProps = {
  actions: Action[];
};

/**
 * A reusable component that renders a dropdown menu with a list of actions.
 * Each action is represented by a label and an onClick function.
 *
 * @example
 * // Usage in a table cell
 * <ActionCell
 *   actions={[
 *     { label: 'Copy payment ID', onClick: () => { console.log('Copy payment ID') } },
 *     { label: 'View customer', onClick: () => { console.log('View customer') } },
 *     { label: 'View payment details', onClick: () => { console.log('View payment details') } },
 *   ]}
 * />
 *
 * @param {ActionCellProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered component.
 */
const ActionCell: React.FC<ActionCellProps> = ({ actions }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <div className="flex size-full items-center justify-center">
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="size-4" />
        </Button>
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="bg-navigation text-navigation-foreground">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      {actions.map((action, index) => (
        <React.Fragment key={index}>
          <DropdownMenuItem onSelect={action.onClick}>
            {action.label}
          </DropdownMenuItem>
          {/* {index < actions.length - 1 && <DropdownMenuSeparator />} */}
        </React.Fragment>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default ActionCell;
