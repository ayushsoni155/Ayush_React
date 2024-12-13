import React from "react";
import MaintenancePage from "./MaintenancePage"; // Import your MaintenancePage component

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }; // Update state to render fallback UI
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error captured:", error, errorInfo); // Log error details
  }

  render() {
    if (this.state.hasError) {
      return <MaintenancePage />; // Render your MaintenancePage on error
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
