import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { AcademicPortal } from './components/AcademicPortal';
import { PatientSimulator } from './components/PatientSimulator';
import { CoursePrograms } from './components/CoursePrograms';
import { Navigation } from './components/Navigation';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'grades':
        return <AcademicPortal onBack={() => setActiveTab('dashboard')} />;
      case 'simulator':
        return <PatientSimulator onBack={() => setActiveTab('dashboard')} />;
      case 'courses':
        return <CoursePrograms onBack={() => setActiveTab('dashboard')} />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex flex-col max-w-md mx-auto relative">
      {/* Status bar simulation */}
      <div className="h-6 bg-gradient-to-r from-purple-500 to-blue-600"></div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {renderActiveComponent()}
      </div>

      {/* Bottom Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}