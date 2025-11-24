'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/icons/Icon';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PhaseCardProps {
  phaseNumber: number;
  title: string;
  description: string;
  variant?: 'destructive' | 'secondary' | 'default' | 'outline';
  isRequired?: boolean;
  timeEstimate?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function PhaseCard({
  phaseNumber,
  title,
  description,
  variant = 'default',
  isRequired = false,
  timeEstimate,
  children,
  defaultOpen = false,
}: PhaseCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const variantStyles = {
    destructive: 'border-danger-fg/30 bg-gradient-to-br from-danger-soft-bg/50 to-card',
    secondary: 'border-warning-fg/30 bg-gradient-to-br from-warning-soft-bg/50 to-card',
    default: 'border-success-fg/30 bg-gradient-to-br from-success-soft-bg/50 to-card',
    outline: 'border-accent/30 bg-gradient-to-br from-accent/10 to-card',
  };

  const badgeVariants = {
    destructive: 'destructive',
    secondary: 'secondary',
    default: 'default',
    outline: 'outline',
  } as const;

  return (
    <Card className={cn('mb-8', variantStyles[variant])}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="flex flex-col items-center gap-1">
                <Badge
                  variant={badgeVariants[variant]}
                  className="text-base font-bold px-4 py-1.5 h-10 w-10 flex items-center justify-center rounded-full shadow-md"
                >
                  {phaseNumber}
                </Badge>
                {isRequired && (
                  <span className="text-[10px] text-danger-fg font-semibold">إلزامي</span>
                )}
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2 mb-2">
                  {title}
                  {isRequired && (
                    <Badge variant="destructive" className="text-xs">
                      مطلوب
                    </Badge>
                  )}
                </CardTitle>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                {timeEstimate && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Clock" className="h-3 w-3" />
                    <span>الوقت المتوقع: {timeEstimate}</span>
                  </div>
                )}
              </div>
            </div>
            <CollapsibleTrigger asChild>
              <button
                className="flex-shrink-0 p-2 rounded-lg hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={isOpen ? 'إخفاء التفاصيل' : 'إظهار التفاصيل'}
              >
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform duration-300',
                    isOpen && 'transform rotate-180'
                  )}
                />
              </button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">{children}</CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

