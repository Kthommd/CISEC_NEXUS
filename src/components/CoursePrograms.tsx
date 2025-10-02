import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, FileText, Download, Eye } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  description: string;
  credits: number;
  professor: string;
  semester: string;
}

interface CourseProgramsProps {
  onBack: () => void;
}

export function CoursePrograms({ onBack }: CourseProgramsProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses: Course[] = [
    {
      id: 'semiologia',
      name: 'Semiología',
      description: 'Estudio de los signos y síntomas de las enfermedades',
      credits: 8,
      professor: 'Dr. García Martínez',
      semester: 'Cuarto Semestre'
    },
    {
      id: 'medicina-interna-1',
      name: 'Medicina Interna I',
      description: 'Fundamentos de la medicina interna y diagnóstico',
      credits: 10,
      professor: 'Dra. López Fernández',
      semester: 'Quinto Semestre'
    },
    {
      id: 'medicina-interna-2',
      name: 'Medicina Interna II',
      description: 'Medicina interna avanzada y especialidades',
      credits: 12,
      professor: 'Dr. Rodríguez Silva',
      semester: 'Sexto Semestre'
    },
    {
      id: 'ginecologia',
      name: 'Ginecología y Obstetricia',
      description: 'Salud reproductiva femenina y atención obstétrica',
      credits: 9,
      professor: 'Dra. Morales Castro',
      semester: 'Séptimo Semestre'
    }
  ];

  const courseGradients = [
    'from-blue-500 via-cyan-500 to-teal-500',
    'from-green-500 via-emerald-500 to-lime-500', 
    'from-purple-500 via-violet-500 to-indigo-500',
    'from-pink-500 via-rose-500 to-red-500'
  ];

  const handleViewSyllabus = (course: Course) => {
    setSelectedCourse(course);
    // In a real app, this would open a PDF viewer
    alert(`Abriendo programa de ${course.name}...\n\nEn una aplicación real, esto abriría el PDF del programa académico.`);
  };

  if (selectedCourse) {
    return (
      <div className="flex-1 p-6 pb-24 overflow-y-auto">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSelectedCourse(null)}
              className="mr-3"
            >
              <ArrowLeft size={24} />
            </Button>
            <h1 className="text-xl">{selectedCourse.name}</h1>
          </div>

          {/* PDF Viewer Simulation */}
          <Card className="p-6 text-center space-y-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <FileText size={40} className="text-red-600" />
            </div>
            
            <div>
              <h2 className="text-lg mb-2">Programa Académico</h2>
              <p className="text-gray-600 text-sm mb-4">
                {selectedCourse.description}
              </p>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Profesor:</strong> {selectedCourse.professor}</p>
                <p><strong>Créditos:</strong> {selectedCourse.credits}</p>
                <p><strong>Semestre:</strong> {selectedCourse.semester}</p>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <Button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 shadow-lg">
                <Eye size={16} className="mr-2" />
                Ver Programa Completo
              </Button>
              
              <Button variant="outline" className="w-full border-purple-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50">
                <Download size={16} className="mr-2" />
                Descargar PDF
              </Button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">
                En una aplicación real, aquí se mostraría el visor de PDF integrado 
                con el programa académico completo del curso.
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 pb-24 overflow-y-auto">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="mr-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Programas de Curso</h1>
        </div>

        {/* Course List */}
        <div className="space-y-4">
          {courses.map((course, index) => (
            <Card 
              key={course.id}
              className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-white to-gray-50 shadow-lg"
              onClick={() => handleViewSyllabus(course)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{course.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                  
                  <div className="space-y-1 text-xs text-gray-500">
                    <p>{course.professor}</p>
                    <p>{course.semester} • {course.credits} créditos</p>
                  </div>
                </div>
                
                <div className="ml-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${courseGradients[index]} rounded-lg flex items-center justify-center shadow-lg`}>
                    <FileText size={24} className="text-white" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="p-4 mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 border-blue-200 shadow-lg">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 shadow-sm">
              <FileText size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-blue-800">
                Toca cualquier curso para ver su programa académico completo en formato PDF.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}