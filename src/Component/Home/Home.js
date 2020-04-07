import React , {Component} from 'react'
import './Home.css'
import CardView from '../Elements/cardView/CardView'
import CardThumbs from '../Elements/CardThumbs/CardThumbs'
import {Message , Input , Button , Icon, Grid , Progress , Segment , Loader , Image} from 'semantic-ui-react'
// import {storage, firebase } from '../../Firebase/Firebase'
import firebase from '../../firebase'
const storage  = firebase.storage()
class Home extends Component {
    state = {
        status : true ,
        stat : false, 
        error : '', 
        load : true ,
        success : '' ,
    //     array : [ {person : "faizan" , age : "23" , image: "./images/faizan.jpg"} , {person : "Ehtisham" , age : "24" , image: "./images/ehtisham.jpg"}, {person : "Bakar" , age : "21", image: "./images/bakar.jpg"},{person : "Uman" , age : "22" , image: "./images/uman.jpg"} , 
    // //     {person : "faizan" , age : "23" , image: "./images/faizan.jpg"} , {person : "Ehtisham" , age : "24" , image: "./images/ehtisham.jpg"}, {person : "Bakar" , age : "21", image: "./images/bakar.jpg"},{person : "Uman" , age : "22" , image: "./images/uman.jpg"}     
    // ], 
    array : [],
    user : this.props.user,
    image : null ,
    url : '' , 
    imageUrl : '', 
    name : '',
    delname : '',
    age : 0,
    progress : 0, 
    delerror : '',
    email : '',
        imageName : '', 
        dataState : firebase.database().ref("data"),
        storage : firebase.storage().ref() , 
        imgDatabase : firebase.database().ref()
}
        

    componentDidMount = () => {
        this.databaseLoad()
     
    }



    onChange = (e) => {
        let files = e.target.files[0]
        console.log(files)
        this.setState({ image : files,
            imageUrl : URL.createObjectURL(files)    
        })
        console.log(this.state.image)
        // let reader = new FileReader()
        // reader.readAsDataURL(files[0])
        // reader.onload = (e) => {
        //     console.log(e.target.result)
        // }

    }


    uploadImage = () => {

        this.setState({error : []})
        if( this.state.name != '' && this.state.age != '' && this.state.email != ''){
      const uploadTask =  firebase.storage().ref(`${this.state.name}/${this.state.image.name}`).put(this.state.image)
        
        uploadTask.on('state_changed',
        ( snapshot ) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            this.setState({progress : prog})
        }, 
        ( error ) => {
            this.setState({error : error})
            console.log(error)
        }, 
        () => {
           firebase.storage().ref(this.state.name).child(this.state.image.name).getDownloadURL().then(
                url => {
                this.setState({url , success : "Data Upload Successfully"})
                    
                this.state.dataState.child(this.state.name).set({
                    displayName : this.state.name , 
                    email : this.state.email ,
                    age : this.state.age ,
                    imageName : this.state.image.name ,
                    imageUrl : url
                })
            console.log(this.state.url)
            
            if(this.state.url != '' && this.state.age != 0 && this.state.name != '')
            {
            //     this.state.array.push({person : `${this.state.name}` , age : `${this.state.age}` , image : `${this.state.url}`, imageName : `${this.state.image.name}`  })
                         
           this.databaseLoad()
                this.setState({name : '' , age : '' , email : '' , success : ''})
        }
            else{
                let er = "Fill all the Fields" 
            this.setState({error : er})
            } 
            })
            .catch(error => {
                this.setState({error : error})
            })
        })


        this.setState({
            files : null,
            url : null 
        })
    }
    else 
    {
         let er = "Fill all the Fields" 
            this.setState({error : er})
    }

}

databaseLoad = () => {
    var data_list = []
    firebase.database().ref("data").once("value").then((snapshot) => {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            if(childData !== null)
            {
            data_list.push(childData) 
            }
            
        });   
        this.setState({array : []})
        this.setState({ array : [...data_list]})
        // this.state.array.push({person : `${data_list[0].displayName}` , age : `${data_list[0].age}` , image : `url`, imageName : `${data_list[0].imageName}`  })
        this.setState({stat : true , load : false})
        console.log(this.state.array); 
       

    })
    .catch(error => {
        this.setState({error : error})
    })

    
        this.setState({stat : true })

}


namechange =(event) => {
    this.setState({name : event.target.value})
    // console.log(this.state.name)
}


delnamechange =(event) => {
    this.setState({delname : event.target.value})
    // console.log(this.state.name)
}

