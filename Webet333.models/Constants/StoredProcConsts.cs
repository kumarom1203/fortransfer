﻿namespace Webet333.models.Constants
{
    public class StoredProcConsts
    {
        public class Global
        {
            public const string GetGlobalParamters = "[dbo].[Global_Variable_Select]";

            public const string UpdateGlobalParamters = "[dbo].[Global_Variable_Update]";

            public const string ApiLog = "[dbo].[ApiLog_Insert]";
        }

        public class Account
        {
            public const string UserICNumberInsert = "[dbo].[User_IC_Number_Insert]";

            public const string UserICImageInsert = "[dbo].[User_IC_Image_Insert]";


            public const string GenrateOtp = "[dbo].[User_OTP_Genrate]";

            public const string VerifiedOtp = "[dbo].[User_OTP_Verified]";

            public const string GameUsernameSelect = "[dbo].[User_Game_Username]";

            public const string GameBalanceInfo = "[dbo].[Users_GameBalance_Info_Select]";

            public const string SetSeedData = "[dbo].[Seed_INSERT]";

            public const string SelectLanguage = "[dbo].[Language_Select]";

            public const string GetProfile = "[dbo].[Users_Select]";

            public const string SetToken = "[dbo].[UsersAccessToken_Insert]";

            public const string UpdateToken = "[dbo].[UsersAccessToken_Update]";

            public const string SetPassword = "[dbo].[Users_Update_Password]";

            public const string EditRefreshToken = "[dbo].[UsersRefreshToken_Delete]";

            public const string SetUsers = "[dbo].[Users_Insert]";

            public const string EmailConfirmation = "[dbo].[Users_Update_EmailConfirmation]";

            public const string DashboardStats = "[dbo].[DashboardStats]";

            public const string Analytics = "[dbo].[Web_Analytics]";

            public const string GetUsersByMobile = "[dbo].[Users_Select_BY_Mobile]";

            public const string updatePasswordBymobile = "[dbo].[Users_Update_BY_Mobile]";

            public const string walletMaintenanceUpdate = "[dbo].[Wallet_Maintenance_Update]";

            public const string walletList = "[dbo].[WalletTypes_Select]";

            public const string SocialMediaStaticsInsert = "[dbo].[SocialMediaStatics_Insert]";

            public const string ReferenceKeywordList = "[dbo].[RefKeyword_Select]";

            public const string ReferenceKeywordInsert = "[dbo].[RefKeyword_Insert]";

            public const string ReferenceKeywordDelete = "[dbo].[RefKeyword_Delete]";

            public const string TrackingInsert = "[dbo].[Tracking_Insert]";

            public const string TrackingSelect = "[dbo].[Tracking_Select]";

            public const string BettingDetailsLastUpdateSelect = "[dbo].[GameBetDetails_LastUpdate_Select]";

            public const string ManagerOperationInsert = "[dbo].[Manager_Operation_Insert]";

            public const string ManagerOperationSelect = "[dbo].[Manager_Operation_Select]";

            public const string ManagerOperationUpdate = "[dbo].[Manager_Operation_Update]";

            public const string SMSUserList = "[dbo].[Sms_Users_Select]";

            public const string LastLoginTimeUpdate = "[dbo].[User_LastLoginTime_Update]";

            public const string NotificationSelect = "[dbo].[Admin_Notification_Parameter_Select]";

            public const string NotificationUpdate = "[dbo].[Admin_Notification_Parameter_Update]";
        }

        public class User
        {
            public const string GetUsersByRole = "[dbo].[Users_Select_By_Role]";

            public const string RegisterBank = "[dbo].[UsersBank_Insert_Update]";

            public const string GetWalletBalance = "[dbo].[UsersBalance_Select]";

            public const string GetUsersBank = "[dbo].[UsersBank_Select]";

            public const string ProfileUpdate = "[dbo].[Users_Update]";

            public const string ProfileUpdateStatus = "[dbo].[Users_Update_Status]";

            public const string ProfileDelete = "[dbo].[Users_Update_Delete]";


        }

        public class Payments
        {
            public const string Transaction = "[dbo].[UsersTransaction_Select]";

            public const string WalletTypes = "[dbo].[UsersDeposit_Select_Bank_Deposit_Wallet]";

            public const string WalletTypesInsert = "[dbo].[WalletTypes_Insert]";

            public const string Deposit = "[dbo].[UsersDeposit_Insert_Update]";

            public const string DepositImage = "[dbo].[UsersDeposite_Update_Image]";

            public const string DepositList = "[dbo].[UsersDeposit_Select]";

            public const string Withdrawal = "[dbo].[UsersWithdrawal_Insert_Update]";

            public const string WithdrawalList = "[dbo].[UsersWithdrawal_Select]";

            public const string Transfer = "[dbo].[UsersTransfer_Insert_Update]";

            public const string TransferList = "[dbo].[UsersTransfer_Select]";

            public const string Statement = "[dbo].[UsersTransaction_Select]";

            public const string AdjustUserBalance = "[dbo].[UsersBalance_Update]";

            public const string AdjustUserBalanceRetrive = "[dbo].[UsersBalanceAdjust_Select]";

            public const string ApprovalDurationInsert = "[dbo].[ApprovalDuration_Insert]";

            public const string ApprovalDurationSelect = "[dbo].[ApprovalDuration_Select]";

            public const string WithdrawSimilarNameSelect = "[dbo].[Withdraw_SimilarName_List]";

            public const string DepsoitWithdrawStatics = "[dbo].[User_Deppsit_Withdraw_Statics]";

            public const string DepsoitWithdrawStaticsDetails = "[dbo].[User_Deppsit_Withdraw_Statics_Details]";

            public const string TurnoverTargetWinturnUpdate = "[dbo].[Promotion_Apply_Update]";

            public const string WithdrawAmountList = "[dbo].[Withdraw_Amount_List]";

            public const string UserWalletBalanceReset = "[dbo].[Users_WalletBalance_Reset]";

            public const string UserWalletBalanceUpdate = "[dbo].[Users_WalletBalance_Update]";

            public const string DepositCheckWithoutPromotion = "[dbo].[Deposit_Check_Without_Promotion]";

        }

        public class Settings
        {
            public const string BanksRetrieve = "[dbo].[Banks_Select]";

            public const string AdminBankDetailsWithNoteTransactionLimitRetrieve = "[dbo].[AdminBanks_Select_With_Notes_TransactionLimit]";

            public const string AdminAllBank = "[dbo].[AdminBanks_Select]";

            public const string AdminBankDetailsInsertOrUpdate = "[dbo].[AdminBanks_Insert_Update]";

            public const string AdminBankDetailsDeleteOrActive = "[dbo].[AdminBanks_Activate_Delete]";

            public const string AdminBankDetailsImageUpdate = "[dbo].[AdminBanks_Update_Image]";

            public const string AnnouncementList = "[dbo].[Announcements_Select]";

            public const string AnnouncementAdd = "[dbo].[Announcements_Insert]";

            public const string AnnouncementDelete = "[dbo].[Announcements_Delete]";

            public const string AnnouncementUpdate = "[dbo].[Announcements_Update]";

        }

        public class Promotions
        {
            public const string Retrieve = "[dbo].[Promotion_Select]";

            public const string RetrieveById = "[dbo].[Promotion_Select_By_Id]";

            public const string Insert = "[dbo].[Promotion_Insert]";

            public const string Image = "[dbo].[Promotion_Update_Image]";

            public const string Delete = "[dbo].[Promotion_Delete]";

            public const string Update = "[dbo].[Promotion_Update]";

            public const string SelectDailyPromotion = "[dbo].[UsersPromotion_Select_daily]";

            public const string PromotionApplyCheck = "[dbo].[Promotion_Apply_Check]";

            public const string PromotionApplyList = "[dbo].[Promotion_Apply_Select]";

            public const string PromotionReport = "[dbo].[Admin_Promotion_Report]";

            public const string PromotionApplyInsert = "[dbo].[Promotion_Apply_Insert]";

            public const string PromotionGroupInsert = "[dbo].[PromotionGroup_Insert]";

            public const string PromotionGroupUpdate = "[dbo].[PromotionGroup_Update]";

            public const string PromotionGroupSelect = "[dbo].[PromotionGroup_SELECT]";

            public const string PromotionGroupDelete= "[dbo].[PromotionGroup_Delete]";

        }

        public class GameBalance
        {
            public const string Kiss918GameBalanceUpdate= "[dbo].[Balance_Kiss918_Update]";

            public const string Pussy888GameBalanceUpdate = "[dbo].[Balance_Pussy888_Update]";

            public const string AllBetGameBalanceUpdate = "[dbo].[Balance_AllBet_Update]";

            public const string Mega888GameBalanceUpdate= "[dbo].[Balance_MEGA_Update]";

            public const string M8GameBalanceUpdate= "[dbo].[Balance_M8_Update]";

            public const string MaxbetGameBalanceUpdate= "[dbo].[Balance_MaxBet_Update]";

            public const string AgGameBalanceUpdate= "[dbo].[Balance_AG_Update]";

            public const string PlaytechGameBalanceUpdate= "[dbo].[Balance_PlayTech_Update]";

            public const string JokerGameBalanceUpdate= "[dbo].[Balance_Joker_Update]";

            public const string DGGameBalanceUpdate = "[dbo].[Balance_DG_Update]";

            public const string SexyGameBalanceUpdate = "[dbo].[Balance_SexyBaccarat_Update]";

            public const string SABalanceUpdate = "[dbo].[Balance_SA_Update]";

        }

        public class Game
        {
            public const string RebateMainWalletDepositWithdraw = "[dbo].[Rebate_Main_Wallet_Deposit_Withdraw]";

            public const string GetAllGameUsers = "[dbo].[gameUser_Select]";

            public const string ManuallyPromotionExpiery = "[dbo].[Manually_Promotion_Expiery]";

            public const string GameLastBettingUpdate = "[dbo].[Game_LastBetting_Update]";

            public const string RestoreList = "[dbo].[Restore_Select]";

            public const string DailyTurnover = "[dbo].[Daily_Turnover]";

            public const string GameRebate = "[dbo].[Rebate_Insert_Master_AND_Details]";

            public const string ExpieryPromotionList = "[dbo].[PromotionExpieryList]";

            public const string M8GetLimit = "[dbo].[M8_Limit_Select]";

            public const string GameRebateDelete = "[dbo].[Rebate_Delete_Master_AND_Details]";

            public const string GameGetProfile = "[dbo].[Users_select_Game]";

            public const string GameRegister = "[dbo].[Check_User_Register]";

            public const string MaxBetAllUsers = "[dbo].[MaxBetUser_Select_all]";

            public const string GameJokerRegister = "[dbo].[Users_Insert_Joker]";

            public const string GamePlaytechRegister = "[dbo].[Users_Insert_Playtech]";

            public const string Game918KissRegister = "[dbo].[Users_Insert_918Kiss]";

            public const string GameAGRegister = "[dbo].[Users_Insert_AG]";

            public const string GameM8Register = "[dbo].[Users_Insert_M8]";

            public const string UsersSelectFromGame = "[dbo].[Users_Select_From_Game]";

            public const string AGBettingDetailsInsert = "[dbo].[AG_BettingDetails_Insert]";

            public const string SABettingDetailsInsert = "[dbo].[SA_BettingDetails_Insert]";

            public const string AllBetBettingDetailsInsert = "[dbo].[AllBet_BettingDetails_Insert]";

            public const string Mega88BettingDetailsInsert = "[dbo].[Mega888_BettingDetails_Insert]";

            public const string Kiss918BettingDetailsInsert = "[dbo].[Kiss918_BettingDetails_Insert]";

            public const string Pussy888BettingDetailsInsert = "[dbo].[Pussy888_BettingDetails_Insert]";

            public const string JokerBettingDetailsInsertUpdate = "[dbo].[Joker_BettingDetails_Insert_Update]";

            public const string DGBettingDetailsInsertUpdate = "[dbo].[DG_BettingDetails_Insert]";

            public const string SexyBettingDetailsInsert= "[dbo].[SexyBaccarat_BettindDetails_Insert]";

            public const string PlaytechBettingDetailsInsertUpdate = "[dbo].[Playtech_BettingDetails_Insert]";

            public const string MaxBetBettingDetailsInsertUpdate = "[dbo].[MaxBet_BettingDetails_Insert]";

            public const string GameRebateCalculate = "[dbo].[GameRebate_Calculate]";

            public const string GetGameCategory = "[dbo].[GameCategory_Select]";

            public const string GetRebateList = "[dbo].[RebateMaster_Select]";

            public const string GetRebateDetailsList = "[dbo].[RebateDetails_Select]";

            public const string M8BettingDetailsInsert = "[dbo].[M8_BettingDetails_Insert]";

            public const string UsersRebateHistory = "[dbo].[Users_Rebate_history]";

            public const string UsersBalanceRestore = "[dbo].[Users_Balance_Restore]";

            public const string DownloadLink_Update = "[dbo].[DownloadLink_Update]";

            public const string DownloadLink_Select = "[dbo].[DownloadLink_Select]";

            public const string BettingDetails_AG = "[dbo].[AG_BettingDetails_By_Username]";

            public const string BettingDetails_DG = "[dbo].[DG_BettingDetails_By_Username]";

            public const string BettingDetails_Joker = "[dbo].[Joker_BettingDetails_By_Username]";

            public const string BettingDetails_Kiss918 = "[dbo].[KISS918_BettingDetails_By_Username]";

            public const string BettingDetails_M8 = "[dbo].[M8_BettingDetails_By_Username]";

            public const string BettingDetails_Maxbet = "[dbo].[Maxbet_BettingDetails_By_Username]";

            public const string BettingDetails_Playtech = "[dbo].[Playtech_BettingDetails_By_Username]";

            public const string BettingDetails_Mega888 = "[dbo].[Mega888_BettingDetails_By_Username]";

            public const string BettingDetails_Pussy = "[dbo].[PUSSY_BettingDetails_By_Username]";

            public const string BettingDetails_SA = "[dbo].[SA_BettingDetails_By_Username]";

            public const string BettingDetails_Sexy = "[dbo].[Sexy_BettingDetails_By_Username]";


        }

        public class MaxBetGame
        {
            public const string GameMaxBetRegister = "[dbo].[Users_Insert_MaxBet]";

            public const string MaxBetGetUserByToken = "[dbo].[Users_Select_MaxBet_Token]";

            public const string MaxBetTokenUpdate = "[dbo].[Users_Update_Token_MaxBet]";

            public const string MaxBetBalanceUpdate = "[dbo].[Users_MaxBet_BalanceUpdate]";

            public const string GetUserList = "[dbo].[MaxBetUser_Select]";

            public const string SetLimit = "[dbo].[MaxBetUser_SetLimit]";

            public const string GetMaxBetDefaultLimit = "[dbo].[Maxbet_Limit_Select]";

            public const string GetUserVendorIdList = "[dbo].[MaxBetUser_vendorId_Select]";
        }

        public class M8
        {
            public const string M8UsesSetLimit = "[dbo].[M8_User_Select_SetLimit]";

            public const string M8SetLimit = "[dbo].[M8_User_SetLimit]";
        }

        public class Mega888
        {
            public const string Register = "[dbo].[Mega888Users_Insert]";

            public const string LoginCheck = "[dbo].[Mega888_Login_Check]";
        }

        public class DG
        {
            public const string Register = "[dbo].[Users_Insert_DG]";
        }

        public class AllBet
        {
            public const string Register = "[dbo].[Users_Insert_AllBet]";
        }

        public class WM
        {
            public const string Register = "[dbo].[Users_Insert_WM]";
        }

        public class Pussy888
        {
            public const string Register = "[dbo].[Users_Insert_Pussy888]";

            public const string PasswordUpdate = "[dbo].[User_PussyPassword_Reset]";
        }

        public class SexyBaccarat
        {
            public const string Register = "[dbo].[SexyBaccarat_Users_Insert]";
        }

        public class SA
        {
            public const string Register = "[dbo].[SAUsers_Insert]";
        }

        public class TransferMoney
        {
            public const string UserDetails = "[dbo].[User_TransferInformation_Select]";

            public const string MainWalletTransfer = "[dbo].[MainWallet_Withdraw_Deposit]";

            public const string TransferInsert = "[dbo].[UsersTransfer_Insert]";
        }
    }
}