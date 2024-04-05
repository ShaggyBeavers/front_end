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
    buttonVariant?: string;
    dialogTitle?: string;
    dialogDescription?: string;
    dialogAction: () => void;
}

export function ConfirmButton({
    buttonMessage,
    dialogTitle,
    dialogDescription,
    dialogAction,
    buttonVariant = 'outline',
}: ConfirmButtonProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={
                        buttonVariant as
                            | 'link'
                            | 'default'
                            | 'destructive'
                            | 'outline'
                            | 'secondary'
                            | 'ghost'
                            | null
                            | undefined
                    }
                    type="submit"
                    className="logout_btn"
                >
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
