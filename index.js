$(document).ready(function(){

  $.getJSON("https://api.myjson.com/bins/592hr",
    function (data) {
      var tb;

      for (var i = 0; i < data.length; i++) {
        tb = $('#list');
        tb.append('<tr><td class = \"mdl-data-table__cell--non-numeric\" id=\"name\">' + data[i].name + '</td>' + ' <td class = \"mdl-data-table__cell--non-numeric\" id=\"age\">' + data[i].age + '</td></tr>');
      }
    });


  $(".sortable").click(function(){
    var o = $(this).hasClass('asc') ? 'desc' : 'asc';
    $('.sortable').removeClass('asc').removeClass('desc');
    $(this).addClass(o);

    var colIndex = $(this).prevAll().length;
    var tbod = $(this).closest("table").find("tbody");
    var rows = tbod.find("tr");

    rows.sort(function(a,b){
      var A = $(a).find("td").eq(colIndex).text();
      var B = $(b).find("td").eq(colIndex).text();

      if (!isNaN(A)) A = Number(A);
      if (!isNaN(B)) B = Number(B);

      return o == 'asc' ? A > B : B > A;
    });

    $.each(rows, function(index, ele){
      tbod.append(ele);
    });

    if(o == 'asc'){
      $(this).find("span").text("▲");
    } else {
      $(this).find("span").text("▼");
    }
  });

  $('#hide-age-under-65').on('click', function(){
    $('.sortable-table').find('tr').each(function(i, el) {
      var inputEl = $(el).children().get(1);
      if(inputEl.textContent < 65){
        $(el).fadeToggle();
      }
    })
  });
})