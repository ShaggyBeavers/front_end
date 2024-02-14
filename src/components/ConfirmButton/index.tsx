import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
interface ConfirmButtonProps {
    buttonMessage?: string;
    dialogTitle?: string;
    dialogDescription?: string;
    dialogAction: () => void;
}

export function ConfirmButton({
    buttonMessage,
    dialogTitle,
    dialogDescription,
    dialogAction,
}: ConfirmButtonProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" type="submit">
                    {buttonMessage || 'Підтвердити'}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {dialogDescription ||
                            'Ви впевнені, що хочете зберегти зміни?'}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Відхилити</AlertDialogCancel>
                    <AlertDialogAction onClick={dialogAction}>
                        Прийняти
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
