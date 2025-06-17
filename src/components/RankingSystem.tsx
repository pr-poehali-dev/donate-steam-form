import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface Donor {
  id: string;
  name: string;
  totalDonated: number;
  rank: string;
  level: number;
  avatar?: string;
  lastDonation: Date;
}

interface RankConfig {
  name: string;
  minAmount: number;
  color: string;
  icon: string;
  benefits: string[];
}

const ranks: RankConfig[] = [
  {
    name: "Bronze",
    minAmount: 100,
    color: "text-amber-600",
    icon: "Award",
    benefits: ["Значок в чате", "Доступ к эмоциям"],
  },
  {
    name: "Silver",
    minAmount: 500,
    color: "text-gray-400",
    icon: "Medal",
    benefits: ["Приоритет в чате", "Кастомные эмоции"],
  },
  {
    name: "Gold",
    minAmount: 1500,
    color: "text-yellow-400",
    icon: "Crown",
    benefits: ["VIP-статус", "Закрытый канал"],
  },
  {
    name: "Platinum",
    minAmount: 5000,
    color: "text-purple-400",
    icon: "Star",
    benefits: ["Модерские права", "Личные игры"],
  },
  {
    name: "Diamond",
    minAmount: 15000,
    color: "text-cyan-400",
    icon: "Gem",
    benefits: ["Все привилегии", "Админ права"],
  },
];

const mockDonors: Donor[] = [
  {
    id: "1",
    name: "ki_kira_ki",
    totalDonated: 25000,
    rank: "diamond",
    level: 15,
    lastDonation: new Date(),
  },
  {
    id: "2",
    name: "GamerPro2024",
    totalDonated: 8500,
    rank: "platinum",
    level: 12,
    lastDonation: new Date(),
  },
  {
    id: "3",
    name: "SupportKing",
    totalDonated: 3200,
    rank: "gold",
    level: 8,
    lastDonation: new Date(),
  },
  {
    id: "4",
    name: "CasualFan",
    totalDonated: 750,
    rank: "silver",
    level: 5,
    lastDonation: new Date(),
  },
  {
    id: "5",
    name: "NewDonor",
    totalDonated: 150,
    rank: "bronze",
    level: 2,
    lastDonation: new Date(),
  },
];

const RankingSystem: React.FC = () => {
  const getRankConfig = (rankName: string) => {
    return (
      ranks.find((r) => r.name.toLowerCase() === rankName.toLowerCase()) ||
      ranks[0]
    );
  };

  const getNextRank = (currentAmount: number) => {
    return ranks.find((rank) => rank.minAmount > currentAmount);
  };

  const calculateProgress = (currentAmount: number, rank: RankConfig) => {
    const nextRank = getNextRank(currentAmount);
    if (!nextRank) return 100;

    const progress =
      ((currentAmount - rank.minAmount) /
        (nextRank.minAmount - rank.minAmount)) *
      100;
    return Math.max(0, Math.min(100, progress));
  };

  return (
    <div className="space-y-6">
      {/* Топ донатеры */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Icon name="Trophy" className="text-yellow-400" />
            Топ донатеры
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockDonors.map((donor, index) => {
              const rankConfig = getRankConfig(donor.rank);
              const nextRank = getNextRank(donor.totalDonated);
              const progress = calculateProgress(
                donor.totalDonated,
                rankConfig,
              );

              return (
                <div
                  key={donor.id}
                  className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
                >
                  {/* Позиция */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center font-bold text-black">
                    {index + 1}
                  </div>

                  {/* Информация о донатере */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold">
                        {donor.name}
                      </span>
                      <Badge
                        variant="outline"
                        className={`${rankConfig.color} border-current`}
                      >
                        <Icon
                          name={rankConfig.icon as any}
                          size={12}
                          className="mr-1"
                        />
                        {rankConfig.name}
                      </Badge>
                      <span className="text-xs text-gray-400">
                        Lv.{donor.level}
                      </span>
                    </div>

                    {/* Прогресс до следующего ранга */}
                    {nextRank && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>
                            До {nextRank.name}:{" "}
                            {nextRank.minAmount - donor.totalDonated} ₽
                          </span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    )}
                  </div>

                  {/* Сумма доната */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">
                      {donor.totalDonated.toLocaleString()} ₽
                    </div>
                    <div className="text-xs text-gray-400">Всего донатов</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Система рангов */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Icon name="Shield" className="text-purple-400" />
            Система рангов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {ranks.map((rank, index) => (
              <div
                key={rank.name}
                className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700"
              >
                <div className="flex-shrink-0">
                  <Icon
                    name={rank.icon as any}
                    className={rank.color}
                    size={32}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`font-bold text-lg ${rank.color}`}>
                      {rank.name}
                    </span>
                    <Badge variant="outline" className="text-gray-300">
                      От {rank.minAmount.toLocaleString()} ₽
                    </Badge>
                  </div>

                  <div className="text-sm text-gray-400 space-y-1">
                    {rank.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Icon
                          name="Check"
                          size={14}
                          className="text-green-400"
                        />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RankingSystem;
