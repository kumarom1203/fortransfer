﻿//#region Onload
$(document).ready(function () {
    if (GetLocalStorage('currentUser') !== null) {
        BankList();
        UserBankDetails();
        GetProfile();
    }
});
//#endregion

//#region Users Bank Details
async function UserBankDetails() {
    LoaderShow();
    var model = {
    };
    var res = await PostMethod(apiEndPoints.userBankDetail, model);
    if (res !== null && res !== undefined) {
        result = res.data;
        userBank = res.data;
        for (var i = 0; i < userBank.length; i++) {
            UserBankName = userBank[i].bankName;
            UserAccountNumber = userBank[i].accountNo;
            UserAccountName = userBank[i].accountName;
        }
    }
    WithdrawUsernameSet();
    LoaderHide();
}
//#endregion Users Bank Details

//#region Withdraw Username
async function WithdrawUsernameSet() {
    if (location.href.toLowerCase().includes("mobile/withdraw"))
        if (UserAccountName != null && UserAccountName != undefined && UserAccountName != "") {
            document.getElementById("lbl_accountHolder").disabled = true;
            document.getElementById("lbl_accountHolder").value = UserAccountName;
        }
}
//#endregion Withdraw Username

//#region BankList
var depositMethodId, UserBankName, SelectBankWithdrawl, SelectBankDeposit, UserAccountNumber, UserAccountName, SelectPromotion = "";

TableData = new Array();

async function BankList() {

    var res = await GetMethod(apiEndPoints.depositDdl);

    if (res !== null && res !== undefined) {

        var DepsoitBankList = document.getElementById("Deposit_bank_list");
        var name = res.data.bankDetails;
        depositMethodId = res.data.depositMethods.filter(x => x.method == 'Bank Transfer')[0].id;
        var firstSelect = true;
        if (DepsoitBankList != null)
            $.each(name, function () {
                if (firstSelect) {
                    DepsoitBankList.innerHTML += '<li onclick="LiSelectDepositFunction(\'' + this.id + '\',\'' + this.accountName + '\',\'' + this.accountNo + '\')" id="' + this.id + '" ><input type="radio" name="rtest" checked="" id="bankListId" values="' + this.id + '"/><label for="' + this.id + '" title="state" class="bank-list-deposit blk-text"><figure><img class="icon-bank-info" src="' + this.bankIconLogo + '" alt="Maybank" /></figure><p>' + this.bankName + '</p></label></li>';
                    firstSelect = false;
                    LiSelectDepositFunction(this.id, this.accountName, this.accountNo);
                }
                else {
                    DepsoitBankList.innerHTML += '<li onclick="LiSelectDepositFunction(\'' + this.id + '\',\'' + this.accountName + '\',\'' + this.accountNo + '\')" id="' + this.id + '" ><input type="radio" name="rtest" checked="" id="bankListId" values="' + this.id + '"/><label for="' + this.id + '" title="state" class="bank-list-deposit blk-text"><figure><img class="icon-bank-info" src="' + this.bankIconLogo + '" alt="Maybank" /></figure><p>' + this.bankName + '</p></label></li>';

                }
            });

        var wallet = res.data.walletTypes;
        $.each(wallet, function () {
            $("#ddl_transferFromWallet").append($("<option />").val(this.id).text(this.walletType));
        });

        var x = screen.width;
        var model = {
            id: null,
            ismobile: true
        };
        var resPanel = await PostMethodWithParameter(apiEndPoints.promotionsDailyList, model);
        var promotion = resPanel.data;
        var promotionList = document.getElementById('promotion');
        var promotionInfo = document.getElementById('promotionInfo');
        if (promotionList !== null) {
            for (l = 0; l < promotion.length; l++) {
                //promotionList.innerHTML += '<li class="mar-btm-ten border" id=\'' + promotion[l].id + '\' onclick="LiSelectPromotion(\'' + promotion[l].id + '\')"><input type="radio" name="promotion" id="promotionId" value=\'' + promotion[l].id + '\'/><label><div class="promotion-content" for="rad1"><img class="full-img" src=\'' + promotion[l].bannerImage + '\' /><p class="no-mar">' + promotion[l].promotionTitle + '</p></div></label></li>';
                promotionList.innerHTML += '<li class="mar-btm-ten border" id=\'' + promotion[l].id + '\' onclick="LiSelectPromotion(\'' + promotion[l].id + '\')"><input type="radio" name="promotion" id="promotionId" value=\'' + promotion[l].id + '\'/><label><div class="promotion-content" for="rad1"><img class="full-img" src=\'' + promotion[l].bannerImage + '\' /><div class="deposit-promotion-details"><span class="fa fa-question-circle question-mark" data-toggle="modal" data-target="#promotionDetails" onclick="PromotionDetails(\'' + promotion[l].id + 'D' + '\')" style="margin-right:10px;"></span><p class="no-mar">' + promotion[l].promotionTitle + '</p></div></div></label></li>';
                promotionInfo.innerHTML += '<div id=\'' + promotion[l].id + 'D' + '\' style="display:none;">' + promotion[l].description + '</div>'
            }
        }

        var withdrawBankList = document.getElementById('withdraw_bank_list');
        var BankList = await GetMethod(apiEndPoints.bank);
        bankList = BankList.data;
        if (withdrawBankList != null) {
            for (i = 0; i < BankList.data.length; i++) {
                if (UserBankName != BankList.data[i].bankName)
                    withdrawBankList.innerHTML += '<li onclick="LISlectFunction(\'' + BankList.data[i].id + '\',\'' + BankList.data[i].bankName + '\')" id="' + BankList.data[i].id + '" ><input type="radio" name="rtest" checked="" id="bankListId" values="' + BankList.data[i].id + '"/><label for="' + BankList.data[i].id + '" title="state"><figure><img class="icon-bank-info" src="' + BankList.data[i].Logo + '" alt="Maybank" /></figure><p>' + BankList.data[i].bankName + '</p></label></li>';
                else {
                    withdrawBankList.innerHTML += '<li class="active" onclick="LISlectFunction(\'' + BankList.data[i].id + '\',\'' + BankList.data[i].bankName + '\')" id="' + BankList.data[i].id + '" ><input type="radio" name="rtest" checked="" id="bankListId" values="' + BankList.data[i].id + '"/><label for="' + BankList.data[i].id + '" title="state"><figure><img class="icon-bank-info" src="' + BankList.data[i].Logo + '" alt="Maybank" /></figure><p>' + BankList.data[i].bankName + '</p></label></li>';
                    LISlectFunction(BankList.data[i].id, BankList.data[i].bankName);
                }
            }
        }
    }
}
//#endregion

function PromotionDetails(id) {
    var divsToHide = document.getElementById("promotionInfo");
    var child = divsToHide.childNodes[1];
    for (var i = 1; i < divsToHide.childNodes.length; i++) {
        divsToHide.childNodes[i].style.display = "none";
    }
    var promotionInfo = document.getElementById(id);
    promotionInfo.style.display = "block";
    promotionInfo.style.marginRight = "10px";
}


