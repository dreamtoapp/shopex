'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from '@/components/link';
import { Badge } from '@/components/ui/badge';
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { Icon } from '@/components/icons/Icon';
import { navigationItems, type NavigationItem } from '../helpers/navigationMenu';

type NavigationChild = NonNullable<NavigationItem['children']>[0];

interface BusinessSidebarProps {
  pendingOrdersCount?: number;
}

export default function BusinessSidebar({ pendingOrdersCount = 0 }: BusinessSidebarProps) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const isCollapsed = state === 'collapsed';

  useEffect(() => {
    const expanded: string[] = [];
    navigationItems.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some((child) => {
          if (!child.href) return false;
          return pathname === child.href || pathname.startsWith(child.href + '/');
        });
        if (hasActiveChild) {
          expanded.push(item.label);
        }
      }
    });
    setExpandedItems(expanded);
  }, [pathname]);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const isChildActive = (child: NavigationChild): boolean => {
    if (!child.href) return false;
    if (pathname === child.href) return true;
    if (pathname.startsWith(child.href + '/')) return true;
    return false;
  };

  const getBestMatch = (items: NavigationItem[]): { item: NavigationItem; child?: NavigationChild } | null => {
    let best: { item: NavigationItem; child?: NavigationChild } | null = null;
    let bestLength = 0;
    for (const item of items) {
      if (item.href && (pathname === item.href || pathname.startsWith(item.href))) {
        if (item.href.length > bestLength) {
          best = { item };
          bestLength = item.href.length;
        }
      }
      if (item.children) {
        for (const child of item.children) {
          if (child.href && (pathname === child.href || pathname.startsWith(child.href))) {
            if (child.href.length > bestLength) {
              best = { item, child };
              bestLength = child.href.length;
            }
          }
        }
      }
    }
    return best;
  };

  const bestMatch = getBestMatch(navigationItems);

  return (
    <Sidebar side="right" collapsible="icon" className="border-l">
      <SidebarHeader className="p-4 border-b space-y-4 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:space-y-2">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8">
            <Icon name="LayoutDashboard" className="h-5 w-5 text-primary-foreground group-data-[collapsible=icon]:h-4 group-data-[collapsible=icon]:w-4" />
          </div>
          <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
            <h2 className="font-bold text-lg truncate">لوحة التحكم</h2>
            <p className="text-xs text-muted-foreground">إدارة الأعمال</p>
          </div>
        </div>

        <div className="space-y-2 group-data-[collapsible=icon]:space-y-0">
          <div className="relative flex items-center justify-between px-2 py-1.5 rounded-md bg-muted/50 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-1 group-data-[collapsible=icon]:w-full">
            <div className="flex items-center gap-2 group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:justify-center">
              <Icon name="Clock" className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium group-data-[collapsible=icon]:hidden">طلبات قيد المراجعة</span>
            </div>
            {pendingOrdersCount > 0 && (
              <Badge variant="destructive" className="font-bold group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:-top-1 group-data-[collapsible=icon]:-right-1 group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:text-[10px] group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-full">
                <span className="group-data-[collapsible=icon]:hidden">{pendingOrdersCount}</span>
                <span className="hidden group-data-[collapsible=icon]:block">{pendingOrdersCount > 9 ? '9+' : pendingOrdersCount}</span>
              </Badge>
            )}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navigationItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItems.includes(item.label);
            const itemActive = bestMatch && bestMatch.item === item && !bestMatch.child;
            const hasActiveChild = bestMatch && bestMatch.item === item && bestMatch.child;

            if (!item.href && !hasChildren) return null;

            return (
              <SidebarMenuItem key={item.label}>
                {hasChildren ? (
                  <>
                    <SidebarMenuButton
                      onClick={() => !isCollapsed && toggleExpanded(item.label)}
                      isActive={!!(itemActive || hasActiveChild)}
                      tooltip={item.label}
                      className="group/item"
                    >
                      <div className="relative flex-shrink-0">
                        {item.icon && <Icon name={item.icon} className="h-4 w-4 flex-shrink-0" />}
                        {item.label === 'الطلبات' && pendingOrdersCount > 0 && (
                          <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center rounded-full group-data-[collapsible=icon]:block hidden min-w-[1rem]">
                            {pendingOrdersCount > 9 ? '9+' : pendingOrdersCount}
                          </Badge>
                        )}
                      </div>
                      <span className="flex-1 text-right group-data-[collapsible=icon]:hidden">{item.label}</span>
                      {item.label === 'الطلبات' && pendingOrdersCount > 0 && (
                        <Badge variant="destructive" className="mr-2 group-data-[collapsible=icon]:hidden flex-shrink-0">
                          {pendingOrdersCount}
                        </Badge>
                      )}
                      <Icon
                        name="ChevronLeft"
                        className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ease-in-out group-data-[collapsible=icon]:hidden ${
                          isExpanded ? 'rotate-90' : 'rotate-0'
                        } text-muted-foreground group-hover/item:text-foreground`}
                      />
                    </SidebarMenuButton>
                    {isExpanded && !isCollapsed && (
                      <SidebarMenuSub>
                        {item.children?.map((child: NavigationChild, index) => {
                          if (child.label === '---' || child.key?.startsWith('separator')) {
                            return <SidebarSeparator key={child.key || `separator-${index}`} />;
                          }

                          if (child.key?.startsWith('category-header') || child.href === '') {
                            return (
                              <SidebarGroupLabel key={child.key || `header-${index}`} className="px-2 py-1.5">
                                {child.label}
                              </SidebarGroupLabel>
                            );
                          }

                          if (child.children && child.children.length > 0) {
                            return (
                              <SidebarMenuSubItem key={`submenu-${child.label}`}>
                                <SidebarMenuSubButton asChild isActive={isChildActive(child)}>
                                  <Link href={child.href || '#'} className="flex items-center gap-2">
                                    {child.icon && <Icon name={child.icon} className="h-4 w-4 flex-shrink-0" />}
                                    <span className="flex-1 text-right">{child.label}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                                <SidebarMenuSub>
                                  {child.children.map((grand) => (
                                    <SidebarMenuSubItem key={grand.href}>
                                      <SidebarMenuSubButton asChild isActive={isChildActive(grand)}>
                                        <Link href={grand.href || '#'} className="flex items-center gap-2">
                                          {grand.icon && <Icon name={grand.icon} className="h-4 w-4 flex-shrink-0" />}
                                          <span className="flex-1 text-right">{grand.label}</span>
                                        </Link>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  ))}
                                </SidebarMenuSub>
                              </SidebarMenuSubItem>
                            );
                          }

                          return (
                            <SidebarMenuSubItem key={child.href || `child-${index}`}>
                              <SidebarMenuSubButton asChild isActive={isChildActive(child)}>
                                <Link href={child.href || '#'} className="flex items-center gap-2">
                                  {child.icon && <Icon name={child.icon} className="h-4 w-4 flex-shrink-0" />}
                                  <span className="flex-1 text-right group-data-[collapsible=icon]:hidden">{child.label}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    )}
                  </>
                ) : (
                  <SidebarMenuButton asChild isActive={!!itemActive} tooltip={item.label}>
                    <Link href={item.href || '#'} className="flex items-center gap-2">
                      {item.icon && <Icon name={item.icon} className="h-4 w-4 flex-shrink-0" />}
                      <span className="flex-1 text-right group-data-[collapsible=icon]:hidden">{item.iconOnly ? '' : item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:hidden">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()}</span>
          <span>متجرك</span>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

