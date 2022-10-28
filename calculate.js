var sequenceInput = document.getElementById("bitstream-input");
var initialCylinder = document.getElementById("initial-input");
var lastCylinder = document.getElementById("final-input");
var algoSelect = document.getElementById("algorithm");
var dirInput = document.getElementById("direction");

var calculateBtn = document.getElementById("calculate-btn");
calculateBtn.addEventListener("click", initialise);
// initialise();
var arr = [];

function initialise() {
  // Initialise variables
  inputString = sequenceInput.value.split(" ");
  //   console.log(inputString);
  for (var i of inputString) {
    arr.push(Number(i));
  }
  var head = Number(initialCylinder.value);
  //   var head = dirInput.value;
  var finalHead = lastCylinder.value;

  if (algoSelect.value == "fcfs") {
    fcfs(arr, head);
  } else if (algoSelect.value == "sstf") {
    // SSTF function is not mentioned in the code
  } else if (algoSelect.value == "scan") {
    SCAN(arr, head, direction);
  } else if (algoSelect.value == "cscan") {
    CSCAN(arr, head);
  } else if (algoSelect.value == "look") {
    LOOK(arr, head, direction);
  } else if (algoSelect.value == "clook") {
    CLOOK(arr, head);
  }
}
var size;
console.log(size);

var seek_count = 0;
//  FCFS Disk Scheduling Algorithm
// var seek_count = 0;
function fcfs(arr, head) {
  var distance, cur_track;

  for (var i = 0; i < arr.length; i++) {
    cur_track = arr[i];

    // Calculate absolute distance
    distance = Math.abs(cur_track - head);
   document.write(
    "disk head move from " +
      head +
      " to " +
      cur_track +
      " by " +
      distance +
      "<br>"
   );
    // Increase the total count
    seek_count += distance;

    // Accessed track is now new head
    head = cur_track;
  }

 document.write("Total number of " + "seek operations = " + seek_count);

  // Seek sequence would be the same
  // as request array sequence
  document.write("calculate3").innerHTML=("<br>Seek Sequence is");

  for (var i = 0; i < arr.length; i++) {
    document.write("calculate4").innerHTML=("<br>" + arr[i]);
  }
}

// function fcfs(arr, head) {
//   console.log("FCFS is called");
//   console.log(arr);
//   console.log(head);
//   var distance, cur_track;

//   document.write("Seek Sequence is");

//   for (var i = 0; i < size; i++) {
//     document.write("<br>" + arr[i]);
//   }
//   // Calculate absolute distance
//   distance = Math.abs(cur_track - head);
//   document.write(
//     "disk head move from " +
//       head +
//       " to " +
//       cur_track +
//       " by " +
//       distance +
//       "<br>"
//   );

//   // Increase the total count
//   seek_count += distance;

//   // Accessed track is now new head
//   head = cur_track;
// }

document.write("Total number of seek operations = " + seek_count);

// Seek sequence would be the same
// as request array sequence
document.write("Seek Sequence is");

for (var i = 0; i < size; i++) {
  document.write("<br>" + arr[i]);
}

// SSTF Disk Scheduling Algorithm

// SCAN Disk Scheduling Algorithm

