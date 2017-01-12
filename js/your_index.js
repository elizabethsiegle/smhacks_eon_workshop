//your array of words to search for--make multiple arrays!
var firstWords = [
'san mateo', '#mateoyouknow', 'you wish you were a bearcat'
]

//make counts!
var firstWords = 0;

//twitter channel to pull data from
var channel = 'pubnub-twitter';
var pubnubTweet = PUBNUB.init({ //sub key for twitter stream
  subscribe_key: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe', //get tweets containing key words for Twitter chan
  ssl: true
}); //pubnub
getStreamData();
// fetch previous 75 Tweets, then realtime stream
 function getStreamData() {
   pubnubTweet.history({
    channel: channel,
    count: 75,
    callback: function(messages) {
      pubnubTweet.each(messages[0], processData);
    }
  });
   pubnubTweet.subscribe({
    channel: channel,
    callback: processData
  });
}
var totalNumTweets = 0;
function processData(data) {
  if (!data) DOCUMENT.getElementById('chart') = "Data is loading.";
  
  if (firstWords.some(function(v) {
      return data.text.toLowerCase().indexOf(v) !== -1;
    })) {
    numSingWords += 1;
    publish2();
    console.log(data);
  } //...else if 
} //processData()
var pubnubEon = PUBNUB.init({
  subscribe_key: 'sub-c-ec13adb2-2164-11e6-9327-02ee2ddab7fe', //different subscribe from Twitter
  publish_key: 'pub-c-01ea45a2-75a8-40af-8db0-578d519eed0e' //separate keyset generated, paired with new subscribe key
});
//publish chart
var smHacksChan = 'smHacksChannel';
function publish2() {
  pubnubEon.publish({
    channel: smHacksChan,
    message: {
      eon: {
        "La La Land": numLaLaLandWords / totalNumTweets,
        "Moana": numMoanaWords / totalNumTweets,
        "Hidden Figures": numHiddenFiguresWords / totalNumTweets,
        "Rogue One": numRogueOneWords / totalNumTweets,
        "Fences": numFencesWords / totalNumTweets,
        "Sing": numSingWords / totalNumTweets,
        "Hidden Fences": numHiddenFencesWords / totalNumTweets
      }
    }, //msg
    callback: function(m) {
        console.log(m)
      } //callback
  }); //pubnubEon
} //publish
//embed chart
eon.chart({
  channel: smHacksChan,
  pubnub: pubnubEon,
  generate: {
    bindto: '#chart',
    data: {
      labels: true,
      type: 'donut', //bar
      colors: {
        'Moana': 'blue',
        'Sing': 'red',
        'Hidden Fences': 'green',
        'Rogue One': 'gray',
        'La La Land': 'pink',
        'Hidden Figures': 'purple',
        'Fences': 'brown'
      } //colors	
    }, //data
    legend: {
      show: true,
      item: {
        onmouseover: function(id) {
          //could also get pics easily straight from Warriors website instead of having in img folder
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
            document.getElementById('hoverImg').innerHTML = "<img class = 'resize' src='img/win.png' border=0/>";
            document.getElementById("hoverImg").style.transitionDuration = "10s";
          } 
        }, //onmouseover
        //onmouseout, img goes away
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
