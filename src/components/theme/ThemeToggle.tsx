import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="gap-2">
        <Sun size={16} />
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleTheme}
          className="gap-2 transition-transform hover:scale-105"
        >
          {theme === 'light' ? (
            <Moon size={16} className="transition-transform rotate-0" />
          ) : (
            <Sun size={16} className="transition-transform rotate-0" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}</p>
      </TooltipContent>
    </Tooltip>
  );
}
