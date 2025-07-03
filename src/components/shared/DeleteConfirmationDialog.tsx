import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationDialog({
  open,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm bg-gray-900 text-white shadow-lg rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-white text-lg font-semibold">
            Are you sure?
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-300 mt-2">
          This action cannot be undone. This will permanently delete the book.
        </p>
        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            className="text-white border-white hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
          >
            Yes, delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
