$(function() {

    var table = $("table");

    function Contains(classArray,value){
        for (var i=0; i<classArray.length;i++)
            if (classArray[i]===value) return true;
        return false;
    }



    function IntegerSort(a,b){
        return parseInt(a)>parseInt(b);
    }

    function ValueSort(a,b){
        return a>b;
    }

    function initSorting(){
        var handlers=[["stringSort", ValueSort],["numberSort",IntegerSort]];
        for(var i=0, ths=document.getElementsByTagName('th'); th=ths[i]; i++){
            for (var h=0; h<handlers.length;h++) {
                if(Contains(th.className.split(" "), handlers[h][0])){
                    th.columnIndex=i;
                    th.order = -1;
                    th.sortHandler = handlers[h][1];
                    th.onclick=function(){sort(this);}
                }
            }
        }
    }

    function sort(header){
        header.order *= -1;
        var table = header.parentNode.parentNode.parentNode;
        for (var i=0, th, ths=table.getElementsByTagName('th'); th=ths[i]; i++)
            if (th!=header) th.order = -1;
        var rows=table.getElementsByTagName('tr');
        for(var i=1, tempRows=[], tr; tr=rows[i]; i++){tempRows[i-1]=tr}
        tempRows.sort(function(a,b){
            return header.order*
                (header.sortHandler(
                    a.getElementsByTagName('td')[header.columnIndex].innerHTML,
                    b.getElementsByTagName('td')[header.columnIndex].innerHTML)?1:-1)});
        for(var i=0; i<tempRows.length; i++){
            table.appendChild(tempRows[i]);
        }
    }

    function insertContent(data) {
        var employee_data ='';
        $.each(data, function(key, value){
            employee_data += '<tr>';
            employee_data += '<td>'+value.id +'</td>';
            employee_data += '<td>'+value.firstName +'</td>';
            employee_data += '<td>'+value.lastName+'</td>';
            employee_data += '<td>'+value.dateOfBirth+'</td>';
            employee_data += '<td>'+value.company+'</td>';
            employee_data += '<td>'+value.note+'</td>';
            employee_data += '</tr>';
        });
        $('tbody').append(employee_data);
    }

    function loadMovies() {
        $.ajax({
            url: "dane.json",
            dataType: 'json',
        }).done(function(response){
            // console.log(response, 'odp z servera');
            insertContent(response);
        }).fail(function(error) {
            console.log(error);
        })

    }

    loadMovies();
    initSorting();


    var ta = document.querySelectorAll(".list").children;
    console.log(ta);



});
