import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface DonationData {
  id: string;
  donor: string;
  amount: number;
  message?: string;
  timestamp: Date;
  rank: string;
}

interface DonationNotificationProps {
  donation: DonationData | null;
  onClose: () => void;
}

const DonationNotification: React.FC<DonationNotificationProps> = ({
  donation,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [soundEnabled] = useState(true);

  useEffect(() => {
    if (donation) {
      setIsVisible(true);

      // Воспроизведение звука уведомления
      if (soundEnabled) {
        playNotificationSound(donation.amount);
      }

      // Автоматическое скрытие через 5 секунд
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [donation, onClose, soundEnabled]);

  const playNotificationSound = (amount: number) => {
    // Здесь будет интеграция с Web Audio API для воспроизведения звуков
    console.log(`🔊 Donation sound for ${amount}₽`);
  };

  const getRankColor = (rank: string) => {
    const colors = {
      bronze: "text-amber-600",
      silver: "text-gray-400",
      gold: "text-yellow-400",
      platinum: "text-purple-400",
      diamond: "text-cyan-400",
    };
    return colors[rank as keyof typeof colors] || "text-gray-400";
  };

  const getRankIcon = (rank: string) => {
    const icons = {
      bronze: "Award",
      silver: "Medal",
      gold: "Crown",
      platinum: "Star",
      diamond: "Gem",
    };
    return icons[rank as keyof typeof icons] || "Award";
  };

  if (!donation) return null;

  return (
    <div
      className={`
      fixed top-4 right-4 z-50 transition-all duration-300 ease-out
      ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
    `}
    >
      <Card className="bg-gradient-to-r from-purple-900/95 to-blue-900/95 border border-cyan-400 shadow-2xl shadow-cyan-400/20 min-w-[350px]">
        <div className="p-4">
          {/* Заголовок уведомления */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon
                name="Heart"
                className="text-red-400 animate-pulse"
                size={20}
              />
              <span className="text-white font-bold">Новый донат!</span>
            </div>
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Icon name="X" size={16} />
            </button>
          </div>

          {/* Информация о донатере */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
              <Icon
                name={getRankIcon(donation.rank)}
                className={getRankColor(donation.rank)}
                size={20}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">
                  {donation.donor}
                </span>
                <Badge
                  variant="outline"
                  className={`${getRankColor(donation.rank)} border-current`}
                >
                  {donation.rank.toUpperCase()}
                </Badge>
              </div>
              <div className="text-gray-300 text-sm">
                {donation.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Сумма доната */}
          <div className="text-center mb-3">
            <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text animate-pulse">
              {donation.amount} ₽
            </div>
          </div>

          {/* Сообщение от донатера */}
          {donation.message && (
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <div className="text-gray-300 text-sm italic">
                "{donation.message}"
              </div>
            </div>
          )}

          {/* Анимированные эффекты */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute top-4 right-6 w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-3 left-6 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DonationNotification;
