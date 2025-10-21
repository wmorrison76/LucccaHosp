export function AdminPanelNav() {
  return (
    <nav className="admin-panel-nav bg-gray-800 text-white p-4">
      <ul className="flex gap-4 flex-wrap">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/modules">Modules</Link></li>
        <li><Link to="/logs">Logs</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/echo">Echo AI</Link></li>
        <li><Link to="/argus">Argus Monitor</Link></li>
        <li><Link to="/zelda">Zelda Master</Link></li>
        <li><Link to="/red-phoenix">Red Phoenix</Link></li>
        <li><Link to="/odin-spear">Odin’s Spear</Link></li>
      </ul>
    </nav>
  );
}
