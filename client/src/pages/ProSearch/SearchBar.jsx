import React, {Component} from 'react'

export default class SearchBar extends Component {

    constructor(props){
        super(props);
        this.onSubmit=this.onSubmit.bind(this);
    }

    onSubmit(event){
        event.preventDefault();
        const query = event.target.elements.query.value;
        console.log('search: ', query);
        this.props.onSearch(query);
    }

    componentDidMount(){
        const {onSearch, initialQuery} = this.props;
        
        if (initialQuery)
            onSearch(initialQuery)
    }
    
    render() {
        const {initialQuery} = this.props;
        return (
            <section>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <h3>Enter a word or phrase:</h3>                
                        <input 
                            value={this.props.filterText}
                            defaultValue={initialQuery}
                            style={inputStyle} 
                            placeholder='Find your Pro!' type="text" name="query" />
                        <button style={buttonStyle} type="submit">Search</button>
                    </div>
                </form>
            </section>
        );
    }
}

const inputStyle = { border :'3px solid #f54646'};
const buttonStyle = { margin: '10px' }