import { FileText} from 'lucide-react';
const EmptyNote = () => {
    return (
        <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notes yet. Create your first note!</p>
        </div>
    );
};

export default EmptyNote;