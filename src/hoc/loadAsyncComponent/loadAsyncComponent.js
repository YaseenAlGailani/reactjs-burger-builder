import React from 'react';

const loadAsyncComponent = (importedComp) => {
    return class AsyncComponent extends React.Component {

        state = {
            component: null
        }

        componentDidMount() {
            importedComp().then(resp => {
                this.setState({ component: resp.default });
            })
        }

        render() {
            let Component = this.state.component;
            return Component ? <Component {...this.props} /> : null;
        }

    }
}

export default loadAsyncComponent;
