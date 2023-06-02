import React, { Component } from 'react'
import NewsItem from '../NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResult: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsExpress`;
    }
    async updateNews(pageNo) {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8bdbd7f569c34df4869523a903d369d4&page=${this.state.page}&pageSize=20&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResult: parsedData.totalResult,
            loading: false,
        })
    }
    async componentDidMount() {
        this.updateNews();
    }
    /*
        handlePrevClick = async () => {
            console.log("prev");
    
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8bdbd7f569c34df4869523a903d369d4&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json()
            console.log(parsedData);
            this.setState({
                page: this.state.page - 1,
                articles: parsedData.articles
            })
        }
        handleNextClick = async () => {
            console.log("next");
            if (this.state.page + 1 > Math.ceil(this.state.totalResult / this.props.pageSize)) {
    
            }
            else {
                let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8bdbd7f569c34df4869523a903d369d4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
                let data = await fetch(url);
                let parsedData = await data.json()
                console.log(parsedData);
                this.setState({
                    page: this.state.page + 1,
                    articles: parsedData.articles
                })
            }
        }*/
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8bdbd7f569c34df4869523a903d369d4&page=${this.state.page + 1}&pageSize=20&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResult: parsedData.totalResult,
            loading: false,

        })
    };

    render() {
        return (
            <>
                <h2 className='text-center my-2'>NewsExpress Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResult}
                    loader={<h4>Loading...</h4>}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 90) : ""}
                                        imagUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

            </ >
        )
    }
}

export default News