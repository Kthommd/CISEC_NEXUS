import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ArrowLeft, Lock, CheckCircle } from 'lucide-react';

interface AcademicPortalProps {
  onBack: () => void;
}

export function AcademicPortal({ onBack }: AcademicPortalProps) {
  const [code, setCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAccess = async () => {
    if (code.length !== 8) return;
    
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      if (code === '12345678') {
        setIsAuthenticated(true);
      } else {
        alert('Código incorrecto. Intenta con: 12345678');
      }
      setIsLoading(false);
    }, 1000);
  };

  const mockGrades = [
    { course: 'Semiología', grade: 85, status: 'Aprobado' },
    { course: 'Medicina Interna I', grade: 92, status: 'Aprobado' },
    { course: 'Medicina Interna II', grade: 78, status: 'Aprobado' },
    { course: 'Ginecología y Obstetricia', grade: 88, status: 'Aprobado' },
    { course: 'Farmacología', grade: 76, status: 'Aprobado' },
  ];

  return (
    <div className="flex-1 p-6 pb-24 overflow-y-auto">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="mr-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Portal Académico</h1>
        </div>

        {!isAuthenticated ? (
          /* Login Form */
          <div className="space-y-6">
            <Card className="p-6 text-center bg-gradient-to-br from-white to-blue-50 shadow-xl shadow-blue-100">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Lock size={32} className="text-white" />
                </div>
                <h2 className="text-lg mb-2">Acceso Seguro</h2>
                <p className="text-gray-600 text-sm">
                  Ingresa tu código de 8 dígitos para ver tus calificaciones
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  type="password"
                  placeholder="Código de 8 dígitos"
                  value={code}
                  onChange={(e) => setCode(e.target.value.slice(0, 8))}
                  className="text-center text-lg tracking-widest"
                  maxLength={8}
                />
                
                <Button 
                  onClick={handleAccess}
                  disabled={code.length !== 8 || isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 shadow-lg"
                >
                  {isLoading ? 'Verificando...' : 'Acceder'}
                </Button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Demo: usa el código 12345678
              </p>
            </Card>
          </div>
        ) : (
          /* Grades Display */
          <div className="space-y-4">
            <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg shadow-green-100">
              <div className="flex items-center">
                <CheckCircle size={20} className="text-green-600 mr-2" />
                <span className="text-green-800 font-medium">Acceso autorizado</span>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg mb-4">Mis Calificaciones</h2>
              
              <div className="space-y-3">
                {mockGrades.map((grade, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div>
                      <h3 className="font-medium text-sm">{grade.course}</h3>
                      <p className="text-xs text-gray-600">{grade.status}</p>
                    </div>
                    <div className={`text-lg font-medium ${
                      grade.grade >= 80 ? 'text-green-600' : 
                      grade.grade >= 70 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {grade.grade}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-lg shadow-lg">
                <h3 className="font-medium text-blue-800 mb-1">Promedio General</h3>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {Math.round(mockGrades.reduce((sum, grade) => sum + grade.grade, 0) / mockGrades.length)}
                </div>
              </div>
            </Card>

            <Button 
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="w-full"
            >
              Cerrar Sesión
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}