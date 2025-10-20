import React from 'react';

/**
 * Error Boundary component to catch and display errors gracefully
 * Prevents the entire app from crashing when a component throws an error
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.state = {
      ...this.state,
      error,
      errorInfo
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">⚠️</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Something Went Wrong</h1>
                <p className="text-gray-600 mt-2">
                  We encountered an unexpected error. Please try refreshing the page.
                </p>
              </div>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <h3 className="font-bold text-red-900 mb-2">Error Details (Development Only)</h3>
                <pre className="text-sm text-red-700 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Refresh Page
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
