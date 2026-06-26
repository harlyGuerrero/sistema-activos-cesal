import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

interface Props {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function FormSection({
  title,
  icon,
  children,
}: Props) {
  return (
    <Card className="rounded-3xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}