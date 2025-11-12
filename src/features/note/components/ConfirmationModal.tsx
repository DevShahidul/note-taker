import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  onOk: () => void;
};

export function ConfirmationModal({ onOk }: Props) {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogTitle>Please confirm</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete your note?
      </DialogDescription>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">Cancle</Button>
        </DialogClose>
        <Button variant="default" onClick={onOk}>
          Ok
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
