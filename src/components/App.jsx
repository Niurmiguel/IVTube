import React, { Component } from 'react'
import P from 'react-particles-js'
import YTSearch from '../assets/lib/youtube-api-search.js'
import { Route, Link, MemoryRouter, BrowserHistory } from 'react-router'

import style from './app.css'
import Header from './Header'
import Main from "./Main"
import Search from "./Search"
import Footer from './Footer'

const API_KEY = 'AIzaSyAXMevzCp9av9VHtwDyo619tpf3m7mHotc'

class App extends Component {
    constructor() {
        super()
        this.state = {
            term: '',
            videos: [],
            items: {},
            totalResults: null,
            hasMoreItems: true,
            nextPage: null,
            hasvideo: false
        }
        

        this._handleSearch = this._handleSearch.bind(this)
    }

    _handleSearch(e) {
        e.preventDefault()
        let value = e.target.search.value
        this.setState({ term: value, nextPage: null }, function () {
            this.searchYT(value, 'search')
        })
    }

    searchYT = (term, action) => {
        if (this.state.nextPage || action === 'search') {
            var param = (action === 'search') ? { key: API_KEY, term, newItem: false } : {
                key: API_KEY, term, pageToken:
                    this.state.nextPage, newItem: false
            }

            YTSearch.search(param, videos => {
                let moreItems = (action == 'search') ? videos.items : this.state.videos.concat(videos.items)

                    if (!videos.nextPageToken) {
                        this.setState({ hasMoreItems: false })
                    }

                    this.setState({
                        videos: moreItems,
                        totalResults: videos.pageInfo.totalResults,
                        nextPage: videos.nextPageToken,
                        hasvideo: true
                    }, () => {
                        console.log(this.state.videos)
                    })
            })
        }
    }

    render() {
        return (
            <MemoryRouter>
                <div id={style.main}>
                    <P
                        params={{
                            particles: {
                                number: {
                                    value: 100
                                },
                                line_linked: {
                                    enable: false
                                },
                                color: {
                                    value: "#000000"
                                }
                            }
                        }}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                        }} />
                    <Header 
                        hasvideo={this.state.hasvideo} 
                        term={this.state.term}
                        onSearch={this._handleSearch} />
                    <Route exact path="/" history={BrowserHistory} render={() => (
                        (this.state.hasvideo) ? <Main 
                            videos={this.state.videos}
                            totalResults={this.state.totalResults}
                            term={this.state.term}
                            hasMoreItems={this.state.hasMoreItems}
                            moreItems={this.searchYT} /> : 
                            <Search onSearch={this._handleSearch}/>
                    )} />
                   
                    <Footer hasvideo={this.state.hasvideo} />
                </div>
            </MemoryRouter>
        )
    }
}

export default App