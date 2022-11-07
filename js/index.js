var flag = 0;
var oldTitle = "";

function changePerSec() {
    if (flag == 0) {
        document.title = "★☆★" + oldTitle + "★☆★";
        $("#search_input").attr("placeholder", "╭(°A°`)╮");
        flag = 1;
    } else {
        document.title = "☆★☆" + oldTitle + "☆★☆";
        $("#search_input").attr("placeholder", "╭(`°A°)╮");
        flag = 0;
    }
}

$(function () {
    oldTitle = document.title;
    setInterval("changePerSec()", 1000);
    $("#header").animate({ top: "0px", opacity: "1" });
    $("#main").delay(250).animate({ top: "0px", opacity: "1" });
    $("#footer").delay(750).animate({ top: "0px", opacity: "1" });
})

function beianMouseIn(e) {
    e.style.color = "red";
}

function beianMouseOut(e) {
    e.style.color = "black";
}

function viceTitleOver(e) {
    e.style.cssText = "border: 1px solid black; box-shadow: 0px 2px 2px -1px black;"
}

function viceTitleOut(e) {
    e.style.cssText = "border: none; box-shadow: none;"
}

function viceTitleDown(e) {
    e.style.cssText = "box-shadow: 0px 2px 2px -1px black inset;"
}

function contentOver(e) {
    e.style.cssText = "border: 1px solid black; box-shadow: 0px 4px 4px -1px black; margin: 9px;"
}

function contentOut(e) {
    e.style.cssText = "border: none; box-shadow: none; margin: 10px;"
}

function contentDown(e) {
    e.style.cssText = "box-shadow: 0px 4px 4px -1px black inset;"
}