import React from 'react';
// import Titles from './components/Titles';
// import Form from './components/Form';
// import Weather from './components/Weather.js';
import './App.css';

// const API_KEY ="522f27021fa041e6b576680c97a4d42b";

// https://codepen.io/akshgods/pen/wybPxm

// class App extends React.Component {
//   state = {
//     temperature : undefined,
//     city : undefined,
//     country : undefined,
//     humidity : undefined,
//     desription : undefined,
//     error :  undefined
//   }  


//   getWeather = async (e) => {
//     e.preventDefault();
//     const city = e.target.elements.city.value;
//     const country = e.target.elements.country.value;
//     const api_call = await fetch('http://samples.openweathermap.org/data/2.5/forecast?q=${city},${country} & appid = ${APP_KEY} & units = metric');

//     const data = await api_call.json();

//    // console.log(data);

//    if (city && country) {
//      console.log(data);
//      this.setState ({
//        temperature : data.main.temp,
//        city : data.name,
//        country : data.sys.country,
//        humidity : data.main.humidity,
//        description : data.weather[e].description,
//        error : ""
//      });
//     } else { 
//       this.setState({
//         temperature : undefined,
//         city : undefined,
//         country : undefined,
//         humidity : undefined,
//         description : undefined,
//         error : "Pls enter the values"
//       });
//    }
//   }
//   render() {
//     return (
//       <div>
//         <div className="wrapper">
//           <div className="main">
//             <div className="container">
//               <div className="row">

//               </div>
//             </div>
//           </div>
//         </div>
    
//       </div>
//     );
//   }
// };

// export default App;


{/* <Titles />
<Form getWeather={this.getWeather}/>
<Weather
temperature = {this.state.temperature}
city = {this.state.city}
humidity = {this.state.humidity}
description = {this.state.desription}
error = {this.state.error}
/> */}




class PeopleList extends React.Component{
  constructor(props){
      super(props);
     let d=JSON.parse(localStorage.getItem('data'));
     if(d)
     {
         this.state = {
             data: d,
             credit: '',
             debit: '',
             price: '',
             total: '',
         }
     }else{
         this.state = {
             data:[],
             credit: '',
             debit: '',
             price: '',
             total:'',
         }
     }
     
      this.add=this.add.bind(this);
      this.update=this.update.bind(this);
      this.delete = this.delete.bind(this);
      this.total = this.total.bind(this);
  }
  add(e){
      e.preventDefault();
      let data=this.state.data;
      // console.log('data: ',data);
      let credit=this.state.credit;
      let debit=this.state.debit;
      let price = this.state.price;
      if (price){
          data.push({  credit: credit,debit: debit,price: price, delete: false });
          console.log("updated data: ",data);
          this.setState({ data: data,  price: '',credit: '',debit: '' });
          localStorage.setItem('data', JSON.stringify(data));
          this.total();
      }
     
  }
  update(event){
      let price=this.state.price;
      let credit = this.state.credit;
      let debit = this.state.debit;
       this.setState({ price : event.target.value });
     let check=this.state;
      // console.log('check:',check);
  }
  delete(index){
      console.log(index);
      let data=this.state.data;
      data.splice(index,1);
      this.setState({data});
      localStorage.setItem('data', JSON.stringify(data));
      this.total();
  }
  total(){
      let data=this.state.data;
      if(data)
      {
          let result = 0;
          data.forEach(element => {
              console.log('total:', element);
              result += parseFloat(element.price);
          });
          console.log('result', result);
          this.setState({ total: result });
      }
   
  }
  componentDidMount(){
      this.total();
  }
render(){    
  return(
     
      <div className="wrapper">
      <div className="userinput">
      <div><h1>List of Expense</h1></div>
      <h3>Add Your Expense</h3>
      <form className="inlining">
              {/* <input type="text" className="myInput" onChange={t  his.update} id="expense" placeholder="Expense:" value={this.state.expense}/> */}
              <input type="number" className="myInput" onChange={this.update} id="price" placeholder="Price:" value={this.state.price}/>
              <select name="type" id="type">
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
              <button type="submit" className="add" onClick={this.add}>Add</button>
      </form>
      </div>
          <div className="ListShow">
            <table>
      <ul>
          {this.state.data.map((data,index)=>{
              // console.log('map: ',data);
                     return <ListShow data={data} index={index} key={index} delete={this.delete}/>
          })}
      </ul>
      </table>
      </div>
          <Total total={this.state.total}/>
      </div>
  )
}
}

class ListShow extends React.Component{
  render(){
      return(
          
          <li><span className="expenses">{this.props.data.expense}</span><span className="price">{this.props.data.price}</span><button className="delete" onClick={(e)=>{
              e.stopPropagation();  
              this.props.delete(this.props.index)}}>Del</button></li>
  
      )
  }
}

const Total=(props)=>{
return(
  <div className="total">
      Total: {props.total}
      </div>
)
}
class App extends React.Component{
  render(){
      return (<wrapper><PeopleList/>
          </wrapper>)
  }
}
// ReactDOM.render(<App />, document.getElementById('root'));


export default App;


