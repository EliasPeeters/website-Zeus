const request = require('request');
let html2json = require('html2json').html2json;

function getPodcastEpisodes() {
    request(`https://redcircle.com/embedded-show-webplayer/ac7565d9-ba20-4c82-8851-933cda3ab5dd?bgColor=%23fcfbf6`, (err, res, body) => {
        let output = html2json(body).child;
        let podcast = []

        output.forEach(function(item) {
            if (item.tag = 'body') {
                output = item;
            }
        })

        output = output.child[0].child[0].child[3].child

        output.forEach(function(item) {
            podcast.push(
                {
                    name: item.child[2].child[0].text,
                    date: item.child[0].child[0].text,
                    page: '/podcast',
                    description: ''
                }
            )
        });
        // console.log(html2json(body).child)


        data.podcast = podcast;
        console.log(data.podcast)

    });
}

getPodcastEpisodes();