function SCAN(arr, head, direction) {
  console.log("SCAN is called");
  console.log(arr);
  console.log(head);

  let seek_count = 0;
  let distance, cur_track;
  let left = [],
    right = [];
  let seek_sequence = [];

  // appending end values
  // which has to be visited
  // before reversing the direction
  if (direction == "left") left.push(0);
  else if (direction == "right") right.push(disk_size - 1);

  for (let i = 0; i < size; i++) {
    if (arr[i] < head) left.push(arr[i]);
    if (arr[i] > head) right.push(arr[i]);
  }

  // sorting left and right vectors
  left.sort(function (a, b) {
    return a - b;
  });
  right.sort(function (a, b) {
    return a - b;
  });

  // run the while loop two times.
  // one by one scanning right
  // and left of the head
  let run = 2;
  while (run-- > 0) {
    if (direction == "left") {
      for (let i = left.length - 1; i >= 0; i--) {
        cur_track = left[i];

        // appending current track to seek sequence
        seek_sequence.push(cur_track);

        // calculate absolute distance
        distance = Math.abs(cur_track - head);
        document.write(
          "disk head move from " +
            head +
            " to " +
            cur_track +
            " by " +
            distance +
            "<br>"
         );

        // increase the total count
        seek_count += distance;

        // accessed track is now the new head
        head = cur_track;
      }
      direction = "right";
    } else if (direction == "right") {
      for (let i = 0; i < right.length; i++) {
        cur_track = right[i];

        // appending current track to seek sequence
        seek_sequence.push(cur_track);

        // calculate absolute distance
        distance = Math.abs(cur_track - head);
        document.write(
          "disk head move from " +
            head +
            " to " +
            cur_track +
            " by " +
            distance +
            "<br>"
         );
        // increase the total count
        seek_count += distance;

        // accessed track is now new head
        head = cur_track;
      }
      direction = "left";
    }
  }

  document.write("Total number of seek operations = " + seek_count + "</br>");
  document.write("Seek Sequence is" + "</br>");
  for (let i = 0; i < seek_sequence.length; i++) {
    document.write(seek_sequence[i] + "</br>");
  }
}

// C-SCAN Disk Scheduling Algorithm

function CSCAN(arr, head) {
  console.log("CSCAN is called");
  console.log(arr);
  console.log(head);

  let seek_count = 0;
  let distance, cur_track;
  let left = [],
    right = [];
  let seek_sequence = [];

  // appending end values
  // which has to be visited
  // before reversing the direction
  left.push(0);
  right.push(disk_size - 1);

  // tracks on the left of the
  // head will be serviced when
  // once the head comes back
  // to the beggining (left end).
  for (let i = 0; i < size; i++) {
    if (arr[i] < head) left.push(arr[i]);
    if (arr[i] > head) right.push(arr[i]);
  }

  // sorting left and right vectors
  left.sort(function (a, b) {
    return a - b;
  });
  right.sort(function (a, b) {
    return a - b;
  });

  // first service the requests
  // on the right side of the
  // head.
  for (let i = 0; i < right.length; i++) {
    cur_track = right[i];

    // appending current track to seek sequence
    seek_sequence.push(cur_track);

    // calculate absolute distance
    distance = Math.abs(cur_track - head);
    document.write(
      "disk head move from " +
        head +
        " to " +
        cur_track +
        " by " +
        distance +
        "<br>"
    );
    // increase the total count
    seek_count += distance;

    // accessed track is now new head
    head = cur_track;
  }

  // once reached the right end
  // jump to the beggining.
  head = 0;

  // adding seek count for head returning from 199 to 0
  seek_count += disk_size - 1;

  // Now service the requests again
  // which are left.
  for (let i = 0; i < left.length; i++) {
    cur_track = left[i];

    // appending current track to seek sequence
    seek_sequence.push(cur_track);

    // calculate absolute distance
    distance = Math.abs(cur_track - head);
    document.write(
      "disk head move from " +
        head +
        " to " +
        cur_track +
        " by " +
        distance +
        "<br>"
    );
    // increase the total count
    seek_count += distance;

    // accessed track is now the new head
    head = cur_track;
  }

  document.write("Total number of seek operations = " + seek_count + "</br>");
  document.write("Seek Sequence is" + "</br>");
  for (let i = 0; i < seek_sequence.length; i++) {
    document.write(seek_sequence[i] + "</br>");
  }
}

// LOOK Disk Scheduling Algorithm

