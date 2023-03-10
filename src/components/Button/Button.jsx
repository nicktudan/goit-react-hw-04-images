import PropTypes from 'prop-types';
import { ShowBtn } from './Button.styled';

export const Button = ({ onClick }) => {
    return <ShowBtn type="button" onClick={onClick}>
        Load more
    </ShowBtn>
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}