import React, { Component } from 'react'

// Style
import style from './modalVideo.css'

class ModalVideo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen : false
        }

        this.closeModal = this.closeModal.bind(this)
    }

    openModal() {
        this.setState({ isOpen: true }, () => {
            console.log('open')
        })
    }

    closeModal() {
        this.setState({ isOpen: false }, () => {
            if(typeof this.props.onClose === 'function') {
                this.props.onClose()
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isOpen: nextProps.isOpen })
    }

    componentDidUpdate() {
        if(this.state.isOpen && this.modal) {
            this.modal.focus()
        }
    }

    getQueryString(obj) {
        let url = ''
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] !== null) {
                    url += key + '=' + obj[key] + '&'
                }
            }
        }
        return url.substr(0, url.length - 1)
    }

    getYoutubeVideo(youtube, videoId) {
        const query = this.getQueryString(youtube)
        return '//www.youtube.com/embed/' + videoId + '?' + query
    }

    renderModalVideo() {
        if (!this.state.isOpen) {
            return null
        }
        return (
            <div className={style.modal_video} tabIndex='-1' role='dialog'>
                <div className={style.modal_body}>
                    <div className={style.modal_inner}>
                        <button className={style.modal_close_btn}
                            onClick={this.closeModal} />
                        <div className={style.modal_movie_wrap}>
                            <iframe width='460'
                                height='230'
                                src={this.getYoutubeVideo(this.props.youtube, this.props.videoId)}
                                frameBorder='0'
                                allowFullScreen={this.props.allowFullScreen}
                                tabIndex='-1' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderModalVideo()}
            </div>
        )
    }
}

ModalVideo.defaultProps = {
    youtube: {
        autoplay: 1,
        cc_load_policy: 1,
        color: null,
        controls: 1,
        disablekb: 0,
        enablejsapi: 0,
        end: null,
        fs: 1,
        h1: null,
        iv_load_policy: 1,
        list: null,
        listType: null,
        loop: 0,
        modestbranding: null,
        origin: null,
        playlist: null,
        playsinline: null,
        rel: 0,
        showinfo: 1,
        start: 0,
        wmode: 'transparent',
        theme: 'dark'
    },
    allowFullScreen: true
}

export default ModalVideo