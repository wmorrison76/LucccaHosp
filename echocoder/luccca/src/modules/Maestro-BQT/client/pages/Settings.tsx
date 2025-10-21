/**
 * System Settings - Maestro Banquets
 */
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { useInventoryStore } from '../stores/inventoryStore';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [dark, setDark] = useState(document.documentElement.classList.contains('dark'));
  const { areas, addArea, updateArea, removeArea } = useInventoryStore();
  const [newAreaName, setNewAreaName] = useState('');
  const [newAreaType, setNewAreaType] = useState('dry');

  return (
    <DashboardLayout title="System Settings" subtitle="Preferences and configuration">
      <Card className="mb-6">
        <CardHeader className="border-b"><CardTitle>Preferences</CardTitle></CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Enable Notifications</div>
              <div className="text-sm text-muted-foreground">Send alerts for important updates</div>
            </div>
            <input type="checkbox" checked={notifications} onChange={e => setNotifications(e.target.checked)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Dark Mode</div>
              <div className="text-sm text-muted-foreground">Switch theme appearance</div>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                const next = !dark; setDark(next);
                document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
                document.documentElement.classList.toggle('dark', next);
                localStorage.setItem('theme', next ? 'dark' : 'light');
              }}
            >
              {dark ? 'Disable' : 'Enable'} Dark Mode
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Storage Areas Management */}
      <Card>
        <CardHeader className="border-b"><CardTitle>Storage Areas</CardTitle></CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input placeholder="Area name" value={newAreaName} onChange={e=>setNewAreaName(e.target.value)} />
            <Select value={newAreaType} onValueChange={setNewAreaType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="dry">Dry Storage</SelectItem>
                <SelectItem value="cooler">Walk-in Cooler</SelectItem>
                <SelectItem value="freezer">Freezer</SelectItem>
                <SelectItem value="fish_file">Fish File</SelectItem>
                <SelectItem value="wine_cellar">Wine Cellar</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => { if (newAreaName.trim()) { addArea({ name: newAreaName.trim(), type: newAreaType as any }); setNewAreaName(''); } }}>Add Area</Button>
          </div>

          <div className="divide-y">
            {areas.map(a => (
              <div key={a.id} className="py-3 flex items-center gap-3">
                <Input className="w-56" defaultValue={a.name} onBlur={(e)=> updateArea(a.id, { name: e.target.value })} />
                <Select defaultValue={a.type} onValueChange={(v)=> updateArea(a.id, { type: v as any })}>
                  <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dry">Dry Storage</SelectItem>
                    <SelectItem value="cooler">Walk-in Cooler</SelectItem>
                    <SelectItem value="freezer">Freezer</SelectItem>
                    <SelectItem value="fish_file">Fish File</SelectItem>
                    <SelectItem value="wine_cellar">Wine Cellar</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => removeArea(a.id)}>Remove</Button>
              </div>
            ))}
            {areas.length === 0 && (
              <div className="text-sm text-muted-foreground">No storage areas configured.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
