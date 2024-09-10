'use client';

import * as React from 'react';
import { Light, Asleep } from '@carbon/icons-react';
import { useTheme } from 'next-themes';

import { Button } from 'src/components/ui/Button';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <Asleep size={24} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Light size={24} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
