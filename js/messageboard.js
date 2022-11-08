var rows;

function getParam(paramName) {
    if (window.location.href.split("?").length == 1) {
        return null;
    }
    var paramList = window.location.href.split("?")[1].split("&");
    for (var index in paramList) {
        if (paramList[index].split("=").length == 1) {
            continue;
        }
        if (paramList[index].split("=")[0] == paramName) {
            return paramList[index].split("=")[1];
        }
    }
    return null;
}

var page = getParam("page");
if (page == null) {
    page = 1;
}

$.ajax({
    url: "http://150.158.48.232:5600/getmessage?page=" + String(page),
    type: 'get',
    data: {},
    success: function (res) {
        rows = res.pop().num;

        var last_message_id = -1;
        for (var index in res) {
            if (res[index].m_id != last_message_id) {
                var messageContainer = $("<div class='container' id='" + res[index].m_id + "'><div class='message'><div class='personal_info'><div class='name'>" + res[index].m_name + "</div><div class='time_comment_button'><div class='time'>" + res[index].m_time + "</div><div class='comment_button' onmouseover='beianMouseIn(this)' onmouseout='beianMouseOut(this)' onclick='comment(" + res[index].m_id + ")'>评论</div></div></div><div class='text'>" + res[index].m_message + "</div></div><div class='write_comment' style='display: none;'><div style='height: 20px; display: flex; align-items: center; font-size: small;'>昵称：</div><input type='text' class='write_comment_name'><div style='height: 20px; display: flex; align-items: center; font-size: small;'>评论：</div><textarea class='write_comment_text'></textarea><button class='send_comment_button' onclick='sendComment(" + res[index].m_id + ")'>发送</button></div><div class='show_comment'></div></div>");
                $("#show_message").append(messageContainer);
                last_message_id = res[index].m_id;
            }
        }

        for (var index in res) {
            if (res[index].c_id != null) {
                var commentContainer = $("<div class='comment'><div class='comment_info'><div class='comment_name'>" + res[index].c_name + "</div><div class='comment_time'>" + res[index].c_time + "</div></div><div class='comment_text'>" + res[index].c_comment + "</div></div>");
                $("#" + res[index].m_id + ">.show_comment").append(commentContainer);
            }
        }

        if (page != 1) {
            var lastPage = $("<div id='last_page' onmouseover='pageOver(this)' onmouseout='pageOut(this)' onmousedown='lastPage(this)'>上一页</div>");
            var startPage = $("<div id='start_page' onmouseover='pageOver(this)' onmouseout='pageOut(this)' onmousedown='startPage(this)'>1</div>");
            var ellipsis = $("<div class='ellipsis'>...</div>");
            $("#select_page").append(lastPage);
            $("#select_page").append(startPage);
            $("#select_page").append(ellipsis);
        }
        var currentPage = $("<div id='current_page'>" + page + "</div>");
        $("#select_page").append(currentPage);
        if (page != Math.ceil(rows / 10)) {
            var ellipsis = $("<div class='ellipsis'>...</div>");
            var endPage = $("<div id='end_page' onmouseover='pageOver(this)' onmouseout='pageOut(this)' onmousedown='endPage(this)'>" + Math.ceil(rows / 10) + "</div>");
            var nextPage = $("<div id='next_page' onmouseover='pageOver(this)' onmouseout='pageOut(this)' onmousedown='nextPage(this)'>下一页</div>");
            $("#select_page").append(ellipsis);
            $("#select_page").append(endPage);
            $("#select_page").append(nextPage);
        }
    },
    error: function (res) {
        console.log("ajax get error");
    },
})

function sendMessage() {
    var name = $("#write_message_name").val();
    var message = $("#write_message_text").val();

    $.ajax({
        url: "http://150.158.48.232:5600/sendmessage",
        type: 'get',
        data: { name: name, message: message },
        success: function (res) {
            if (res == "success") {
                window.location.href = window.location.href.split("?")[0];
                $("#write_message_name").val("");
                $("#write_message_text").val("");
            } else {
                console.log("website backend error");
            }
        },
        error: function (res) {
            console.log("ajax get error");
        },
    })
}

function sendComment(e) {
    var name = $("#" + e + " .write_comment_name").val();
    var comment = $("#" + e + " .write_comment_text").val();

    $.ajax({
        url: "http://150.158.48.232:5600/sendcomment",
        type: 'get',
        data: { name: name, comment: comment, parent: e },
        success: function (res) {
            if (res == "success") {
                window.location.href = window.location.href.split("?")[0];
                $("#" + e + " .write_comment_name").val("");
                $("#" + e + " .write_comment_text").val("");
            } else {
                console.log("website backend error");
            }
        },
        error: function (res) {
            console.log("ajax get error");
        },
    })
}

function comment(e) {
    $("#" + e + " .write_comment").fadeToggle();
}

function pageOver(e) {
    e.style.cssText = "border: 1px solid black; box-shadow: 0px 2px 2px -1px black; margin: 0px;"
}

function pageOut(e) {
    e.style.cssText = "border: none; box-shadow: none; margin: 1px;"
}

function lastPage(e) {
    e.style.cssText = "box-shadow: 0px 2px 2px -1px black inset;"
    window.location.href = window.location.href.split("?")[0] + "?page=" + String(Number(page) - 1);
}

function nextPage(e) {
    e.style.cssText = "box-shadow: 0px 2px 2px -1px black inset;"
    window.location.href = window.location.href.split("?")[0] + "?page=" + String(Number(page) + 1);
}

function startPage(e) {
    e.style.cssText = "box-shadow: 0px 2px 2px -1px black inset;"
    window.location.href = window.location.href.split("?")[0];
}

function endPage(e) {
    e.style.cssText = "box-shadow: 0px 2px 2px -1px black inset;"
    window.location.href = window.location.href.split("?")[0] + "?page=" + Math.ceil(rows / 10);
}