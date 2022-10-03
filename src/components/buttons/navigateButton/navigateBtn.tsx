import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export const NavigateBtn = ({ variant, route, text }: { variant: string; route: string; text: string }) => {
    const navigate = useNavigate();

    const handleClick = (e: any) => {
        e.preventDefault();
        navigate(route);
    };

    return (
        <Button variant={variant} onClick={handleClick}>
            {text}
        </Button>
    );
};
