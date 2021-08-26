import React from 'react';
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {

    return function Wrapper(props) {
        const [showModal, setShowModal] = React.useState(false);
        const [errorMessage, setErrorMessage] = React.useState('');

        const hideModal = () => {
            setShowModal(false);
        }


        const requestInterceptor = axios.interceptors.request.use(req => req, (error) => {
            setShowModal(true);
            console.log('[INTERCEPTOR]: ',error);
            setErrorMessage(error.message);
            return Promise.reject(error);
        })

        const responseInterceptor = axios.interceptors.response.use(res => res, (error) => {
            setShowModal(true);
            setErrorMessage(error.message);
            return Promise.reject(error);
        })

        React.useEffect(() => {
            return () => {
                console.log('unmounting Interceptors:', requestInterceptor, responseInterceptor)
                axios.interceptors.request.eject(requestInterceptor)
                axios.interceptors.response.eject(responseInterceptor)
            }
        }
        );

        return (
            <>
                <Modal modalShown={showModal} hideModal={hideModal}>
                    <p>{errorMessage}</p>
                </Modal>
                <WrappedComponent {...props} />
            </>
        )
    }
}


export default withErrorHandler;