'use client';

import Link from '@/components/link';
import { Icon } from '@/components/icons/Icon';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ActionCardProps {
  title: string;
  href: string;
  icon: string;
  description?: string;
  items?: string[];
  variant?: 'danger' | 'warning' | 'info' | 'default';
  className?: string;
}

export default function ActionCard({
  title,
  href,
  icon,
  description,
  items,
  variant = 'default',
  className,
}: ActionCardProps) {
  const variantStyles = {
    danger: 'bg-danger-soft-bg border-danger-fg/20',
    warning: 'bg-warning-soft-bg border-warning-fg/20',
    info: 'bg-info-soft-bg border-info-fg/20',
    default: 'bg-card border-border',
  };

  const textColors = {
    danger: 'text-danger-fg',
    warning: 'text-warning-fg',
    info: 'text-info-fg',
    default: 'text-foreground',
  };

  return (
    <Link href={href} className="block">
      <Card
        className={cn(
          'p-5 rounded-xl border cursor-pointer',
          variantStyles[variant],
          className
        )}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'p-2.5 rounded-lg bg-background/50 flex-shrink-0',
              variant === 'danger' && 'bg-danger-soft-bg/50',
              variant === 'warning' && 'bg-warning-soft-bg/50',
              variant === 'info' && 'bg-info-soft-bg/50'
            )}
          >
            <Icon name={icon as any} className={cn('h-5 w-5', textColors[variant])} />
          </div>
          <div className="flex-1 min-w-0">
            <h4
              className={cn(
                'font-semibold mb-2 flex items-center gap-2',
                textColors[variant]
              )}
            >
              {title}
            </h4>
            {description && (
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">{description}</p>
            )}
            {items && items.length > 0 && (
              <ul className="list-disc space-y-1 pr-5 text-sm text-muted-foreground">
                {items.map((item, index) => (
                  <li key={index} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

