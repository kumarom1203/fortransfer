﻿
//#region Onload
$(document).ready(function () {
    getDetails();
    var path = window.location.href.toLowerCase();
    if (!path.includes('mobile/game'))
        Walletdate();
    if (path.includes('mobile/home')) {

        GameInMaintenance(0);
        WalletSignalR();
    }
});

var walletData;

function WalletSignalR() {
    try {

        "use strict";

        var connection = new signalR.HubConnectionBuilder().withUrl("http://api.webet333.com/signalrhub").build();

        connection.on("WalletUpdate", function (data) {
            walletData = data;
            GameInMaintenance(1);
        });

        connection.start().then(function () {
            console.log("Connected with SignalR Hub");
        }).catch(function (err) {
            console.log("Not Connected with SignalR Hub");
            return console.error(err.toString());
        });
    }
    catch{
        WalletSignalR();
    }
}

async function Walletdate() {
    walletData = await GetMethodWithReturn(apiEndPoints.walletSelect);
}

async function GameInMaintenance(i) {
    if (i == 0)
        walletData = await GetMethodWithReturn(apiEndPoints.walletSelect);
    for (i = 0; i < walletData.data.length; i++) {

        if (walletData.data[i].walletType == "AG Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('aglive').style.filter = "grayscale(1)";
            document.getElementById('agslot').style.filter = "grayscale(1)";
            document.getElementById('aglivelogin').style.filter = "grayscale(1)";
            document.getElementById('agslotlogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "AG Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('aglive').style.filter = "";
            document.getElementById('agslot').style.filter = "";
            document.getElementById('aglivelogin').style.filter = "";
            document.getElementById('agslotlogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "PlayTech Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('playtechlive').style.filter = "grayscale(1)";
            document.getElementById('playtechslot').style.filter = "grayscale(1)";
            document.getElementById('playtechlivelogin').style.filter = "grayscale(1)";
            document.getElementById('playtechslotlogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "PlayTech Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('playtechlive').style.filter = "";
            document.getElementById('playtechslot').style.filter = "";
            document.getElementById('playtechlivelogin').style.filter = "";
            document.getElementById('playtechslotlogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "M8 Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('m8sports').style.filter = "grayscale(1)";
            document.getElementById('m8sportslogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "M8 Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('m8sports').style.filter = "";
            document.getElementById('m8sportslogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "MaxBet Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('maxbetsports').style.filter = "grayscale(1)";
            document.getElementById('maxbetsportslogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "MaxBet Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('maxbetsports').style.filter = "";
            document.getElementById('maxbetsportslogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "Sexy Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('sexylive').style.filter = "grayscale(1)";
            document.getElementById('sexylivelogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "Sexy Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('sexylive').style.filter = "";
            document.getElementById('sexylivelogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "SA Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('salive').style.filter = "grayscale(1)";
            document.getElementById('salivelogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "SA Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('salive').style.filter = "";
            document.getElementById('salivelogin').style.filter = "";
        }


        if (walletData.data[i].walletType == "DG Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('dglive').style.filter = "grayscale(1)";
            document.getElementById('dglivelogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "DG Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('dglive').style.filter = "";
            document.getElementById('dglivelogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "918Kiss Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('kiss918slot').style.filter = "grayscale(1)";
            document.getElementById('kiss918slotlogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "918Kiss Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('kiss918slot').style.filter = "";
            document.getElementById('kiss918slotlogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "Mega888 Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('megaslot').style.filter = "grayscale(1)";
            document.getElementById('megaslotlogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "Mega888 Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('megaslot').style.filter = "";
            document.getElementById('megaslotlogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "Joker Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('jokerslot').style.filter = "grayscale(1)";
            document.getElementById('jokerslotlogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "Joker Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('jokerslot').style.filter = "";
            document.getElementById('jokerslotlogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "Pussy888 Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('pussy88slot').style.filter = "grayscale(1)";
            document.getElementById('pussy88slotlogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "Pussy888 Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('pussy88slot').style.filter = "";
            document.getElementById('pussy88slotlogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "AllBet Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('allbetlive').style.filter = "grayscale(1)";
            document.getElementById('allbetlivelogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "AllBet Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('allbetlive').style.filter = "";
            document.getElementById('allbetlivelogin').style.filter = "";
        }


    }
}

async function CheckGameInMaintenance(gameName) {
    var walletName;
    if (gameName == "M8")
        walletName = "M8 Wallet";

    if (gameName == "Maxbet")
        walletName = "MaxBet Wallet";

    if (gameName == "SexyBaccarat")
        walletName = "Sexy Wallet";

    if (gameName == "SA")
        walletName = "SA Wallet";

    if (gameName == "DG")
        walletName = "DG Wallet";

    if (gameName == "918Kiss")
        walletName = "918Kiss Wallet";

    if (gameName == "Mega888")
        walletName = "Mega888 Wallet";

    if (gameName == "Joker")
        walletName = "Joker Wallet";

    if (gameName == "playtech")
        walletName = "PlayTech Wallet";

    if (gameName == "AG")
        walletName = "AG Wallet";

    if (gameName == "Pussy888")
        walletName = "Pussy888 Wallet";

    if (gameName == "AllBet")
        walletName = "AllBet Wallet";

    for (i = 0; i < walletData.data.length; i++)
        if (walletData.data[i].walletType == walletName && walletData.data[i].isMaintenance == true)
            return true;
}

var checkedValue;

async function getDetails() {
    var resUserData = JSON.parse(dec(sessionStorage.getItem('UserDetails')));
    if (resUserData == null) {
        var res = await GetMethod(apiEndPoints.getProfile);
        sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
        resUserData = res;
    }
    checkedValue = resUserData.data.autoTransfer;
    if (window.location.href.includes("Mobile/Transfer"))
        await onclickSet(1);
}

async function onclickSet(i) {
    if (i == 0)
        checkedValue = checkedValue ? false : true;
    if (checkedValue) {
        document.getElementById("circle-move").style.marginLeft = "22px";
        document.getElementById("checkSwitch").style.backgroundColor = "green";
        checkedValue = true;
        let model = {
            autoTransfer: checkedValue
        };
        await PostMethod(apiEndPoints.updateProfile, model);
        var res = await GetMethod(apiEndPoints.getProfile);
        sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
    }
    else {
        document.getElementById("circle-move").style.marginLeft = "0px";
        document.getElementById("checkSwitch").style.backgroundColor = "gray";
        checkedValue = false;
        let model = {
            autoTransfer: checkedValue
        };
        await PostMethod(apiEndPoints.updateProfile, model);
        var res = await GetMethod(apiEndPoints.getProfile);
        sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
    }
}

async function whatsapp() {
    window.open('https://api.whatsapp.com/send?phone=601133333765&text=Hello', '_blank');
}

var AgGameType = localStorage.getItem('AGslotGame');
async function AG(GameType) {
    var value = await CheckGameInMaintenance("AG");
    if (value) {
        LoaderHide();
        return ShowError(ChangeErroMessage("maintainenance_error"));
    }
    if (GetLocalStorage('currentUser') !== null) {
        if (checkedValue)
            TransferInAllWallet("AG Wallet");
        localStorage.setItem("AGslotGame", GameType);
        await logingGame("AG");
    }
    else {
        alert("Please Login");
    }
}

function randomPassword() {

    var charsetOne = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ', charsetTwo = 'abcdefghiklmnopqrstuvwxyz', charsetThree = '@', charsetFour = '0123456789', randomstring = '', i = 0;

    for (i = 0; i < 3; i++) {
        var rnumOne = Math.floor(Math.random() * charsetOne.length);
        randomstring += charsetOne.substring(rnumOne, rnumOne + 1);
    }

    for (i = 0; i < 3; i++) {
        var rnumTwo = Math.floor(Math.random() * charsetTwo.length);
        randomstring += charsetTwo.substring(rnumTwo, rnumTwo + 1);
    }

    var rnumThree = Math.floor(Math.random() * charsetThree.length);
    randomstring += charsetThree.substring(rnumThree, rnumThree + 1);

    for (i = 0; i < 3; i++) {
        var rnumFour = Math.floor(Math.random() * charsetFour.length);
        randomstring += charsetFour.substring(rnumFour, rnumFour + 1);
    }

    return randomstring;
}

function randomString() {

    var charsetOne = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ', charsetTwo = 'abcdefghiklmnopqrstuvwxyz', charsetThree = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ', charsetFour = '0123456789', randomstring = '', i = 0;

    for (i = 0; i < 3; i++) {
        var rnumOne = Math.floor(Math.random() * charsetOne.length);
        randomstring += charsetOne.substring(rnumOne, rnumOne + 1);
    }

    for (i = 0; i < 3; i++) {
        var rnumTwo = Math.floor(Math.random() * charsetTwo.length);
        randomstring += charsetTwo.substring(rnumTwo, rnumTwo + 1);
    }

    var rnumThree = Math.floor(Math.random() * charsetThree.length);
    randomstring += charsetThree.substring(rnumThree, rnumThree + 1);

    for (i = 0; i < 3; i++) {
        var rnumFour = Math.floor(Math.random() * charsetFour.length);
        randomstring += charsetFour.substring(rnumFour, rnumFour + 1);
    }
    return randomstring;
}

async function M8Login(usernamePrifix) {
    var languageCode = (GetLocalStorage('language') === "zh-Hans" ? "ZH-CN" : "EN-US");

    var resultM8Login = await callMe(M8ConstAction.loginAction + "&" + M8ConstParameter.secret + "&" + M8ConstParameter.agent + "&" + "username=" + usernamePrifix + "&host=sport.mywinday.com&lang=" + languageCode + "&accType=DEC,IN,CN,US,ML,HK&ref=https://webet333.com");

    if (resultM8Login.response.errcode !== "0") {
        ShowError(resultM8Login.response.errtext);
    } else {
        localStorage.setItem('M8Url', resultM8Login.response.result.login.weburlsecure['#cdata-section']);
        localStorage.setItem('M8UrlMobile', resultM8Login.response.result.login.mobiurlsecure['#cdata-section']);

    }
    if (screen.width > 786) {
        window.location.href = GetLocalStorage('M8Url');
    }
    else {
        window.location.href = GetLocalStorage('M8UrlMobile');
    }
}

//#region For Playtech game login
function loadingPlaytechJS() {
    var imported = document.createElement('script');
    imported.src = 'https://login.winforfun88.com/jswrapper/integration.js.php?casino=winforfun88'
    document.head.appendChild(imported);
}


async function loginPlaytech() {
    //loadingPlaytechJS();
    //var languageCode = (GetLocalStorage('language') === "zh-Hans" ? "ZH-CN" : "EN")
    //var mobiledomain = "ld176988";
    //var systemidvar = "424";
    var res = JSON.parse(dec(sessionStorage.getItem('UserDetails')));
    let globalParameters = JSON.parse(dec(sessionStorage.getItem('GamePreFix')));
    var usernamePrifix = globalParameters.data.playtechGamePrefix
    var username = (usernamePrifix + res.data.username).toUpperCase();
    //var password = dec(GetLocalStorage('currentUserData'));

    //iapiLogin(username, password, 1, languageCode);
    //async function login() {
    //    iapiSetCallout('Login', calloutLogin);

    //    iapiSetClientPlatform("mobile&deliveryPlatform=HTML5");
    //    var realMode = 1;

    //    iapiLogin(username, password, realMode, languageCode);



    //}

    function launchMobileClient() {
        //var SlotGame = localStorage.getItem('slotGame');
        //if (SlotGame === "true") {
            window.location.href = '../../lobbyMobile?username=' + username;
        //}
        //else {
        //    window.location = "https://cache.download.banner.winforfun88.com/casinoclient.html?language=" + languageCode + "&game=7bal"
        //}
    }

    //await login(1);
    launchMobileClient();


    //function calloutLogin(response) {
    //    if (response.errorCode) {
    //        alert("Error message: " + response.errorText + " Error code: " + response.errorCode);
    //    } else {
    //        launchMobileClient();
    //    }
    //}
}
//#endregion For Playtech game login

async function logingGame(gameName) {
    var value = await CheckGameInMaintenance(gameName);
    if (value) {
        LoaderHide();
        return ShowError(ChangeErroMessage("maintainenance_error"));
    }
    if (GetLocalStorage('currentUser') !== null) {
        if (checkedValue) {
            if (gameName == "M8")
                TransferInAllWallet("M8 Wallet");
            if (gameName == "Maxbet")
                TransferInAllWallet("MaxBet Wallet");
            if (gameName == "SexyBaccarat")
                TransferInAllWallet("Sexy Wallet");
            if (gameName == "SA")
                TransferInAllWallet("SA Wallet");
            if (gameName == "DG")
                TransferInAllWallet("DG Wallet");
            if (gameName == "918Kiss")
                TransferInAllWallet("918Kiss Wallet");
            if (gameName == "Mega888")
                TransferInAllWallet("Mega888 Wallet");
            if (gameName == "Joker")
                TransferInAllWallet("Joker Wallet");
            if (gameName == "AllBet")
                TransferInAllWallet("AllBet Wallet");
        }
        window.open("/mobile/Game?gamename=" + gameName);
    }
    else {
        alert("Please Login");
    }
}

async function PlaytechIdentifiy(Slotvalue) {
    var value = await CheckGameInMaintenance("playtech");
    if (value) {
        LoaderHide();
        return ShowError(ChangeErroMessage("maintainenance_error"));
    }
    if (GetLocalStorage('currentUser') !== null) {
        LoaderShow();
        if (checkedValue)
            TransferInAllWallet("PlayTech Wallet");
        localStorage.setItem("slotGame", Slotvalue);
        loadingPlaytechJS();
        LoaderHide();
        logingGame('Playtech');
    }
    else {
        alert("Please Login");
    }
}

async function GameLoginMobile(gamename) {
    LoaderShow();

    var userDetails = JSON.parse(dec(sessionStorage.getItem('UserDetails')));
    var globalParameter = JSON.parse(dec(sessionStorage.getItem('GamePreFix')));
    let resSelectUser = JSON.parse(dec(sessionStorage.getItem('UserRegisterDetails')));

    if (userDetails == null) {
        var res = await GetMethod(apiEndPoints.getProfile);
        sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
        userDetails = res;
    }

    if (globalParameter == null) {
        var gamePrefix = await GetMethodWithReturn(apiEndPoints.globalParameter);
        sessionStorage.setItem('GamePreFix', enc(JSON.stringify(gamePrefix)));
        globalParameter = gamePrefix;
    }

    var resUserData = JSON.parse(dec(sessionStorage.getItem('UserDetails')));

    if (resUserData.data.mobilenoConfirmed == false) {
        var url = window.location.href.toLowerCase();
        if (!url.includes("mobile/verifiedotp"))
            window.location = "../mobile/VerifiedOtp";
    }

    if (GetLocalStorage('currentUser') !== null) {

        if (resSelectUser == null) {
            let userModel = {
                id: resUserData.data.id
            };
            let resSelectUser = await PostMethod(apiEndPoints.selectUser, userModel);
            sessionStorage.setItem('UserRegisterDetails', enc(JSON.stringify(resSelectUser)));
        }


        resSelectUser = JSON.parse(dec(sessionStorage.getItem('UserRegisterDetails')));
        let globalParameters = JSON.parse(dec(sessionStorage.getItem('GamePreFix')));

        var username = resUserData.data.username;

        var AgUsername = globalParameters.data.agGamePrefix + username;
        var JokerUsername = globalParameters.data.jokerGamePrefix + username;
        var M8Username = globalParameters.data.m8GamePrefix + username;
        var PlaytechUsername = globalParameters.data.playtechGamePrefix + username;

        switch (gamename) {
            case 'MaxBet':
                if (resSelectUser.data.MaxBet !== true) {
                    var userMaxBet = {
                        firstname: resUserData.data.name,
                        lastname: "Webet333"
                    };
                    var res = await PostMethod(apiEndPoints.registerMaxBet, userMaxBet);
                    if (res.data.error_code == 0) {
                        var userMaxBetlogin = {
                            isMobile: true
                        };

                        var res = await PostMethod(apiEndPoints.loginMaxBet, userMaxBetlogin);
                        if (res.data.error_code == 0) {
                            location.href = res.data.gameUrl;
                        }
                    }
                }
                else {
                    var userMaxBet = {
                        isMobile: true
                    };
                    var res = await PostMethod(apiEndPoints.loginMaxBet, userMaxBet);
                    if (res.data.error_code == 0) {
                        location.href = res.data.gameUrl;
                    }
                }
                break;
            case 'M8':
                if (resSelectUser.data.M8 !== true) {
                    var languageCode = (GetLocalStorage('language') === "zh-Hans" ? "ZH-CN" : "EN-US")
                    var resultM8 = await callMe(M8ConstAction.createAction + "&" + M8ConstParameter.secret + "&" + M8ConstParameter.agent + "&" + "username=" + M8Username);
                    if (resultM8.response.errcode == "0") {
                        let modelM8 = {
                            userId: resUserData.data.id,
                            M8UserName: M8Username,
                            apiResponse: resultM8.response
                        };
                        var resM8 = await PostMethod(apiEndPoints.registerM8, modelM8);
                        var resultM8LoginRegister = await callMe(M8ConstAction.loginAction + "&" + M8ConstParameter.secret + "&" + M8ConstParameter.agent + "&" + "username=" + M8Username + "&host=sport.mywinday.com&lang=" + languageCode + "&accType=HK&ref=https://webet333.com");

                        if (resultM8LoginRegister.response.errcode === '-1') {
                            return ShowError(resultM8LoginRegister.response.errtext);
                        } else {
                            localStorage.setItem('M8Url', resultM8LoginRegister.response.result.login.weburlsecure['#cdata-section']);
                            localStorage.setItem('M8UrlMobile', resultM8LoginRegister.response.result.login.mobiurlsecure['#cdata-section']);
                        }
                    }
                    else {
                        return ShowError(resultM8LoginRegister.response.errtext);
                    }
                    M8Login(M8Username);
                }
                else {
                    M8Login(M8Username);
                }
                break;
            case 'AG':
                var languageCode = (GetLocalStorage('language') === "zh-Hans" ? 1 : (GetLocalStorage('language') === "ms-MY" ? 12 : 3))
                if (resSelectUser !== null && resSelectUser !== undefined) {
                    if (resSelectUser.data.AG !== null && resSelectUser.data.AG !== undefined) {
                        if (resSelectUser.data.AG === false) {
                            var resAG = await PostMethod(apiEndPoints.registerAG, modelAG);
                            if (resAG.data.error_code == 0) {
                                let modelAG = {
                                    gameType: AgGameType,
                                    lang: languageCode
                                }
                                var AGLogin = await PostMethod(apiEndPoints.loginAG, modelAG);
                                if (AGLogin.data.error_code == 0)
                                    window.location.href = AGLogin.data.url;
                            }
                        }
                        else {
                            let modelAG = {
                                gameType: AgGameType,
                                lang: languageCode
                            }
                            var AGLogin = await PostMethod(apiEndPoints.loginAG, modelAG);
                            if (AGLogin.data.error_code == 0)
                                window.location.href = AGLogin.data.url;
                        }
                    }
                }
                break;
            case 'Playtech':
                if (resSelectUser.data.Playtech !== true) {
                    var resultPlaytech = await PlaytechPostMethod(PlaytechConstAction.CreateAccount + "playername=" + PlaytechUsername + "&" + PlaytechConstParameter.adminname + "&" + PlaytechConstParameter.kioskname + "&firstname=" + resUserData.data.name + "&firstname=Webet333" + "&countrycode=MY" + "&viplevel=1" + "&languagecode=EN" + "&" + "password=" + dec(GetLocalStorage("currentUserData")));

                    if (typeof resultPlaytech === "string") {
                        try {
                            JSON.parse(resultPlaytech);
                        } catch (e) {
                            var jObject = {
                                data: resultPlaytech
                            };
                        }
                    }
                    else {
                        let modelPlaytech = {
                            userId: resUserData.data.id,
                            PlaytechUserName: PlaytechUsername,
                            apiResponse: resultPlaytech
                        };
                        var resPlaytech1 = await PostMethod(apiEndPoints.registerPlaytech, modelPlaytech);
                    }
                    loginPlaytech();
                }
                else {
                    loginPlaytech();
                }
                break;
            case '918kiss':
                var value = await CheckGameInMaintenance("918kiss");
                if (value) {
                    LoaderHide();
                    return ShowError(ChangeErroMessage("maintainenance_error"));
                }
                if (resSelectUser.data._918Kiss !== true) {
                    var randamUserName = await generateRandomUserName();

                    var randomPasswordString = randomPassword();

                    var modelUpdateProfile = {
                        username918: randamUserName,
                        password918: randomPasswordString
                    };
                    var updateProfile = await PostMethod(apiEndPoints.updateProfile, modelUpdateProfile);


                    var result981Kiss = await _918KissPostMethod("account.ashx?" + _918KissActionConst.AddUser + "&" + _918KissConstParameter.agent + "&" + "userName=" + randamUserName + "&" + "PassWd=" + randomPasswordString + "&" + "Name=" + resUserData.data.name + "&" + "Tel=" + resUserData.data.mobileNo + "&" + "Memo=" + null + "&" + "UserType=" + _918KissUserType.realplayer + "&" + "UserAreaId=" + _918KissUserAreaId.Malaysia + "&" + "time=" + UTCTime + "&" + _918KissConstParameter.authcode + "&" + "sign=" + generateHasValue(randamUserName) + "&" + _918KissConstParameter.pwdtype);

                    let model918Kiss = {
                        userId: resUserData.data.id,
                        _918KissUserName: randamUserName,
                        apiResponse: result981Kiss
                    };
                    var res918Kiss = await PostMethod(apiEndPoints.register918Kiss, model918Kiss);
                    location.href = '/Mobile/download?id=918DownloadTab';
                }
                else {
                    location.href = '/Mobile/download?id=918DownloadTab';
                }
                break;
            case 'Pussy888':
                LoaderShow();
                if (resSelectUser.data.Pussy888 !== true) {
                    var model = {

                    }
                    try {
                        var res = await PostMethodWithParameter(apiEndPoints.pussyRegister, model);
                    }
                    catch{

                    }
                    window.location.href = "/Mobile/download?id=Pussy888DownloadTab";

                }
                else {
                    window.location.href = "/Mobile/download?id=Pussy888DownloadTab";

                }
                break;
            case 'Joker':
                var value = await CheckGameInMaintenance("Joker");
                if (value) {
                    LoaderHide();
                    return ShowError(ChangeErroMessage("maintainenance_error"));
                }
                if (resSelectUser.data.Joker !== true) {
                    var perameter = 'Method=' + jokerMethodConst.EnsureUserAccount + '&Timestamp=' + timestamp + '&Username=' + JokerUsername;
                    var resultJoker = await JokerPostMethod('?' + jokerConstParameter.AppID + '&Signature=' + generateSignature(jokerMethodConst.EnsureUserAccount, JokerUsername, null, null), perameter);

                    var jokerSetPasswordperameter = 'Method=' + jokerMethodConst.SetPassword + '&' + 'Password=' + dec(GetLocalStorage('currentUserData')) + '&' + 'Timestamp=' + timestamp + '&' + 'Username=' + JokerUsername;
                    var resultJokerSetPassword = await JokerPostMethod('?' + jokerConstParameter.AppID + '&' + 'Signature=' + generateSignature(jokerMethodConst.SetPassword, JokerUsername, dec(GetLocalStorage('currentUserData'))), jokerSetPasswordperameter);

                    let modelJoker = {
                        userId: resUserData.data.id,
                        JokerUserName: JokerUsername,
                        apiResponse: resultJoker
                    };
                    var resJoker = await PostMethod(apiEndPoints.registerJoker, modelJoker);
                    location.href = '/Mobile/download?id=JokerDownloadTab';
                }
                else {
                    location.href = '/Mobile/download?id=JokerDownloadTab';
                }
                break;
            case 'Mega888':
                var value = await CheckGameInMaintenance("Mega888");
                if (value) {
                    LoaderHide();
                    return ShowError(ChangeErroMessage("maintainenance_error"));
                }
                if (resSelectUser.data.Mega888 !== true) {
                    var userMegaa88Model = {

                    }
                    var res = await PostMethod(apiEndPoints.mega888Register, userMegaa88Model);
                    if (res !== undefined || res !== null) {
                        location.href = '/Mobile/download?id=MegaDownloadTab';
                    }
                }
                else {
                    location.href = '/Mobile/download?id=MegaDownloadTab';
                }
                break;
            case 'DG':
                if (resSelectUser.data.DG !== true) {
                    var userDGModel = {

                    }
                    var res = await PostMethod(apiEndPoints.dgRegister, userDGModel);
                    if (res.data.codeId == 0) {
                        var login = await PostMethod(apiEndPoints.dgLogin, userDGModel);
                        if (login.data.codeI == 0)
                            window.location.href = login.data.list[1] + login.data.token;
                    }
                }
                else {
                    var Model = {

                    }
                    var login = await PostMethod(apiEndPoints.dgLogin, Model);
                    if (login.data.codeId == 0)
                        window.location.href = login.data.list[1] + login.data.token;
                }
                break;
            case 'SexyBaccarat':
                if (resSelectUser.data.SexyBaccarat !== true) {
                    var userRegisterModel = {

                    }
                    var res = await PostMethod(apiEndPoints.sexyRegister, userRegisterModel);
                    if (res.data.status == "0000") {
                        var userLoginModel = {
                            isMobile: true
                        }
                        var login = await PostMethod(apiEndPoints.sexyLogin, userLoginModel);
                        if (login.data.status == "0000")
                            window.location.href = login.data.url + (GetLocalStorage('language') === "zh-Hans" ? "cn" : "en");
                    }
                }
                else {
                    var Model = {
                        isMobile: true
                    }
                    var login = await PostMethod(apiEndPoints.sexyLogin, Model);
                    if (login.data.status == "0000")
                        window.location.href = login.data.url + (GetLocalStorage('language') === "zh-Hans" ? "cn" : "en");
                }
                break;
            case 'SA':
                LoaderShow();
                if (resSelectUser.data.SA !== true) {
                    var userRegisterModel = {

                    }
                    var res = await PostMethod(apiEndPoints.saRegister, userRegisterModel);
                    if (res.data.status == "0") {
                        var userLoginModel = {
                            isMobile: true
                        }
                        var login = await PostMethod(apiEndPoints.saLogin, userLoginModel);
                        if (login.data.status == "0")
                            window.location.href = login.data.url
                    }
                }
                else {
                    var Model = {
                        isMobile: true
                    }
                    var login = await PostMethod(apiEndPoints.saLogin, Model);
                    if (login.data.status == "0")
                        window.location.href = login.data.url
                }
                break;
            case 'AllBet':
                LoaderShow();
                if (resSelectUser.data.AllBet !== true) {
                    var userRegisterModel = {
                        isMobile: true
                    }
                    var res = await PostMethod(apiEndPoints.allBetRegister, userRegisterModel);
                    if (res.data.error_code == "OK") {
                        var userLoginModel = {
                            isMobile: true
                        }
                        var login = await PostMethod(apiEndPoints.allBetLogin, userLoginModel);
                        if (login.data.error_code == "OK")
                            window.location.href = login.data.gameLoginUrl
                    }
                }
                else {
                    var Model = {
                        isMobile: true
                    }
                    var login = await PostMethod(apiEndPoints.allBetLogin, Model);
                    if (login.data.error_code == "OK")
                        window.location.href = login.data.gameLoginUrl
                }
                break;
        }
    }
    else {
        alert(ChangeErroMessage("please_loign_error"));
    }
    LoaderHide();
}