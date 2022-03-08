import {Component} from "react";
import {POLL_LIST_SIZE} from "../constants";

class PollList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            currentVotes: [],
            isLoading: false
        };
        this.loadPollList = this.loadPollList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }
    loadPollList(page =0,size=POLL_LIST_SIZE){
        let promise;
        if(this.props.username){
            if (this.props.type ==='USER_CREATED_POLLS'){

            }
        }
    }
}