﻿//#region Onload
$(document).ready(function () {
    getReference();
    if (GetLocalStorage('currentUser') !== null) {
        GetUser();
    }
    //if (window.location.href === 'http://webet333.com/') {
    //    window.location.replace('http://www.webet333.com/');
    //}
    navaigateRegister();
    load_em();

    //$("#txt_confirm_password").keyup(checkPasswordMatch);
    if (GetLocalStorage('language') === null) SetLocalStorage('language', 'en-US');
    getLanguage();
    announcement();

});
//#endregion

function ChangeErroMessage(key) {
    var ErrorMessage = "";
    $.ajax({
        url: '../../resources/strings.' + GetLocalStorage('language') + '.json',
        dataType: 'json',
        async: false,
        success: function (lang) {
            ErrorMessage = lang[key];
        }
    });
    return ErrorMessage;
}

async function MobileDesktopReferenceInsert(url) {
    if (url.href === "http://www.webet333.com/") {
        var referenceKeywordModelDesktopElse = {
            keyword: 'DESKTOP'
        };
        await PostMethodWithParameter(apiEndPoints.socialMediaReference, referenceKeywordModelDesktopElse);
    }

    if (url.href === "http://www.webet333.com/Mobile/home") {
        var referenceKeywordModelPhoneElse = {
            keyword: 'PHONE'
        };
        await PostMethodWithParameter(apiEndPoints.socialMediaReference, referenceKeywordModelPhoneElse);
    }
}

async function getReference() {
    var url_string = window.location;
    var url = new URL(url_string);
    url.href = url.href.toLowerCase();
    var name = url.searchParams.get("ref");
    var Langauge = url.searchParams.get("lang");
    if (name !== null) {
        setCookie('ref', name, 30);
        var referenceKeywordModel = {
            keyword: name
        };
        await PostMethodWithParameter(apiEndPoints.socialMediaReference, referenceKeywordModel);
        await MobileDesktopReferenceInsert(url);
    }
    else {
        await MobileDesktopReferenceInsert(url);
    }
    if (Langauge != null) {
        SetLocalStorage('language', Langauge == "cn" ? "zh-Hans" : (Langauge == "my" ? "ms-MY" : "en-US"));
        try {
            history.pushState(null, null, "http://webet333.com/");
        }
        catch{
            history.pushState(null, null, "http://http://localhost:27100/");
        }
    }
}


//#region DetectMobileBrowser
function DetectMobileBrowser() {
    if (window.innerWidth <= 1000 && window.innerHeight <= 1691 && (window.location.href === 'http://www.webet333.com/' || window.location.href === 'http://webet333.com/' || window.location.href === 'webet333.com/' || window.location.href === 'http://webet333.com')) {
        window.location = "http://www.webet333.com/Mobile/home";
    }
}
//#endregion

//#region GetLanguage
function SetDefaultLanguage(ddlLanguages) {
    SetLocalStorage('language', ddlLanguages.value);
    getLanguage();
    window.location.reload();
}

function getLanguage() {

    //document.getElementById("flag").attributes.src=
    (GetLocalStorage('language') === null) ? SetLocalStorage('language', 'en-US') : false;
    (GetLocalStorage('currentUser') === null) ? $('#afterlogin').css('display', 'none') : $('#beforelogin').css('display', 'none');
    (GetLocalStorage('currentUser') === null) ? $('#afterloginbank').css('display', 'none') : $('#beforeloginbank').css('display', 'none');
    (GetLocalStorage('currentUser') === null) ? $('#afterloginbankfooter').css('display', 'none') : $('#beforeloginbankfooter').css('display', 'none');
    navaigateRegister();

    if ((GetLocalStorage('currentUser') === null)) {
        $('#subMenuSports').css('top', 'calc(100% - 20px)');
        $('#subMenuLive').css('top', 'calc(100% - 20px)');
        $('#subMenuSlots').css('top', 'calc(100% - 20px)');
    }
    else {
        $('#subMenuSports').css('top', 'calc(100% - 10px)');
        $('#subMenuLive').css('top', 'calc(100% - 10px)');
        $('#subMenuSlots').css('top', 'calc(100% - 10px)');
    }

    $.ajax({
        url: '../../resources/strings.' + GetLocalStorage('language') + '.json',
        dataType: 'json',
        async: false,
        success: function (lang) {
            $('.lang').each(function (index, element) {
                $(this).text(lang[$(this).attr('key')]);
                if (localStorage.getItem("language") === "zh-Hans") {
                    $(".lang").addClass("font-increase");
                    if (screen.width > 1000)
                        $("#ContactUsPopUp").css({ "padding-right": "50px" });
                    else
                        $("#ContactUsPopUp").css({ "padding-right": "25px" });
                }
            });
            $("[data-translate]").each(function () {
                if ($(this).is("input")) {
                    $(this).attr('placeholder', lang[$(this).data("translate")]);
                } else {
                    $(this).text(lang[$(this).data("translate")]);
                }
            });
        }
    });
}
//#endregion

