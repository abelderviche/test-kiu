import React, { Component } from 'react'
import  {GridItem, GridItemDrop}  from './GridItem';
import Modal from '../Modal';
import DragSortableList from 'react-drag-sortable'

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
    onSort = (sortedList, dropEvent) =>{
        console.log(dropEvent);
    }
  render() {
    let {imagesList,showModal,itemToShow} = this.state;
    let list = imagesList?imagesList.map(item=>{return({content:(<GridItem onClick={() => this.openModal(item.title,item.url)} key={item.id} minUrl={item.thumbnailUrl} title={item.title}/>),classes:["col-sm-12", "col-md-4", "col-lg-2", "item" ]})}):null;
    return (
      <div className="App__grid container">
            {showModal?<Modal title={itemToShow.title} url={itemToShow.url} handleCloseModal={this.handleCloseModal}/>:null}
            <div className="row">
            {imagesList && imagesList.length > 0? 
              //  imagesList.map((item)=><GridItem onClick={() => this.openModal(item.title,item.url)} key={item.id} minUrl={item.thumbnailUrl} title={item.title}/>)
              <DragSortableList dropBackTransitionDuration={.3} items={list} placeholder={(<GridItemDrop />)} onSort={this.onSort} type="grid"/>
            :'Cargando...'}
            </div>
      </div>
    )
  }
}
