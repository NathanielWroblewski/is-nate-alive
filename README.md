# Is Nate Alive?

An [endpoint](http://nathanielwroblewski.github.io/is-nate-alive) to display whether Nate is alive or not

![Screenshot](https://raw.githubusercontent.com/NathanielWroblewski/is-nate-alive/master/screenshots/screenshot.png)

## Check-in Flow

To check-in, I added a link to my phone's homescreen that hits a [Torpio](https://torpio.com/) webhook.  This webhook updates [Firebase](https://www.firebase.com/), a real-time NoSQL cloud database, via [Zapier](https://zapier.com), a sort of API for APIs.
  
  **Check-in:** Link &#8594; Torpio &#8594; Zapier &#8594; Firebase
  
  **Pull date:** Website &#8592; Firebase
  
#### Services ####
  
  * **Torpio webhook** - when visited, parses todays date and send it to a Zapier webhook
  * **Zapier webhook** - when visited, updates a record in firebase with the date parameter passed to it
  * **Firebase** - Stores a single entry with a date field
  * **Website** - when visited, pulls record from Firebase and sets the date on the page

#### Code needed for check-in on website ####

```js
var firebase = new Firebase(FIREBASE_URL)

firebase.on('child_added', function(snapshot) {
  var checkin = snapshot.val()
  document.getElementById('date').innerHTML = checkin.date
})
```

#### Code needed for check-in on Torpio Webhook ####

```js
var date = new Date().toLocaleTimeString('en-us', {
  hour:    '2-digit',
  minute:  '2-digit',
  weekday: 'short',
  year:    'numeric',
  month:   'short',
  day:     'numeric',
  hour12:  true
})
  , zapierWebhook = 'https://zapier.com/hooks/catch/ow7wcu/?date='

if (datetime) http.get(zapierWebhook + date, function(error, response, body) {
  log.info(error, response, body, date)
})
```
