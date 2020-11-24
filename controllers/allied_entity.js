
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Test controller TournamentResult');
};

exports.createTournamentResult=function(req, res){
  var tournamentResult = new TournamentResult(req.body);
  tournamentResult.save(function (err) {
    if (err) {
        return next(err);
    }
    res.send('TournamentResult created successfully')
  })
};

exports.getAll=function(req, res) {
  let scheduleRef = db.collection('schedule');
  var hola=[]
  let query = scheduleRef.where('state', '==', false).get().then(snapshot => {
    snapshot.forEach(doc => {
      let document=doc.data()
      hola.push(document)
      console.log( document.date.toDate() );
    });
    res.send(hola)
});

  TournamentResult.find((err, tournamentResult) => {
    if(err) {
        console.error(err)
        return reject(err)
    }        
    res.send(tournamentResult)
  }).sort({current_time : 1}).populate(['local_team','visitor_team'])
};


exports.tournament_result_details = function (req, res) {
  TournamentResult.findById(req.params.id, function (err, tournament_result) {
      if (err) return next(err);
      res.send(tournament_result);
  }).populate(['local_team','visitor_team'])
};

exports.get_is_playing=function(req, res) {
  console.log('tournament_results.get_is_playing')
  TournamentResult.find({ is_playing: req.params.is_playing },(err, tournamentResult) => {
    if(err) {
        console.error(err)
        return reject(err)
    }        
    res.send(tournamentResult)
  }).populate(['local_team','visitor_team'])
};

exports.tournament_result_update = function (req, res) {
  TournamentResult.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, tournament_result) {
      if (err) return next(err);
      res.send('tournament_result udpated.');
  });
};

exports.tournament_result_delete = function (req, res) {
  TournamentResult.findByIdAndRemove(req.params.id, function (err) {
      if (err) return next(err);
      res.send('Deleted successfully!');
  })
};

exports.updateAll = function (req, res) {
  TournamentResult.update(({}),{$set: req.body},{multi: true}, function (err) {
    if (err) return next(err);
    res.send('Update successfully!');
  })
};

var res={
  "local_goals":0,
  "visitor_goals":0,
  "is_playing":false,
  "current_time":0
}




