// Add icon prop
export function AdminModuleToggle({ moduleName, defaultEnabled, icon }) {
  const [enabled, setEnabled] = useState(defaultEnabled);

  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow mb-2">
      <div className="flex items-center gap-3">
        {icon && <span className="text-xl text-gray-600">{icon}</span>}
        <span className="font-bold">{moduleName}</span>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`px-4 py-2 rounded ${enabled ? 'bg-green-500' : 'bg-red-500'} text-white`}
      >
        {enabled ? 'Enabled' : 'Disabled'}
      </button>
    </div>
  );
}
