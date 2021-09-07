import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        // name:'stranger'
        country:'in',
        pageSize:8,
        category:'general',
    }
    static PropsTypes = {
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
    }



    constructor() {
        super();
        console.log("Hello World");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }

    }
    // async updateNews(){
    //     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e3ed0e1401be4fb59c412367b9bde407&page${this.state.page}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading: true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     console.log(parsedData);
    //         this.setState({loading: false});
    //     this.setState({ articles: parsedData.articles, 
    //         totalResults: parsedData.totalResults, 
    //         loading: false})

    // }

    async componentDidMount() {
        console.log("cdm");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e3ed0e1401be4fb59c412367b9bde407&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
            this.setState({loading: false});
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
    }

    handleClickPrev = async () => {
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e3ed0e1401be4fb59c412367b9bde407&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});

        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
        // this.setState({page:this.state.page - 1});
        // this.updateNews()

    }

    handleClickNext = async () => {
        console.log("Next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

        
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e3ed0e1401be4fb59c412367b9bde407&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
        // this.setState({page:this.state.page + 1 });
        // this.updateNews()

    }

    render() {
        console.log("render")
        return (
            <div className="container my-3">
                <h1 className="text-center">News monkey.. Top headlines</h1>
             { this.state.loading &&  <Spinner/>}
              22

                <div className="row">
                    {!this.state.loading &&this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handleClickPrev}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleClickNext}>Next &rarr;</button>
                </div>

            </div>



        )
    }
}

export default News
