import React from "react";
import Modal from '../../components/UI/Modal/Modal';
// import axios from 'axios';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptors = axios.interceptors.response.use(res => res, err => {
                this.setState({ error: err });
            });
        }
        componentWillUnmount () {
            // console.log(this.reqInterceptors, this.resInterceptors);
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        confirmedErrorHandler = () => {
            this.setState({ error: null });
        }
        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.confirmedErrorHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;