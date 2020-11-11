//#region Onload
$(document).ready(function () {
    promotionList();
});
//#endregion

//#region promotionList
async function promotionList() {
    var x = screen.width
    var model = {
        ismobile: x < 600 ? true : false,
        ismain: false
    };
    
    var resPanel = await PostMethod(apiEndPoints.promotionsList, model);
    if (resPanel !== null && resPanel !== undefined) {
        var panelData = resPanel.data;
        var panel = document.getElementById('accordion');
        var height = "180px";
        if (x < 600)
            height = "150px";
        for (i = 0; i < panelData.length; i++) {
            panel.innerHTML += "<div class='panel'> " +
                "<a data-toggle='collapse' data-parent='#accordion' onclick='myFunction(" + i + ")' class='unchecked' id='panel" + i + "' href='#" + panelData[i].id + "'>" +
                "<div class='row-flex blue-overlay' > " +
                "<figure><img class='full-img' style='height: " + height + ";'  src='" + panelData[i].banner + "' alt='pramotion-banner'></figure>" +
                "<button class='product-detail'>DETAILS</button>" +
                "</div></a></div>" +
                "<div id='" + panelData[i].id + "' class='panel-collapse collapse'>" +
                "<div class='panel-body account-reg'>" +
                "</ul >" +
                "<div class='white-text'>" + panelData[i].description + "</div>" +
                "</div></div >";
        }
    }
}
//#endregion

function myFunction(i) {
    var element = document.getElementById("panel" + i);
    if (element.classList.contains("checked")) {
        element.classList.remove('checked');
        element.classList.add('unchecked');
    }
    else if (element.classList.contains("unchecked")) {
        element.classList.add('checked');
        element.classList.remove('unchecked');
    }
    else
        element.classList.add('checked');
}