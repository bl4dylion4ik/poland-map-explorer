import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map as MapIcon, BarChart3, Home, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { LanguageToggle } from '@/components/language/LanguageToggle';
import { useTranslation } from 'react-i18next';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation('common');
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-sidebar-border bg-sidebar-background/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar-background/80">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <MapIcon size={28} className="text-primary" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">{t('brand.name')}</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold leading-none">
              {t('brand.tagline')}
            </p>
          </div>
        </Link>
        
        {/* Navigation Links & Controls */}
        <div className="flex items-center gap-2">
          {/* Navigation Links */}
          <Link to="/">
            <Button
              variant={isActive('/') ? 'secondary' : 'ghost'}
              size="sm"
              className={`gap-2 ${isActive('/') ? 'border border-primary/20' : ''}`}
            >
              <Home size={16} />
              <span className="hidden sm:inline">{t('nav.home')}</span>
            </Button>
          </Link>
          <Link to="/pricing">
            <Button
              variant={isActive('/pricing') ? 'secondary' : 'ghost'}
              size="sm"
              className={`gap-2 ${isActive('/pricing') ? 'border border-primary/20' : ''}`}
            >
              <CreditCard size={16} />
              <span className="hidden sm:inline">{t('nav.pricing')}</span>
            </Button>
          </Link>
          <Link to="/analytics">
            <Button
              variant={isActive('/analytics') ? 'secondary' : 'ghost'}
              size="sm"
              className={`gap-2 ${isActive('/analytics') ? 'border border-primary/20' : ''}`}
            >
              <BarChart3 size={16} />
              <span className="hidden sm:inline">{t('nav.dashboard')}</span>
            </Button>
          </Link>
          
          {/* Separator */}
          <Separator orientation="vertical" className="h-6 mx-2" />
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Language Toggle */}
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
};
