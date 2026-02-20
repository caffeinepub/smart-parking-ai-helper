import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Send, Camera, MapPin, AlertCircle, Mic, QrCode, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'location' | 'emergency';
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'नमस्ते 👋 कृपया अपनी समस्या लिखें या गाड़ी नंबर की पुष्टि करें।',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = '';

      if (!vehicleNumber) {
        // First message - vehicle number
        setVehicleNumber(inputValue);
        aiResponse = `धन्यवाद। यदि यह गाड़ी (${inputValue}) आपकी है, कृपया तुरंत यहाँ से हटा दें।\n\nमदद चाहिए? 'HELP' लिखें।\nEmergency हो तो 'URGENT' लिखें।`;
      } else if (inputValue.toLowerCase().includes('help') || inputValue.toLowerCase().includes('मदद')) {
        aiResponse = 'मैं आपकी कैसे मदद कर सकता हूँ?\n\n• आप अपनी लोकेशन भेज सकते हैं\n• आप इमरजेंसी बटन दबा सकते हैं\n• आप वॉइस मैसेज भेज सकते हैं\n\nकृपया बताएं आपको क्या चाहिए।';
      } else if (inputValue.toLowerCase().includes('urgent') || inputValue.toLowerCase().includes('emergency')) {
        aiResponse = '⚠️ इमरजेंसी टीम को सूचित कर दिया गया है। कृपया शांत रहें, मदद आ रही है।';
      } else {
        aiResponse = 'धन्यवाद आपके संदेश के लिए। गाड़ी के मालिक को सूचित कर दिया गया है। कृपया धैर्य रखें।';
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 800);

    setInputValue('');
  };

  const handleScanPlate = () => {
    toast.info('कैमरा खोला जा रहा है...', {
      description: 'नंबर प्लेट को स्कैन करने के लिए तैयार रहें',
    });
    // Simulate scan
    setTimeout(() => {
      const mockPlate = 'DL-' + Math.floor(1000 + Math.random() * 9000);
      setInputValue(mockPlate);
      toast.success('नंबर प्लेट स्कैन हो गई!', {
        description: mockPlate,
      });
    }, 1500);
  };

  const handleSendLocation = () => {
    const locationMessage: Message = {
      id: Date.now().toString(),
      text: '📍 लोकेशन भेजी गई',
      sender: 'user',
      timestamp: new Date(),
      type: 'location',
    };

    setMessages((prev) => [...prev, locationMessage]);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'धन्यवाद! हमने आपकी लोकेशन प्राप्त कर ली है। गाड़ी के मालिक को सूचित कर दिया गया है।',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 800);

    toast.success('लोकेशन भेज दी गई है');
  };

  const handleEmergency = () => {
    const emergencyMessage: Message = {
      id: Date.now().toString(),
      text: '🚨 इमरजेंसी अलर्ट भेजा गया',
      sender: 'user',
      timestamp: new Date(),
      type: 'emergency',
    };

    setMessages((prev) => [...prev, emergencyMessage]);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '⚠️ इमरजेंसी टीम को सूचित कर दिया गया है। कृपया शांत रहें, मदद आ रही है।',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 800);

    toast.error('इमरजेंसी अलर्ट भेजा गया!', {
      description: 'टीम को सूचित कर दिया गया है',
    });
  };

  const handleVoiceMessage = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.info('वॉइस रिकॉर्डिंग शुरू...', {
        description: 'बोलना शुरू करें',
      });
    } else {
      toast.success('वॉइस मैसेज भेज दिया गया');
      const voiceMessage: Message = {
        id: Date.now().toString(),
        text: '🎤 वॉइस मैसेज',
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, voiceMessage]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-2xl border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <QrCode className="w-6 h-6 text-primary" />
                AI Chat Assistant
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                गोपनीय और सुरक्षित संचार
              </p>
            </div>
            <Badge variant="outline" className="gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Online
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-[500px] p-6" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? message.type === 'emergency'
                          ? 'bg-destructive text-destructive-foreground shadow-lg'
                          : message.type === 'location'
                          ? 'bg-primary/90 text-primary-foreground shadow-lg'
                          : 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-muted/80 text-foreground border border-border/50'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.sender === 'user'
                          ? 'text-primary-foreground/70'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString('hi-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <Separator />

          <div className="p-4 bg-muted/20">
            <div className="flex gap-2 mb-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleScanPlate}
                className="flex-1 gap-2"
              >
                <Camera className="w-4 h-4" />
                Scan Plate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSendLocation}
                className="flex-1 gap-2"
              >
                <MapPin className="w-4 h-4" />
                Location
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleEmergency}
                className="flex-1 gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                Emergency
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant={isRecording ? 'destructive' : 'outline'}
                size="icon"
                onClick={handleVoiceMessage}
                className="shrink-0"
              >
                <Mic className={`w-4 h-4 ${isRecording ? 'animate-pulse' : ''}`} />
              </Button>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="अपना संदेश लिखें..."
                className="flex-1 bg-background"
              />
              <Button onClick={handleSendMessage} size="icon" className="shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
              <Shield className="w-3 h-3" />
              <p>आपकी गोपनीयता सुरक्षित है - कोई फ़ोन नंबर साझा नहीं किया जाता</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
