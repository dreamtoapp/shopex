'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Icon } from '@/components/icons/Icon';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollapsibleSectionProps {
  title: string;
  icon?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function CollapsibleSection({
  title,
  icon,
  defaultOpen = false,
  children,
  className,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className={cn('mb-8', className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-4">
          <CollapsibleTrigger asChild>
            <button className="flex items-center justify-between w-full focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-2 -m-2">
              <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
                {icon && <Icon name={icon as any} className="h-6 w-6" />}
                {title}
              </CardTitle>
              <ChevronDown
                className={cn(
                  'h-5 w-5 text-muted-foreground transition-transform duration-300',
                  isOpen && 'transform rotate-180'
                )}
              />
            </button>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="pt-0">{children}</CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

