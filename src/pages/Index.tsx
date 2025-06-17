import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PaymentIntegration from "@/components/PaymentIntegration";
import DonationNotification from "@/components/DonationNotification";
import RankingSystem from "@/components/RankingSystem";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [notification, setNotification] = useState(null);

  const quickAmounts = [100, 250, 500, 1000, 2500, 5000];

  const handlePaymentComplete = (method: string, paidAmount: number) => {
    // Создаем уведомление о донате
    const newNotification = {
      id: Date.now().toString(),
      donor: "Аноним",
      amount: paidAmount,
      message: message || undefined,
      timestamp: new Date(),
      rank: getRankByAmount(paidAmount),
    };

    setNotification(newNotification);
    setShowPayment(false);
    setAmount(0);
    setMessage("");
  };

  const getRankByAmount = (amount: number) => {
    if (amount >= 15000) return "diamond";
    if (amount >= 5000) return "platinum";
    if (amount >= 1500) return "gold";
    if (amount >= 500) return "silver";
    return "bronze";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Основная форма доната */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/95 border border-cyan-400/30 shadow-2xl shadow-cyan-400/10">
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Icon name="Gamepad2" className="text-white" size={32} />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                  Steam Донат
                </CardTitle>
                <p className="text-gray-400 mt-2">
                  Поддержи любимого стримера игровыми донатами
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Получатель */}
                <div className="space-y-2">
                  <Label
                    htmlFor="recipient"
                    className="text-white flex items-center gap-2"
                  >
                    <Icon name="User" className="text-cyan-400" size={16} />
                    Логин получателя Steam
                  </Label>
                  <div className="relative">
                    <Input
                      id="recipient"
                      value="ki_kira_ki"
                      disabled
                      className="bg-gray-800 border-gray-600 text-white pl-10 font-mono"
                    />
                    <Icon
                      name="Lock"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <Badge className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500/20 text-green-400 border-green-400/50">
                      Verified
                    </Badge>
                  </div>
                </div>

                {/* Быстрые суммы */}
                <div className="space-y-2">
                  <Label className="text-white flex items-center gap-2">
                    <Icon name="Zap" className="text-yellow-400" size={16} />
                    Быстрый выбор суммы
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {quickAmounts.map((quickAmount) => (
                      <Button
                        key={quickAmount}
                        variant={amount === quickAmount ? "default" : "outline"}
                        onClick={() => setAmount(quickAmount)}
                        className={`
                          ${
                            amount === quickAmount
                              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                              : "border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400"
                          }
                        `}
                      >
                        {quickAmount} ₽
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Ввод суммы */}
                <div className="space-y-2">
                  <Label
                    htmlFor="amount"
                    className="text-white flex items-center gap-2"
                  >
                    <Icon
                      name="DollarSign"
                      className="text-green-400"
                      size={16}
                    />
                    Или введите свою сумму
                  </Label>
                  <div className="relative">
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Введите сумму"
                      value={amount || ""}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="bg-gray-800 border-gray-600 text-white text-xl font-bold text-center"
                      min="1"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold">
                      ₽
                    </div>
                  </div>
                </div>

                {/* Сообщение */}
                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-white flex items-center gap-2"
                  >
                    <Icon
                      name="MessageSquare"
                      className="text-purple-400"
                      size={16}
                    />
                    Сообщение (необязательно)
                  </Label>
                  <textarea
                    id="message"
                    placeholder="Напишите сообщение для стримера..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white resize-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    rows={3}
                    maxLength={200}
                  />
                  <div className="text-right text-xs text-gray-400">
                    {message.length}/200
                  </div>
                </div>

                {/* Кнопка оплаты */}
                <Button
                  onClick={() => setShowPayment(true)}
                  disabled={!amount || amount < 1}
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 text-lg shadow-lg shadow-green-500/25"
                >
                  <Icon name="Gift" className="mr-2" size={20} />
                  Задонатить {amount > 0 ? `${amount} ₽` : ""}
                </Button>

                {/* Информация о комиссиях */}
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Info" className="text-blue-400" size={16} />
                    <span className="text-white font-medium">
                      Информация о платеже
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 space-y-1">
                    <div>• Минимальная сумма: 1 ₽</div>
                    <div>• Комиссия зависит от способа оплаты</div>
                    <div>• Средства поступают мгновенно</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Боковая панель с рейтингом */}
          <div className="space-y-6">
            <RankingSystem />
          </div>
        </div>

        {/* Модальное окно оплаты */}
        {showPayment && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-md">
              <div className="mb-4 text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPayment(false)}
                  className="text-white hover:text-gray-300"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <PaymentIntegration
                amount={amount}
                onPaymentComplete={handlePaymentComplete}
              />
            </div>
          </div>
        )}

        {/* Уведомления о донатах */}
        <DonationNotification
          donation={notification}
          onClose={() => setNotification(null)}
        />
      </div>
    </div>
  );
};

export default Index;
