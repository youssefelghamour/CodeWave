import React, {Component} from "react";


const WithLogging = (WrappedComponent) => {
    const WithLoggingComponent = class extends Component {
        componentDidMount() {
            console.log(`Component ${WrappedComponent.name ? WrappedComponent.name : 'Component'} is mounted`);
        }

        componentWillUnmount() {
            console.log(`Component ${WrappedComponent.name ? WrappedComponent.name : 'Component'} is going to unmount`);
        }

        render() {
            return (
                <WrappedComponent {...this.props} />
            );
        }
    }

    WithLoggingComponent.displayName = `WithLogging(${WrappedComponent.name ? WrappedComponent.name : 'Component'})`;

    return WithLoggingComponent;
};

export default WithLogging;