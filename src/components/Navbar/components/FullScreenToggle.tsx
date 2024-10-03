'use client';

import { FitToScreen, Minimize } from '@carbon/icons-react';
import { useState } from 'react';
import { Button } from 'src/components/ui/Button';

const FullScreenToggle = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleFullScreen}>
      {isFullScreen ? <Minimize size={24} /> : <FitToScreen size={24} />}
    </Button>
  );
};

export default FullScreenToggle;