agechange =(event) => {
    this.setState({age : event.target.value})
    // console.log(this.state.age)
}
emailchange =(event) => {
    this.setState({email : event.target.value})
    // console.log(this.state.email)
}
// addCard =() => {
//     if(this.state.url != '' && this.state.age != 0 && this.state.name != '')
//     {
//         this.state.array.push({person : `${this.state.name}` , age : `${this.state.age}` , image : `${this.state.url}`  })
//         this.setState({status : true})
//     }
//     else{
//         console.log("Not Good")
//     }
// }


    deleteFolder = () => {
        // console.log(storage.ref().child("images").child("Faizan"))
        // storage.ref().child("images").delete()
    
        if(this.state.delname != '')
        {
            this.setState({stat : false})
            var desertRef = ""
            this.state.dataState.child(this.state.delname).on('value' , (snapshot) => {
            if(snapshot.val() !== null)
                {
                    const userObj = snapshot.val()
                    console.log(userObj.imageName)
           desertRef = firebase.storage().ref().child(`${this.state.delname}/${userObj.imageName}`);
            // Delete the file
            desertRef.delete().then(function() {
              // File deleted successfully
            }).catch(function(error) {
            
                this.setState({delerror : error})
              // Uh-oh, an error occurred!
            });
            this.state.dataState.child(this.state.delname).remove()   
            this.setState({delname : '' , delerror : ''})
            }
             else{
                console.log("Not Present")               
                }
            })
            this.databaseLoad()
      
        }
        else{
            let er = "Fill Delete Name Field First" 
            this.setState({delerror : er})
        
        }

    }

    handleDismiss = () => {
        this.setState({ visible: false })
    
        setTimeout(() => {
          this.setState({ visible: true })
        }, 2000)
      }
    
    render(){
        return(
            <div className="main-home">
                <div>
                    {/* <div>
                    <InputGroup className= "mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-default">Default</InputGroup.Text>
                     </InputGroup.Prepend>
                    <FormControl
                    aria-label="Default"
               aria-describedby="inputGroup-sizing-default"
                 />
                </InputGroup>
                    </div> */}

                        <Grid>
                            <Grid.Row>
                            <Grid.Column width={8}>
                            <Input value={this.state.name}  onChange={(event) => this.namechange(event)} type="text" fluid name="name" icon="user" iconPosition = "left" placeholder="Name"   />
                            <Input type="number" value={this.state.age} onChange={(event) => this.agechange(event)}  fluid name="age" icon="calendar" iconPosition = "left" placeholder="Age" />
                            <Input type="email"  value={this.state.email} onChange={(event) => this.emailchange(event)} fluid name="mail" icon="mail" iconPosition = "left" placeholder="Email" />
                            <Input fluid type="file" ref={el => this.inputFile = el} name="file" onChange = {(e) => this.onChange(e)} />
                            {this.state.image != null && this.state.progress !== 100 ? 
                  <div>
                      <Progress percent={this.state.progress} indicating />
               {/* <progress className="ui active indicating progress" data-percent="this.state.progress" max="100" /> */}
                <span> {this.state.progress != 0 ? `${this.state.progress}% Upload Completed` : null }</span> 
                </div>          
                : null }
               
                <Button primary onClick = {this.uploadImage}>Add</Button>

                {this.state.error != ''?
              
              <Message color="red" >

                {
                  this.state.error
                }

              </Message>
              
               : null }
                    
              {this.state.success !=='' ?
              
              <Message color="green" >

            
                   {this.state.success}
                

              </Message>
              
               : null }
                            </Grid.Column>
                       
                       <Grid.Column width={8}>
                       <Input value={this.state.delname}  onChange={(event) => this.delnamechange(event)} type="text" fluid name="delname" icon="user" iconPosition = "left" placeholder="Delete Name"   />

                       <Button color="red" onClick={this.deleteFolder} >Delete</Button>

 {this.state.delerror != ''?
              
              <Message color="red" >

                {
                  this.state.delerror
                }

              </Message>
              
               : null }
                           
                            </Grid.Column>
                       </Grid.Row>
                        </Grid>
                 

                    </div>
            


    <div style={{marginTop:'30px'}}>
   {this.state.stat ? 
      <CardView >
            {this.state.array.map ((element , i )=> (

                <CardThumbs
                    key = {i} 
                    name = {element.displayName}
                    age = {element.age}
                    image  = {element.imageUrl}
                />
            ))}
          
          </CardView>  :           null  }
           

            {this.state.load ?
          
        //   <Loader size='    huge' indeterminate active>Loading Users Data</Loader>
        
                <Grid >
                    <Grid.Row >
                        <Grid.Column width={4}>
        <Segment style={{height:'300px'}}>
        <Loader active />
    
        <Image  src='images/placeholder-image.jpg' />
      </Segment></Grid.Column>
      <Grid.Column width={4}>
        <Segment style={{height:'300px'}}>
        <Loader active />
    
        <Image  src='images/placeholder-image.jpg' />
      </Segment></Grid.Column>

      <Grid.Column width={4}>
        <Segment style={{height:'300px'}}>
        <Loader active />
    
        <Image  src='images/placeholder-image.jpg' />
      </Segment></Grid.Column>

      <Grid.Column width={4}>
        <Segment style={{height:'300px'}}>
        <Loader active />
    
        <Image  src='images/placeholder-image.jpg' />
      </Segment></Grid.Column>

                    </Grid.Row>
                </Grid>



            :
            
            null
            }

        {this.state.load == false && this.state.array.length <=0 ?
        <Message
        icon='inbox'
        header='Have not you registered for this portal?'
        content='Be the first user to register for this portal.'
      />
        
        : null}

</div>
            </div>

        )
    }
}


export default Home