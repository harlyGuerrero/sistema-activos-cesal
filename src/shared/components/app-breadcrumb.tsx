import { Fragment } from "react"
import { Link } from "react-router"

import type { BreadcrumbItemData } from "@/app/layouts/SystemLayout"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb"

type AppBreadcrumbProps = {
  items: BreadcrumbItemData[]
}

export function AppBreadcrumb({ items }: AppBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <Fragment key={item.href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="font-semibold text-[#006BA6]">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      to={item.href}
                      className="text-slate-500 hover:text-[#006BA6]"
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator className="flex items-center justify-center text-slate-300 [&>svg]:size-4" />
              )}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}