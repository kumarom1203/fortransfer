﻿//var baseUrl = "http://uatapi.webet333.com/api/v1/";
var baseUrl = "http://api.webet333.com/api/v1/";

var apiEndPoints = {
    login: "account/login",
    register: "account/register",
    forgotPassword: "account/forgot_password",
    resetPassword: "account/reset_password",
    resetPasswordData: "account/reset_password_data",
    //confirmPassword: "account/confirm_email",
    changePassword: "account/change_password",
    getProfile: "customer/profile",
    userLastTimeUpdate: "account/users/logintime/update",
    updateProfile: "customer/profile/update",
    updateBank: "customer/bank/update",

    Change918PassWordReset: "Game/Kiss918/ResetPassword",
    ChangePussy888PassWordReset: "pussy888/ResetPassword",

    socialMediaReference: "account/socialmediastatics",

    addBank: "customer/bank/register",
    userBankDetail: "customer/bank",
    walletBalance: "customer/wallet/balance",
    walletUpdateBalance: "Game/AllWalletBalance",
    restoreBalance: "Game/Balance/Restore",

    downloadLinkList: "Game/DownloadLink/list",

    depositDdl: "payments/deposit/dropdown_deposit",
    uploadReceipt: "payments/deposit/image",

    walletSelect: 'account/wallet/select',

    promotionApplyCheck: 'promotions/promotionapply/check',
    promotionApplyInsert: 'promotions/promotionapply/insert',

    withdrawListAmount: 'payments/check/withdrawamount/list',

    DepositCheckWithoutPromotion: 'payments/checkdepositwithoutpromotion',

    addDeposite: "payments/deposit",
    addWithdraw: "payments/withdraw",
    paymentTransfer: "payments/transfer",

    paymentTransferInOneAPi: "transfer/balance",

    transferHistory: "payments/transfer/retrieve",
    withdrawHistory: "payments/withdraw/retrieve",
    depositHistory: "payments/deposit/retrieve",
    transactionHistory: "payments/transactions",
    rebateHistory: "Game/Rebate/User/History",
    promotionHistory: "promotions/promotionapply/select",
    RestoreHistory: "Game/restore/list",

    AllInWallet: "Game/Balance/InWallet",

    admin_bank: "settings/admin_bank/list",
    bank: "settings/banks/list",

    promotionsList: "promotions/retrieve",

    promotionsDailyList: "promotions/daily/list",

    announcementList: "settings/announcement/user/list",

    selectUser: "Game/SelectUser",

    globalParameter: "Game/GlobalParameters",

    registerAG: "ag/register",
    loginAG: "ag/login",
    registerJoker: "Game/Joker/Register",
    registerPlaytech: "Game/Playtech/Register",
    register918Kiss: "Game/918Kiss/Register",
    registerM8: "Game/M8/Register",

    registerMaxBet: "MaxBet/Register",
    loginMaxBet: "MaxBet/Login",
    maxBetTokenUpdate:"MaxBet/token/update",
    maxBetDepositWithdrawl:"MaxBet/fundtransfer",
    getUserByMobile: "account/getuser",

    MaxBetBalanceUpdate: "MaxBet/getbalance",

    LoginRegisterTracking: "account/tracking/insert",


    mega888Register: "mega888/register",
    mega888Transfer: "mega888/deposit_withdraw",
    mega888Logout: "mega888/logout",

    sexyRegister: "sexybaccarart/register",
    sexyLogin: "sexybaccarart/login",
    sexyDeposit: "sexybaccarart/deposit",
    sexyWithdraw: "sexybaccarart/withdraw",

    saRegister: "sa/register",
    saLogin: "sa/login",
    saDeposit: "sa/deposit",
    saWithdraw: "sa/withdraw",

    pussyRegister: "pussy888/register",

    allBetRegister: "allbet/register",
    allBetLogin: "allbet/login",

    dgRegister: "dg/register",
    dgLogin: "dg/login",
    dgTransfer: "dg/transfer",

    kiss918Balance: "gamebalance/918kiss",
    mega888Balance: "gamebalance/mega888",
    jokerBalance: "gamebalance/joker",
    maxbetBalance: "gamebalance/maxbet",
    m8Balance: "gamebalance/m8",
    agBalance: "gamebalance/ag",
    playtechBalance: "gamebalance/playtech",
    dgBalance: "gamebalance/dg",
    sexyBalance: "gamebalance/sexybaccarat",
    saBalance: "gamebalance/sa",
    Pussy888Balance: "gamebalance/pussy888",
    AllBetBalance: "gamebalance/allbet",

    userDetaisSetGameBalance: "userdetails/set",

    TotalTurnover: "Game/DailyTurnover",


    SendOTP: "account/send/otp",
    VerifiedOTP: "account/verified/otp"
};