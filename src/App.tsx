
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import GuruBKDashboard from "./pages/dashboard/GuruBKDashboard";
import WaliKelasDashboard from "./pages/dashboard/WaliKelasDashboard";
import SiswaDashboard from "./pages/dashboard/SiswaDashboard";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Protected Dashboard Routes */}
              <Route 
                path="/dashboard/admin" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/guru-bk" 
                element={
                  <ProtectedRoute allowedRoles={['guru_bk']}>
                    <GuruBKDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/wali-kelas" 
                element={
                  <ProtectedRoute allowedRoles={['wali_kelas']}>
                    <WaliKelasDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/siswa" 
                element={
                  <ProtectedRoute allowedRoles={['siswa']}>
                    <SiswaDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
