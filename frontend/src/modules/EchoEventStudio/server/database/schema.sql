-- HospitalityCRM Database Schema
-- Production-ready PostgreSQL schema for complete BEO/REO management system

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- CORE SYSTEM TABLES
-- =============================================================================

-- Users and Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    department VARCHAR(50),
    phone VARCHAR(20),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    last_login_at TIMESTAMP WITH TIME ZONE,
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Sessions
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Venues
CREATE TABLE venues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    address JSONB NOT NULL,
    contact_info JSONB NOT NULL,
    capacity INTEGER,
    settings JSONB DEFAULT '{}',
    branding JSONB DEFAULT '{}',
    pricing_config JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Venue Rooms
CREATE TABLE venue_rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    capacity INTEGER NOT NULL,
    width_ft INTEGER,
    depth_ft INTEGER,
    setup_styles JSONB DEFAULT '[]',
    features JSONB DEFAULT '[]',
    pricing JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Venue Access
CREATE TABLE user_venue_access (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'staff',
    permissions JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, venue_id)
);

-- =============================================================================
-- CLIENT MANAGEMENT
-- =============================================================================

-- Clients
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL DEFAULT 'individual',
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    address JSONB,
    preferences JSONB DEFAULT '{}',
    history JSONB DEFAULT '{}',
    billing_info JSONB DEFAULT '{}',
    notes TEXT,
    tags JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Client Contacts
CREATE TABLE client_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- PROJECT AND EVENT MANAGEMENT
-- =============================================================================

