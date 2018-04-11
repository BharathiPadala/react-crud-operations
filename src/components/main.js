import React,{Component} from 'react';

import AddQuotes from './addQuotes';

class Main extends React.Component{
    constructor(props){
        super(props);
        this.emptyQuote = {
            _id: '',
            quoteText: '',
            authorName: ''
          };
          this.state = {
            quotes: props.quotes,
            selectedQuote: this.emptyQuote
          }
    }
    selectQuote(_id) {
        this.setState({
          selectedQuote: this.state.quotes.find(quote => quote._id == _id)
        });
      }
      
      newQuote() {
        this.setState({
          selectedQuote: this.emptyQuote
        });
      };

      updateQuote(updatedQuote) {
        debugger;
        let newQuotes;    
        // new quote
        if(updatedQuote.quoteText!=''){
        if (updatedQuote._id == '') {
          updatedQuote._id = Date.now();
          newQuotes = this.state.quotes;
          newQuotes.push(updatedQuote);      
        // updating existing quote
        } else {
          newQuotes = this.state.quotes.map(quote => {
            if (updatedQuote._id == quote._id) {
              return updatedQuote;
            } else {
              return quote;
            }
          });
        }
       } else{
         alert("Please Enter Quote...");
         return quote;
       }
       this.setState({
          quotes: newQuotes,
          selectedQuote: this.emptyQuote
        });
      }
      
      deleteQuote(_id) {
        this.setState({
          quotes: this.state.quotes.filter(quote => quote._id !== _id),
          selectedQuote: this.emptyQuote
        })
      }
    render(){
        debugger;
        return(
            <main>
            <AddQuotes
              selectedQuote={this.state.selectedQuote}
              newQuote={() => this.newQuote()}
              updateQuote={(quote) => this.updateQuote(quote)}
              deleteQuote={(_id) => this.deleteQuote(_id)} />
            <hr/>
            <div className="container">
              {this.state.quotes.map(quote =>(                 
                <React.Fragment key={quote._id}>
                 <div className="row">
                  <div className="quote_grid">
                  <a 
                  href="#" 
                  onClick={() => this.selectQuote(quote._id)}
                  className={this.state.selectedQuote._id == quote._id ? 'selected' : ''}>
                  
                   <blockquote>
                     <q>{quote.quoteText}</q>
                   </blockquote>
                   <p>--{quote.authorName}</p>
                   </a>
                  </div>
                  <a href="#" 
                   className="btn" 
                   onClick={() => this.deleteQuote(quote._id)}
                 >Delete</a>
                 </div>
                
                </React.Fragment>
              ))}
            </div>
            </main>
        );
    }
}

export default Main;