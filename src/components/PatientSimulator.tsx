import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface PatientSimulatorProps {
  onBack: () => void;
}

export function PatientSimulator({ onBack }: PatientSimulatorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hola, soy María, tengo 45 años. He venido porque he estado sintiendo un dolor en el pecho desde hace 3 días. ¿Puede ayudarme?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      'El dolor aparece más cuando hago esfuerzo físico, como subir escaleras. Es como una presión en el centro del pecho.',
      'No, no tengo antecedentes de problemas cardíacos en mi familia. Pero sí fumo desde hace 20 años.',
      'Sí, también he sentido un poco de falta de aire, especialmente en las noches. A veces me despierto sintiéndome agitada.',
      'No estoy tomando ningún medicamento actualmente. La última vez que fui al médico fue hace 2 años.',
      'El dolor dura aproximadamente 10-15 minutos y luego se va. No he tomado nada para el dolor.',
      'Sí, he notado que me canso más fácilmente. Antes podía caminar largas distancias sin problema.',
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white shadow-lg">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack}
          className="mr-3 text-white hover:bg-white/20"
        >
          <ArrowLeft size={24} />
        </Button>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-medium">Paciente Simulado</h1>
            <p className="text-sm text-emerald-100">María, 45 años • En línea</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-blue-500' 
                  : 'bg-green-100'
              }`}>
                {message.sender === 'user' ? (
                  <User size={16} className="text-white" />
                ) : (
                  <Bot size={16} className="text-green-600" />
                )}
              </div>
              
              <div className={`p-3 rounded-2xl shadow-md ${
                message.sender === 'user'
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                  : 'bg-gradient-to-br from-white to-green-50 text-gray-800 border border-green-100'
              }`}>
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString('es-ES', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-green-50 p-3 rounded-2xl shadow-sm border border-green-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-white via-purple-50 to-transparent backdrop-blur-lg border-t border-purple-200">
        <div className="max-w-md mx-auto flex space-x-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu pregunta médica..."
            className="flex-1 bg-white/80 backdrop-blur-sm border-purple-200"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            size="icon"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}