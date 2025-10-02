import {
  GraduationCap,
  MessageSquare,
  BookOpen,
  Calendar,
} from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  // Calculate semester progress (example: 60% completed)
  const semesterProgress = 60;
  const startDate = "15/08/2024";
  const endDate = "15/12/2024";

  const navigationCards = [
    {
      id: "grades",
      title: "Portal Académico",
      icon: GraduationCap,
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      description: "Ver calificaciones",
    },
    {
      id: "simulator",
      title: "Paciente Simulado",
      icon: MessageSquare,
      gradient: "from-emerald-500 via-green-500 to-lime-500",
      description: "Chatear con IA",
    },
    {
      id: "courses",
      title: "Programas de Curso",
      icon: BookOpen,
      gradient: "from-purple-500 via-violet-500 to-pink-500",
      description: "Ver programas",
    },
    {
      id: "future",
      title: "Próximamente",
      icon: Calendar,
      gradient: "from-orange-500 via-red-500 to-rose-500",
      description: "Nuevas funciones",
    },
  ];

  return (
    <div className="flex-1 p-6 pb-24 overflow-y-auto">
      <div className="max-w-md mx-auto space-y-6">
        {/* Greeting */}
        <div className="text-center pt-4">
          <h1 className="text-2xl text-gray-800">
            Bienvenido a CISEC-Nexus
          </h1>
        </div>

        {/* Progress Card */}
        <Card className="p-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl shadow-purple-200">
          <div className="text-center mb-4">
            <h2 className="text-xl mb-2">
              Progreso del Cuatrimestre
            </h2>
            <div className="text-4xl mb-3 text-white font-bold">
              {semesterProgress}%
            </div>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <Progress value={0} className="h-4 bg-white/20" />
              <div
                className="absolute inset-0 bg-white rounded-full transition-all duration-500 z-10"
                style={{ width: `${semesterProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm opacity-90">
              <span>Inicio: {startDate}</span>
              <span>Finaliza: {endDate}</span>
            </div>
          </div>
        </Card>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 gap-4">
          {navigationCards.map((card) => {
            const Icon = card.icon;

            return (
              <Card
                key={card.id}
                className={`p-6 bg-gradient-to-br ${card.gradient} text-white shadow-xl shadow-${card.id === "grades" ? "blue" : card.id === "simulator" ? "green" : card.id === "courses" ? "purple" : "orange"}-200 cursor-pointer transform transition-all duration-300 active:scale-95 hover:scale-105 hover:shadow-2xl`}
                onClick={() =>
                  card.id !== "future" && onNavigate(card.id)
                }
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <Icon size={32} className="text-white" />
                  <div>
                    <h3 className="font-medium">
                      {card.title}
                    </h3>
                    <p className="text-xs opacity-90 mt-1">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* App Info */}
        <div className="text-center text-gray-500 text-sm pt-4">
          <p>CISEC-Nexus v1.0</p>
          <p>Tu hub académico centralizado</p>
        </div>
      </div>
    </div>
  );
}