// ✅ BLOCK 6 & 7 – HACCP Lock + Compliance Review Trail + Mandatory Audits + Role Control + Smart Audit AI
// Implements lockout on overdue invoices, mandatory audit tracking, outlet compliance reporting,
// role-based access control, and EchoAi-driven audit flagging.

// File: components/Invoice/ComplianceAuditBanner.jsx
import React from 'react';

const ComplianceAuditBanner = ({ overdue }) => {
  return (
    <div className={`p-4 mt-4 border-l-4 ${overdue ? 'bg-red-100 border-red-500' : 'bg-green-100 border-green-500'}`}>
      <h3 className="font-semibold mb-2">
        {overdue ? '🚨 Overdue Invoice – Locked for Compliance' : '✅ Invoice Within Audit Window'}
      </h3>
      <p className="text-sm">
        {overdue
          ? 'This invoice was not reviewed within 24 hours. Locked for Director-level review only.'
          : 'This invoice is within the HACCP review window.'}
      </p>
    </div>
  );
};
