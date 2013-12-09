/*
 * GET home page.
 */
var twitter = require('ntwitter');
var twit = new twitter( {
    consumer_key: 'aMqJIVr3n5jdzWCgBsZw',
    consumer_secret: 'DAiMY3vgwg4WkDX2qRGc4K0c0eqNPnyNNGcFCDiW2o',
    access_token_key: '302743670-tW5XMpMXgIC8FerBy2oujCJgZdcoIxVf8E3gyjFv',
    access_token_secret: 'zU9m8RXkTwBMSovAJ93LVBRG2zQ7JS6IGvUF45iAYLseH'
});
// @maz variables name : "twit" should be called "twitterApi" in order to
//      distinguish it from tweet items

exports.index = function(req, res) {

    /**
     * gets userTimeLine and filter retweets to be shown
     * @param  {[numeric]} user_id  [my tweeter user_id]
     * @param  {[numeric]} counr [description]
     * @param  {[numeric]} counr [description]
     * @return {[json array]}      [description]
     */
    twit.getUserTimeline( {'user_id':302743670, 'count':200,'include_rts':true,}, function(err, data) {
        if (!err) {
            var retweets = {};
            var i=0;
            // @maz "i = 0" (addtional spaces required)
            for (var twett in data) {
                // @maz variable name "twett" => "tweet" / "item"
                //      !!! no spelling mistake please
                //if tweet is a retweet
                if (data[twett].retweeted == true) {
                    //tweet owner
                    var screenName = "@"+data[twett].retweeted_status.user.screen_name;
                    //removing screenName from retweet text
                    var str = data[twett].text.split(": ");
                    var retweetText = str[1];
                    //retweet :)
                    var retweet = {"tweetOwner": screenName, "tweetText":retweetText};
                    // @maz simpler => { owner: xyz, text: xyz }
                    retweets[i]=retweet;
                    // @maz ^^^ spaces required
                    i++;
                }
            }
            console.log(retweets);
            var jt = JSON.stringify(retweets);
            // @maz never used :(
            res.render('index', { title: 'My retweets',error:'', code: retweets });
        } else {
            res.send(err, 400);
          }
          // @maz indentation error
    });
};