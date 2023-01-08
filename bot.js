console.log("Hey, I'm TwitBot");
var Twit = require('twit');
require('dotenv').config();

var T = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret
})

var likeReTweet = function() {
    var params = {
        q: '#webdevelopment #nodejs',
        result_type: 'recent',
        lang: 'en'
    }
    T.get('search/tweets', params, function(err, data) {
        var tweet = data.statuses;
        var randomTweet = ranDom(tweet);

        if (typeof randomTweet != 'undefined') {
            T.post('favorites/create', { id: randomTweet.id_str }, function(err, response) {
                if (err) {
                    console.log('Something went wrong while LIKING...');
                } else {
                    console.log('Liked!!!');
                }
            });
            T.post('statuses/retweet/:id', { id: randomTweet.id_str }, function(err, response) {
                if (err) {
                    console.log(err);
                    console.log('Something went wrong while RETWEETING...');
                } else {
                    console.log('Retweeted!!!');
                }
            });
        }
    });
}

likeReTweet();
setInterval(likeReTweet, 1000 * 60 * 60);

function ranDom(arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
};