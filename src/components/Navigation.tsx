import { Home, GraduationCap, MessageSquare, BookOpen } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Inicio' },
    { id: 'grades', icon: GraduationCap, label: 'Notas' },
    { id: 'simulator', icon: MessageSquare, label: 'Simulador' },
    { id: 'courses', icon: BookOpen, label: 'Cursos' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-white via-purple-50 to-blue-50 border-t border-purple-200 px-4 py-2 safe-area-pb backdrop-blur-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg transform scale-110' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gradient-to-br hover:from-purple-100 hover:to-blue-100'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}