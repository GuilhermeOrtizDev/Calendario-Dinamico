var oldeixo;
var aux_clicked = false;
var datestart, dateend;

function daterange_init(id, dateini = null, datefin = null) {
    let month, year, monthnext, yearnext;

    if (dateini && datefin) {
        var datei = dateini.split("/");
        var datef = datefin.split("/");
        month = parseInt(datei[1], 10);
        year = parseInt(datef[2], 10);
        datestart = dateini;
        dateend = datefin;
    }
    else {
        const today = new Date();
        month = today.getMonth() + 1;
        year = today.getFullYear();
    }

    monthnext = month == 12 ? 1 : month + 1;
    yearnext = month == 12 ? year + 1 : year;

    daterange_alterMY(id, month + "", monthnext + "", year + "", yearnext + "");

    if (dateini && datefin)
        daterange_eixo(id, month, monthnext, year, yearnext);
}

function daterange_show(id) {
    var auxid = "#daterange-" + id;
    $(auxid).removeClass("d-none");
    $(auxid).addClass("d-block");
    $(".daterange-bg").removeClass("d-none");
}

function daterange_confirm(id) {
    daterange_hidden(id);
}

function daterange_hidden(id) {
    var auxid = "#daterange-" + id;
    $(auxid).removeClass("d-block");
    $(auxid).addClass("d-none");
    $(".daterange-bg").addClass("d-none");
}

function daterange_clean(id) {
    $("#" + id + "-start").val("");
    $("#" + id + "-end").val("");

    datestart = dateend = null;
    daterange_removeallcolor("#daterange-" + id);
}

function daterange_click(id, eixo, date) {
    var auxid = "#daterange-" + id;
    eixo = parseInt(eixo, 10);

    if (aux_clicked) {
        daterange_range(id, eixo, "bg-primary");
        aux_clicked = false;
        dateend = date;
        var aux = eixo > oldeixo ? datestart + " - " + dateend : dateend + " - " + datestart;
        $("#" + id + "-start").val(eixo > oldeixo ? datestart : dateend);
        $("#" + id + "-end").val(eixo > oldeixo ? dateend : datestart);
    }
    else {
        daterange_removeallcolor(auxid);
        daterange_color(id, eixo, "bg-secondary");
        aux_clicked = true;
        datestart = date;
        $("#" + id + "-start").val(date);
    }

    oldeixo = eixo;
}

function daterange_today(id) {
    var date = daterange_datetoday();
    var auxid = "#daterange-" + id;

    datestart = dateend = date;

    daterange_init(id);

    var eixo = $(auxid + " button[fws-date='" + date + "']").attr("fws-eixo");

    daterange_color(id, eixo, "bg-primary");

    $("#" + id + "-start").val(date);
    $("#" + id + "-end").val(date);
}

function daterange_over(id, eixo) {
    if (aux_clicked) {
        var auxid = "#daterange-" + id;
        eixo = parseInt(eixo, 10);
        daterange_removeallcolor(auxid);
        daterange_range(id, eixo, "bg-secondary");
    }
}

function daterange_range(id, eixo, color) {

    var ini = eixo < oldeixo ? eixo : oldeixo;
    var fin = eixo > oldeixo ? eixo : oldeixo;
    var auxid = "#daterange-" + id;

    daterange_removeallcolor(auxid);

    for (var i = ini; i <= fin; i++) {
        daterange_color(id, i, color);
    }
}

function daterange_removeallcolor(id) {
    $(id + " .td-daterange").removeClass("bg-primary");
    $(id + " .td-daterange").removeClass("bg-secondary");
    $(id + " .td-daterange button").removeClass("text-white");
}

function daterange_color(id, eixo, color) {
    $("#daterange-" + id + " button[fws-eixo='" + eixo + "']").parent().addClass(color);
    $("#daterange-" + id + " button[fws-eixo='" + eixo + "']").addClass("text-white");
}

function daterange_prev(id) {
    var auxid = "#daterange-" + id;
    var monthprev = $(auxid + " a[prev]").attr("fws-daterange2-month");
    var monthnext = $(auxid + " a[next]").attr("fws-daterange2-month");
    var yearprev = $(auxid + " a[prev]").attr("fws-daterange2-year");
    var yearnext = $(auxid + " a[next]").attr("fws-daterange2-year");

    yearprev = monthprev == "1" ? (parseInt(yearprev, 10) - 1) : yearprev;
    yearnext = monthnext == "1" ? (parseInt(yearnext, 10) - 1) : yearnext;
    monthprev = monthprev == "1" ? "12" : (parseInt(monthprev, 10) - 1) + "";
    monthnext = monthnext == "1" ? "12" : (parseInt(monthnext, 10) - 1) + "";

    daterange_alterMY(id, monthprev, monthnext, yearprev, yearnext);
    daterange_eixo(id, monthprev, monthnext, yearprev, yearnext);
}

