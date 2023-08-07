import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './GlobalStyles.sass';

function GlobalStyles({ children }) {
    return (
        <div>
            {children}
            <ToastContainer />
        </div>
    );
}

GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalStyles;
