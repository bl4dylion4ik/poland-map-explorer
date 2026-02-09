import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map as MapIcon, BarChart3, Home, CreditCard, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { LanguageToggle } from '@/components/language/LanguageToggle';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation('common');
  const { user, logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  const UserMenu = () => {
    if (!user) {
      return (
        <Link to="/auth">
          <Button variant="default" size="sm">
            Sign In
          </Button>
        </Link>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                {user.email[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.email}</p>
              <p className="text-xs leading-none text-muted-foreground capitalize">
                {user.plan} Plan
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
             <Link to="/analytics">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
             <Link to="/pricing">Upgrade Plan</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const NavLinks = ({ className = "" }: { className?: string }) => (
    <div className={`flex ${className}`}>
      <Link to="/" className="w-full">
        <Button
          variant={isActive('/') ? 'secondary' : 'ghost'}
          size="sm"
          className={`gap-2 w-full justify-start md:justify-center ${isActive('/') ? 'border border-primary/20' : ''}`}
        >
          <Home size={16} />
          <span>{t('nav.home')}</span>
        </Button>
      </Link>
      <Link to="/pricing" className="w-full">
        <Button
          variant={isActive('/pricing') ? 'secondary' : 'ghost'}
          size="sm"
          className={`gap-2 w-full justify-start md:justify-center ${isActive('/pricing') ? 'border border-primary/20' : ''}`}
        >
          <CreditCard size={16} />
          <span>{t('nav.pricing')}</span>
        </Button>
      </Link>
      <Link to="/analytics" className="w-full">
        <Button
          variant={isActive('/analytics') ? 'secondary' : 'ghost'}
          size="sm"
          className={`gap-2 w-full justify-start md:justify-center ${isActive('/analytics') ? 'border border-primary/20' : ''}`}
        >
          <BarChart3 size={16} />
          <span>{t('nav.dashboard')}</span>
        </Button>
      </Link>
    </div>
  );
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-sidebar-border bg-sidebar-background/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar-background/80">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <MapIcon size={28} className="text-primary" />
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">{t('brand.name')}</h1>
            <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider font-semibold leading-none">
              {t('brand.tagline')}
            </p>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <NavLinks className="gap-2" />
          <Separator orientation="vertical" className="h-6 mx-2" />
          <ThemeToggle />
          <LanguageToggle />
          <Separator orientation="vertical" className="h-6 mx-2" />
          <UserMenu />
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <UserMenu />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <SheetHeader className="text-left mb-6">
                <SheetTitle className="flex items-center gap-2">
                  <MapIcon size={24} className="text-primary" />
                  {t('brand.name')}
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <NavLinks className="flex-col gap-2" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
