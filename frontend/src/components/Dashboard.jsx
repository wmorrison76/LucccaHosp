import React from 'react';

export default function Dashboard() {
  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-700/50 rounded border border-slate-600">
          <h3 className="text-white font-semibold mb-2">System Status</h3>
          <p className="text-slate-300 text-sm">All systems operational</p>
        </div>
        <div className="p-4 bg-slate-700/50 rounded border border-slate-600">
          <h3 className="text-white font-semibold mb-2">Uptime</h3>
          <p className="text-slate-300 text-sm">100% availability</p>
        </div>
        <div className="p-4 bg-slate-700/50 rounded border border-slate-600">
          <h3 className="text-white font-semibold mb-2">Users Online</h3>
          <p className="text-slate-300 text-sm">1 user</p>
        </div>
      </div>
    </div>
  );
}