function LOOK(arr, head, direction) {
  console.log("LOOK is called");
  console.log(arr);
  console.log(head);

  let seek_count = 0;
  let distance, cur_track;

  let left = [];
  let right = [];
  let seek_sequence = [];

  // Appending values which are
  // currently at left and right
  // direction from the head.
  for (let i = 0; i < size; i++) {
    if (arr[i] < head) left.push(arr[i]);
    if (arr[i] > head) right.push(arr[i]);
  }

  // Sorting left and right vectors
  // for servicing tracks in the
  // correct sequence.
  left.sort(function (a, b) {
    return a - b;
  });
  right.sort(function (a, b) {
    return a - b;
  });

  // Run the while loop two times.
  // one by one scanning right
  // and left side of the head
  let run = 2;
  while (run-- > 0) {
    if (direction == "left") {
      for (let i = left.length - 1; i >= 0; i--) {
        cur_track = left[i];

        // Appending current track to
        // seek sequence
        seek_sequence.push(cur_track);

        // Calculate absolute distance
        distance = Math.abs(cur_track - head);
        document.write(
          "disk head move from " +
            head +
            " to " +
            cur_track +
            " by " +
            distance +
            "<br>"
        );
        // Increase the total count
        seek_count += distance;

        // Accessed track is now the new head
        head = cur_track;
      }

      // Reversing the direction
      direction = "right";
    } else if (direction == "right") {
      for (let i = 0; i < right.length; i++) {
        cur_track = right[i];

        // Appending current track to
        // seek sequence
        seek_sequence.push(cur_track);

        // Calculate absolute distance
        distance = Math.abs(cur_track - head);
        document.write(
          "disk head move from " +
            head +
            " to " +
            cur_track +
            " by " +
            distance +
            "<br>"
        );
        // Increase the total count
        seek_count += distance;

        // Accessed track is now new head
        head = cur_track;
      }

      // Reversing the direction
      direction = "left";
    }
  }

  document.write(
    "Total number of seek " + "operations = " + seek_count + "</br>"
  );

  document.write("Seek Sequence is" + "</br>");

  for (let i = 0; i < seek_sequence.length; i++) {
    document.write(seek_sequence[i] + "</br>");
  }
}

// C-LOOK Disk Scheduling Algorithm

function CLOOK(arr, head) {
  console.log("CLOOK is called");
  console.log(arr);
  console.log(head);

  let seek_count = 0;
  let distance, cur_track;

  let left = [];
  let right = [];
  let seek_sequence = [];

  // Tracks on the left of the
  // head will be serviced when
  // once the head comes back
  // to the beginning (left end)
  for (let i = 0; i < size; i++) {
    if (arr[i] < head) left.push(arr[i]);
    if (arr[i] > head) right.push(arr[i]);
  }

  // Sorting left and right vectors
  left.sort(function (a, b) {
    return a - b;
  });
  right.sort(function (a, b) {
    return a - b;
  });

  // First service the requests
  // on the right side of the
  // head
  for (let i = 0; i < right.length; i++) {
    cur_track = right[i];

    // Appending current track
    // to seek sequence
    seek_sequence.push(cur_track);

    // Calculate absolute distance
    distance = Math.abs(cur_track - head);
    document.write(
      "disk head move from " +
        head +
        " to " +
        cur_track +
        " by " +
        distance +
        "<br>"
    );
    // Increase the total count
    seek_count += distance;

    // Accessed track is now new head
    head = cur_track;
  }

  // Once reached the right end
  // jump to the last track that
  // is needed to be serviced in
  // left direction
  seek_count += Math.abs(head - left[0]);
  head = left[0];

  // Now service the requests again
  // which are left
  for (let i = 0; i < left.length; i++) {
    cur_track = left[i];

    // Appending current track to
    // seek sequence
    seek_sequence.push(cur_track);

    // Calculate absolute distance
    distance = Math.abs(cur_track - head);
    document.write(
      "disk head move from " +
        head +
        " to " +
        cur_track +
        " by " +
        distance +
        "<br>"
    );
    // Increase the total count
    seek_count += distance;

    // Accessed track is now the new head
    head = cur_track;
  }

  document.write(
    "Total number of seek " + "operations = " + seek_count + "</br>"
  );

  document.write("Seek Sequence is" + "</br>");

  for (let i = 0; i < seek_sequence.length; i++) {
    document.write(seek_sequence[i] + "</br>");
  }
}
