import { Request, Response } from 'express';

export class CreditController {
  public static async takeCredit(_req: Request, res: Response): Promise<void> {
    /**
     * bodyi al
     *
     * kontrolleri yap
     *
     * tarihleri hesaplayan fonksiyonu yaz
     *
     * credit oluştur
     *
     * installments oluştur
     *
     * transaction kullan
     *
     * response dön
     *
     */
    res.status(201).send({ message: 'Welcome from take credit endpoint' });
  }

  public static async getUserCreditByStatus(_req: Request, res: Response): Promise<void> {
    /**
     * user var mı yok mu kontrol et
     *
     * user varsa credits tablosundan userIdye göre filtreleyip kredilerini statülerine göre listele
     *
     * tarih nasıl isteniyor öğren
     */
    res.status(201).send({ message: 'Welcome from get user credits by status endpoint' });
  }

  public static async repayCreditInstallment(_req: Request, res: Response): Promise<void> {
    /**
     * gelen bodyde ya da parametre olarak userId alacağım installment id alacağım
     *
     * userId üzerinden credit oradan installmenta gideceğim
     *
     * eğer hatalı caseler olursa error throw edeceğim
     *
     * taksiti tamamen ödeme mi yapacak parçalı mı onu belirleyeceğiz
     *
     * taksit ödendiğinde o taksitin statusu değişmeli
     */
    res.status(201).send({ message: 'Welcomefrom repay endpoint' });
  }
}
