$(document).ready(function () {
  function convertDate(date) {
    var array = date.split('/')
    var parseDate = new Date(`${array[1]}/${array[0]}/${array[2]}`)
    return moment(parseDate)
  }
  $("#datetimepicker_firstDate").on("dp.change", function (e) {
    $('#datetimepicker_lastDate').data("DateTimePicker").minDate(e.date);
  });
  $("#datetimepicker_lastDate").on("dp.change", function (e) {
    $('#datetimepicker_firstDate').data("DateTimePicker").maxDate(e.date);
  });
  function generateSchedule(showAvailable) {
    var firstDate = convertDate($("#datetimepicker_firstDate").find("input").val())
    var lastDate = convertDate($("#datetimepicker_lastDate").find("input").val())
    var dias = lastDate.diff(firstDate, 'days') + 1
    var dailyAppointmentsButton = "";
    var dailyAppointmentsArray = [];
    var idx = 0
    $("select#selectBreak option").map(function () {
      var breakVal = $('#selectBreak').val()
      var currentVal = $(this).val()
      if (currentVal != '?' && !breakVal.includes(currentVal)) {
        dailyAppointmentsButton = dailyAppointmentsButton + `<button type="button" value=${idx++} class='appointment btn btn-primary btn-xs'>${currentVal}</button> `
        dailyAppointmentsArray.push(currentVal)
      }
    }).get();
    var data = []
    var a = firstDate.clone()
    for (var i = 1; i <= dias; i++) {
      data.push({ date: a.format('DD/MM/YYYY'), dailyAppointmentsButton, dailyAppointmentsArray })
      a.add(1, 'days')
    }
    config.ajax['data'] = {
      firstDate: firstDate.format('DD/MM/YYYY'),
      lastDate: lastDate.format('DD/MM/YYYY'),
      data: JSON.stringify(data)
    }
    config.ajax['complete'] = function (data) {
      var arr = data.responseJSON
      const available = arr.filter(character => character.assign === true);
      if (available.length > 0) {
        $("#btnConfirm").prop('disabled', false);
      } else {
        if (showAvailable == undefined) {
          messageToast({
            type: 'warning',
            message: 'No se pueden parametrizar agendas en el rango de fecha seleccionado',
            title: 'Atencion!!',
          })
        }

        $("#btnConfirm").prop('disabled', true);
      }
    }
    initializeTable()
  }

  $("button.save").click(async function () {
    var schedule = []
    $('#content').html('<div class="loading"><img src="/images/ajax-loader.gif" alt="loading" /><br/>Generando Agenda...</div>');
    table.rows().every(function () {
      var data = this.data()
      if (data.assign) {
        schedule.push({
          date: data.date,
          data: data.data
        })
      }
    });
    fetch("/schedule/save", {
      method: "POST",
      body: JSON.stringify({ data: schedule }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          messageToast({
            type: 'success',
            message: 'Agenda programada exitosamente',
            title: 'Exito'
          })
          generateSchedule(false)
          $('#content').fadeIn(1000).html('');
        } else {
          messageToast({
            type: 'error',
            message: 'Ha ocurrido un error al programar la Agenda',
            title: 'Error'
          })
          $('#content').fadeIn(1000).html('');
        }
      })

  });

  $(function () {
    $("#btnRegister").on("click", function (e) {
      var form = $("#formSchedule")[0];
      var isValid = form.checkValidity();
      if (!isValid) {
        messageToast({
          type: 'warning',
          message: 'Registra los campos que son requeridos y que corresponda al tipo de dato',
          title: 'Atencion!!',
        })
        e.preventDefault();
        e.stopPropagation();
      } else {
        generateSchedule()

      }
      form.classList.add('was-validated');
      return false; // For testing only to stay on this page
    });
  });
  $('#table#{nameTable}').on('click', '.appointment', function () {
    var state = $(this).hasClass("btn-primary").toString()
    var rowSelector;
    var li = $(this).closest('li');
    if (li.length) {
      rowSelector = table.cell(li).index().row;
    }
    else {
      rowSelector = $(this).closest('tr');
    }
    var data = table.row(rowSelector).data();
    console.log(data)
    var title = $(this).text();
    var arr = data.data
    var idx = $(this).val()
    if (state == 'true') {
      $(this).removeClass("btn-primary").addClass("btn-danger");
      delete table.row(rowSelector).data().data.data[idx];
    } else {
      $(this).removeClass("btn-danger").addClass("btn-primary");
      table.row(rowSelector).data().data.data[idx] = title;
    }
  });

});


var myApp = angular.module('setAgenda', []);
myApp.controller('setSelectBreak', function ($scope) {
  $scope.first = '07:00';
  $scope.second = '18:00';
  $scope.groupSetup = {
    multiple: true,
    formatSearching: 'Searching the group...',
    formatNoMatches: 'No group found'
  };
  $scope.update = function () {
    $scope.groups = [];
    var a = moment($scope.first, 'H:mm'); //now
    var b = moment($scope.second, 'H:mm');
    var minutes = b.diff(a, 'minutes');
    var intervalo = $scope.intervalo;
    var cantEspacios = minutes / intervalo;
    if (b.isValid() && intervalo >= 30) {
      for (var i = 0; i < cantEspacios; i++) {
        var val = a.format('HH:mm');
        var item = `${a.format('HH:mm')}-${a.add(intervalo, 'minutes').format('HH:mm')}`;
        $scope.groups.push({ id: val, label: item });
      }
    }
  };
});