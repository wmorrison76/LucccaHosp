import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DollarSign, TrendingUp, TrendingDown, BarChart3, LineChart, PieChart, Target, Calendar, Users, Building, AlertTriangle, CheckCircle, Zap, Brain, Eye, Settings, RefreshCw, Download, Upload, Plus, Edit, MoreVertical, ArrowUp, ArrowDown, Minus, Activity, Clock, Star, Trophy, Lightbulb, Globe, Wifi, Coffee, Car, Bed, Home, Hotel, MapPin, Shield, Crown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import {
  RoomType,
  RateCode,
  DemandForecast,
  CompetitorData,
  RevenueOptimization,
  RevenueReport,
  BudgetPlan,
  defaultRoomTypes,
  defaultRateCodes,
} from "@/shared/revenue-management-types"; // ← changed from @shared/... to @/shared/...

// …the rest of your component stays exactly the same
