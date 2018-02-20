import React, { Component } from 'react'
import SVGInline from "react-svg-inline"

import SearchBar from '../SearchBar'
import logo from '../../assets/svg/logo.svg'
import logoGithub from '../../assets/svg/github.svg'
import style from './header.css'
import classNames from '../../assets/lib/classNames.js'

class Header extends Component {
    constructor(props) {
        super(props)
    }

    _hasVideos() {
        if (this.props.hasvideo) {
            return (
                <SearchBar 
                    term={this.props.term}
                    onPressSearch={this.props.onSearch} />
            )
        }
    }

    render() {
        var headerClass = classNames(style.root, (this.props.hasvideo) ? style.header : null)

        return (
            <header className={headerClass}>
                <figure className={style.logo}>
                    <SVGInline svg={logo} />
                </figure>
                {this._hasVideos()}
                <a href="https://github.com/Niurmiguel/IVTube">
                    <figure className={style.logo}>
                        <SVGInline svg={logoGithub} className={style.logoGithub}/>
                        <span>Niurmiguel</span>
                    </figure>
                </a>
            </header>
        )
    }
}

export default Header