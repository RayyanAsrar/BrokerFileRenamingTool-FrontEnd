export const bankTemplates = {
  anz: {
    name: "ANZ",
    template: "{Client}_{DocType}_{Issuer}_{Date}.{extensionname}",
    example: "JohnSmith_Payslip_ABCMining_Jan2025.pdf",
  },
  commonwealth: {
    name: "Commonwealth Bank",
    template: "{Client}_{DocType}_{Period}_{Issuer}.{extensionname}",
    example: "JohnSmith_BankStatement_2024-11_to_2024-12_CBA.pdf",
  },
  westpac: {
    name: "Westpac",
    template: "{Client}_{CoApplicant}_{DocType}_{Period}.{extensionname}",
    example: "JohnSmith_AishaKhan_BankStatement_2024-11_to_2024-12.pdf",
  },
  nab: {
    name: "NAB",
    template: "{Client}_{DocType}_{Date}_{Ref}.{extensionname}",
    example: "JohnSmith_Payslip_2025-01_App123.pdf",
  },
}

export const availableTokens = [
  { token: "{Client}", description: "Main applicant name" },
  { token: "{CoApplicant}", description: "Secondary applicant name" },
  { token: "{DocType}", description: "Document type (Payslip, BankStatement, ID, TaxReturn)" },
  { token: "{Issuer}", description: "Bank, employer, or ID authority" },
  { token: "{Date}", description: "Month-Year (e.g., Jan2025)" },
  { token: "{Period}", description: "Date range (2024-11_to_2024-12)" },
  { token: "{Ref}", description: "Loan/application reference ID" },
]