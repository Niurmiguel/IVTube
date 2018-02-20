import React, { Component } from 'react'

import style from './footer.css'
import classNames from '../../assets/lib/classNames.js'

class Footer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        var footerClass = classNames(style.root, (this.props.hasvideo) ? null : style.footer)
       return (
           <div className={footerClass}>
               <h3>Proyecto mantenido por <a href="https://github.com/Niurmiguel/IVTube">Niurmiguel</a></h3>
           </div>
       )
    }
}

export default Footer