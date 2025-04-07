const screenNames = {
  login: 'Login',
  register: 'Register',
  registerMobileNumberScreen: 'Register MobileNumber Screen',
  createMpin: 'Create MPIN',
  forgetMpin: 'Forget MPIN',
  mpinCreated: 'MPIN Created',
  registerNow: 'Register Now',
  passportDetails: 'Passport Details',
  resetMpin: 'Reset Mpin',
  termsAndConditions: 'Terms and Condition',
  viewPurposeCode: 'View Purpose Code',
  termsAndConditionsWebView: 'Terms and Condition WebView',
  transactions: 'TransactionScreen',
  dashboard: 'Dashboard',
  dashboardDrawer: 'DashboardDrawer',
  drawer: 'Drawer',
  addbeneficiary: 'Add Beneficiary',
  beneficiaryListing: 'Beneficiary Listing',
  beneficiaryDetails: 'Beneficiary Details',
  termDepositDetails: 'Term Deposit Details',
  shareDetails: 'Share Details',
  termDepositListing: 'Term Deposit Listing',
  createTermDeposit: 'Create Term Deposit',
  createTermDepositSummary: 'Create Term Deposit Summary',
  addTermDepositNominee: 'Add Term Deposit Nominee Screen',
  termDepositNomineeDetails: 'Term Deposit Nominee Details',
  termDepositRates: 'Term Deposit Rate',
  viewTermDepositDetails: 'View Term Deposit Details',
  noInternetConnection: 'NoInternetConnectionScreen',
  inwardRemittencesScreen: 'Inward Remittence List Screen',
  inwardRemittenceNewAcceptence: 'New Inward Remittence Acceptence',
  inwardRemittenceNewSummary: 'Inward Remittence Acceptence New Summary',
  myDetails: 'My Details ',
  inwardRemittenceDetail: 'Inward Remittence Detail',
  inwardRemittenceReceipt: 'Inward Remittence Receipt',
  authenticationScreen: 'Authentication Screen',
  contactUsScreen: 'ContactUs Screen',
  preferredScreen: 'Preferred screen',
  outwardRequestCreation: 'Outword request creation',
  outwardSummaryScreen: 'Outword summary screen',
  outwardRemittanceScreen: 'Outward Remittance screen',
  outwardRemittenceDetails: 'Outward Remittence Details',
  manageNominee: 'Manage Nominee Screen',
  addManageNominee: 'Add Manage Nominee',
  discover: 'discover',
  tempCifId: 'tempCifId',
};

const stackNames = {
  registerStack: 'registerStack',
  loginStack: 'loginStack',
  dashboardStack: 'dashboardStack',
  resetmpinStack: 'ResetmpinStack',
  termDepositStack: 'termDepositStack',
  benificaryStack: 'benificaryStack',
  commonStack: 'commonStack',
  inwardRemittence: 'inwardRemittence',
  outwardRemittance: 'outwardRemittance',
  drawerStack: 'drawerStack',
  transactionsStack: 'transactionsStack',
  discoverStack: 'discoverStack',
};

const stringConstants = {
  nonOnboarded: 'NON-ONBOARDED',
};

const EventsCapturedConstants = {
  login: 'LOGIN',
  logout: 'LOGOUT',
  loginFailed: 'FAILED_TO_LOGIN',
};

const accessTypeConstants = {
  noAccess: 'No Access',
  view: 'View',
  transact: 'Transact',
};

export {
  screenNames,
  stackNames,
  stringConstants,
  EventsCapturedConstants,
  accessTypeConstants,
};
