import React, { Component } from 'react'

import style from './search.css'
import SearchBar from '../SearchBar'

class Search extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id={style.content}>
                <div className={style.searchbar}>
                    <h1>Buscar Videos</h1>
                    <SearchBar onPressSearch={this.props.onSearch} term=''/>
                </div>
            </div>
        )
    }
}

export default Search