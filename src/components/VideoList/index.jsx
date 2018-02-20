import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { ClipLoader } from 'react-spinners'

import VideoItem from '../VideoItem'
import style from './videolist.css'

class VideoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,

        }
        this.renderItems = this.renderItems.bind(this)
        this.viewItem = this.viewItem.bind(this)
    }

    viewItem(e, id) {
        e.preventDefault()
        this.props.onPressItem(id)
    }

    renderItems(){
       return (
           <div>
               {this.props.items.map((item, i) => {
                   return (
                       <VideoItem
                           key={i}
                           videoId={item.id}
                           title={item.snippet.title}
                           thumbnails={item.snippet.thumbnails}
                           duration={item.contentDetails.duration}
                           publishedAt={item.snippet.publishedAt}
                           channelTitle={item.snippet.channelTitle}
                           embedHtml={item.player.embedHtml}
                           viewItem={this.viewItem}
                       />
                   )
               })}
           </div>
       )
    }

    loadItems(page) {
        console.log(this.props)
        this.props.loadItems(this.props.term, 'update')
    }

    render() {
        return (
            <InfiniteScroll
                id={style.content}
                pageStart={0}
                loadMore={this.loadItems.bind(this)}
                hasMore={this.props.hasMoreItems}
                useCapture={true}
                loader={<ClipLoader
                    color={'#123abc'}
                    size={25}
                    loading={this.state.loading}
                    key={0}
                />}>

                {this.renderItems()}
            </InfiniteScroll>
        )
    }
}

export default VideoList