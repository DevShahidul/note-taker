import type { ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

type NoteCardProps = {
  header?: ReactNode;
   headerActions?: ReactNode;
   footerActions?: ReactNode;
  children: ReactNode;
  bordered?: boolean;
};

export const NoteCard = ({ 
    header, 
    headerActions,
    footerActions, 
    children, 
    bordered = true 
}: NoteCardProps) => {
  return (
    <Card className="rounded-sm py-4 gap-4 shadow-2xs relative">
        {(header || headerActions) && (
            <CardHeader className={`flex items-center px-3 static ${bordered ? "border-b pb-3!" : ""}`}>
                <div className="inline-flex items-center space-x-3 static">{header}</div>
                {headerActions && (
                <div className="ms-auto inline-flex items-center">{headerActions}</div>
                )}
            </CardHeader>
        )}

      <CardContent className="px-3">{children}</CardContent>

      {footerActions && (
        <CardFooter className={`flex justify-end gap-2 px-3 `}>
            {footerActions}
        </CardFooter>
      )}
    </Card>
  );
};