async function CheckWithdrawAmountList() {
    var model = {}
    var WithdrawAmountList = await PostMethodWithParameter(apiEndPoints.withdrawListAmount, model);
    document.getElementById("WithdrawAmount").innerHTML = "MYR " + WithdrawAmountList.data.totalAmount;
    if (WithdrawAmountList.data.totalAmount > 0) {
        document.getElementById("lock_icon").style.display = "none";
        document.getElementById("WithdrawAmount").disabled = false;
    }
    else {
        document.getElementById("unlock_icon").style.display = "none";
        document.getElementById("WithdrawAmount").disabled = true;
    }

    var contentToRemove = document.querySelectorAll("#navWithdrawAmount");
    $(contentToRemove).remove();

    $("#tbl_WithdrawAmountList").find("tr:gt(0)").remove();
    var RowCount = 0;
    var table = document.getElementById("tbl_WithdrawAmountList");
    var result = WithdrawAmountList.data.list;
    for (i = 0; i < result.length; i++) {
        var row = table.insertRow(RowCount + 1);
        $("#tbl_WithdrawAmountList").addClass('white-bg');
        $("#tbl_WithdrawAmountList td").addClass('half-width text-center white-bg');
        row.insertCell(0).innerHTML = i + 1;
        row.insertCell(1).innerHTML = result[i].title;
        row.insertCell(2).innerHTML = result[i].withdrawAmount;
        row.insertCell(3).innerHTML = result[i].created;
        row.insertCell(4).innerHTML = result[i].status;
        RowCount++;
    }
    $('.total-available-withdraw-amount').remove();
    $('#tbl_WithdrawAmountList').after('<div class="total-available-withdraw-amount"><p>Total Available Withdraw Amount : ' + WithdrawAmountList.data.totalAmount + '<p></div>');
    var pageNum;
    $('#tbl_WithdrawAmountList').after('<div id="navWithdrawAmount"  class="pagination"></div>');
    var rowsShown = 11;
    var rowsTotal = $('#tbl_WithdrawAmountList thead tr').length;
    var numPages = rowsTotal / rowsShown;
    for (i = 0; i < numPages; i++) {
        pageNum = i + 1;
        $('#navWithdrawAmount').append('<a class="button" href="#History" rel="' + i + '">' + pageNum + '</a> ');
    }
    $('#tbl_WithdrawAmountList thead tr').hide();
    $('#tbl_WithdrawAmountList thead tr').slice(0, rowsShown).show();
    $('#navWithdrawAmount a:first').addClass('active');
    $('#navWithdrawAmount a').bind('click', function () {
        $('#navWithdrawAmount a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#tbl_WithdrawAmountList thead tr:gt(0)').css('opacity', '0.0').hide().slice(startItem, endItem).
            css('display', 'table-row').animate({ opacity: 1 }, 300);
    });
    if (pageNum > 10)
        $("#navWithdrawAmount").addClass("expand");

}


//#region GetProfile
var User_BankName;
async function GetProfile() {
    LoaderShow();
    var res = await GetMethod(apiEndPoints.getProfile);
    User_BankName = res.data.name;;
    SetLocalStorage('918Username', res.data.username918);
    LoaderHide();
}
//#endregion

//#region CopyText in Deposit
function copyText(id) {
    if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(id));
        range.select();
    } else if (window.getSelection) {
        var range1 = document.createRange();
        range1.selectNode(document.getElementById(id));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range1);
    }
    var copyText = document.getElementById(id);
    document.execCommand("Copy");
}
//#endregion CopyText in Deposit

//#region Select Deposit Bank
function LiSelectDepositFunction(id, accountName, accountNumber) {
    $('#Deposit_bank_list li.active').removeClass('active');
    var d = document.getElementById(id);
    d.classList.add("active");
    SelectBankDeposit = id;
    document.getElementById('account_name').innerHTML = accountName;
    document.getElementById('account_number').innerHTML = accountNumber;
}
//#endregion Select Deposit Bank

//#region Select Withdraw Bank
function LISlectFunction(id, bankName) {
    $('#withdraw_bank_list li.active').removeClass('active');
    var w = document.getElementById(id);
    w.classList.add("active");
    SelectBankWithdrawl = id;

    var _userBank;
    $.each(userBank, function () {
        if (bankName == this.bankName) {
            _userBank = this.bankName
            UserAccountNumber = this.accountNo
        }
    });

    if (bankName != _userBank) {
        var AccountNumber = document.getElementById("txt_withdrawalAccountNumber");
        AccountNumber.value = "";
        AccountNumber.disabled = false;
    }
    else {
        var AccountNumber1 = document.getElementById("txt_withdrawalAccountNumber");
        AccountNumber1.value = UserAccountNumber;
        AccountNumber1.disabled = true;
    }
}
//#endregion select withdraw bank

//#region set Value in Deposit Amount
function setValue(i) {
    switch (i) {
        case 50:
            document.getElementById("txt_amount").value = 50;
            break;
        case 100:
            document.getElementById("txt_amount").value = 100;
            break;
        case 300:
            document.getElementById("txt_amount").value = 300;
            break;
        case 500:
            document.getElementById("txt_amount").value = 500;
            break;
        case 1000:
            document.getElementById("txt_amount").value = 1000;
            break;
    }
}
//#endregion set Value in Deposit Amount

//#region Promotion Select
function LiSelectPromotion(id) {
    $('#promotion li.active').removeClass('active');
    if (id === SelectPromotion) {
        SelectPromotion = "";
    }
    else {
        if (id !== null) {

            var p = document.getElementById(id);
            p.classList.add("active");
            SelectPromotion = id;
        }
        else {

            SelectPromotion = "";
        }
    }
}
//#endregion Promotion Select

//#region ResetForm
function reset(i) {
    if (i === 1) {
        document.getElementById("txt_datetime").value = "";
        document.getElementById("txt_amount").value = "";
        document.getElementById("txt_reference_number").value = "";
        var node = document.getElementById("selectedFiles");
        node.innerHTML = "";

        $('#Depsoit_bank_list li.active').removeClass('active');
        SelectBankDeposit = "";

        TableData = [];
        LiSelectPromotion(null);
        files.length = 0;   //Remove image file from array
    }
    if (i === 2) {
        $('#withdraw_bank_list li.active').removeClass('active');
        SelectBankWithdrawl = "";
        document.getElementById("txt_withdrawalAmount").value = "";
        document.getElementById("txt_withdrawalAccountNumber").value = "";
    }
    if (i === 3) {
        document.getElementById("walletBalance").innerHTML = "From Wallet";
        document.getElementById("txt_transferAmount").placeholder = "Max Limit: From Wallet";
        document.getElementById("txt_transferAmount").value = "";

        document.getElementById("formTransfer").reset();
        $('#ddl_transferToWallet option:not(:first)').remove();
    }
    if (i === 4) {
        $('#txt_currentPassword').val('');
        $('#txt_newPassword').val('');

    }
}
//#endregion

//#region UploadReceipt
async function handleFileSelect1(id) {
    if (filter_array(TableData).length === 0) {
        ShowError(ChangeErroMessage("receipt_required_error"));
    } else {
        var model = {
            id: id,
            images: filter_array(TableData)
        };
        var res = await PostMethod(apiEndPoints.uploadReceipt, model);
        if (res !== null && res !== undefined) {
            ShowSuccess(res.message);
        }
    }
}

const readUploadedFileAsDataURL = (inputFile) => {
    const temporaryFileReader = new FileReader();
    return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException("Problem parsing input file."));
        };
        temporaryFileReader.onload = () => {
            resolve(temporaryFileReader.result);
        };
        temporaryFileReader.readAsDataURL(inputFile);
    });
};

async function loadImage() {
    selDiv.innerHTML = "";
    for (var j = 0; j < files.length; j++) {
        var base = await readUploadedFileAsDataURL(files[j]);
        TableData[j] = {
            base64images: base
        };
        selDiv.innerHTML += '<li id="li' + j + '" value=' + j + ' class="element">' + files[j].name + '<button onclick="btn(' + j + ')">X</button>' + '</li>';
    }
}


function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
    for (var i = 0; i < arraytosearch.length; i++) {
        if (arraytosearch[i][key] === valuetosearch) {
            return i;
        }
    }
    return null;
}

function btn(j) {
    var index = functiontofindIndexByKeyValue(files, name, files[j].name);
    files.splice(j, 1);
    loadImage();
    TableData.splice(j, 1);
}

var selDiv = "";
document.addEventListener("DOMContentLoaded", init, false);
function init() {
    if (document.querySelector('#receipt') !== null) {
        document.querySelector('#receipt').addEventListener('change', handleFileSelect, false);
        selDiv = document.querySelector("#selectedFiles");
    }
}

var files = [];
async function handleFileSelect(e) {
    if (!e.target.files) return;
    if (!e.target.files[0].type.includes("image") && !e.target.files[0].type.includes("pdf")) return ShowError(ChangeErroMessage("file_format_error"));
    selDiv.innerHTML = "";
    var allFiles = e.target.files;

    for (var i = 0; i < allFiles.length; i++) {
        files.push(allFiles[i]);
    }
    loadImage();

    var list = document.getElementById('selectedFiles');
    list.addEventListener('click', function (e) {
        if (e.target && e.target.nodeName === "BUTTON") {
            e.target.parentNode.remove();
        }
    });
}

//#endregion UploadReceipt

//#region Filter Array
function filter_array(test_array) {
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];
    while (++index < arr_length) {
        var value = test_array[index];
        if (value) {
            result[++resIndex] = value;
        }
    }
    return result;
}
//#endregion Filter Array

//#region Deposit
var depositModel;
async function Deposit() {
    if ($('#txt_amount').val() <= 30000 && $('#txt_amount').val() >= 10) {
        LoaderShow();
        if ($('#txt_amount').val() > 0) {
            var radioValue = $("input[name='promotion']:checked").val();
            var model = {
                bankId: SelectBankDeposit,
                amount: $('#txt_amount').val(),
                depositMethodId: depositMethodId,
                referenceNo: $('#txt_reference_number').val(),
                depositeTime: Date.parse(document.getElementById("txt_datetime").value.replace(" ", "T")).toString(),
                promotionId: SelectPromotion,
                promotionApplyEligible: false
            };
            if (model.bankId === null) {
                LoaderHide();
                return ShowError(ChangeErroMessage("plz_selet_bnk_error"));
            }

            if (model.depositeTime === "NaN") {
                LoaderHide();
                return ShowError(ChangeErroMessage("select_date_time_error"));
            }

            if (model.referenceNo === "") {
                LoaderHide();
                return ShowError(ChangeErroMessage("refer_no_error"));
            }

            if (filter_array(TableData).length === 0) {
                LoaderHide();
                return ShowError(ChangeErroMessage("receipt_required_error"));
            }

            if (model.promotionId != "") {
                await WalletBalance();
                var promotionModel = {
                    userid: null,
                    amount: Number(model.amount)
                };
                var walletData = await PostMethodWithParameter(apiEndPoints.promotionApplyCheck, promotionModel);

                if (walletData.data.IsPending == false) {
                    if (walletData.data.InMaintenance == false) {
                        if (walletData.data.CheckPromotionApply === true && walletData.data.TotalPromotionRow > 0) {
                            if (confirm(ChangeErroMessage("promo_apply_balance_error"))) {
                                model.promotionApplyEligible = true;
                                //var promotionModel2 = {
                                //    userid: null,
                                //    amount: Number(model.amount),
                                //    promotionid: model.promotionId
                                //};
                                //await PostMethodWithParameter(apiEndPoints.promotionApplyInsert, promotionModel2);
                            }
                            else {
                                model.promotionId = "";
                            }
                        }
                        else {
                            if (walletData.data.Staus != null && walletData.data.CheckPromotionRemind == true) {
                                LoaderHide();
                                return ShowError(ChangeErroMessage("promot_active_error"));
                            }

                            if (walletData.data.CheckPromotionRemind == true) {
                                //LoaderHide();
                                model.promotionApplyEligible = true;
                                depositModel = model;
                                //$("#promotionExpieryModel").modal();
                                //return 0;
                            }

                            if (walletData.data.Staus == null) {
                                model.promotionApplyEligible = true;
                                //var promotionModel2 = {
                                //    userid: null,
                                //    amount: Number(model.amount),
                                //    promotionid: model.promotionId
                                //};
                                //await PostMethodWithParameter(apiEndPoints.promotionApplyInsert, promotionModel2);
                            }

                          
                        }
                    }
                    else {
                        LoaderHide();
                        return ShowError(ChangeErroMessage("game_in_maintenance_new_promotion"));
                    }
                }
                else {
                    LoaderHide();
                    return ShowError(ChangeErroMessage("pending_sports_deposit_error"));
                }
            }
            else {
                let data = {
                }
                var walletData = await PostMethodWithParameter(apiEndPoints.DepositCheckWithoutPromotion, data);
                if (walletData.data.CheckPopupWithoutPromotion == true) {
                    LoaderHide();
                    depositModel = model;
                    //$("#WithoutPromotionDeposit").modal();
                    //return 0;
                }
                else {
                    LoaderHide();
                    depositModel = model;
                    $("#promotionNavigate").modal();
                    return 0;
                }
            }



            if (filter_array(TableData).length === 0) {
                ShowError(ChangeErroMessage("receipt_required_error"));
            } else {
                depositModel = model;
                await DepositAfterPromotion();
            }
        }
        else {
            ShowError(ChangeErroMessage("amount_greater_zero_error"));
        }
        LoaderHide();
    }
    else {
        ShowError(ChangeErroMessage("min_max_amount_error"));
    }
}

async function PromotionApplyInsert() {
    
    //var promotionModel2 = {
    //    userid: null,
    //    amount: Number(depositModel.amount),
    //    promotionid: depositModel.promotionId
    //};
    //await PostMethodWithParameter(apiEndPoints.promotionApplyInsert, promotionModel2);
    await DepositAfterPromotion();
}

async function DepositAfterPromotion() {
    LoaderShow();
    var res = await PostMethod(apiEndPoints.addDeposite, depositModel);
    if (res !== null && res !== undefined) {
        await handleFileSelect1(res.data.id);
        //ShowSuccess(res.message);
        reset(1);
        setTimeout(function () {
            document.getElementById('promotion').innerHTML = "";
            document.getElementById('Deposit_bank_list').innerHTML = "";
            SelectBankDeposit = null;
            BankList();
        }, 2000);
    }
    LoaderHide();
}
//#endregion Deposit 

//#region Withdrawal
async function Withdrawal() {
    if ($('#txt_withdrawalAmount').val() <= 30000 && $('#txt_withdrawalAmount').val() >= 10) {
        LoaderShow();
        //await regisrationGame();
        if ($('#txt_withdrawalAmount').val() > 0) {
            var model = {
                bankId: SelectBankWithdrawl,
                amount: $('#txt_withdrawalAmount').val(),
                accountNumber: $('#txt_withdrawalAccountNumber').val(),
                //accountName: UserAccountName != null && UserAccountName != undefined && UserAccountName != "" ? UserAccountName : $('#lbl_accountHolder').val()
                accountName: User_BankName
            };

            if (model.bankId === "" || model.bankId === null || model.bankId === undefined) {
                LoaderHide();
                return ShowError(ChangeErroMessage("bnk_name_required_error"));
            }
            if (model.amount === "") {
                LoaderHide();
                return ShowError(ChangeErroMessage("amt_req_error"));
            }

            if (model.accountNumber === "") {
                LoaderHide();
                return ShowError(ChangeErroMessage("acc_no_req_error"));
            }

            if (model.amount < 0) {
                LoaderHide();
                return ShowError(ChangeErroMessage("amount_greater_zero_error"));
            }

            var promotionModel = {
                userid: null,
                amount: Number(model.amount)
            };

            //var CheckPromotionApply = await PostMethodWithParameter(apiEndPoints.promotionApplyCheck, promotionModel);
            //if (CheckPromotionApply.data.Staus != null && CheckPromotionApply.data.TotalPromotionRow > 0) {
            //    LoaderHide();
            //    return ShowError(ChangeErroMessage("promo_ongoing_withdraw_error"));
            //}

            var res = await PostMethod(apiEndPoints.addWithdraw, model);
            if (res !== null && res !== undefined) {
                ShowSuccess(res.message);
                reset(2);
                setTimeout(function () {
                    WalletBalance();
                    CheckWithdrawAmountList()
                }, 2000);
            }
        }
        else {
            ShowError(ChangeErroMessage("amount_greater_zero_error"));
        }
        LoaderHide();
    }
    else {
        ShowError(ChangeErroMessage("min_max_amount_error"));
    }
}
//#endregion

