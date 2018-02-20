var axios = require('axios')

const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search'
const ROOT_URL_VIDEOS = 'https://www.googleapis.com/youtube/v3/videos'

export default {
    search: function (options, callback) {
        if (!options.key) {
            throw new Error('La clave esperada de búsqueda de YouTube, recibida indefinida')
        }

        
        let params = {
            part: 'snippet',
            key: options.key,
            q: options.term,
            pageToken: options.pageToken || '',
            maxResults: 15,
            type: 'video'
        },videos

        axios.get(ROOT_URL, { params })
            .then(success => {
                videos = success.data
                return videos
            })
            .then(success => {
                Promise.all(success.items.map(item => 
                    axios.get(
                        ROOT_URL_VIDEOS, {
                        params:{
                            id: item.id.videoId,
                            part: 'snippet,contentDetails,player',
                            key: options.key
                        }}).then(resp => resp)
                ))
                .then(success => {
                    success.forEach((item, i) => {
                        videos.items[i] = item.data.items[0]
                    })
                    return videos
                })
                .then(success => callback(videos))
                .catch(err => console.log(err))
            })
    }  
}