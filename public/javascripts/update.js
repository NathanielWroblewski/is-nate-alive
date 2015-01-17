var firebase = new Firebase('https://fiery-torch-3986.firebaseio.com/')

firebase.on('child_added', function(snapshot) {
  var checkin = snapshot.val()
  document.getElementById('date').innerHTML = checkin.date
})
