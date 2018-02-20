import React, { Component } from 'react'

import style from './search.css'

class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {value: this.props.term}
        this._handleChange = this._handleChange.bind(this)
    }

    _handleChange(event) {
        this.setState({ value: event.target.value })
    }

    render() {
        return (
            <div className={style.box_search}>
                <form onSubmit={this.props.onPressSearch}>
                    <div className="input-group">
                        <input 
                            type="text" 
                            name="search" 
                            className="form-control" 
                            value={this.state.value}
                            placeholder="Buscar"
                            onChange={this._handleChange} />
                        <button type="submit" className={style.btn_search}><i className="fas fa-search"></i></button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBar