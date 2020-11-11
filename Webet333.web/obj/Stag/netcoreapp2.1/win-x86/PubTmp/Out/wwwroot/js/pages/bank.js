﻿//#region Onload
$(document).ready(function () {
    //if (window.location.href === 'http://localhost:57480/Information/Bank' || window.location.href === 'http://www.webet333.com/Information/Bank') {
    Bank();
    //}
    if (GetLocalStorage('currentUser') !== null) {
        BankList();
        if ($('#tbl_transferHistory').length) {
            CheckWithdrawAmountList();
        }
        GetProfile();
        RegisterBank();

    }
});
//#endregion

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

//#region reloadBalance
async function reloadbalance() {
    $('.values').html('');
    $('.img_load').css('display', 'block');
    await WalletBalance();
}
//#endregion 

//#region AddBank
async function AddBank() {
    LoaderShow();
    var model = {
        bankName: $('#ddl_Addbank_Profile').val(),
        accountName: $('#txt_account_holder').val(),
        accountNo: $('#txt_account_number').val()
    };
    if (model.bankName === "") {
        LoaderHide();
        return ShowError(ChangeErroMessage("select_bank_name_error"));
    }
    if (model.accountName === "") {
        LoaderHide();
        return ShowError(ChangeErroMessage("enter_acc_name_error"));
    }
    if (model.accountNo === "") {
        LoaderHide();
        return ShowError(ChangeErroMessage("enter_acc_no_error"));
    }
    else if (model.bankName !== "" && model.accountNo !== "" && model.accountName !== "") {
        var res = await PostMethod(apiEndPoints.addBank, model);
        if (res !== null && res !== undefined) {
            ShowSuccess(res.message);
            $("#MessageNavigate").modal();
        }
    }
    LoaderHide();
}
//#endregion

var depositMethodId, UserBankName, SelectBankWithdrawl, SelectBankDeposit, UserAccountNumber, UserAccountName, SelectPromotion = "";
var depositModel;

//#region BankList
async function BankList() {

    var res = await GetMethod(apiEndPoints.depositDdl);

    if (res !== null && res !== undefined) {
        $("#bankdetailProfile").find("tr:gt(0)").remove();

        var DepsoitBankList = document.getElementById("Depsoit_bank_list");
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
                promotionList.innerHTML += '<li class="mar-btm-ten border" id=\'' + promotion[l].id + '\' onclick="LiSelectPromotion(\'' + promotion[l].id + '\')"><input type="radio" name="promotion" id="promotionId" value=\'' + promotion[l].id + '\'/><label><div class="promotion-content" for="rad1"><img class="full-img" src=\'' + promotion[l].bannerImage + '\' /><div class="deposit-promotion-details"><span class="fa fa-question-circle" data-toggle="modal" data-target="#promotionDetails" onclick="PromotionDetails(\'' + promotion[l].id + 'D' + '\')"></span><p class="no-mar">' + promotion[l].promotionTitle + '</p></div></div></label></li>';
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
}

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

function LiSelectDepositFunction(id, accountName, accountNumber) {
    $('#Depsoit_bank_list li.active').removeClass('active');
    var d = document.getElementById(id);
    d.classList.add("active");
    SelectBankDeposit = id;
    document.getElementById('account_name').innerHTML = accountName;
    document.getElementById('account_number').innerHTML = accountNumber;
}

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

//#region Bank
async function Bank() {
    LoaderShow();
    var res = await GetMethod(apiEndPoints.admin_bank);
    if (res !== null && res !== undefined) {
        list = res.data.notes;
        var banknoteList = document.getElementById('lis_bankNote');
        if (banknoteList !== null) {
            for (l = 0; l < list.length; l++) {
                banknoteList.innerHTML += "<li class='mar-btm-ten'>" + list[l].note + "</li>";
            }
        }

        table = res.data.trancationLimit;
        var tbl = document.getElementById("tbl_details");
        if (tbl !== null) {
            var rowCount = 2;
            for (i = 0; i < table.length; i++) {
                row = tbl.insertRow(rowCount);
                createCellTd(row, table[i].transactionType, 'no-border pad-ten grey-bg', null, 4);
                rowCount++;
                for (j = 0; j < table[i].details.length; j++) {
                    row = tbl.insertRow(rowCount);
                    createCellTd(row, table[i].details[j].options, 'pad-ten white-bg', null, null);
                    createCellTd(row, table[i].details[j].minimum, 'text-center pad-ten white-bg', null, null);
                    createCellTd(row, table[i].details[j].maximum, 'text-center pad-ten white-bg', null, null);
                    createCellTd(row, table[i].details[j].processingTime, 'text-center pad-ten white-bg', null, null);
                    rowCount++;
                }
            }
        }

        $("#bankdetail").find("tr:gt(0)").remove();
        var RowCount = 0;
        var table = document.getElementById("bankdetail");
        if (table !== null) {
            var result = res.data.bankDetails;
            for (i = 0; i < result.length; i++) {
                var row = table.insertRow(RowCount + 1);
                $("#bankdetail").addClass('white-bg');
                $("#bankdetail td").addClass('half-width text-center white-bg');
                row.insertCell(0).innerHTML = "<img src='" + result[i].bankLogo + "'/>";
                //row.insertCell(1).innerHTML = result[i].bankName;
                row.insertCell(1).innerHTML = result[i].accountName;
                row.insertCell(2).innerHTML = result[i].accountNo;
                RowCount++;
            }
        }
    }
    LoaderHide();
}
//#endregion

//#region RegisterBank
async function RegisterBank() {
    LoaderShow();
    var res = await GetMethod(apiEndPoints.bank);
    if (res !== null && res !== undefined) {
        var bankName = res.data;
        $.each(bankName, function () {
            $("#ddl_Addbank_Profile").append($("<option />").val(this.bankName).text(this.bankName));
        });
    }
    LoaderHide();
}
//#endregion

//#region UserBankDetails
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

        WithdrawUsernameSet();
    }
    LoaderHide();
}

function createCell(cell, text, style, rowspan = null, colspan = null) {
    var div = document.createElement('div'),
        txt = document.createTextNode(text);
    div.appendChild(txt);
    div.setAttribute('class', style);
    if (colspan !== null)
        div.setAttribute('colspan', colspan);
    if (rowspan !== null)
        div.setAttribute('rowspan', rowspan);
    div.setAttribute('className', style);
    cell.appendChild(div);
}

function createCellTd(cell, text, style, rowspan = null, colspan = null) {
    var div = document.createElement('td'),
        txt = document.createTextNode(text);
    div.appendChild(txt);
    div.setAttribute('class', style);
    if (colspan !== null)
        div.setAttribute('colspan', colspan);
    if (rowspan !== null)
        div.setAttribute('rowspan', rowspan);
    div.setAttribute('className', style);
    cell.appendChild(div);
}
//#endregion

//#region Withdraw Username
async function WithdrawUsernameSet() {
    //document.getElementById("lbl_accountHolder").disabled = true;
    //document.getElementById("lbl_accountHolder").value = UserAccountName;
}
//#endregion Withdraw Username

//#region UploadReceipt
var selDiv = "";
document.addEventListener("DOMContentLoaded", init, false);
function init() {
    if (document.querySelector('#receipt') !== null) {
        document.querySelector('#receipt').addEventListener('change', handleFileSelect, false);
        selDiv = document.querySelector("#selectedFiles");
    }
}

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

//#endregion

//#region Deposit
TableData = new Array();

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
            if (model.bankId === null || model.bankId === "" || model.bankId === undefined) {
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
            reloadbalance();
            document.getElementById('promotion').innerHTML = "";
            document.getElementById('Depsoit_bank_list').innerHTML = "";
            document.getElementById('withdraw_bank_list').innerHTML = "";
            SelectBankDeposit = null;
            BankList();
        }, 2000);
    }
    LoaderHide();
}
//#endregion

