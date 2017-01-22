This workshop is for SMHacks 2017. Here, you will make a realtime web data visualization of movies that are trending at the moment (ie. Moana, Rogue One, Hidden Figures, etc.) using PubNub. </br> 
<img src = "https://cloud.githubusercontent.com/assets/8932430/22179394/e83f57b6-e01f-11e6-9a77-5dac790c906c.jpg" width = 350 height = 300> <img src = "https://cloud.githubusercontent.com/assets/8932430/22179395/e9747b84-e01f-11e6-91ea-109bec382437.jpg" width = 350 height = 300> </br>
I had a blast leading this workshop, mentoring, and judging the final hacks. Check them out on the <a href = "https://smhacks.devpost.com/submissions">SMHacks DevPost</a>.
</br>
</br>
<em>Workshop Directions</em></br>
1. Clone the repo or download a zip file. </br>
2. Open up "your_index.js" and "your_index.html". These are where you will write your code. </br>
3. If you ever get lost, confused, or want to check correct code, you can check any of the "full_index" files for JS or HTML. </br>
4. There are numbers, beginning in "your_index.html", that detail each piece of code you should add. CSS is done for you, but feel free to play with colors, fonts, and more (and movies.) </br>
5. Comments should help guide you, but here are the workshop slides, too: https://docs.google.com/presentation/d/1Y72J4ATvtLGQeVHqaB0S9GkRcE901N4k4NrEgXBwCj0/edit?usp=sharing </br>

6. This workshop uses the PubNub Twitter Stream (which has its own channel and subscribe key, found at https://www.pubnub.com/developers/realtime-data-streams/twitter-stream/), but you also must generate your own API keys to publish the chart here, by signing in with Google: https://admin.pubnub.com/#/register?utm_source=facebook.com&utm_medium=social&utm_campaign=buffer&utm_content=buffer466e0&pi_visitorid=211579462&psc=WC-Tracking&pt=wc-tracking </br>
</br>
</br>
***Steps </br>
1. Open **your_index.html**, and, to use PubNub's Project EON, add in: 
```javascript 
<script type="text/javascript" src="http://pubnub.github.io/eon/v/eon/0.0.10/eon.js"></script>
```
</br>
2. Below the closing header tag, add the divs for your chart: </br>
```javascript
<div class= "movieData">
			<div id = "hoverImg"></div>
			<div id = "chart"></div> 
</div>
```
</br>
3. Open up **your_index.js**, and add in arrays containing words you want to search the PubNub Twitter Stream for. If you want to look up Tweets about Rogue One...: 
```javascript
var rogue1Words = [
	'rogue one', 'rogueone', 'star wars', 'starwars', '#rogueone', 'rogue one box office', 'rogue one review'
]
```
</br>
4. Each array must have a count, to be incremented each time a tweet containing a word from that array is found. They should be initialized at 0.
</br>
5. To use the Twitter Stream, use this channel and this PubNub object (using the subscribe_key found from the PubNub Twitter Stream webpage): 
```javascript
var channel = 'pubnub-twitter';

var pubnubTweet = PUBNUB.init({ 
  //sub key for twitter stream
}); //pubnub
```
6. In the **getStreamData()** function, add in a channel you're getting the tweets from ('pubnub-twitter'), and the number of tweets you want to go back to in history. The callback function is processData. </br>
7. Create a variable for the total number of tweets found (each tweet containing a word/phrase/hashtag from each array.) 
</br>
8. Each tweet must be converted to lower-case, and the count incremented. </br>
9. With your own PubNub API keys, create another PubNub object which you will use to publish the data.
</br>
10. To publish the data, in the **publish2()** function, add in the channel you are publishing to, and for the EON message, add in the data to be published (which movie is more popular on Twitter) like so: </br>
```javascript
"Rogue One": numRogueOneWords / totalNumTweets,
```
</br> 
Once a Bearcat, always a Bearcat.
