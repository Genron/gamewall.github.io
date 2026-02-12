import React, {ErrorInfo, ReactNode} from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      errorInfo,
    });

    // send to monitoring service here
  }

  render(): ReactNode {
    if (this.state.hasError) {
      const isDev = process.env.NODE_ENV === "development";

      return (
        <div style={{padding: 20}}>
          <h1>Something went wrong</h1>

          {isDev && this.state.error && (
            <details style={{whiteSpace: "pre-wrap"}}>
              <summary>Stack trace</summary>
              {this.state.error.stack}
            </details>
          )}

          {isDev && this.state.errorInfo && (
            <details style={{whiteSpace: "pre-wrap", marginTop: 10}}>
              <summary>Component stack</summary>
              {this.state.errorInfo.componentStack}
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