//#region Withdrawal
async function Withdrawal() {
    if ($('#txt_withdrawalAmount').val() <= 30000 && $('#txt_withdrawalAmount').val() >= 10) {
        LoaderShow();
        await regisrationGame();
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

            if (model.accountNumber === "") {
                LoaderHide();
                return ShowError(ChangeErroMessage("acc_no_req_error"));
            }

            if (model.amount === "") {
                LoaderHide();
                return ShowError(ChangeErroMessage("amt_req_error"));
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
                    CheckWithdrawAmountList();
                    reloadbalance();
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
                debugger
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
                debugger
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
                response.gameResponse = null;
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
    await regisrationGame();
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

                var res = await PostMethod(apiEndPoints.paymentTransferInOneAPi, model);
                if (res !== null && res !== undefined) {
                    ShowSuccess(res.message);
                    reset(3);
                    setTimeout(function () {
                        reloadbalance();
                    }, 2000);
                }
                //Withdraw from Wallet
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
                //            reset(3);
                //            setTimeout(function () {
                //                reloadbalance();
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

//#region SelectWallet
async function SelectWallet() {
    $('.values').html('');
    $('.img_load').css('display', 'block');
    await reloadbalance();
}
//#endregion SelectWallet

//#region TransferValidation
async function select() {
    SelectWallet();
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
    LoaderShow();
    await WalletBalanceMaxTransfer();
    var fromWallet = $('#ddl_transferFromWallet').val();
    if (fromWallet !== null && fromWallet !== "") {
        var modelBalance = {};
        var resBalance = await PostMethod(apiEndPoints.walletBalance, modelBalance);
        var fromSel = $('#ddl_transferFromWallet').val();
        if (fromSel === null || fromSel === undefined) {
            ShowError(ChangeErroMessage("select_from_wallet_error"));
        }
        var valueFromWalletName = resBalance.data.filter(function (walletName) { return walletName.walletId === fromSel; });
        var nameFromWalletAmount = valueFromWalletName[0].amount;
        document.getElementById('txt_transferAmount').value = nameFromWalletAmount;
        LoaderHide();
    }
    else {
        ShowError(ChangeErroMessage("select_from_wallet_error"));
        LoaderHide();
    }
}
//#endregion

//#region TransferHistory
async function TransferHistory() {

    var contentToRemove = document.querySelectorAll("#navTransfer");
    $(contentToRemove).remove();

    var model = {};
    var res = await PostMethod(apiEndPoints.transferHistory, model);
    $("#tbl_transferHistory").find("tr:gt(0)").remove();
    var RowCount = 0;
    var table = document.getElementById("tbl_transferHistory");
    var result = res.data;
    for (i = 0; i < result.length; i++) {

        var row = table.insertRow(RowCount + 1);
        row.id = "xxx";
        $("#tbl_transferHistory").addClass('white-bg');
        $("#tbl_transferHistory td").addClass('half-width text-center white-bg');
        row.insertCell(0).innerHTML = i + 1;
        row.insertCell(1).innerHTML = result[i].orderId;
        row.insertCell(2).innerHTML = result[i].fromWallet;
        row.insertCell(3).innerHTML = result[i].toWallet;
        row.insertCell(4).innerHTML = parseFloat(result[i].amount).toFixed(2);
        row.insertCell(5).innerHTML = result[i].verified;
        RowCount++;
    }
    var pageNum;
    $('#tbl_transferHistory').after('<div id="navTransfer"  class="pagination"></div>');
    var rowsShown = 11;
    var rowsTotal = $('#tbl_transferHistory thead tr').length;
    var numPages = rowsTotal / rowsShown;
    for (i = 0; i < numPages; i++) {
        pageNum = i + 1;
        $('#navTransfer').append('<a class="button" href="#History" rel="' + i + '">' + pageNum + '</a> ');
    }
    $('#tbl_transferHistory thead tr').hide();
    $('#tbl_transferHistory thead tr').slice(0, rowsShown).show();
    $('#navTransfer a:first').addClass('active');
    $('#navTransfer a').bind('click', function () {
        $('#navTransfer a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#tbl_transferHistory thead tr:gt(0)').css('opacity', '0.0').hide().slice(startItem, endItem).
            css('display', 'table-row').animate({ opacity: 1 }, 300);
        //$("#tbl_transferHistory").find("tr:gt(0)").hide();
    });
    if (pageNum > 10)
        $("#navTransfer").addClass("expand");
}
//#endregion

//#region WithdrawHistory
async function WithdrawHistory() {
    var contentToRemove = document.querySelectorAll("#navWithdraw");
    $(contentToRemove).remove();

    var model = {};
    var res = await PostMethod(apiEndPoints.withdrawHistory, model);
    $("#tbl_withdrawHistory").find("tr:gt(0)").remove();
    var RowCount = 0;
    var table = document.getElementById("tbl_withdrawHistory");
    var result = res.data;
    for (i = 0; i < result.length; i++) {
        var row = table.insertRow(RowCount + 1);
        $("#tbl_withdrawHistory").addClass('white-bg');
        $("#tbl_withdrawHistory td").addClass('half-width text-center white-bg');
        row.insertCell(0).innerHTML = i + 1;
        row.insertCell(1).innerHTML = result[i].orderId;
        row.insertCell(2).innerHTML = result[i].bankName;
        row.insertCell(3).innerHTML = result[i].walletName;
        row.insertCell(4).innerHTML = result[i].verified == "rejected" ? "+" + parseFloat(result[i].withdrawalAmount).toFixed(2) : "-" + parseFloat(result[i].withdrawalAmount).toFixed(2);
        row.insertCell(5).innerHTML = result[i].verified;
        RowCount++;
    }
    var pageNum;
    $('#tbl_withdrawHistory').after('<div id="navWithdraw"  class="pagination"></div>');
    var rowsShown = 11;
    var rowsTotal = $('#tbl_withdrawHistory thead tr').length;
    var numPages = rowsTotal / rowsShown;
    for (i = 0; i < numPages; i++) {
        pageNum = i + 1;
        $('#navWithdraw').append('<a class="button" href="#History" rel="' + i + '">' + pageNum + '</a> ');
    }
    $('#tbl_withdrawHistory thead tr').hide();
    $('#tbl_withdrawHistory thead tr').slice(0, rowsShown).show();
    $('#navWithdraw a:first').addClass('active');
    $('#navWithdraw a').bind('click', function () {
        $('#navWithdraw a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#tbl_withdrawHistory thead tr:gt(0)').css('opacity', '0.0').hide().slice(startItem, endItem).
            css('display', 'table-row').animate({ opacity: 1 }, 300);
    });
    if (pageNum > 10)
        $("#navWithdraw").addClass("expand");
}
//#endregion

//#region DepositHistory
async function DepositHistory() {

    var contentToRemove = document.querySelectorAll("#navDeposit");
    $(contentToRemove).remove();

    var model = {};
    var res = await PostMethod(apiEndPoints.depositHistory, model);
    $("#tbl_depositHistory").find("tr:gt(0)").remove();
    var RowCount = 0;
    var table = document.getElementById("tbl_depositHistory");
    var result = res.data;
    for (i = 0; i < result.length; i++) {
        var row = table.insertRow(RowCount + 1);
        $("#tbl_depositHistory").addClass('white-bg');
        $("#tbl_depositHistory td").addClass('half-width text-center white-bg');
        row.insertCell(0).innerHTML = i + 1;
        row.insertCell(1).innerHTML = result[i].orderId;
        row.insertCell(2).innerHTML = result[i].walletName;
        row.insertCell(3).innerHTML = result[i].bankName;
        row.insertCell(4).innerHTML = result[i].depositMethod;
        row.insertCell(5).innerHTML = "+" + parseFloat(result[i].amount).toFixed(2);
        row.insertCell(6).innerHTML = result[i].verified;
        RowCount++;
    }
    var pageNum;
    $('#tbl_depositHistory').after('<div id="navDeposit"  class="pagination"></div>');
    var rowsShown = 11;
    var rowsTotal = $('#tbl_depositHistory thead tr').length;
    var numPages = rowsTotal / rowsShown;
    for (i = 0; i < numPages; i++) {
        pageNum = i + 1;
        $('#navDeposit').append('<a class="button" href="#History" rel="' + i + '">' + pageNum + '</a> ');
    }
    $('#tbl_depositHistory thead tr').hide();
    $('#tbl_depositHistory thead tr').slice(0, rowsShown).show();
    $('#navDeposit a:first').addClass('active');
    $('#navDeposit a').bind('click', function () {
        $('#navDeposit a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#tbl_depositHistory thead tr:gt(0)').css('opacity', '0.0').hide().slice(startItem, endItem).
            css('display', 'table-row').animate({ opacity: 1 }, 300);
    });
    if (pageNum > 10)
        $("#navDeposit").addClass("expand");
}
//#endregion

var User_BankName;

//#region GetProfile
async function GetProfile() {
    LoaderShow();
    var res = await GetMethod(apiEndPoints.getProfile);
    User_BankName = res.data.name;
    if (document.getElementById("lbl_fullName") !== null) {
        document.getElementById("lbl_fullName").innerText = res.data.name;
        document.getElementById("lbl_userName").innerText = res.data.username;
        document.getElementById("txt_mobileUpdate").value = res.data.mobileNo;
        SetLocalStorage('918Username', res.data.username918);

    }

    if (window.location.href.includes("http://localhost:27100/Account/Profile") || window.location.href.includes("http://www.webet333.com/Account/Profile")) {
        var today = new Date();
        var date = today.getFullYear() + '-' + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());
        var time = (today.getHours() < 10 ? "0" + today.getHours() : today.getHours()) + ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes());
        var dateTime = date + ' ' + time;
        document.getElementById("txt_datetime").value = dateTime;
    }
    LoaderHide();
}
//#endregion

//#region UpdateProfile
async function UpdateProfile(userName918, password918, newpassword918) {

    LoaderShow();
    var model;
    if (userName918 !== null && userName918 !== undefined) {
        model = {
            username918: userName918,
            password918: password918
        };
    }
    else if (newpassword918 !== null && newpassword918 !== undefined) {
        model = {
            password918: newpassword918
        };
    }
    else {
        if (document.getElementById("chk_login_password").value == "") {
            LoaderHide();
            return ShowError(ChangeErroMessage("password_required_error"));
        }

        if (document.getElementById("chk_login_password").value != dec(GetLocalStorage("currentUserData"))) {
            LoaderHide();
            document.getElementById("chk_login_password").value = "";
            return ShowError(ChangeErroMessage("pass_not_match_error"));
        }
        model = {
            mobile: $('#txt_mobileUpdate').val()
        };
        if (model.mobile.length < 10) {
            LoaderHide();
            document.getElementById("chk_login_password").value = "";
            return ShowError(ChangeErroMessage("mobile_length_error"));
        }
        if (model.mobile === "") {
            LoaderHide();
            document.getElementById("chk_login_password").value = "";
            return ShowError(ChangeErroMessage("mobile_no_required_error"));
        }
    }

    var res = await PostMethod(apiEndPoints.updateProfile, model);
    if (res !== null && res !== undefined) {
        ShowSuccess(res.message);
        if (model.mobile != null && model.mobile != "" && model.mobile != undefined) {
            document.getElementById("txt_mobileUpdate").value = model.mobile;
            document.getElementById("chk_login_password").value = "";
        }
    }

    LoaderHide();
}
//#endregion

//#region Statement
async function Statement() {

    var contentToRemove = document.querySelectorAll("#navStatement");
    $(contentToRemove).remove();
    let model = {

    };
    var res = await PostMethodWithParameter(apiEndPoints.transactionHistory, model);
    $("#tbl_transactionHistory").find("tr:gt(0)").remove();
    var RowCount = 0;
    var table = document.getElementById("tbl_transactionHistory");
    var result = res.data;
    for (i = 0; i < result.length; i++) {
        var row = table.insertRow(RowCount + 1);
        $("#tbl_transactionHistory").addClass('white-bg');
        $("#tbl_transactionHistory td").addClass('half-width text-center white-bg');
        row.insertCell(0).innerHTML = i + 1;
        row.insertCell(1).innerHTML = result[i].created,
            row.insertCell(2).innerHTML = result[i].transactionNo;
        row.insertCell(3).innerHTML = result[i].transactionType;
        row.insertCell(4).innerHTML = result[i].debitFrom;
        row.insertCell(5).innerHTML = result[i].creditTo;
        row.insertCell(6).innerHTML = parseFloat(result[i].amount).toFixed(2) > 0 ? "+" + parseFloat(result[i].amount).toFixed(2) : parseFloat(result[i].amount).toFixed(2);
        row.insertCell(7).innerHTML = parseFloat(result[i].currentBalance).toFixed(2);
        RowCount++;
    }
    var pageNum;
    $('#tbl_transactionHistory').after('<div id="navStatement" class="pagination"></div>');
    var rowsShown = 11;
    var rowsTotal = $('#tbl_transactionHistory thead tr').length;
    var numPages = rowsTotal / rowsShown;
    for (i = 0; i < numPages; i++) {
        pageNum = i + 1;
        $('#navStatement').append('<a class="button" href="#Statement" rel="' + i + '">' + pageNum + '</a> ');
    }
    $('#tbl_transactionHistory thead tr').hide();
    $('#tbl_transactionHistory thead tr').slice(0, rowsShown).show();
    $('#navStatement a:first').addClass('active');
    $('#navStatement a').bind('click', function () {
        $('#navTransfer a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#tbl_transactionHistory thead tr:gt(0)').css('opacity', '0.0').hide().slice(startItem, endItem).
            css('display', 'table-row').animate({ opacity: 1 }, 300);
    });
    if (pageNum > 10)
        $("#navStatement").addClass("expand");
}
//#endregion

//#region Rebate History
async function RebateHistory() {

    var contentToRemove = document.querySelectorAll("#navRebate");
    $(contentToRemove).remove();

    let model = {

    };
    var res = await PostMethodWithParameter(apiEndPoints.rebateHistory, model);
    $("#tbl_rebateHistory").find("tr:gt(0)").remove();
    var RowCount = 0;
    var table = document.getElementById("tbl_rebateHistory");
    var result = res.data;
    for (i = 0; i < result.length; i++) {
        var row = table.insertRow(RowCount + 1);
        $("#tbl_rebateHistory").addClass('white-bg');
        $("#tbl_rebateHistory td").addClass('half-width text-center white-bg');
        row.insertCell(0).innerHTML = i + 1;
        row.insertCell(1).innerHTML = result[i].GameName;
        row.insertCell(2).innerHTML = parseFloat(result[i].Turnover).toFixed(2);
        row.insertCell(3).innerHTML = parseFloat(result[i].Rolling).toFixed(2);
        row.insertCell(4).innerHTML = parseFloat(result[i].Bet).toFixed(2);
        row.insertCell(5).innerHTML = parseFloat(result[i].WinLose).toFixed(2);
        row.insertCell(6).innerHTML = parseFloat(result[i].CommAmount).toFixed(2);
        row.insertCell(7).innerHTML = (result[i].Created).replace("T", " ");
        RowCount++;
    }
    var pageNum;
    $('#tbl_rebateHistory').after('<div id="navRebate"  class="pagination"></div>');
    var rowsShown = 11;
    var rowsTotal = $('#tbl_rebateHistory thead tr').length;
    var numPages = rowsTotal / rowsShown;
    for (i = 0; i < numPages; i++) {
        pageNum = i + 1;
        $('#navRebate').append('<a class="button" href="#Rebate" rel="' + i + '">' + pageNum + '</a> ');
    }
    $('#tbl_rebateHistory thead tr').hide();
    $('#tbl_rebateHistory thead tr').slice(0, rowsShown).show();
    $('#navRebate a:first').addClass('active');
    $('#navRebate a').bind('click', function () {
        $('#navTransfer a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#tbl_rebateHistory thead tr:gt(0)').css('opacity', '0.0').hide().slice(startItem, endItem).
            css('display', 'table-row').animate({ opacity: 1 }, 300);
    });
    if (pageNum > 10)
        $("#navRebate").addClass("expand");
}
//#endregion

//#region Promotion Apply History
async function PromotionHistory() {

    var contentToRemove = document.querySelectorAll("#navPromotion");
    $(contentToRemove).remove();

    let model = {
        id: null
    };
    var res = await PostMethodWithParameter(apiEndPoints.promotionHistory, model);
    $("#tbl_promotionHistory").find("tr:gt(0)").remove();
    var RowCount = 0;
    var table = document.getElementById("tbl_promotionHistory");
    var result = res.data;
    for (i = 0; i < result.length; i++) {
        var row = table.insertRow(RowCount + 1);
        $("#tbl_promotionHistory").addClass('white-bg');
        $("#tbl_promotionHistory td").addClass('half-width text-center white-bg');
        row.insertCell(0).innerHTML = i + 1;
        row.insertCell(1).innerHTML = parseFloat(result[i].UserTurnover).toFixed(2);
        row.insertCell(2).innerHTML = result[i].Title;
        row.insertCell(3).innerHTML = result[i].TurnoverTime;
        row.insertCell(4).innerHTML = parseFloat(result[i].TurnoverTarget).toFixed(2);
        row.insertCell(5).innerHTML = result[i].WinTurn;
        row.insertCell(6).innerHTML = parseFloat(result[i].TurnTarget).toFixed(2);
        row.insertCell(7).innerHTML = result[i].Staus;
        row.insertCell(8).innerHTML = result[i].RemainingDay;
        row.insertCell(9).innerHTML = (result[i].Created).replace("T", " ");
        row.insertCell(10).innerHTML = (result[i].ExpiryDate).replace("T", " ");
        RowCount++;
    }

    $('#tbl_promotionHistory').after('<div id="navPromotion"  class="pagination"></div>');
    var rowsShown = 11;
    var rowsTotal = $('#tbl_promotionHistory thead tr').length;
    var numPages = rowsTotal / rowsShown;
    for (i = 0; i < numPages; i++) {
        var pageNum = i + 1;
        $('#navPromotion').append('<a class="button" href="#PromotionApply" rel="' + i + '">' + pageNum + '</a> ');
    }
    $('#tbl_promotionHistory thead tr').hide();
    $('#tbl_promotionHistory thead tr').slice(0, rowsShown).show();
    $('#navPromotion a:first').addClass('active');
    $('#navPromotion a').bind('click', function () {
        $('#navPromotion a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#tbl_promotionHistory thead tr:gt(0)').css('opacity', '0.0').hide().slice(startItem, endItem).
            css('display', 'table-row').animate({ opacity: 1 }, 300);
    });
    if (pageNum > 10)
        $("#navPromotion").addClass("expand");
}
//#endregion Promotion Apply History

//#region timeFormat
function toDate(date) {
    if (date === void 0) {
        return new Date(0);
    }
    if (this.isDate(date)) {
        return date;
    } else {
        return new Date(parseFloat(date.toString()));
    }
}
function isDate(date) {
    return (date instanceof Date);
}
function time(date, format) {
    var d = this.toDate(date);
    return format
        .replace(/Y/gm, d.getFullYear().toString())
        .replace(/m/gm, ('0' + (d.getMonth() + 1)).substr(-2))
        .replace(/d/gm, ('0' + (d.getDate())).substr(-2))
        .replace(/H/gm, ('0' + (d.getHours() + 0)).substr(-2))
        .replace(/i/gm, ('0' + (d.getMinutes() + 0)).substr(-2))
        .replace(/s/gm, ('0' + (d.getSeconds() + 0)).substr(-2))
        .replace(/v/gm, ('0000' + (d.getMilliseconds() % 1000)).substr(-3));
}
//#endregion

//#region Refresh
function Refresh() {
    window.location.replace("../Account/Profile");
}
//#endregion

//#region ResetForm
function reset(i) {
    if (i === 1) {
        document.getElementById("txt_datetime").value = "";
        document.getElementById("txt_amount").value = "";
        document.getElementById("txt_reference_number").value = "";
        var node = document.getElementById("selectedFiles");
        $('#Depsoit_bank_list li.active').removeClass('active');
        SelectBankDeposit = "";
        node.innerHTML = "";
        LiSelectPromotion(null);
        TableData = [];
        files.length = 0;   //Remove image file from array
    }
    if (i === 2) {
        $('#withdraw_bank_list li.active').removeClass('active');
        SelectBankWithdrawl = "";
        document.getElementById("txt_withdrawalAmount").value = "";
        document.getElementById("txt_withdrawalAccountNumber").value = "";

    }
    if (i === 3) {
        document.getElementById("formTransfer").reset();
        document.getElementById("transferAmount").reset();
        document.getElementById("txt_transferAmount").placeholder = "Max Limit: From Wallet";
    }
    if (i === 4) {
        $('#txt_currentPassword').val('');
        $('#txt_newPassword').val('');
        $('#txt_confirmPassword').val('');
    }
}
//#endregion

//#region set Value
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
//#endregion set Value

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
    debugger
    var res = await PostMethod(apiEndPoints.AllInWallet, model);
    await WalletBalance();
    LoaderHide();
}
//#endregion Transfer Main Wallet to Any Wallet