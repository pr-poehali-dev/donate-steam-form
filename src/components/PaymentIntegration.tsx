import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  color: string;
  fees: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "qiwi",
    name: "QIWI",
    icon: "Wallet",
    color: "text-orange-500",
    fees: "2.5%",
  },
  {
    id: "sberbank",
    name: "Сбербанк",
    icon: "CreditCard",
    color: "text-green-500",
    fees: "1.5%",
  },
  {
    id: "tinkoff",
    name: "Тинькофф",
    icon: "Banknote",
    color: "text-yellow-500",
    fees: "2%",
  },
];

interface PaymentIntegrationProps {
  amount: number;
  onPaymentComplete: (method: string, amount: number) => void;
}

const PaymentIntegration: React.FC<PaymentIntegrationProps> = ({
  amount,
  onPaymentComplete,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!selectedMethod || amount <= 0) return;

    setIsProcessing(true);

    // Симуляция платежа (здесь будет реальная интеграция)
    setTimeout(() => {
      onPaymentComplete(selectedMethod, amount);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon name="CreditCard" className="text-cyan-400" />
          Выбор способа оплаты
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all
                ${
                  selectedMethod === method.id
                    ? "border-cyan-400 bg-cyan-400/10"
                    : "border-gray-600 hover:border-gray-500"
                }
              `}
              onClick={() => setSelectedMethod(method.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon
                    name={method.icon as any}
                    className={method.color}
                    size={24}
                  />
                  <span className="text-white font-medium">{method.name}</span>
                </div>
                <Badge variant="outline" className="text-gray-300">
                  Комиссия {method.fees}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {selectedMethod === "qiwi" && (
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">
              Номер телефона QIWI
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7 (XXX) XXX-XX-XX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
        )}

        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <span className="text-gray-300">К оплате:</span>
          <span className="text-2xl font-bold text-cyan-400">{amount} ₽</span>
        </div>

        <Button
          onClick={handlePayment}
          disabled={!selectedMethod || isProcessing}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          size="lg"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <Icon name="Loader2" className="animate-spin" size={20} />
              Обработка платежа...
            </div>
          ) : (
            `Оплатить ${amount} ₽`
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentIntegration;
