import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { hasError:false, err:null }; }
  static getDerivedStateFromError(err){ return { hasError:true, err }; }
  componentDidCatch(err, info){ console.error("[EchoCRM] UI Error:", err, info); }
  render(){
    if(this.state.hasError){
      return (
        <div className="p-6 text-sm">
          <div className="font-semibold">Something went wrong.</div>
          <div className="opacity-70 mt-1">Our team has been notified.</div>
        </div>
      );
    }
    return this.props.children;
  }
}
