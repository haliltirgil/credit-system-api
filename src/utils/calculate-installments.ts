/**
 * Calculates equal installments for a given total amount and installment count.
 * @param totalAmount - The total amount of the debt.
 * @param installmentCount - The number of installments to divide the debt into.
 * @returns An array representing the amounts for each installment.
 */
export function calculateInstallments(totalAmount: number, installmentCount: number): number[] {
  const remainingDebt = totalAmount * 100; // Multiply by 100 for working with cents
  const oneInstallmentAmount = Math.floor(remainingDebt / installmentCount) / 100; // Calculate the amount for each installment

  const installments: number[] = [];
  let totalPayment = 0;

  for (let i = 0; i < installmentCount - 1; i++) {
    installments.push(oneInstallmentAmount);
    totalPayment += oneInstallmentAmount;
  }

  // Add the remaining amount to the last installment and adjust precision
  const lastInstallment = (totalAmount - totalPayment).toFixed(2);
  installments.push(parseFloat(lastInstallment));

  return installments;
}
