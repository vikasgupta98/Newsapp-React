import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imagUrl, url, author, date } = this.props;
        return (
            <div className='my-3'>
                <div className="card " >
                    <img src={!imagUrl ? "https://dnd2oi6izkvoi.cloudfront.net/2023/05/28/image/jpeg/YnUS55W9s5GGUO29BEvl8OlpUURmEy6ppKNHJT1E.jpg" : imagUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">by {!author ? "Unknown" : author} on {date} </small></p>
                        <a rel="noreferrer" href={url} target='_blank' className="btn btn-sm btn-dark" >Read More</a>
                    </div>
                </div>
            </div >
        )
    }
}

export default NewsItem