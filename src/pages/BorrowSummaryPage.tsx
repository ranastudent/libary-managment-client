// src/pages/BorrowSummaryPage.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useGetBorrowSummaryQuery } from "../redux/api/borrowApi";

export default function BorrowSummaryPage() {
  const { data: borrowSummaryResponse, isLoading, isError } =
    useGetBorrowSummaryQuery();
  const borrowSummaryList = borrowSummaryResponse?.data ?? [];

  if (isLoading)
    return <p className="text-center mt-10 text-muted-foreground">Loading summary...</p>;

  if (isError)
    return (
      <p className="text-center text-destructive mt-10">
        Error loading data.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 bg-background text-foreground rounded-md shadow border border-border">
      <h2 className="text-2xl font-semibold text-center mb-6">Borrow Summary</h2>

      <div className="overflow-x-auto rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Total Quantity Borrowed</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {borrowSummaryList.map((item) => (
              <TableRow key={item.book.isbn} className="hover:bg-muted/50">
                <TableCell>{item.book.title}</TableCell>
                <TableCell>{item.book.isbn}</TableCell>
                <TableCell>{item.totalQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
