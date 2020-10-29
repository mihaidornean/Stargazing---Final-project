import React, { useState } from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";
import { Button } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';

function Post({ username, caption, imageUrl }) {
    return (   
        <div className="post">
            <div className="post_header">
                <Avatar className="post_avatar"  src="https://upload.wikimedia.org/wikipedia/en/3/36/Kygo_Stargazing.jpg" alt='S'/>
                <h3>{username}</h3>
            </div>
            <img className="post_image" src={imageUrl} alt="earthimage"></img>
            <h4 className="post_text"><strong>{username} </strong>{caption}</h4>
            <div className= "buttons">
            <Button className="buttons"  variant="outlined" color="secondary">
                 Delete
            </Button>
            <Button className="buttons" variant="outlined" color="primary">
                Edit
            </Button>
            <FormControlLabel
                control={<Checkbox icon={<FavoriteTwoToneIcon fontSize="large" />}  checkedIcon={<FavoriteTwoToneIcon fontSize="large" />} name="checkedH" />}
                label="Add to Favourites"
            />
     
            </div>

        </div>
        
    )
}

export default Post;


