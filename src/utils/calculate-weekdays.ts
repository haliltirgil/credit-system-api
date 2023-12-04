/**
 * TODO: write docs
 * @param currentDate
 * @param installmentCount
 * @returns
 */
export function calculateMonthWeekdays(currentDate: Date, installmentCount: number) {
  const firstInstallmentDate = new Date(currentDate);
  firstInstallmentDate.setMonth(firstInstallmentDate.getMonth() + 1);
  firstInstallmentDate.setDate(firstInstallmentDate.getDay());

  // add first installment date
  const installmentDates: Date[] = [firstInstallmentDate];

  // calculate next installment dates
  for (let i = 1; i < installmentCount; i++) {
    const nextInstallmentDate = new Date(installmentDates[i - 1]);
    // calculate next month
    nextInstallmentDate.setMonth(nextInstallmentDate.getMonth() + 1);

    // check weekends
    while (nextInstallmentDate.getDay() === 0 || nextInstallmentDate.getDay() === 6) {
      nextInstallmentDate.setDate(nextInstallmentDate.getDate() + 1);
    }

    nextInstallmentDate.setDate(firstInstallmentDate.getDay());

    while (nextInstallmentDate.getDay() === 0 || nextInstallmentDate.getDay() === 6) {
      nextInstallmentDate.setDate(nextInstallmentDate.getDate() + 1);
    }

    installmentDates.push(nextInstallmentDate);
  }

  return installmentDates;
}
