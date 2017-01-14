// #6 : your array of words to search for--make multiple arrays, for each movie
// you are looking up!
var rogueOneWords = [
  'rogue one', 'rogueone', 'star wars', 'starwars', '#rogueone', 'rogue one box office', 'rogue one review'
]
//chart decorations plan for following movies: Moana, Hidden Figures, Hidden Fences, Fences, La La Land


// #7: make counts for each array (initialize at 0)!


// #8 variable name for twitter channel to pull data from = 'pubnub-twitter'


// #9: initialize PubNub object (goes around subscribe key) -> var pubnubTweet = PUBNUB.init({

  subscribe_key: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe', //get tweets containing key 
  ssl: true
//});




getStreamData();
// fetch previous Tweets, then realtime stream
function getStreamData() {
  pubnubTweet.history({ //PubNub history API
    channel: , // #10
    count: , // #11 (you can use whatever number you want, I used 75)
    callback: function(messages) { 
      //callback is a function that runs within function when that function is successful. Here, processData runs if successful 
      pubnubTweet.each(messages[0], processData);
    }
  });
  pubnubTweet.subscribe({
    channel: , // #12, subscribe to same channel var name ('pubnub-twitter')
    callback:  // #13 (processData)
  });
}

// #14: create variable to keep track of total number of tweets containing words in each array


function processData(data) {
  if (!data) DOCUMENT.getElementById('chart') = "Data is loading.";
  
  // #15: if tweet contains word in array, convert tweet to lower-case
  if (rogueOneWords.some(function(v) {
      return data.text.toLowerCase().indexOf(v) !== -1;
    })) {
    numRogueOneWords += 1; //increment array count
    totalNumTweets += 1; //increment total number of tweets 
    publish2(); //publish data to chart channel (each has separate)
    console.log(data);
    //copy and paste this code above ^^ for each array you made, editing the array and count names
  } //if 
  //else if.... for each array
} //processData()

// #15: create PubNub object for EON chart (use keys from PubNub.com)
var pubnubEon = PUBNUB.init({ //publish key, subscribe key ^^
  //publish key
  //subscribe key
});
//publish chart
var smHacksChan = ' '; //make variable for channel to publish chart data to 
function publish2() {
  pubnubEon.publish({
    channel: smHacksChan,
    message: {
      eon: {
        "Rogue One": numRogueOneWords / totalNumTweets,
        // #16: add in a line for each array you made. This is the data for chart.
      }
    }, //msg
    callback: function(m) {
        console.log(m) //print out tweets!
      } //callback
  }); //pubnubEon
} //publish

//embed chart
eon.chart({
  channel: smHacksChan, //different channel than subscribing to--this is to publish
  pubnub: pubnubEon, //pubnub object
  generate: {
    bindto: '#chart', //chart will show up in the HTML div in other file
    data: {
      labels: true, //display labels
      type: 'donut', //could try different chart types, like bar
      colors: {
        'Rogue One': 'gray',
        // #17: colors of each section of chart for each movie
      } //colors	
    }, //data
    legend: {
      show: true,
      item: {
        onmouseover: function(id) {
          //display image for each film: done for you
          if (id == "Moana") {
            document.getElementById('hoverImg').innerHTML = "<img src='img/moana.jpg' border=0/></a>";
            document.getElementById("hoverImg").style.transitionDuration = "10s";
          } else if (id == "Sing") {
            document.getElementById('hoverImg').innerHTML = "<img src='img/sing.jpg' border=0/></a>";
            document.getElementById("hoverImg").style.transitionDuration = "10s";
          } else if (id == "Hidden Fences") {
            document.getElementById('hoverImg').innerHTML = "<img src='img/hiddenfences.jpg' border=0/></a>";
            document.getElementById("hoverImg").style.transitionDuration = "10s";
          } else if (id == "Rogue One") {
            document.getElementById('hoverImg').innerHTML = "<img class = 'resize' src='img/rogueone.jpg' border=0/></a>";
            document.getElementById("hoverImg").style.transitionDuration = "10s";
          } else if (id == "La La Land") {
            document.getElementById('hoverImg').innerHTML = "<img src='img/lalaland.jpg' border=0/></a>";
            document.getElementById("hoverImg").style.transitionDuration = "10s";
          } else if (id == "Hidden Figures") {
            document.getElementById('hoverImg').innerHTML = "<img src='img/hiddenfigures.jpg' border=0/></a>";
            document.getElementById("hoverImg").style.transitionDuration = "10s";
          } else if (id == "Fences") {
            document.getElementById('hoverImg').innerHTML = "<img class = 'resize' src='img/fences.jpg' border=0/>";
            document.getElementById("hoverImg").style.transitionDuration = "10s";
          } 
        }, //onmouseover
        //onmouseout, img goes away: done for you 
        onmouseout: function(id) {
            if (id == "Moana") {
              document.getElementById('hoverImg').innerHTML = " ";
              document.getElementById("hoverImg").style.transitionDuration = "10s";
            } else if (id == "Sing") {
              document.getElementById('hoverImg').innerHTML = " ";
              document.getElementById("hoverImg").style.transitionDuration = "10s";
            } else if (id == "Hidden Fences") {
              document.getElementById('hoverImg').innerHTML = " ";
              document.getElementById("hoverImg").style.transitionDuration = "10s";
            } else if (id == "Rogue One") {
              document.getElementById('hoverImg').innerHTML = " ";
              document.getElementById("hoverImg").style.transitionDuration = "10s";
            } else if (id == "La La Land") {
              document.getElementById('hoverImg').innerHTML = " ";
              document.getElementById("hoverImg").style.transitionDuration = "10s";
            } else if (id == "Hidden Figures") {
              document.getElementById('hoverImg').innerHTML = " ";
              document.getElementById("hoverImg").style.transitionDuration = "10s";
            } else if (id == "Fences") {
              document.getElementById('hoverImg').innerHTML = " ";
              document.getElementById("hoverImg").style.transitionDuration = "10s";
            } //last else if
          } //onmouseout 	
      } //legend.item
    }, //legend
    tooltip: {
      show: false //gets rid of hover legend
    },
    axis: {
      x: {
        label: 'Movie'
      }, //x
      y: {
        label: 'Number of Tweets'
      } //y
    } //axis
  } //generate
}); //eon.chart
