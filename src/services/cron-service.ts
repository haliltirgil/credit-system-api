/**
 * A service for scheduling cron jobs
 */
export class CronService {
  /**
   * Publishes daily job
   */
  static dailyJob() {
    const job = new CronJob('0 30 5 * * *', () => {
      // TODO: add function here
    });

    job.start();
  }
}
