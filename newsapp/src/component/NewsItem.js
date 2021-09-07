import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, imageUrl, description, newsUrl, author, date,source } = this.props;
        return (
            <div className="my-3">
                <div className="card" style={{ width: "18rem" }}>
                    <img src={!imageUrl ? "https://www.wallpapers13.com/wp-content/uploads/2020/09/Sunset-Airplane-Takeoff-Free-Images-for-Wallpapers-Hd-915x515.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}}>
                            {source}
                        </span></h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small class="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>

                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>

                </div>
            </div>
        )
    }
}

export default NewsItem