//#region TransferAmount
async function Checkbalance() {
    if ($('#ddl_transferFromWallet').val() != "") {
        if ($('#ddl_transferToWallet').val() != "") {
            if ($('#txt_transferAmount').val() >= 1) {
                LoaderShow();
                //WalletBalance();
                await TransferAmount();
                LoaderHide();
            }
            else {
                ShowError(ChangeErroMessage("min1_max1000_amount_error"));
            }
        }
        else {
            ShowError(ChangeErroMessage("select_to_wallet_error"));
        }
    }
    else {
        ShowError(ChangeErroMessage("select_from_wallet_error"));
    }
}

async function WithdrawFromWallet(nameFromWallet, model, usernamePrifix) {
    var response = {
        gameName: "",
        gameResponse: "",
        gameError: ""
    };

    var username = GetLocalStorage('currentUserName');
    var AgUsername = usernamePrifix.agGamePrefix + username;
    var JokerUsername = usernamePrifix.jokerGamePrefix + username;
    var M8Username = usernamePrifix.m8GamePrefix + username;
    var PlaytechUsername = usernamePrifix.playtechGamePrefix + username;

    switch (nameFromWallet) {
        case 'PlayTech Wallet':
            try {
                var resultPlaytechLogout = await PlaytechPostMethod(PlaytechConstAction.Logout + "playername=" + PlaytechUsername);
                var resultPlaytech = await PlaytechPostMethod(PlaytechConstAction.WithdrawAmount + "playername=" + PlaytechUsername + '&amount=' + model.amount + '&' + PlaytechConstParameter.adminname);
                if (resultPlaytech.error === true || resultPlaytech.error === undefined) {
                    response.gameName = "PlayTech Wallet";
                    response.gameResponse = resultPlaytech;
                    response.gameError = resultPlaytech;
                }
            }
            catch{
                response.gameName = "PlayTech Wallet";
                response.gameResponse = null;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
        case 'Joker Wallet':
            try {
                var jokerWithdrawalperameter = 'Amount=-' + model.amount + '&Method=TC&Timestamp=' + timestamp + '&Username=' + JokerUsername;
                var resultJokerWithdrawal = await JokerPostMethod('?' + jokerConstParameter.AppID + '&' + 'Signature=' + generateSignature(jokerMethodConst.TransferCredit, JokerUsername, null, '-' + model.amount), jokerWithdrawalperameter);
                if (resultJokerWithdrawal.Credit === undefined) {
                    response.gameName = "Joker Wallet";
                    response.gameResponse = resultJokerWithdrawal;
                    response.gameError = resultJokerWithdrawal.Message;
                }
            }
            catch{
                response.gameName = "Joker Wallet";
                response.gameResponse = null;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
        case 'M8 Wallet':
            try {
                var resultM8Deposit = await callMe(M8ConstAction.withdrawalAction + "&" + M8ConstParameter.secret + "&" + M8ConstParameter.agent + "&" + "username=" + M8Username + "&" + "serial=" + generateGuid() + "&amount=" + model.amount);
                if (resultM8Deposit.response.errcode != "0") {
                    response.gameName = "M8 Wallet";
                    response.gameResponse = resultM8Deposit;
                    response.gameError = resultM8Deposit.response.errtext;
                }
            }
            catch{
                response.gameName = "M8 Wallet";
                response.gameResponse = null;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
        case 'AG Wallet':
            try {
                var resultAGDeposit = await AGPostMethod(AGActionConst.TransferCredit + "&" + AGConstParameter.VendorID + "&" + AGConstParameter.OperatorID + "&" + AGcurrencyListConst.MYR + "&" + "user_id=" + AgUsername + '&credit=' + model.amount + '&billno=' + generate(12) + '&type=OUT');
                if (resultAGDeposit.error_code != "0") {
                    response.gameName = "AG Wallet";
                    response.gameResponse = resultAGDeposit;
                    response.gameError = resultAGDeposit.message;
                }
            }
            catch{
                response.gameName = "AG Wallet";
                response.gameResponse = null;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
        case '918Kiss Wallet':
            try {
                await _918KissPostMethod("account.ashx?" + _918KissActionConst.DisableAccount + '&userName=' + GetLocalStorage('918Username') + '&time=' + UTCTime + '&authcode=swQjTbHQdnAHUyfvgMdN&sign=' + generateHasValue(GetLocalStorage('918Username')));
                setTimeout(function () {
                }, 2000);
                await _918KissPostMethod("account.ashx?" + _918KissActionConst.DisableAccount + '&userName=' + GetLocalStorage('918Username') + '&time=' + UTCTime + '&authcode=swQjTbHQdnAHUyfvgMdN&sign=' + generateHasValue(GetLocalStorage('918Username')));
                var result981KissDeposit = await _918KissPostMethod("setScore.ashx?" + _918KissActionConst.Deposite_WithDraw + '&scoreNum=-'
                    + model.amount + '&userName=' + GetLocalStorage('918Username') + '&ActionUser=' + GetLocalStorage('918Username') + '&ActionIp=192.0.1&time=' + UTCTime + '&authcode=swQjTbHQdnAHUyfvgMdN&sign=' + generateHasValue(GetLocalStorage('918Username')));
                if (result981KissDeposit.success != true) {
                    response.gameName = "918Kiss Wallet";
                    response.gameResponse = result981KissDeposit;
                    response.gameError = result981KissDeposit.msg;
                }
            }
            catch{
                response.gameName = "918Kiss Wallet";
                response.gameResponse = null;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
        case 'MaxBet Wallet':
            try {
                let WithdrawlModel = {
                    userid: "",
                    amount: model.amount,
                    method: 0
                };
                var maxbetResult = await MaxBetPostMethod(apiEndPoints.maxBetDepositWithdrawl, WithdrawlModel);
                if (maxbetResult.data.error_code !== 0) {
                    response.gameName = "MaxBet Wallet";
                    response.gameResponse = maxbetResult;
                    response.gameError = maxbetResult.data.message;
                }
            }
            catch{
                response.gameName = "MaxBet Wallet";
                response.gameResponse = null;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
        case 'Mega888 Wallet':
            let mega888Model = {
                amount: model.amount,
                method: 1
            };
            try {
                var mega888Result = await PostMethodWithParameter(apiEndPoints.mega888Transfer, mega888Model);
                if (mega888Result.data.error != null) {
                    response.gameName = "Mega888 Wallet";
                    response.gameResponse = mega888Result;
                    response.gameError = mega888Result.data.error.message;
                }
            }
            catch{
                response.gameName = "Mega888 Wallet";
                response.gameResponse = null;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
        case 'DG Wallet':
            let dgModel = {
                amount: model.amount,
                method: "Withdraw"
            };
            try {
                var dgResult = await PostMethodWithParameter(apiEndPoints.dgTransfer, dgModel);
                if (dgResult.data.codeId != 0) {
                    response.gameName = "DG Wallet";
                    response.gameResponse = dgResult;
                    response.gameError = ChangeErroMessage("trans_not_completd_error");
                }
            }
            catch{
                response.gameName = "DG Wallet";
                response.gameResponse = null;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
        case 'Sexy Wallet':
            let SexyModel = {
                amount: model.amount,
            };
            try {
                var sexyResult = await PostMethodWithParameter(apiEndPoints.sexyWithdraw, SexyModel);
                if (sexyResult.data.status != "0000") {
                    response.gameName = "Sexy Wallet";
                    response.gameResponse = sexyResult;
                    response.gameError = sexyResult.data.desc;
                }
            }
            catch{
                response.gameName = "Sexy Wallet";
                response.gameResponse = null;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
        case 'SA Wallet':
            let SaModel = {
                amount: model.amount,
            };
            try {
                var SAResult = await PostMethodWithParameter(apiEndPoints.saWithdraw, SaModel);
                if (SAResult.data.status != "0") {
                    response.gameName = "SA Wallet";
                    response.gameResponse = SAResult;
                    response.gameError = SAResult.data.message;
                }
            }
            catch{
                response.gameName = "SA Wallet";
                response.gameResponse = null;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
    }
    return response;
}

async function DepositInWallet(nameToWallet, model, usernamePrifix) {
    var response = {
        gameName: "",
        gameResponse: "",
        gameError: ""
    };

    var username = GetLocalStorage('currentUserName');
    var AgUsername = usernamePrifix.agGamePrefix + username;
    var JokerUsername = usernamePrifix.jokerGamePrefix + username;
    var M8Username = usernamePrifix.m8GamePrefix + username;
    var PlaytechUsername = usernamePrifix.playtechGamePrefix + username;

    switch (nameToWallet) {
        case 'PlayTech Wallet':
            try {
                var resultPlaytechLogoutDeposit = await PlaytechPostMethod(PlaytechConstAction.Logout + "playername=" + PlaytechUsername);
                var resultPlaytechDeposit = await PlaytechPostMethod(PlaytechConstAction.DepositeAmount + "playername=" + PlaytechUsername + '&amount=' + model.amount + '&' + PlaytechConstParameter.adminname);
                if (resultPlaytechDeposit.error === true || resultPlaytechDeposit.error === undefined) {
                    response.gameName = "PlayTech Wallet";
                    response.gameResponse = resultPlaytechDeposit;
                    response.gameError = resultPlaytechDeposit;
                }
            }
            catch{
                response.gameName = "PlayTech Wallet";
                response.gameResponse = null;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
        case 'Joker Wallet':
            try {
                var jokerWithdrawalperameterDeposit = 'Amount=' + model.amount + '&Method=TC&Timestamp=' + timestamp + '&Username=' + JokerUsername;
                var resultJokerDeposit = await JokerPostMethod('?' + jokerConstParameter.AppID + '&' + 'Signature=' + generateSignature(jokerMethodConst.TransferCredit, JokerUsername, null, model.amount), jokerWithdrawalperameterDeposit);
                if (resultJokerDeposit.Credit === undefined) {
                    response.gameName = "Joker Wallet";
                    response.gameResponse = resultJokerDeposit;
                    response.gameError = resultJokerDeposit.Message;
                }
            }
            catch{
                response.gameName = "Joker Wallet";
                response.gameResponse = null;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
        case 'M8 Wallet':
            try {
                var resultM8Deposit = await callMe(M8ConstAction.depositAction + "&" + M8ConstParameter.secret + "&" + M8ConstParameter.agent + "&" + "username=" + M8Username + "&" + "serial=" + generateGuid() + "&amount=" + model.amount);
                if (resultM8Deposit.response.errcode != "0") {
                    response.gameName = "M8 Wallet";
                    response.gameResponse = resultM8Deposit;
                    response.gameError = resultM8Deposit.response.errtext;
                }
            }
            catch{
                response.gameName = "M8 Wallet";
                response.gameResponse = null;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
        case 'AG Wallet':
            try {
                var resultAGDeposit = await AGPostMethod(AGActionConst.TransferCredit + "&" + AGConstParameter.VendorID + "&" + AGConstParameter.OperatorID + "&" + AGcurrencyListConst.MYR + "&" + "user_id=" + AgUsername + '&credit=' + model.amount + '&billno=' + generate(12) + ' & type=IN');
                if (resultAGDeposit.error_code != "0") {
                    response.gameName = "AG Wallet";
                    response.gameResponse = resultAGDeposit;
                    response.gameError = resultAGDeposit.message;
                }
            }
            catch{
                response.gameName = "AG Wallet";
                response.gameResponse = null;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
        case '918Kiss Wallet':
            try {
                await _918KissPostMethod("account.ashx?" + _918KissActionConst.DisableAccount + '&userName=' + GetLocalStorage('918Username') + '&time=' + UTCTime + '&authcode=swQjTbHQdnAHUyfvgMdN&sign=' + generateHasValue(GetLocalStorage('918Username')));
                setTimeout(function () {
                }, 2000);
                await _918KissPostMethod("account.ashx?" + _918KissActionConst.DisableAccount + '&userName=' + GetLocalStorage('918Username') + '&time=' + UTCTime + '&authcode=swQjTbHQdnAHUyfvgMdN&sign=' + generateHasValue(GetLocalStorage('918Username')));
                var result981KissDeposit = await _918KissPostMethod("setScore.ashx?" + _918KissActionConst.Deposite_WithDraw + '&scoreNum='
                    + model.amount + '&userName=' + GetLocalStorage('918Username') + '&ActionUser=' + GetLocalStorage('918Username') + '&ActionIp=192.0.1&time=' + UTCTime + '&authcode=swQjTbHQdnAHUyfvgMdN&sign=' + generateHasValue(GetLocalStorage('918Username')) + '');
                if (result981KissDeposit.success != true) {
                    response.gameName = "918Kiss Wallet";
                    response.gameResponse = result981KissDeposit;
                    response.gameError = result981KissDeposit.msg;
                }
            }
            catch{
                response.gameName = "918Kiss Wallet";
                response.gameResponse = null;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
        case 'MaxBet Wallet':
            var maxbetResult;
            try {
                let DepositModel = {
                    userid: "",
                    amount: model.amount,
                    method: 1
                };
                maxbetResult = await MaxBetPostMethod(apiEndPoints.maxBetDepositWithdrawl, DepositModel);
                if (maxbetResult.data.error_code !== 0) {
                    response.gameName = "MaxBet Wallet";
                    response.gameResponse = maxbetResult;
                    response.gameError = maxbetResult.data.message;
                }
            }
            catch{
                response.gameName = "MaxBet Wallet";
                response.gameResponse = maxbetResult;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
        case 'Mega888 Wallet':
            let mega888Model = {
                amount: model.amount,
                method: 0
            };
            try {
                var mega888Result = await PostMethodWithParameter(apiEndPoints.mega888Transfer, mega888Model);
                if (mega888Result.data.error != null) {
                    response.gameName = "Mega888 Wallet";
                    response.gameResponse = mega888Result;
                    response.gameError = mega888Result.data.error.message;
                }
            }
            catch{
                response.gameName = "Mega888 Wallet";
                response.gameResponse = null;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
        case 'DG Wallet':
            let dgModel = {
                amount: model.amount,
                method: "Depsoit"
            };
            try {
                var dgResult = await PostMethodWithParameter(apiEndPoints.dgTransfer, dgModel);
                if (dgResult.data.codeId != 0) {
                    response.gameName = "DG Wallet";
                    response.gameResponse = dgResult;
                    response.gameError = ChangeErroMessage("trans_not_completd_error");
                }
            }
            catch{
                response.gameName = "DG Wallet";
                response.gameResponse = null;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
        case 'Sexy Wallet':
            let SexyModel = {
                amount: model.amount,
            };
            try {
                var sexyResult = await PostMethodWithParameter(apiEndPoints.sexyDeposit, SexyModel);
                if (sexyResult.data.status != "0000") {
                    response.gameName = "Sexy Wallet";
                    response.gameResponse = sexyResult;
                    response.gameError = sexyResult.data.desc;
                }
            }
            catch{
                response.gameName = "Sexy Wallet";
                response.gameResponse = null;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
        case 'SA Wallet':
            let SaModel = {
                amount: model.amount,
            };
            try {
                var SAResult = await PostMethodWithParameter(apiEndPoints.saDeposit, SaModel);
                if (SAResult.data.status != "0") {
                    response.gameName = "SA Wallet";
                    response.gameResponse = SAResult;
                    response.gameError = SAResult.data.message;
                }
            }
            catch{
                response.gameName = "SA Wallet";
                response.gameResponse = null;
                response.gameError = ChangeErroMessage("trans_not_completd_error");
            }
            break;
    }
    return response;
}

async function TransferAmount() {
    LoaderShow();
    // Game register
    //await regisrationGame();
    var modelBalance = {};
    // check insert amount is gereate then 0
    if ($('#txt_transferAmount').val() > 0) {
        // get all wallete balance
        var resBalance = await PostMethod(apiEndPoints.walletBalance, modelBalance);
        var model = {
            fromWalletId: $('#ddl_transferFromWallet').val(),
            toWalletId: $('#ddl_transferToWallet').val(),
            amount: Number($('#txt_transferAmount').val())
        };

        //Get the Wallet Name
        var valueFromWalletName = resBalance.data.filter(function (walletName) { return walletName.walletId === model.fromWalletId; });
        var valueToWalletName = resBalance.data.filter(function (wallet) { return wallet.walletId === model.toWalletId; });


        if (Number($('#txt_transferAmount').val()) <= Number(valueFromWalletName[0].amount)) {
            if (valueFromWalletName.length !== 0 && valueToWalletName.length !== 0) {
                var nameFromWallet = valueFromWalletName[0].walletName;

                var res = await PostMethod(apiEndPoints.paymentTransferInOneAPi, model);
                if (res !== null && res !== undefined) {
                    ShowSuccess(res.message);
                    reset(3);
                    setTimeout(function () {
                        WalletBalance();
                    }, 2000);
                }

                ////Withdraw from Wallet
                //var withdrawResponse = await WithdrawFromWallet(nameFromWallet, model, usernamePrifix);
                ////check withdraw succesfully or not
                //if (withdrawResponse.gameError === "" && withdrawResponse.gameName === "" && withdrawResponse.gameResponse === "") {
                //    var nameToWallet = valueToWalletName[0].walletName;
                //    // Deposit In Wallet
                //    var depositResponse = await DepositInWallet(nameToWallet, model, usernamePrifix);
                //    //check Deposit succesfully or not
                //    if (depositResponse.gameError === "" && depositResponse.gameName === "" && depositResponse.gameResponse === "") {

                //        //Insert transfer row In database
                //        var res = await PostMethod(apiEndPoints.paymentTransfer, model);
                //        if (res !== null && res !== undefined) {
                //            ShowSuccess(res.message);
                //            LoaderHide();
                //            reset(3);
                //            setTimeout(function () {
                //                WalletBalance();
                //            }, 2000);
                //        }
                //    }
                //    else {
                //        // deposit when ToWallete not succesfull Deposit
                //        var despositCheck = await DepositInWallet(nameFromWallet, model, usernamePrifix);
                //        //check Depsoit Succesfully or not 
                //        if (despositCheck.gameError !== "" && despositCheck.gameName !== "" && despositCheck.gameResponse !== "") {
                //            // Transfer In main Wallet
                //            model.toWalletId = MainWalleteId[0].walletId
                //            await PostMethod(apiEndPoints.paymentTransfer, model);
                //        }
                //        return ShowError(depositResponse.gameName + " Depsoit Api Failed \n" + depositResponse.gameError);
                //    }
                //}
                //else {
                //    return ShowError(withdrawResponse.gameName + " Withdraw Api Failed \n" + withdrawResponse.gameError);
                //}
            }
        }
        else {
            ShowError(ChangeErroMessage("Insufficient_balance_wallet"));
        }
    }
    else {
        ShowError(ChangeErroMessage("amount_greater_zero_error"));
    }
    LoaderHide();
}

function generate(n) {
    var add = 1, max = 12 - add;
    if (n > max)
        return this.generate(max) + this.generate(n - max);
    max = Math.pow(10, n + add);
    var min = max / 10;
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
    return ("" + number).substring(add);
}

function generateGuid() {
    var result, i, j;
    result = '';
    for (j = 0; j < 32; j++) {
        if (j === 8 || j === 12 || j === 16 || j === 20)
            result = result + '-';
        i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
        result = result + i;
    }
    return result;
}
//#endregion

//#region DepositHistory
async function DepositHistory() {
    LoaderShow();
    var model = {};
    var res = await PostMethod(apiEndPoints.depositHistory, model);
    var result = res.data;
    var depositHistory = document.getElementById("depositHistory");
    if (result.length > 0) {
        for (i = 0; i < result.length; i++) {
            if (result[i].verified === "approved")
                depositHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-1 display-flex"><div class="back-btn rotate"><a href=""><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div></div><div class="col-xs-4 display-flex"><div class="game-name"><p>' + result[i].walletName + '</p><div class="game-time">' + result[i].orderId + '</div><div class="game-date">' + (result[i].created).replace("T", " ") + '</div></div></div><div class="col-xs-4 display-flex"><p class="bank-name-detail">' + result[i].bankName + '</p><div class="bank-name-amount">' + '+' + parseFloat(result[i].amount).toFixed(2) + '</div></div><div class="col-xs-2"><div class="success-btn text-success">' + result[i].verified + '</div></div></div>'

            if (result[i].verified === "rejected")
                depositHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-1 display-flex"><div class="back-btn rotate"><a href=""><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div></div><div class="col-xs-4 display-flex"><div class="game-name"><p>' + result[i].walletName + '</p><div class="game-time">' + result[i].orderId + '</div><div class="game-date">' + (result[i].created).replace("T", " ") + '</div></div></div><div class="col-xs-4 display-flex"><p class="bank-name-detail">' + result[i].bankName + '</p><div class="bank-name-amount">' + '+' + parseFloat(result[i].amount).toFixed(2) + '</div></div><div class="col-xs-2"><div class="success-btn reject-btn">' + result[i].verified + '</div></div></div>'

            if (result[i].verified === "pending")
                depositHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-1 display-flex"><div class="back-btn rotate"><a href=""><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div></div><div class="col-xs-4 display-flex"><div class="game-name"><p>' + result[i].walletName + '</p><div class="game-time">' + result[i].orderId + '</div><div class="game-date">' + (result[i].created).replace("T", " ") + '</div></div></div><div class="col-xs-4 display-flex"><p class="bank-name-detail">' + result[i].bankName + '</p><div class="bank-name-amount">' + '+' + parseFloat(result[i].amount).toFixed(2) + '</div></div><div class="col-xs-2"><div class="success-btn pending-btn">' + result[i].verified + '</div></div></div>'
        }
    }
    else {
        depositHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-12 display-flex"><p class="bank-name-detail text-center mar-top-15">No Deposit History Found</p></div></div>'

    }
    LoaderHide();
}
//#endregion

//#region WithdrawHistory
async function WithdrawHistory() {
    LoaderShow();
    var model = {};
    var res = await PostMethod(apiEndPoints.withdrawHistory, model);
    var result = res.data;
    var withdrawHistory = document.getElementById("withdrawHistory");
    if (result.length > 0) {
        for (i = 0; i < result.length; i++) {
            if (result[i].verified === "approved")
                withdrawHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-1 display-flex"><div class="back-btn rotate"><a href=""><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div></div><div class="col-xs-4 display-flex"><div class="game-name"><p>' + result[i].walletName + '</p><div class="game-time">' + result[i].orderId + '</div><div class="game-date">' + (result[i].created).replace("T", " ") + '</div></div></div><div class="col-xs-4 display-flex"><p class="bank-name-detail">' + result[i].bankName + '</p><div class="bank-name-amount">' + '-' + parseFloat(result[i].withdrawalAmount).toFixed(2) + '</div></div><div class="col-xs-2"><div class="success-btn text-success">' + result[i].verified + '</div></div></div>'

            if (result[i].verified === "rejected")
                withdrawHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-1 display-flex"><div class="back-btn rotate"><a href=""><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div></div><div class="col-xs-4 display-flex"><div class="game-name"><p>' + result[i].walletName + '</p><div class="game-time">' + result[i].orderId + '</div><div class="game-date">' + (result[i].created).replace("T", " ") + '</div></div></div><div class="col-xs-4 display-flex"><p class="bank-name-detail">' + result[i].bankName + '</p><div class="bank-name-amount">' + '+' + parseFloat(result[i].withdrawalAmount).toFixed(2) + '</div></div><div class="col-xs-2"><div class="success-btn reject-btn">' + result[i].verified + '</div></div></div>'

            if (result[i].verified === "pending")
                withdrawHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-1 display-flex"><div class="back-btn rotate"><a href=""><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div></div><div class="col-xs-4 display-flex"><div class="game-name"><p>' + result[i].walletName + '</p><div class="game-time">' + result[i].orderId + '</div><div class="game-date">' + (result[i].created).replace("T", " ") + '</div></div></div><div class="col-xs-4 display-flex"><p class="bank-name-detail">' + result[i].bankName + '</p><div class="bank-name-amount">' + '-' + parseFloat(result[i].withdrawalAmount).toFixed(2) + '</div></div><div class="col-xs-2"><div class="success-btn pending-btn">' + result[i].verified + '</div></div></div>'
        }
    }
    else {
        withdrawHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-12 display-flex"><p class="bank-name-detail text-center mar-top-15">No Withdraw History Found</p></div></div>'

    }
    LoaderHide();
}
//#endregion

//#region TransferHistory
async function TransferHistory() {
    LoaderShow();
    var model = {};
    var res = await PostMethod(apiEndPoints.transferHistory, model);
    var result = res.data;
    var transferHistory = document.getElementById("transferHistory");
    if (result.length > 0) {
        for (i = 0; i < result.length; i++) {
            if (result[i].verified === "approved")
                transferHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-1 display-flex"><div class="back-btn rotate"><a href=""><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div></div><div class="col-xs-4 display-flex"><div class="game-name"><p>' + result[i].fromWallet + '</p><div class="game-time">' + result[i].orderId + '</div><div class="game-date">' + (result[i].created).replace("T", " ") + '</div></div></div><div class="col-xs-4 display-flex"><p class="bank-name-detail">' + result[i].toWallet + '</p><div class="bank-name-amount">' + '+' + parseFloat(result[i].amount).toFixed(2) + '</div></div><div class="col-xs-2"><div class="success-btn text-success">' + result[i].verified + '</div></div></div>'

            if (result[i].verified === "rejected")
                transferHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-1 display-flex"><div class="back-btn rotate"><a href=""><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div></div><div class="col-xs-4 display-flex"><div class="game-name"><p>' + result[i].fromWallet + '</p><div class="game-time">' + result[i].orderId + '</div><div class="game-date">' + (result[i].created).replace("T", " ") + '</div></div></div><div class="col-xs-4 display-flex"><p class="bank-name-detail">' + result[i].toWallet + '</p><div class="bank-name-amount">' + '+' + parseFloat(result[i].amount).toFixed(2) + '</div></div><div class="col-xs-2"><div class="success-btn reject-btn">' + result[i].verified + '</div></div></div>'

            if (result[i].verified === "pending")
                transferHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-1 display-flex"><div class="back-btn rotate"><a href=""><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div></div><div class="col-xs-4 display-flex"><div class="game-name"><p>' + result[i].fromWallet + '</p><div class="game-time">' + result[i].orderId + '</div><div class="game-date">' + (result[i].created).replace("T", " ") + '</div></div></div><div class="col-xs-4 display-flex"><p class="bank-name-detail">' + result[i].toWallet + '</p><div class="bank-name-amount">' + '+' + parseFloat(result[i].amount).toFixed(2) + '</div></div><div class="col-xs-2"><div class="success-btn pending-btn">' + result[i].verified + '</div></div></div>'
        }
    }
    else {
        transferHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-12 display-flex"><p class="bank-name-detail text-center mar-top-15">No Transfer History Found</p></div></div>'

    }
    LoaderHide();
}
//#endregion

//#region PromotionHistory
async function PromotionHistory() {
    LoaderShow();
    var model = {};
    var res = await PostMethodWithParameter(apiEndPoints.promotionHistory, model);
    var result = res.data;
    var promotionHistory = document.getElementById("promotionHistory");
    if (result.length > 0) {
        for (i = 0; i < result.length; i++) {
            if (result[i].Staus === "Completed")
                promotionHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-1 display-flex"><div class="back-btn rotate"><a href=""><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div></div><div class="col-xs-4 display-flex"><div class="game-name"><p>' + result[i].Title + '</p><div class="game-time">' + parseFloat(result[i].UserTurnover).toFixed(2) + '</div><div class="game-date">' + (result[i].Created).replace("T", " ") + '</div></div></div><div class="col-xs-4 display-flex"><p class="bank-name-detail">' + result[i].TurnoverTime + '</p><div class="bank-name-amount">' + parseFloat(result[i].TurnoverTarget).toFixed(2) + '</div></div><div class="col-xs-2"><p class="bank-name-detail">' + result[i].WinTurn + '</p><div class="bank-name-amount">' + parseFloat(result[i].TurnTarget).toFixed(2) + '</div > <div class="success-btn text-success">' + result[i].Staus + '</div></div ></div > '

            if (result[i].Staus === "Expired")
                promotionHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-1 display-flex"><div class="back-btn rotate"><a href=""><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div></div><div class="col-xs-4 display-flex"><div class="game-name"><p>' + result[i].Title + '</p><div class="game-time">' + parseFloat(result[i].UserTurnover).toFixed(2) + '</div><div class="game-date">' + (result[i].Created).replace("T", " ") + '</div></div></div><div class="col-xs-4 display-flex"><p class="bank-name-detail">' + result[i].TurnoverTime + '</p><div class="bank-name-amount">' + parseFloat(result[i].TurnoverTarget).toFixed(2) + '</div></div><div class="col-xs-2"><p class="bank-name-detail">' + result[i].WinTurn + '</p><div class="bank-name-amount">' + parseFloat(result[i].TurnTarget).toFixed(2) + '</div><div class="success-btn reject-btn">' + result[i].Staus + '</div></div ></div > '

            if (result[i].Staus === "Manually Expired")
                promotionHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-1 display-flex"><div class="back-btn rotate"><a href=""><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div></div><div class="col-xs-4 display-flex"><div class="game-name"><p>' + result[i].Title + '</p><div class="game-time">' + parseFloat(result[i].UserTurnover).toFixed(2) + '</div><div class="game-date">' + (result[i].Created).replace("T", " ") + '</div></div></div><div class="col-xs-4 display-flex"><p class="bank-name-detail">' + result[i].TurnoverTime + '</p><div class="bank-name-amount">' + parseFloat(result[i].TurnoverTarget).toFixed(2) + '</div></div><div class="col-xs-2"><p class="bank-name-detail">' + result[i].WinTurn + '</p><div class="bank-name-amount">' + parseFloat(result[i].TurnTarget).toFixed(2) + '</div><div class="success-btn reject-btn">' + result[i].Staus + '</div></div ></div > '

            if (result[i].Staus === "Active")
                promotionHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-1 display-flex"><div class="back-btn rotate"><a href=""><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div></div><div class="col-xs-4 display-flex"><div class="game-name"><p>' + result[i].Title + '</p><div class="game-time">' + parseFloat(result[i].UserTurnover).toFixed(2) + '</div><div class="game-date">' + (result[i].Created).replace("T", " ") + '</div></div></div><div class="col-xs-4 display-flex"><p class="bank-name-detail">' + result[i].TurnoverTime + '</p><div class="bank-name-amount">' + parseFloat(result[i].TurnoverTarget).toFixed(2) + '</div></div><div class="col-xs-2"><p class="bank-name-detail">' + result[i].WinTurn + '</p><div class="bank-name-amount">' + parseFloat(result[i].TurnTarget).toFixed(2) + '</div><div class="success-btn pending-btn">' + result[i].Staus + '</div></div ></div > '
            if (result[i].Staus === "Pending")
                promotionHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-1 display-flex"><div class="back-btn rotate"><a href=""><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div></div><div class="col-xs-4 display-flex"><div class="game-name"><p>' + result[i].Title + '</p><div class="game-time">' + parseFloat(result[i].UserTurnover).toFixed(2) + '</div><div class="game-date">' + (result[i].Created).replace("T", " ") + '</div></div></div><div class="col-xs-4 display-flex"><p class="bank-name-detail">' + result[i].TurnoverTime + '</p><div class="bank-name-amount">' + parseFloat(result[i].TurnoverTarget).toFixed(2) + '</div></div><div class="col-xs-2"><p class="bank-name-detail">' + result[i].WinTurn + '</p><div class="bank-name-amount">' + parseFloat(result[i].TurnTarget).toFixed(2) + '</div><div class="success-btn pending-btn" style="color:Blue;">' + result[i].Staus + '</div></div ></div > '
        }
    }
    else {
        promotionHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-12 display-flex"><p class="bank-name-detail text-center mar-top-15">No Promotion History Found</p></div></div>'

    }
    LoaderHide();
}
//#endregion

//#region StatementHistory
async function StatementHistory() {
    LoaderShow();
    var model = {};
    var res = await PostMethodWithParameter(apiEndPoints.transactionHistory, model);
    var result = res.data;
    var statementHistory = document.getElementById("statementHistory");
    if (result.length > 0) {
        for (i = 0; i < result.length; i++) {
            statementHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-1 display-flex"><div class="back-btn rotate"><a href=""><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div></div><div class="col-xs-4 display-flex"><div class="game-name"><p>' + result[i].debitFrom + '</p><div class="game-time">' + result[i].transactionNo + '</div><div class="game-date">' + (result[i].created).replace("T", " ") + '</div></div></div><div class="col-xs-4 display-flex"><p class="bank-name-detail">' + result[i].creditTo + '</p><div class="bank-name-amount">' + result[i].amount + '</div></div><div class="col-xs-2"><div class="success-btn text-success">' + result[i].transactionType + '</div><div class="text-primary">' + parseFloat(result[i].currentBalance).toFixed(2) + '</div></div></div>'

        }
    }
    else {
        statementHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-12 display-flex"><p class="bank-name-detail text-center mar-top-15">No Statement History Found</p></div></div>'

    }
    LoaderHide();
}
//#endregion

//#region RebateHistory
async function RebateHistory() {
    LoaderShow();
    var model = {};
    var res = await PostMethodWithParameter(apiEndPoints.rebateHistory, model);
    var result = res.data;
    var rebateHistory = document.getElementById("rebateHistory");
    if (result.length > 0) {
        for (i = 0; i < result.length; i++) {
            rebateHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-1 display-flex"><div class="back-btn rotate"><a href=""><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div></div><div class="col-xs-4 display-flex"><div class="game-name"><p>' + result[i].GameName + '</p><div class="game-time">' + parseFloat(result[i].Turnover).toFixed(2) + '</div><div class="game-date">' + (result[i].Created).replace("T", " ") + '</div></div></div><div class="col-xs-4 display-flex"><p class="bank-name-detail">' + parseFloat(result[i].Rolling).toFixed(2) + '</p><div class="bank-name-amount">' + parseFloat(result[i].Bet).toFixed(2); + '</div></div><div class="col-xs-2"><div class="success-btn text-success">' + parseFloat(result[i].WinLose).toFixed(2) + '</div><div class="text-primary">' + parseFloat(result[i].CommAmount).toFixed(2); + '</div></div></div>'
        }
    }
    else {
        rebateHistory.innerHTML += '<div class="row transfer-content"><div class="col-xs-12 display-flex"><p class="bank-name-detail text-center mar-top-15">No Rebate History Found</p></div></div>'

    }
    LoaderHide();
}
//#endregion

//#region TransferValidation
async function select() {
    LoaderShow();
    await TransferValidation();
    var fromSel = document.getElementById("ddl_transferFromWallet");
    $('#ddl_transferToWallet').html('');
    if (fromSel.value !== null) {
        var res = await GetMethod(apiEndPoints.depositDdl);
        var wallet = res.data.walletTypes;
        var setAmount = false;
        var modelBalance = {};
        var fromSel1 = $('#ddl_transferFromWallet').val();
        var resBalance = await PostMethod(apiEndPoints.walletBalance, modelBalance);
        var valueFromWalletName = resBalance.data.filter(function (walletName) { return walletName.walletId === fromSel1; });
        var nameFromWalletAmount = valueFromWalletName[0].amount;
        document.getElementsByName('txt_transferAmount')[0].placeholder = 'Max Limit:' + nameFromWalletAmount;
        $('#ddl_transferToWallet option:not(:first)').remove();
        $("#ddl_transferToWallet").append('<option value="" selected>-- Select --</option>');
        $.each(wallet, function () {
            if (this.id !== fromSel.value) {
                $("#ddl_transferToWallet").append($("<option />").val(this.id).text(this.walletType));
            }
            if (this.id === fromSel.value && this.walletType === "Main Wallet") {
                setAmount = true;
                document.getElementById("txt_transferAmount").value = MainWallet;
            }
        });
        if (setAmount == false)
            document.getElementById("txt_transferAmount").value = "";
        jcf.getInstance($("#ddl_transferToWallet")).refresh();
    }
}

async function TransferValidation() {
    await WalletBalanceMaxTransfer();
    var fromWallet = $('#ddl_transferFromWallet').val();
    if (fromWallet !== null && fromWallet !== "") {
        //await WalletBalance();
        var modelBalance = {};
        var resBalance = await PostMethod(apiEndPoints.walletBalance, modelBalance);
        var fromSel = $('#ddl_transferFromWallet').val();
        if (fromSel === null || fromSel === undefined) {
            ShowError(ChangeErroMessage("select_from_wallet_error"));
        }
        var valueFromWalletName = resBalance.data.filter(function (walletName) { return walletName.walletId === fromSel; });
        var nameFromWalletAmount = valueFromWalletName[0].amount;
        document.getElementById('txt_transferAmount').value = nameFromWalletAmount;
        document.getElementById('walletBalance').innerHTML = nameFromWalletAmount;
        LoaderHide();
    }
    else {
        ShowError(ChangeErroMessage("select_from_wallet_error"));
        LoaderHide();
    }
}
//#endregion

//#region Transfer Main Wallet to Any Wallet
var walletNameTransferInWallet;
function OpenModelTransferWallet(GameName) {
    walletNameTransferInWallet = GameName;
    $("#AllInConfirmation").modal();
}

async function TransferInAllWallet(GameWalletName) {
    var GameName;
    if (GameWalletName == undefined)
        GameName = walletNameTransferInWallet;
    else
        GameName = GameWalletName
    LoaderShow();
    await WalletBalance();
    let model = {
        walletName: GameName
    }
    var res = await PostMethod(apiEndPoints.AllInWallet, model);
    await WalletBalance();
    LoaderHide();
}
//#endregion Transfer Main Wallet to Any Wallet