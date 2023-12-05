import { CronJob } from 'cron';
import { InstallmentService } from './installment-service';
/**
 * A service for scheduling cron jobs
 */
export class CronService {
  /**
   * Publishes daily job
   */
  static dailyJob() {
    const job = new CronJob('0 0 0 * * *', async () => {
      const currentDate = new Date();
      await InstallmentService.findOutOfDateInstallments(currentDate);
    });

    job.start();
  }
}
