import React, {Component} from 'react'
import axios from 'axios';
import {get} from '../../service/shell-server'
import {Container} from 'react-bootstrap'

const imageSource = (userId, fileName) => {
    console.log({userId, fileName});
    if(userId===159){
      return `https://tattle-services.s3.ap-south-1.amazonaws.com/${fileName}`
    }else{
      return `https://firebasestorage.googleapis.com/v0/b/crowdsourcesocialposts.appspot.com/o/bot-posts%2F${fileName}?alt=media&token=88192814-45bb-4302-b409-b5c26e90390b`
    }
  }

class TempImageCard extends Component{
    constructor(props){
        super(props)
    
        this.setState({
            image_url: ''
        })
    }

    componentDidMount(){
       get(`/posts/id/${this.props.docId}`, 'be2742a0-e610-11e9-98c0-cfafcf9716d4')
       .then((res)=>{
            console.log(res.data)
           this.setState({image_url: imageSource(res.data.user_id, res.data.filename)})
       })
       .catch((err)=>{console.log(err)})
    }

    render(){
        return(
                <div className='media-card mt-4'>
                    {
                        this.state!=undefined && this.state.image_url
                        ?
                        <img
                            src={this.state.image_url}
                            alt='preview'
                        />
                        :
                        null
                    }
                </div>
        )
    }
}

export default TempImageCard