import React, { useState, useEffect, Component } from 'react';
import './App.css';
import Post from './Post';
import { auth, db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';  
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';  
import SearchBar from 'search-bar-react';
import Footer from './Footer';
import './Footer.css'
 
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [search, setSearch] =useState('');
  
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
    this.newbirthYear = "";
    this.newHomeWorld = "";
  }

  render() {
    const { imgSrc, cardName, birthYear, homeWorld, onEdit } = this.props;
    return (
      <div className="card">
        <div className="card-content">
          <div className="card-name">{cardName}</div>
          <img src={`http://localhost:3008/${imgSrc}`} alt="profile" />
          <p>
            <span>Birthday:</span>
            {this.state.editing ? (
              <span className="birth-year">{birthYear}</span>
            ) : (
              <input
                type="text"
                defaultValue={birthYear}
                ref={node => {
                  this.newbirthYear = node;
                }}
              />
            )}
          </p>
          <p>
            <span>Homeworld:</span>
            {this.state.editing ? (
              <span className="home-world">{homeWorld}</span>
            ) : (
              <input
                type="text"
                defaultValue={homeWorld}
                ref={node => {
                  this.newHomeWorld = node;
                }}
              />
            )}
          </p>
          <div align="center">
            <button
              onClick={() => {
                this.setState({ editing: true });
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User has logged in
        console.log(authUser);
        setUser(authUser);     
      } else {
          // User has logged out
          setUser(null);
        // User has logged out
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      post: doc.data()
      })));
    })
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));
    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
    setOpenSignIn(false);
  }
  
  return (
    <div className="app">
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
    >
      <div style={modalStyle} className={classes.paper}>
      <form className="app_signup">
        <center>
          <img className="app_headerImage" src= "https://1.bp.blogspot.com/--aN2mZyc8H8/X5SgD26xf4I/AAAAAAAAFr8/EPrdGs0tTC8KAtraTMfD35CCmT1dd3CLwCLcBGAsYHQ/s320/facebook_cover_photo_1.png"/>
        </center>
        <Input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /> 
        <Input
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder ="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button color="primary" type="submit" onClick={signUp}>Sign Up</Button>
        
      </form>
      </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
    >
      <div style={modalStyle} className={classes.paper}>
      <form className="app_signup">
        <center>
          <img className="app_headerImage" src= "https://1.bp.blogspot.com/--aN2mZyc8H8/X5SgD26xf4I/AAAAAAAAFr8/EPrdGs0tTC8KAtraTMfD35CCmT1dd3CLwCLcBGAsYHQ/s320/facebook_cover_photo_1.png" alt="stargazingimg"/>
        </center>
        <Input
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder ="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button color="primary" type="submit" onClick={signIn}>Sign In</Button>
        
      </form>
      </div>
      </Modal>

      

      <div className="app_header">
        <img className="app_headerImage" src= "https://1.bp.blogspot.com/--aN2mZyc8H8/X5SgD26xf4I/AAAAAAAAFr8/EPrdGs0tTC8KAtraTMfD35CCmT1dd3CLwCLcBGAsYHQ/s320/facebook_cover_photo_1.png" alt="stargazingimg"/>

      

        {user ? ( 
          <Button color="primary" onClick={() => auth.signOut()}>Logout</Button>
        ): (
          <div className="app_loginContainer">
            <Button color="primary" onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button color="primary" onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
        
      </div>
      <div className="searchBarContainer">
        <h2 className="slogan">Photo sharing for night sky lovers and astrophotographers</h2>
        <div className="searchBar">
        <SearchBar
          onChange={(text) => setSearch(text)}
          size='large'
          width='100%'
          autoFocus
          placeholder='Search images'
          onClear={() => setSearch('')}
          value=''
        />
        </div>
      </div>
      
  <div className="app_posts">
          {
            posts.filter(({id,post})=>post.caption.includes(search)).map(({id,post}) => (
              <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            ))  
            
          }

      </div>
      
      {user?.displayName ? (
        <ImageUpload username={user.displayName}/>
        
      ) : (
        <h3>You need to login to upload images</h3>
        
        
      )}
      <Footer />
    </div>
    
  );
} 



 

export default App;
