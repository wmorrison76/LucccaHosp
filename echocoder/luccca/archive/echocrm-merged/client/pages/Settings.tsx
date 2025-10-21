import Layout from "@/components/Layout";
import MoveablePanel from "@/components/MoveablePanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Database,
  Zap,
  Users,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Clock,
  DollarSign,
  Key,
  Download,
  Upload,
  Trash2,
  Plus,
  Edit,
  Save,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  title: string;
  department: string;
  location: string;
  timezone: string;
  avatar: string;
  bio: string;
}

interface Company {
  name: string;
  industry: string;
  size: string;
  website: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  newLeads: boolean;
  eventUpdates: boolean;
  systemAlerts: boolean;
  weeklyReports: boolean;
  monthlyReports: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: string;
  passwordExpiry: string;
  ipWhitelist: string[];
  auditLogging: boolean;
  dataEncryption: boolean;
}

interface SystemSettings {
  defaultCurrency: string;
  dateFormat: string;
  timeFormat: string;
  language: string;
  theme: string;
  autoBackup: boolean;
  dataRetention: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "William Morrison",
    email: "william.morrison@hospitalitycrm.com",
    phone: "+1 (555) 123-4567",
    title: "Administrator",
    department: "Management",
    location: "San Francisco, CA",
    timezone: "Pacific Standard Time (PST)",
    avatar: "WM",
    bio: "Experienced hospitality management professional with 15+ years in the industry. Specialized in event coordination and customer relationship management."
  });

  const [company, setCompany] = useState<Company>({
    name: "HospitalityCRM Solutions",
    industry: "Hospitality & Events",
    size: "50-100 employees",
    website: "https://hospitalitycrm.com",
    address: "123 Business Park Dr, San Francisco, CA 94105",
    phone: "+1 (555) 987-6543",
    email: "info@hospitalitycrm.com",
    logo: "HC"
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newLeads: true,
    eventUpdates: true,
    systemAlerts: true,
    weeklyReports: true,
    monthlyReports: false
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: true,
    sessionTimeout: "8 hours",
    passwordExpiry: "90 days",
    ipWhitelist: ["192.168.1.0/24", "10.0.0.0/8"],
    auditLogging: true,
    dataEncryption: true
  });

  const [system, setSystem] = useState<SystemSettings>({
    defaultCurrency: "USD",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12 hour",
    language: "English",
    theme: "dark",
    autoBackup: true,
    dataRetention: "7 years"
  });

  const integrations = [
    { name: "Salesforce", status: "connected", type: "CRM", lastSync: "2 hours ago" },
    { name: "Mailchimp", status: "connected", type: "Email Marketing", lastSync: "1 day ago" },
    { name: "QuickBooks", status: "disconnected", type: "Accounting", lastSync: "Never" },
    { name: "Zoom", status: "connected", type: "Video Conferencing", lastSync: "5 minutes ago" },
    { name: "Slack", status: "connected", type: "Communication", lastSync: "30 minutes ago" },
  ];

  const teamMembers = [
    { name: "Sarah Johnson", email: "sarah@company.com", role: "Sales Manager", status: "active", lastLogin: "2 hours ago" },
    { name: "Michael Chen", email: "michael@company.com", role: "Event Coordinator", status: "active", lastLogin: "1 day ago" },
    { name: "Emily Rodriguez", email: "emily@company.com", role: "Customer Service", status: "active", lastLogin: "5 minutes ago" },
    { name: "David Thompson", email: "david@company.com", role: "Marketing Specialist", status: "inactive", lastLogin: "1 week ago" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings & Configuration</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account, security, integrations, and system preferences
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="apple-button">
              <Download className="h-4 w-4 mr-2" />
              Export Settings
            </Button>
            <Button size="sm" className="apple-button">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <MoveablePanel className="glass-panel">
            <Card className="bg-transparent border-none shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <span>Settings Menu</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { id: "profile", label: "User Profile", icon: User },
                  { id: "users-permissions", label: "User Profiles & Permissions", icon: Shield },
                  { id: "company", label: "Company Info", icon: Building2 },
                  { id: "security", label: "Security", icon: Key },
                  { id: "notifications", label: "Notifications", icon: Bell },
                  { id: "system", label: "System", icon: Settings },
                  { id: "integrations", label: "Integrations", icon: Zap },
                  { id: "team", label: "Team Management", icon: Users },
                  { id: "data", label: "Data & Backup", icon: Database },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </CardContent>
            </Card>
          </MoveablePanel>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <MoveablePanel className="glass-panel">
              <Card className="bg-transparent border-none shadow-none">
                <CardContent className="p-6">
                  {/* User Profile Tab */}
                  {activeTab === "profile" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">User Profile</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(!isEditing)}
                          className="apple-button"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          {isEditing ? "Cancel" : "Edit Profile"}
                        </Button>
                      </div>

                      <div className="flex items-center space-x-6">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src="/placeholder.svg" alt={userProfile.name} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xl">
                            {userProfile.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="apple-button">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Photo
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            JPG, PNG or GIF. Max size 2MB.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={userProfile.name}
                            disabled={!isEditing}
                            onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={userProfile.email}
                            disabled={!isEditing}
                            onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={userProfile.phone}
                            disabled={!isEditing}
                            onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="title">Job Title</Label>
                          <Input
                            id="title"
                            value={userProfile.title}
                            disabled={!isEditing}
                            onChange={(e) => setUserProfile({...userProfile, title: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Select value={userProfile.department} disabled={!isEditing}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Management">Management</SelectItem>
                              <SelectItem value="Sales">Sales</SelectItem>
                              <SelectItem value="Marketing">Marketing</SelectItem>
                              <SelectItem value="Operations">Operations</SelectItem>
                              <SelectItem value="Customer Service">Customer Service</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <Select value={userProfile.timezone} disabled={!isEditing}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pacific Standard Time (PST)">PST</SelectItem>
                              <SelectItem value="Mountain Standard Time (MST)">MST</SelectItem>
                              <SelectItem value="Central Standard Time (CST)">CST</SelectItem>
                              <SelectItem value="Eastern Standard Time (EST)">EST</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={userProfile.bio}
                          disabled={!isEditing}
                          onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  {/* User Profiles & Permissions Tab */}
                  {activeTab === "users-permissions" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">User Profiles & Permissions</h3>
                        <Button size="sm" className="apple-button">
                          <Plus className="h-4 w-4 mr-2" />
                          Add User
                        </Button>
                      </div>

                      {/* Role Management */}
                      <Card className="glass-panel dark:glass-panel-dark">
                        <CardHeader>
                          <CardTitle>Role Management</CardTitle>
                          <CardDescription>Define user roles and their permissions</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Director Role */}
                            <div className="p-4 border rounded-lg space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">Director</h4>
                                <Badge variant="default">Full Access</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Complete system access and user management</p>
                              <div className="space-y-2 text-xs">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                                  <span>User Management</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                                  <span>Financial Reports</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                                  <span>System Configuration</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                                  <span>All Event Management</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                                  <span>Productivity Analytics</span>
                                </div>
                              </div>
                            </div>

                            {/* Manager Role */}
                            <div className="p-4 border rounded-lg space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">Manager</h4>
                                <Badge variant="secondary">Department Access</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Department management and reporting</p>
                              <div className="space-y-2 text-xs">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                                  <span>Team Management</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                                  <span>Department Reports</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                                  <span>Event Approval</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                                  <span>Limited User Creation</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                                  <span>No System Config</span>
                                </div>
                              </div>
                            </div>

                            {/* Employee Role */}
                            <div className="p-4 border rounded-lg space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">Employee</h4>
                                <Badge variant="outline">Standard Access</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Standard operational access</p>
                              <div className="space-y-2 text-xs">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                                  <span>Event Management</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                                  <span>Contact Management</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                                  <span>Time Tracking</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                                  <span>Basic Reports</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                                  <span>No User Management</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* User List */}
                      <Card className="glass-panel dark:glass-panel-dark">
                        <CardHeader>
                          <CardTitle>User Accounts</CardTitle>
                          <CardDescription>Manage individual user accounts and permissions</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {[
                              {
                                name: "William Morrison",
                                email: "william@hospitalitycrm.com",
                                role: "Director",
                                status: "active",
                                lastLogin: "2 hours ago",
                                avatar: "WM",
                                permissions: ["All Access"]
                              },
                              {
                                name: "Sarah Johnson",
                                email: "sarah@hospitalitycrm.com",
                                role: "Manager",
                                status: "active",
                                lastLogin: "1 day ago",
                                avatar: "SJ",
                                permissions: ["Sales Team", "Event Management", "Reports"]
                              },
                              {
                                name: "Michael Chen",
                                email: "michael@hospitalitycrm.com",
                                role: "Employee",
                                status: "active",
                                lastLogin: "5 minutes ago",
                                avatar: "MC",
                                permissions: ["Event Coordination", "Contact Management"]
                              },
                              {
                                name: "Emily Rodriguez",
                                email: "emily@hospitalitycrm.com",
                                role: "Employee",
                                status: "active",
                                lastLogin: "30 minutes ago",
                                avatar: "ER",
                                permissions: ["Customer Service", "Basic Reports"]
                              },
                              {
                                name: "David Thompson",
                                email: "david@hospitalitycrm.com",
                                role: "Employee",
                                status: "inactive",
                                lastLogin: "1 week ago",
                                avatar: "DT",
                                permissions: ["Marketing", "Lead Management"]
                              }
                            ].map((user, index) => (
                              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-4">
                                  <Avatar className="h-10 w-10">
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                      {user.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-muted-foreground">{user.email}</div>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge
                                        variant={user.role === 'Director' ? 'default' :
                                               user.role === 'Manager' ? 'secondary' : 'outline'}
                                        className="text-xs"
                                      >
                                        {user.role}
                                      </Badge>
                                      <Badge
                                        variant={user.status === 'active' ? 'default' : 'destructive'}
                                        className="text-xs"
                                      >
                                        {user.status}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>

                                <div className="text-right">
                                  <div className="text-sm font-medium">Last Login</div>
                                  <div className="text-sm text-muted-foreground">{user.lastLogin}</div>
                                  <div className="flex gap-1 mt-2">
                                    <Button variant="ghost" size="sm">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Key className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-red-600">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Permission Matrix */}
                      <Card className="glass-panel dark:glass-panel-dark">
                        <CardHeader>
                          <CardTitle>Permission Matrix</CardTitle>
                          <CardDescription>Detailed view of permissions by module</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left p-2">Module</th>
                                  <th className="text-center p-2">Director</th>
                                  <th className="text-center p-2">Manager</th>
                                  <th className="text-center p-2">Employee</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { module: "User Management", director: "Full", manager: "Limited", employee: "None" },
                                  { module: "Financial Reports", director: "Full", manager: "Department", employee: "None" },
                                  { module: "Event Management", director: "Full", manager: "Full", employee: "Assigned" },
                                  { module: "Contact Management", director: "Full", manager: "Full", employee: "Full" },
                                  { module: "Sales Pipeline", director: "Full", manager: "Team", employee: "Personal" },
                                  { module: "Marketing", director: "Full", manager: "Department", employee: "View" },
                                  { module: "Time Management", director: "All Users", manager: "Team", employee: "Personal" },
                                  { module: "System Settings", director: "Full", manager: "None", employee: "None" }
                                ].map((perm, index) => (
                                  <tr key={index} className="border-b">
                                    <td className="p-2 font-medium">{perm.module}</td>
                                    <td className="p-2 text-center">
                                      <Badge className="bg-green-100 text-green-800">{perm.director}</Badge>
                                    </td>
                                    <td className="p-2 text-center">
                                      <Badge
                                        className={
                                          perm.manager === "Full" ? "bg-green-100 text-green-800" :
                                          perm.manager === "None" ? "bg-red-100 text-red-800" :
                                          "bg-yellow-100 text-yellow-800"
                                        }
                                      >
                                        {perm.manager}
                                      </Badge>
                                    </td>
                                    <td className="p-2 text-center">
                                      <Badge
                                        className={
                                          perm.employee === "Full" ? "bg-green-100 text-green-800" :
                                          perm.employee === "None" ? "bg-red-100 text-red-800" :
                                          "bg-yellow-100 text-yellow-800"
                                        }
                                      >
                                        {perm.employee}
                                      </Badge>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Company Info Tab */}
                  {activeTab === "company" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Company Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Company Name</Label>
                          <Input id="companyName" value={company.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="industry">Industry</Label>
                          <Input id="industry" value={company.industry} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="size">Company Size</Label>
                          <Select value={company.size}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-10 employees">1-10 employees</SelectItem>
                              <SelectItem value="11-50 employees">11-50 employees</SelectItem>
                              <SelectItem value="51-100 employees">51-100 employees</SelectItem>
                              <SelectItem value="101-500 employees">101-500 employees</SelectItem>
                              <SelectItem value="500+ employees">500+ employees</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input id="website" type="url" value={company.website} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="companyPhone">Phone</Label>
                          <Input id="companyPhone" value={company.phone} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="companyEmail">Email</Label>
                          <Input id="companyEmail" type="email" value={company.email} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" value={company.address} rows={2} />
                      </div>
                    </div>
                  )}

                  {/* Security Tab */}
                  {activeTab === "security" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Security Settings</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                          <div>
                            <h4 className="font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                          </div>
                          <Switch
                            checked={security.twoFactorAuth}
                            onCheckedChange={(checked) => setSecurity({...security, twoFactorAuth: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                          <div>
                            <h4 className="font-medium">Audit Logging</h4>
                            <p className="text-sm text-muted-foreground">Track all user actions and system changes</p>
                          </div>
                          <Switch
                            checked={security.auditLogging}
                            onCheckedChange={(checked) => setSecurity({...security, auditLogging: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                          <div>
                            <h4 className="font-medium">Data Encryption</h4>
                            <p className="text-sm text-muted-foreground">Encrypt sensitive data at rest and in transit</p>
                          </div>
                          <Switch
                            checked={security.dataEncryption}
                            onCheckedChange={(checked) => setSecurity({...security, dataEncryption: checked})}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="sessionTimeout">Session Timeout</Label>
                          <Select value={security.sessionTimeout}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1 hour">1 hour</SelectItem>
                              <SelectItem value="4 hours">4 hours</SelectItem>
                              <SelectItem value="8 hours">8 hours</SelectItem>
                              <SelectItem value="24 hours">24 hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="passwordExpiry">Password Expiry</Label>
                          <Select value={security.passwordExpiry}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30 days">30 days</SelectItem>
                              <SelectItem value="90 days">90 days</SelectItem>
                              <SelectItem value="180 days">180 days</SelectItem>
                              <SelectItem value="Never">Never</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications Tab */}
                  {activeTab === "notifications" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Notification Preferences</h3>
                      
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <h4 className="font-medium">Notification Channels</h4>
                          {[
                            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                            { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive critical alerts via SMS' },
                            { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser and mobile push notifications' },
                          ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                              <div>
                                <h5 className="font-medium">{item.label}</h5>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                              </div>
                              <Switch
                                checked={notifications[item.key as keyof NotificationSettings] as boolean}
                                onCheckedChange={(checked) => setNotifications({...notifications, [item.key]: checked})}
                              />
                            </div>
                          ))}
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium">Event Types</h4>
                          {[
                            { key: 'newLeads', label: 'New Leads', desc: 'When new leads are added to the system' },
                            { key: 'eventUpdates', label: 'Event Updates', desc: 'Changes to scheduled events' },
                            { key: 'systemAlerts', label: 'System Alerts', desc: 'Important system notifications' },
                            { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Automated weekly performance reports' },
                            { key: 'monthlyReports', label: 'Monthly Reports', desc: 'Monthly analytics and insights' },
                          ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                              <div>
                                <h5 className="font-medium">{item.label}</h5>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                              </div>
                              <Switch
                                checked={notifications[item.key as keyof NotificationSettings] as boolean}
                                onCheckedChange={(checked) => setNotifications({...notifications, [item.key]: checked})}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Integrations Tab */}
                  {activeTab === "integrations" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Third-Party Integrations</h3>
                        <Button size="sm" className="apple-button">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Integration
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {integrations.map((integration, index) => (
                          <div key={index} className="p-4 border border-border/50 rounded-lg space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                  <Zap className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{integration.name}</h4>
                                  <p className="text-sm text-muted-foreground">{integration.type}</p>
                                </div>
                              </div>
                              <Badge
                                variant={integration.status === 'connected' ? 'default' : 'secondary'}
                                className={integration.status === 'connected' ? 'bg-green-500' : ''}
                              >
                                {integration.status}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Last sync: {integration.lastSync}</span>
                              <Button variant="outline" size="sm">
                                {integration.status === 'connected' ? 'Configure' : 'Connect'}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Team Management Tab */}
                  {activeTab === "team" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Team Management</h3>
                        <Button size="sm" className="apple-button">
                          <Plus className="h-4 w-4 mr-2" />
                          Invite User
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {teamMembers.map((member, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{member.name}</h4>
                                <p className="text-sm text-muted-foreground">{member.email}</p>
                                <p className="text-xs text-muted-foreground">Last login: {member.lastLogin}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                                {member.role}
                              </Badge>
                              <Badge
                                variant={member.status === 'active' ? 'default' : 'secondary'}
                                className={member.status === 'active' ? 'bg-green-500' : ''}
                              >
                                {member.status}
                              </Badge>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* System Settings Tab */}
                  {activeTab === "system" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">System Preferences</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="currency">Default Currency</Label>
                          <Select value={system.defaultCurrency}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD - US Dollar</SelectItem>
                              <SelectItem value="EUR">EUR - Euro</SelectItem>
                              <SelectItem value="GBP">GBP - British Pound</SelectItem>
                              <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dateFormat">Date Format</Label>
                          <Select value={system.dateFormat}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timeFormat">Time Format</Label>
                          <Select value={system.timeFormat}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12 hour">12 Hour</SelectItem>
                              <SelectItem value="24 hour">24 Hour</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <Select value={system.language}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="English">English</SelectItem>
                              <SelectItem value="Spanish">Spanish</SelectItem>
                              <SelectItem value="French">French</SelectItem>
                              <SelectItem value="German">German</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                          <div>
                            <h4 className="font-medium">Automatic Backup</h4>
                            <p className="text-sm text-muted-foreground">Automatically backup system data daily</p>
                          </div>
                          <Switch
                            checked={system.autoBackup}
                            onCheckedChange={(checked) => setSystem({...system, autoBackup: checked})}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Data & Backup Tab */}
                  {activeTab === "data" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Data Management & Backup</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-medium">Data Export</h4>
                          <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start apple-button">
                              <Download className="h-4 w-4 mr-2" />
                              Export All Contacts
                            </Button>
                            <Button variant="outline" className="w-full justify-start apple-button">
                              <Download className="h-4 w-4 mr-2" />
                              Export Events Data
                            </Button>
                            <Button variant="outline" className="w-full justify-start apple-button">
                              <Download className="h-4 w-4 mr-2" />
                              Export Analytics Reports
                            </Button>
                            <Button variant="outline" className="w-full justify-start apple-button">
                              <Download className="h-4 w-4 mr-2" />
                              Full System Backup
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium">Data Import</h4>
                          <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start apple-button">
                              <Upload className="h-4 w-4 mr-2" />
                              Import Contacts (CSV)
                            </Button>
                            <Button variant="outline" className="w-full justify-start apple-button">
                              <Upload className="h-4 w-4 mr-2" />
                              Import Events (CSV)
                            </Button>
                            <Button variant="outline" className="w-full justify-start apple-button">
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Restore from Backup
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium text-red-500">Danger Zone</h4>
                        <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-red-700 dark:text-red-300">Delete All Data</h5>
                              <p className="text-sm text-red-600 dark:text-red-400">
                                Permanently delete all data. This action cannot be undone.
                              </p>
                            </div>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </MoveablePanel>
          </div>
        </div>
      </div>
    </Layout>
  );
}
