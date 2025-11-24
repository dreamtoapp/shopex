'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/icons/Icon';
import { cn } from '@/lib/utils';

interface QuickNavItem {
  id: string;
  label: string;
  phaseNumber: number;
}

const navItems: QuickNavItem[] = [
  { id: 'welcome', label: 'الترحيب', phaseNumber: 0 },
  { id: 'preview', label: 'المعاينة', phaseNumber: 0 },
  { id: 'phase-1', label: 'المرحلة 1', phaseNumber: 1 },
  { id: 'phase-2', label: 'المرحلة 2', phaseNumber: 2 },
  { id: 'phase-3', label: 'المرحلة 3', phaseNumber: 3 },
  { id: 'phase-4', label: 'المرحلة 4', phaseNumber: 4 },
  { id: 'phase-6', label: 'المرحلة 6', phaseNumber: 6 },
  { id: 'daily', label: 'العمليات اليومية', phaseNumber: 0 },
  { id: 'images', label: 'دليل الصور', phaseNumber: 0 },
  { id: 'faq', label: 'الأسئلة الشائعة', phaseNumber: 0 },
];

export default function QuickNav() {
  const [activeId, setActiveId] = useState<string>('welcome');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveId(item.id);
            break;
          }
        }
      }

      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (!isVisible) return null;

  return (
    <Card className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block w-56 shadow-xl border-primary/20">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b">
          <Icon name="Navigation" className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm">التنقل السريع</h3>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                'w-full text-right px-3 py-2 rounded-lg text-sm flex items-center justify-between',
                activeId === item.id
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-muted-foreground'
              )}
            >
              <span>{item.label}</span>
              {item.phaseNumber > 0 && (
                <Badge
                  variant="outline"
                  className={cn(
                    'text-xs h-5 w-5 p-0 flex items-center justify-center',
                    activeId === item.id && 'border-primary-foreground/30'
                  )}
                >
                  {item.phaseNumber}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>
    </Card>
  );
}

