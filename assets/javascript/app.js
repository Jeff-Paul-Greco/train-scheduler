
var config = {
    apiKey: "AIzaSyBP6Y8nnew14jYH3zqcXqoA0lLpUCmWmQE",
    authDomain: "train-scheduler-fd37b.firebaseapp.com",
    databaseURL: "https://train-scheduler-fd37b.firebaseio.com",
    projectId: "train-scheduler-fd37b",
    storageBucket: "",
    messagingSenderId: "755519697664",
    appId: "1:755519697664:web:79b201c15438074f"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTime = $("#first-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    var newLine = {
        name: trainName,
        destination: trainDestination,
        first: firstTime,
        frequency: trainFrequency
    };

    database.ref().push(newLine);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");

});


database.ref().on("child_added", function (childSnapshot) {

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;

    var firstTimeConverted = moment(firstTime, "hh:mm A").subtract(1, "years");
    var difference = moment().diff(moment(firstTimeConverted), "minutes");
    var apart = difference % trainFrequency;
    var minutesUntil = trainFrequency - apart;
    var nextTrain = moment().add(minutesUntil, "minutes");

    var newLine = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(moment(nextTrain).format("hh:mm A")),
        $("<td>").text(minutesUntil)
    );

    $("#train-table > tbody").append(newLine);

});

function update() {
    setTimeout(function () {

        var currentTime = moment().format("hh:mm:ss A")
        $("#current-time").text("Current Time: " + currentTime);
        update();

    }, 1000);
};

update();