//#region navigateRegister
function navaigateRegister() {
    (GetLocalStorage('currentUser') === null) ? $('#afterLoginPanel').css('display', 'none') : $('#beforeLoginPanel').css('display', 'none');
}
//#endregion

//#region GetUser
async function GetUser() {
    var data = JSON.parse(dec(sessionStorage.getItem('UserDetails')));
    var gameprefixdata = JSON.parse(dec(sessionStorage.getItem('GamePreFix')));
    if (data != null && gameprefixdata != null) {
        try {
            document.getElementById("lbl_fullName").innerText = data.data.name;
            document.getElementById("lbl_userName").innerText = data.data.username;
            document.getElementById("txt_mobileUpdate").value = data.data.mobileNo;
        }
        catch{}
    }
    else {

        var res = await GetMethod(apiEndPoints.getProfile);
        var gamePrefix = await GetMethodWithReturn(apiEndPoints.globalParameter);
        sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
        sessionStorage.setItem('GamePreFix', enc(JSON.stringify(gamePrefix)));
        getDetails();
        try {
            document.getElementById("lbl_fullName").innerText = res.data.name;
            document.getElementById("lbl_userName").innerText = res.data.username;
            document.getElementById("txt_mobileUpdate").value = res.data.mobileNo;
        }
        catch{}

    }

}
//#endregion

//#region getCookie
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

//#endregion

//#region load_em
function load_em() {
    var u = getCookie('un');
    var p = getCookie('ps');

    $("#m_txt_username").val(u);
    $("#m_txt_password").val(p);
    if (u !== null) {
        $("#m_rember_me" + name).prop('checked', true);
    }
    else {
        $("#m_rember_me" + name).prop("checked", false);
    }
}

//#endregion


//#region announcement
async function announcement() {
    var marquee = document.getElementById('p_announcement');
    if (marquee !== null) {
        var res = await GetMethod(apiEndPoints.announcementList);
        for (i = 0; i < res.data.length; i++) {
            marquee.innerHTML += '<span>' + res.data[i].announcement + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
        }
    }
}
//#endregion

//#region LoaderShow
function LoaderShow() {
    $(".loadingImage").show();
}
function LoaderHide() {
    $(".loadingImage").hide();
}
//#endregion

//#region promotionList
async function promotionList() {
    var x = screen.width
    var model = {
        ismobile: true,
        ismain: false
    };

    var resPanel = await PostMethod(apiEndPoints.promotionsList, model);
    if (resPanel !== null && resPanel !== undefined) {
        var panelData = resPanel.data;
        var panel = document.getElementById('accordion');
        var description = document.getElementById('promotion-description');
        var height = "180px";
        if (x < 600)
            height = "150px";
        for (i = 0; i < panelData.length; i++) {
            description.innerHTML += '<div class="promotion-details-full-page" id="' + panelData[i].id + '"><div class="promotion-details-header"><span class="lang promotion-details-name ">' + panelData[i].title + '</span><button class="fa fa-close promotion-close-button" onclick="myFunction(\'' + panelData[i].id + '\')" style="font-weight:500;"></button></div><div class="promotion-margin-top">' + panelData[i].description + '<div class="padding-Promotion-bottom"></div></div></div>';
        }

        for (i = 0; i < panelData.length; i++) {
            panel.innerHTML += '<div  style="margin-bottom: 10px;" onclick="OpenFunction(\'' + panelData[i].id + '\')" ><a><div class="row-flex blue-overlay"><figure><img class="full-img" style="height: ' + height + ';"  src="' + panelData[i].banner + '" alt="pramotion-banner"></figure></div></a></div>';
        }
    }
}
//#endregion