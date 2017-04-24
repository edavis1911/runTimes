
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDFfqBuffs-1tfMdS9Wel-Eu_yfggPXYNw",
    authDomain: "runtimes-685d0.firebaseapp.com",
    databaseURL: "https://runtimes-685d0.firebaseio.com",
    projectId: "runtimes-685d0",
    storageBucket: "runtimes-685d0.appspot.com",
    messagingSenderId: "831211297973"
  };

  firebase.initializeApp(config);
  
  var database = firebase.database();
  var orderNum ='';
  var numofItems;
  var stitchCount;
  var runStart;
  var runEnd;
  var keyHolder = '';
  var getKey = '';
  var timeCompleted;




  $(document).ready(function() {

   $("#start-run").on("click", function() {
    runStart = moment(new Date());
    $('#startTime').text(runStart);
    $('#start-run').hide();



    
  });


   $("#end-run").on("click", function() {

    runEnd = moment(new Date());

    orderNum = $('#orderNum-input').val().trim();
    stitchCount = $('#stitch-input').val().trim();
    numofItems = $('#itemNum-input').val().trim();
    timeCompleted = runEnd.diff(runStart, "minutes");

    console.log(orderNum);
    console.log(stitchCount);
    console.log(numofItems); 
    console.log(runStart);
    console.log(runEnd);
    console.log(timeCompleted);



    var newRun = {

      numPush: orderNum,
      stitchPush: stitchCount,
      itemsPush: numofItems,
      startPush: runStart.format('llll'),
      endPush: runEnd.format('llll'),
      timePush: timeCompleted
    };



 $('#orderNum-input').val('');
      $('#itemNum-input').val('');
      $('#stitch-input').val('');
      $('#startTime').empty();
      $('#endTime').val('');
      $('#start-run').show();



 database.ref().push(newRun);



 return false;
// });




}); 


  database.ref().on("child_added", function(childSnapshot) {


   // $('.past-runs').append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" +
   //   "<td class='col-xs-3'>" + childSnapshot.val().numPush +
   //   "</td>" +
   //   "<td class='col-xs-2'>" + childSnapshot.val().stitchPush +
   //   "</td>" +
   //   "<td class='col-xs-2'>" + childSnapshot.val().itemsPush +
   //   "</td>" +
   //             "<td class='col-xs-2'>" + childSnapshot.val().startPush+ // Next Arrival Formula ()
   //             "</td>" +
   //             "<td class='col-xs-2'>" + childSnapshot.val().endPush + // Minutes Away Formula
   //             "</td>" +
   //             "<td class='col-xs-1'>" +  childSnapshot.val().timePush  + "</td>" +
   //             "</tr>");



    $("#orderDisplay").html(childSnapshot.val().numPush);
    $("#itemsDisplay").html(childSnapshot.val().stitchPush);
    $("#stitchDisplay").html(childSnapshot.val().itemsPush);
    $("#startedDisplay").html(childSnapshot.val().startPush);
    $("#finishedDisplay").html(childSnapshot.val().endPush); 
    $("#completedDisplay").html(childSnapshot.val().timePush + " " +"mins");

  });

 });
 






