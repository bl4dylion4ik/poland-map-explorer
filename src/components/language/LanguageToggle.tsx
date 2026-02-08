import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'pl', name: 'Polski' },
];

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="gap-2">
        <Languages size={16} />
        <span>EN</span>
      </Button>
    );
  }

  const currentLang = i18n.language.split('-')[0]; // Handle 'en-US' -> 'en'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Languages size={16} />
          <span className="hidden sm:inline">{currentLang.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className="cursor-pointer"
          >
            <Check
              size={16}
              className={`mr-2 ${currentLang === lang.code ? 'opacity-100' : 'opacity-0'}`}
            />
            <span className="font-medium">{lang.code.toUpperCase()}</span>
            <span className="ml-2 text-muted-foreground">— {lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