-- Projects (Events)
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    room_id UUID REFERENCES venue_rooms(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME,
    end_time TIME,
    guest_count INTEGER,
    lead_status VARCHAR(50) DEFAULT 'cold',
    event_status VARCHAR(50) DEFAULT 'tentative',
    priority VARCHAR(20) DEFAULT 'medium',
    budget DECIMAL(12,2),
    estimated_revenue DECIMAL(12,2),
    requirements JSONB DEFAULT '{}',
    notes TEXT,
    tags JSONB DEFAULT '[]',
    assigned_to JSONB DEFAULT '[]',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project Timeline
CREATE TABLE project_timeline (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project Documents
CREATE TABLE project_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    file_url TEXT NOT NULL,
    mime_type VARCHAR(100),
    file_size BIGINT,
    status VARCHAR(50) DEFAULT 'pending',
    parsed_data JSONB,
    processing_results JSONB,
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project Notes
CREATE TABLE project_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'general',
    is_private BOOLEAN DEFAULT false,
    tags JSONB DEFAULT '[]',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- BEO/QUOTE MANAGEMENT
-- =============================================================================

-- Quotes/BEOs
CREATE TABLE quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    version INTEGER DEFAULT 1,
    status VARCHAR(50) DEFAULT 'draft',
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    guest_count INTEGER NOT NULL,
    setup_style VARCHAR(100),
    service_style VARCHAR(100),
    pricing JSONB NOT NULL DEFAULT '{}',
    terms JSONB DEFAULT '{}',
    timeline JSONB DEFAULT '[]',
    kitchen_notes JSONB DEFAULT '{}',
    service_notes JSONB DEFAULT '{}',
    setup_notes JSONB DEFAULT '{}',
    av_requirements JSONB DEFAULT '{}',
    floor_plan JSONB DEFAULT '{}',
    execution_checklist JSONB DEFAULT '[]',
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quote Lines (Items)
CREATE TABLE quote_lines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity DECIMAL(10,2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    is_optional BOOLEAN DEFAULT false,
    department_code VARCHAR(50),
    gl_code VARCHAR(50),
    supplier VARCHAR(255),
    special_instructions TEXT,
    allergens JSONB DEFAULT '[]',
    dietary JSONB DEFAULT '[]',
    minimum_quantity INTEGER,
    maximum_quantity INTEGER,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quote Approvals
CREATE TABLE quote_approvals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
    role VARCHAR(100) NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'pending',
    comments TEXT,
    signature TEXT,
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quote Revisions
CREATE TABLE quote_revisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
    version INTEGER NOT NULL,
    changes JSONB NOT NULL,
    reason TEXT,
    previous_total DECIMAL(12,2),
    new_total DECIMAL(12,2),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quote Attachments
CREATE TABLE quote_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    file_url TEXT NOT NULL,
    file_size BIGINT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- CATALOG AND INVENTORY
-- =============================================================================

-- Catalog Items
CREATE TABLE catalog_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    sku VARCHAR(100),
    category VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    unit_price DECIMAL(10,2),
    cost_price DECIMAL(10,2),
    unit VARCHAR(50) DEFAULT 'each',
    dietary JSONB DEFAULT '[]',
    allergens JSONB DEFAULT '[]',
    department_code VARCHAR(50),
    gl_code VARCHAR(50),
    supplier VARCHAR(255),
    minimum_quantity INTEGER,
    is_active BOOLEAN DEFAULT true,
    tags JSONB DEFAULT '[]',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(venue_id, sku)
);

-- =============================================================================
-- INTEGRATIONS
-- =============================================================================

-- Integration Configurations
CREATE TABLE integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'crm', 'pms', 'diagramming', 'payment'
    provider VARCHAR(100) NOT NULL, -- 'salesforce', 'hubspot', 'opera', etc.
    config JSONB NOT NULL,
    is_active BOOLEAN DEFAULT true,
    last_sync_at TIMESTAMP WITH TIME ZONE,
    sync_status VARCHAR(50) DEFAULT 'idle',
    error_log JSONB DEFAULT '[]',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(venue_id, type, provider)
);

-- Integration Sync Log
CREATE TABLE integration_sync_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    integration_id UUID NOT NULL REFERENCES integrations(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id),
    quote_id UUID REFERENCES quotes(id),
    operation VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    external_id VARCHAR(255),
    request_data JSONB,
    response_data JSONB,
    error_message TEXT,
    duration_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- ECHOSCOPE WEBSITE MANAGEMENT
-- =============================================================================

-- EchoScope Websites
CREATE TABLE echoscope_websites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    domain VARCHAR(255) UNIQUE NOT NULL,
    config JSONB NOT NULL,
    theme VARCHAR(50) DEFAULT 'modern',
    is_active BOOLEAN DEFAULT true,
    published_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Website Leads
CREATE TABLE website_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    website_id UUID REFERENCES echoscope_websites(id),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    event_type VARCHAR(100),
    event_date DATE,
    guest_count INTEGER,
    message TEXT,
    source VARCHAR(100) DEFAULT 'website',
    status VARCHAR(50) DEFAULT 'new',
    qualification JSONB DEFAULT '{}',
    assigned_to UUID REFERENCES users(id),
    project_id UUID REFERENCES projects(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Website Analytics
CREATE TABLE website_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    website_id UUID NOT NULL REFERENCES echoscope_websites(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    visitors INTEGER DEFAULT 0,
    page_views INTEGER DEFAULT 0,
    leads INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    bounce_rate DECIMAL(5,2),
    avg_session_duration INTEGER,
    top_pages JSONB DEFAULT '[]',
    traffic_sources JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(website_id, date)
);

-- =============================================================================
-- SYSTEM LOGS AND AUDIT
-- =============================================================================

-- Activity Log
CREATE TABLE activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    venue_id UUID REFERENCES venues(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50),
    resource_id UUID,
    description TEXT,
    metadata JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System Settings
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(255) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- KPI Metrics
CREATE TABLE kpi_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    period VARCHAR(20) NOT NULL, -- 'daily', 'weekly', 'monthly'
    metrics JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(venue_id, date, period)
);

-- =============================================================================
-- PAYMENT PROCESSING
-- =============================================================================

-- Payment Methods
CREATE TABLE payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL, -- 'stripe', 'square', 'paypal'
    config JSONB NOT NULL,
    is_active BOOLEAN DEFAULT true,
    is_default BOOLEAN DEFAULT false,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    quote_id UUID REFERENCES quotes(id),
    payment_method_id UUID NOT NULL REFERENCES payment_methods(id),
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    type VARCHAR(50) NOT NULL, -- 'deposit', 'partial', 'final', 'refund'
    status VARCHAR(50) DEFAULT 'pending',
    external_transaction_id VARCHAR(255),
    external_payment_id VARCHAR(255),
    payment_intent_id VARCHAR(255),
    metadata JSONB DEFAULT '{}',
    processed_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================

-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(is_active);

-- Session indexes
CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_expires ON user_sessions(expires_at);

-- Venue indexes
CREATE INDEX idx_venues_slug ON venues(slug);
CREATE INDEX idx_venues_active ON venues(is_active);

-- Client indexes
CREATE INDEX idx_clients_venue_id ON clients(venue_id);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_active ON clients(is_active);

-- Project indexes
CREATE INDEX idx_projects_venue_id ON projects(venue_id);
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_event_date ON projects(event_date);
CREATE INDEX idx_projects_lead_status ON projects(lead_status);
CREATE INDEX idx_projects_event_status ON projects(event_status);
CREATE INDEX idx_projects_created_at ON projects(created_at);

-- Quote indexes
CREATE INDEX idx_quotes_project_id ON quotes(project_id);
CREATE INDEX idx_quotes_venue_id ON quotes(venue_id);
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_quotes_event_date ON quotes(event_date);

-- Catalog indexes
CREATE INDEX idx_catalog_items_venue_id ON catalog_items(venue_id);
CREATE INDEX idx_catalog_items_category ON catalog_items(category);
CREATE INDEX idx_catalog_items_sku ON catalog_items(venue_id, sku);
CREATE INDEX idx_catalog_items_active ON catalog_items(is_active);

-- Integration indexes
CREATE INDEX idx_integrations_venue_id ON integrations(venue_id);
CREATE INDEX idx_integrations_type ON integrations(type);
CREATE INDEX idx_integrations_active ON integrations(is_active);

-- Activity log indexes
CREATE INDEX idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX idx_activity_log_venue_id ON activity_log(venue_id);
CREATE INDEX idx_activity_log_action ON activity_log(action);
CREATE INDEX idx_activity_log_created_at ON activity_log(created_at);

-- Payment indexes
CREATE INDEX idx_payments_project_id ON payments(project_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created_at ON payments(created_at);

-- Website indexes
CREATE INDEX idx_website_leads_venue_id ON website_leads(venue_id);
CREATE INDEX idx_website_leads_status ON website_leads(status);
CREATE INDEX idx_website_leads_created_at ON website_leads(created_at);

-- =============================================================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- =============================================================================

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update triggers to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_venues_updated_at BEFORE UPDATE ON venues 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_catalog_items_updated_at BEFORE UPDATE ON catalog_items 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON integrations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_echoscope_websites_updated_at BEFORE UPDATE ON echoscope_websites 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_website_leads_updated_at BEFORE UPDATE ON website_leads 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_methods_updated_at BEFORE UPDATE ON payment_methods 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- SAMPLE DATA FOR DEVELOPMENT
-- =============================================================================

-- Insert default system settings
INSERT INTO system_settings (key, value, description, is_public) VALUES
('app_name', '"HospitalityCRM"', 'Application name', true),
('app_version', '"2.0.0"', 'Application version', true),
('default_currency', '"USD"', 'Default currency', true),
('default_timezone', '"America/New_York"', 'Default timezone', true),
('ocr_providers', '["google", "aws", "azure"]', 'Available OCR providers', false),
('payment_providers', '["stripe", "square", "paypal"]', 'Available payment providers', false);

-- Insert default admin user (password: admin123!)
INSERT INTO users (email, password_hash, first_name, last_name, role, department, is_active, email_verified) VALUES
('admin@hospitalitycrm.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/F/xGSfx0.RgQqgJLu', 'Admin', 'User', 'admin', 'administration', true, true),
('demo@venue.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/F/xGSfx0.RgQqgJLu', 'Demo', 'Manager', 'manager', 'management', true, true);

-- Insert demo venue
INSERT INTO venues (name, slug, address, contact_info, capacity, settings) VALUES
('Grand Ballroom Venue', 'grand-ballroom', 
'{"street": "123 Event Plaza", "city": "New York", "state": "NY", "zipCode": "10001", "country": "USA"}',
'{"phone": "(555) 123-4567", "email": "events@grandballroom.com", "website": "https://grandballroom.com"}',
300,
'{"currency": "USD", "timezone": "America/New_York", "serviceChargePercent": 20, "taxPercent": 8.25}'
);

-- Insert demo room
INSERT INTO venue_rooms (venue_id, name, capacity, width_ft, depth_ft, setup_styles, features) VALUES
((SELECT id FROM venues WHERE slug = 'grand-ballroom'), 'Main Ballroom', 300, 60, 40,
'["theater", "banquet", "cocktail", "classroom"]',
'["stage", "dance_floor", "built_in_av", "kitchen_access", "bar_area"]'
);

-- Grant venue access to demo users
INSERT INTO user_venue_access (user_id, venue_id, role, permissions) VALUES
((SELECT id FROM users WHERE email = 'admin@hospitalitycrm.com'), (SELECT id FROM venues WHERE slug = 'grand-ballroom'), 'admin', '["all"]'),
((SELECT id FROM users WHERE email = 'demo@venue.com'), (SELECT id FROM venues WHERE slug = 'grand-ballroom'), 'manager', '["view_dashboard", "manage_events", "manage_contacts", "view_analytics", "manage_beo_reo"]');

-- =============================================================================
-- VIEWS FOR COMMON QUERIES
-- =============================================================================

-- Project summary view
CREATE VIEW project_summary AS
SELECT 
    p.*,
    c.name as client_name,
    c.email as client_email,
    c.company as client_company,
    v.name as venue_name,
    r.name as room_name,
    COALESCE(q.total_amount, 0) as quote_total,
    q.status as quote_status,
    q.version as quote_version
FROM projects p
LEFT JOIN clients c ON p.client_id = c.id
LEFT JOIN venues v ON p.venue_id = v.id
LEFT JOIN venue_rooms r ON p.room_id = r.id
LEFT JOIN (
    SELECT DISTINCT ON (project_id) 
        project_id, 
        (pricing->>'total')::decimal as total_amount,
        status,
        version
    FROM quotes 
    ORDER BY project_id, version DESC
) q ON p.id = q.project_id;

-- KPI dashboard view
CREATE VIEW kpi_dashboard AS
SELECT 
    v.id as venue_id,
    v.name as venue_name,
    COUNT(DISTINCT p.id) as total_projects,
    COUNT(DISTINCT CASE WHEN p.lead_status = 'won' THEN p.id END) as won_projects,
    COUNT(DISTINCT CASE WHEN p.event_date >= CURRENT_DATE THEN p.id END) as upcoming_events,
    COALESCE(SUM(CASE WHEN p.lead_status = 'won' THEN p.estimated_revenue END), 0) as total_revenue,
    COALESCE(AVG(CASE WHEN p.lead_status = 'won' THEN p.estimated_revenue END), 0) as avg_event_value,
    COUNT(DISTINCT wl.id) as website_leads,
    COUNT(DISTINCT CASE WHEN wl.status = 'converted' THEN wl.id END) as converted_leads
FROM venues v
LEFT JOIN projects p ON v.id = p.venue_id
LEFT JOIN website_leads wl ON v.id = wl.venue_id AND wl.created_at >= CURRENT_DATE - INTERVAL '30 days'
WHERE v.is_active = true
GROUP BY v.id, v.name;

COMMENT ON DATABASE hospitalitycrm IS 'HospitalityCRM - Complete BEO/REO Management System Database';
