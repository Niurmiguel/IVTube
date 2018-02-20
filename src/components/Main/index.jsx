import React, { Component } from "react";

import VideoList from '../VideoList'
import SearchBar from '../SearchBar'
import style from './main.css'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            viewVideo: false,
            videoId: ''
        }

        this.onPressItem = this.onPressItem.bind(this)
    }

    renderVideos() {
        if (this.props.videos.length) {
            return (
                <VideoList 
                    items={this.props.videos} 
                    nextPage={this.props.videos.nextPageToken}
                    term={this.props.term}
                    hasMoreItems={this.props.hasMoreItems}
                    loadItems={this.props.moreItems}
                    onPressItem={this.onPressItem} />
            )
        }
    }

    onPressItem(videoId) {
        this.setState({viewVideo: true, videoId})
    }

    render() {
        var totalResults = this.props.totalResults.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        return (
            <div id={style.content}>
                <div>
                    <div id={style.header_content}>
                        <div id={style.nResult}>
                            <h3>Unos {totalResults} resultados</h3>
                        </div>
                    </div>
                    <div id={style.result}>
                        {this.renderVideos()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Main