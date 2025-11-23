import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { analytics } from "@/utils/analytics";

export const TelegramBotSection = () => {
  const handleTelegramClick = () => {
    analytics.trackButtonClick('telegram_bot_cta', 'telegram_section');
    window.open('https://t.me/dilman4in1bot?start=from_landing', '_blank');
  };

  const benefits = [
    {
      icon: "Video",
      text: "Бесплатные видео-разборы реальных кейсов",
    },
    {
      icon: "TrendingUp",
      text: "Уроки по продвижению и привлечению клиентов",
    },
    {
      icon: "Workflow",
      text: "Готовые примеры автоворонок для вашей ниши",
    },
    {
      icon: "Zap",
      text: "Бонусы по трафику и рекламным каналам",
    },
    {
      icon: "Sparkles",
      text: "Новые кейсы и инсайты каждую неделю",
    },
    {
      icon: "Gift",
      text: "Эксклюзивные чек-листы и шаблоны для быстрого старта",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl border-primary/30 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 shadow-lg animate-pulse">
                <Icon name="Send" size={32} className="text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Получайте бесплатные мастер-классы и разборы в Telegram
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Присоединяйтесь к моему Telegram-боту и получите доступ к эксклюзивным материалам, которые помогут вам построить эффективные автоворонки
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Icon name={benefit.icon} size={20} className="text-primary" />
                  </div>
                  <p className="text-sm pt-2">{benefit.text}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                onClick={handleTelegramClick}
                size="lg"
                className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-right-bottom transition-all duration-500 text-lg px-8 py-6 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 hover:scale-105 animate-gradient"
              >
                <Icon name="Send" size={24} className="mr-3" />
                Получить доступ в Telegram-боте
              </Button>
              
              <p className="text-xs text-muted-foreground mt-4">
                Никакого спама — только полезный контент
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};