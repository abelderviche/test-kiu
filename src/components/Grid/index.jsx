import React, { Component } from 'react'
import  GridItem  from './GridItem';
import Modal from '../Modal';
import {SortableContainer, SortableElement,arrayMove} from 'react-sortable-hoc';

const getVowels = string => {
    var counter = string.match(/[aeiou]/gi);
    return counter === null ? 0 : counter.length;
}

const compare = (a,b) => {
    if (getVowels(a.title) > getVowels(b.title)) {
        return 1;
    }
    if (getVowels(a.title)< getVowels(b.title)) {
        return -1;
    }
    return b.id - a.id;
}


const SortableItem = SortableElement(({value}) => <GridItem onClick={() => this.openModal(value.title,value.url)} key={value.id} minUrl={value.thumbnailUrl} title={value.title}/>);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

export default class Grid extends Component {
    constructor() {
        super()
        this.state = {
            imagesList:[],
            showModal:false,
            itemToShow:{
                title:'',
                url:''
            }
        }
    }

    

    openModal = (title,url) =>{
        this.setState(
            {
                showModal:true,
                itemToShow:{
                    title,
                    url
                }
            })
    }

    handleCloseModal = () =>{
        this.setState({showModal:false})
    }
    
    
    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/photos?albumId=1")
        .then(response=>{
            return response.json();
        })
        .then(jsonResponse=>{
            jsonResponse.sort(compare)
            // descomentar para validar 
            // jsonResponse.map(k=>{console.log(getVowels(k.title),k.id,k.title)})
            this.setState({
                imagesList:jsonResponse
            })
        })
        
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({imagesList}) => ({
          imagesList: arrayMove(imagesList, oldIndex, newIndex),
        }));
      };
     

  render() {
    let {imagesList,showModal,itemToShow} = this.state;
    return (
      <div className="App__grid container">
            {showModal?<Modal title={itemToShow.title} url={itemToShow.url} handleCloseModal={this.handleCloseModal}/>:null}
            <div className="row">
            {imagesList && imagesList.length > 0? 
                //imagesList.map((item)=><GridItem onClick={() => this.openModal(item.title,item.url)} key={item.id} minUrl={item.thumbnailUrl} title={item.title}/>)
                <SortableList items={imagesList} onSortEnd={this.onSortEnd} />
            :'Cargando...'}
            </div>
      </div>
    )
  }
}
