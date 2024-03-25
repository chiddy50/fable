type ChallengePayload = {
    userId: string
    title: string
    image: string
    date: string
    time: string
    currency: string
    symbol: string
    price: string
    projectId?: string
}

interface FeeCalculationResult {
    percentage: number;
    tenPercentFee: number;
    tenPercentFeeInSol: number;
    totalChargeInSol: number;
    totalChargePlusFeeInSol: number;
    totalCharge: number;
    totalChargePlusFee: number;
}