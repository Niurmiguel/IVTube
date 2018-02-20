import React, { Component } from 'react'
import moment from 'moment'
import ytDurationFormat from 'youtube-duration-format'

import ModalVideo from '../ModalVideo'
import style from './item.css'

moment.locale('es')

class VideoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            view: '',
            isview: false,
            isviewlist: false,
            isOpen: false
        }

        this.openModal = this.openModal.bind(this)
    }

    openModal() {
        this.setState({ isOpen: true })
    }

    render() {
        return (
            <div className={style.grid_video}>
                <div className={this.state.isviewlist ? style.card_list : style.card_grid}>
                    <figure className={style.thumbnails}>
                        <a href="#" onClick={this.openModal}>
                            <img src={this.props.thumbnails.medium.url} alt=""/>
                        </a>
                        <span className={style.duration}>{ytDurationFormat(this.props.duration)}</span>
                    </figure>
                    <div className={style.details}>
                        <div id={style.meta}>
                            <h3>{this.props.title}</h3>
                            <div id={style.byline}>
                                <span>{this.props.channelTitle}</span>
                            </div>
                            <div id={style.metadata}>
                                <span>{moment(this.props.publishedAt, 'YYYYMMDD').fromNow()}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalVideo
                    isOpen={this.state.isOpen}
                    videoId={this.props.videoId}
                    onClose={() => this.setState({ isOpen: false })} />
            </div>
        )
    }
}

export default VideoItem 