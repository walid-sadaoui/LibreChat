import { Button } from '/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '/components/ui/table';
import { useCallback } from 'react';

interface InteractiveTableProps {
  headers: string[];
  rows: Record<string, string>[];
  onAction: (row: Record<string, string>) => void;
  actionLabel?: string;
}

export default function InteractiveTable({ 
  headers, 
  rows, 
  onAction,
  actionLabel = "Details" 
}: InteractiveTableProps) {
  const handleClick = useCallback((row: Record<string, string>) => {
    onAction(row);
  }, [onAction]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            {headers.map((header) => (
              <TableCell key={header}>{row[header]}</TableCell>
            ))}
            <TableCell>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => handleClick(row)}
              >
                {actionLabel}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 