function daterange_next(id) {
    var auxid = "#daterange-" + id;
    var monthprev = $(auxid + " a[prev]").attr("fws-daterange2-month");
    var monthnext = $(auxid + " a[next]").attr("fws-daterange2-month");
    var yearprev = $(auxid + " a[prev]").attr("fws-daterange2-year");
    var yearnext = $(auxid + " a[next]").attr("fws-daterange2-year");

    yearprev = monthprev == "12" ? (parseInt(yearprev, 10) + 1) : yearprev;
    yearnext = monthnext == "12" ? (parseInt(yearnext, 10) + 1) : yearnext;
    monthprev = monthprev == "12" ? "1" : (parseInt(monthprev, 10) + 1) + "";
    monthnext = monthnext == "12" ? "1" : (parseInt(monthnext, 10) + 1) + "";

    daterange_alterMY(id, monthprev, monthnext, yearprev, yearnext);
    daterange_eixo(id, monthprev, monthnext, yearprev, yearnext);
}

function daterange_eixo(id, monthprev, monthnext, yearprev, yearnext) {

    var auxid = "#daterange-" + id;

    if (aux_clicked) {
        var start = $(auxid + " button[fws-date='" + datestart + "']");

        if (start.length > 0)
            oldeixo = start.attr("fws-eixo");
        else {
            var dateini = $(auxid + " button[fws-eixo='1']").attr("fws-date").split("/");
            var dateselected = datestart.split("/");

            if (new Date(dateini[1] + " " + dateini[0] + " " + dateini[2]) > new Date(dateselected[1] + " " + dateselected[0] + " " + dateselected[2]))
                oldeixo = 1;
            else
                oldeixo = daterange_enddate(monthprev, monthnext, yearprev, yearnext);
        }
    }
    else if (datestart && dateend) {
        var start = $(auxid + " button[fws-date='" + datestart + "']");
        var end = $(auxid + " button[fws-date='" + dateend + "']");
        var startselected = datestart.split("/");
        var endtselected = dateend.split("/");

        if (new Date(startselected[1] + " " + startselected[0] + " " + startselected[2]) > new Date(endtselected[1] + " " + endtselected[0] + " " + endtselected[2])) {
            var aux = start;
            start = end;
            end = aux;
            var aux = startselected;
            startselected = endtselected;
            endtselected = aux;
        }

        if (start.length > 0 && end.length > 0) {
            oldeixo = parseInt(start.attr("fws-eixo"), 10);
            daterange_range(id, parseInt(end.attr("fws-eixo"), 10), "bg-primary");
        } else if (start.length > 0) {
            oldeixo = daterange_enddate(monthprev, monthnext, yearprev, yearnext);
            daterange_range(id, parseInt(start.attr("fws-eixo"), 10), "bg-primary");
        } else if (end.length > 0) {
            oldeixo = parseInt(end.attr("fws-eixo"), 10);
            daterange_range(id, 1, "bg-primary");
        } else {
            var dateini = $(auxid + " button[fws-eixo='1']").attr("fws-date").split("/");
            var inidate = new Date(dateini[1] + " " + dateini[0] + " " + dateini[2]);

            if (inidate > new Date(startselected[1] + " " + startselected[0] + " " + startselected[2]) && inidate < new Date(endtselected[1] + " " + endtselected[0] + " " + endtselected[2])) {
                oldeixo = daterange_enddate(monthprev, monthnext, yearprev, yearnext);
                daterange_range(id, 1, "bg-primary");
            }
        }

    }
}

function daterange_enddate(monthprev, monthnext, yearprev, yearnext) {
    const d1 = new Date(monthprev + " 1 " + yearprev);
    const d2 = new Date(d1.getFullYear(), d1.getMonth() + 1, 0);
    const d3 = new Date(monthnext + " 1 " + yearnext);
    const d4 = new Date(d3.getFullYear(), d3.getMonth() + 1, 0);

    return d2.getDate() + d4.getDate();
}

function daterange_datetoday() {
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    var date = day < 10 ? "0" + day + "/" : day + "/";
    date += month < 10 ? "0" + month + "/" + year : +month + "/" + year;

    return date;
}

function daterange_alterMY(id, monthprev, monthnext, yearprev, yearnext) {
    var auxid = "#daterange-" + id;
    var dataleft = $(auxid + " div[dataleft]");
    var dataright = $(auxid + " div[dataright]");

    $(auxid + " a[prev]").attr("fws-daterange2-month", monthprev);
    $(auxid + " a[next]").attr("fws-daterange2-month", monthnext);
    $(auxid + " a[prev]").attr("fws-daterange2-year", yearprev);
    $(auxid + " a[next]").attr("fws-daterange2-year", yearnext);

    switch (monthprev) {
        case "1":
            dataleft.html("Janeiro - " + yearprev);
            dataright.html("Fevereiro - " + yearnext);
            break;
        case "2":
            dataleft.html("Fevereiro - " + yearprev);
            dataright.html("Março - " + yearnext);
            break;
        case "3":
            dataleft.html("Março - " + yearprev);
            dataright.html("Abril - " + yearnext);
            break;
        case "4":
            dataleft.html("Abril - " + yearprev);
            dataright.html("Maio - " + yearnext);
            break;
        case "5":
            dataleft.html("Maio - " + yearprev);
            dataright.html("Junho - " + yearnext);
            break;
        case "6":
            dataleft.html("Junho - " + yearprev);
            dataright.html("Julho - " + yearnext);
            break;
        case "7":
            dataleft.html("Julho - " + yearprev);
            dataright.html("Agosto - " + yearnext);
            break;
        case "8":
            dataleft.html("Agosto - " + yearprev);
            dataright.html("Setembro - " + yearnext);
            break;
        case "9":
            dataleft.html("Setembro - " + yearprev);
            dataright.html("Outubro - " + yearnext);
            break;
        case "10":
            dataleft.html("Outubro - " + yearprev);
            dataright.html("Novembro - " + yearnext);
            break;
        case "11":
            dataleft.html("Novembro - " + yearprev);
            dataright.html("Dezembro - " + yearnext);
            break;
        case "12":
            dataleft.html("Dezembro - " + yearprev);
            dataright.html("Janeiro - " + yearnext);
            break;
    }

    let dayfirst, datelast;

    const d1 = new Date(monthprev + " 1 " + yearprev);
    let dayfirst1 = d1.getDay();

    const d2 = new Date(d1.getFullYear(), d1.getMonth() + 1, 0);
    let datelast1 = d2.getDate();

    const d3 = new Date(monthnext + " 1 " + yearnext);
    let dayfirst2 = d3.getDay();

    const d4 = new Date(d3.getFullYear(), d3.getMonth() + 1, 0);
    let datelast2 = d4.getDate();

    const d5 = new Date(d3.getFullYear(), d3.getMonth(), 0);
    let datelast3 = d5.getDate();

    $(auxid + " tbody[tableleft]").html(daterange_alterDays(id, dayfirst1, datelast1, datelast2, monthprev, yearprev, false));
    $(auxid + " tbody[tableright]").html(daterange_alterDays(id, dayfirst2, datelast2, datelast3, monthnext, yearnext, true));

    const today = new Date();
    let day = today.getDate();
    var date = daterange_datetoday();

    $(auxid + " button[fws-date='" + date + "']").html("<div class='today'>" + (day) + "</div>");
}

function daterange_alterDays(id, dayfirst, datelast, datelastprev, month, year, right) {
    var count = 0;
    var table = "<tr>";
    var eixo = right ? datelastprev : 0;

    for (var i = dayfirst; i > 0; i--) {
        table += '<td class="text-center p-0"><span class="text-clear">';
        table += datelastprev - i + 1;
        table += '</span></td>';
        count++;
    }

    for (var i = 1; i <= datelast; i++) {
        var date = i < 10 ? "0" + i + "/" : i + "/";
        date += month < 10 ? "0" + month + "/" + year : +month + "/" + year;
        table += count % 7 == 0 ? '</tr>' : '';
        table += count % 7 == 0 ? '<tr>' : '';
        table += '<td class="td-daterange text-center">';
        table += "<button type='button' fws-date='" + date + "' fws-eixo='" + (i + eixo) + "' class='btn' onclick='daterange_click(";
        table += '"' + id + '", "' + (i + eixo) + '", "' + date + '"';
        table += ")' onmouseover='daterange_over(";
        table += '"' + id + '", "' + (i + eixo) + '"';
        table += ")' >" + i + "</button>";
        table += '</td>';
        count++;
    }

    var aux = (42 - count);

    for (var i = 1; i <= aux; i++) {
        table += count % 7 == 0 ? '</tr>' : '';
        table += count % 7 == 0 ? '<tr>' : '';
        table += '<td class="text-center p-0"><span class="text-clear">';
        table += i;
        table += '</span></td>';
        count++;
    }

    return table;
}