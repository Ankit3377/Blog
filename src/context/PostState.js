import postContext from "./postContext";
import { useState } from "react";

const PostState = (props) => {
    const host = "https://webchat-backend-l9z9.onrender.com";
    const Initial = [];
    const [posts, setposts] = useState(Initial);
    const [users, setusers] = useState(Initial);
    const [comments, setcomments] = useState(Initial);
    const [likenumbers, setlikenumbers] = useState(Initial);
    const [messages, setmessages] = useState(Initial);
    const [friends, setfriends] = useState(Initial);
    const [addfriends, setaddfriends] = useState(Initial);
    const [currentuser, setcurrentuser] = useState(Initial);

    // Get all Note
    const getPosts = async () => {
        // API CALL
        const response = await fetch(`${host}/api/posts/fetchallposts`, {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },

        });
        const json = await response.json();
        setposts(json[0]);
        setusers(json[1]);
        setlikenumbers(json[2]);
        setcomments(json[3]);
        setfriends(json[4]);
        setaddfriends(json[5]);
        setcurrentuser(json[6]);
    }
    
    
    const getMessages = async () => {
        // API CALL
        const response = await fetch(`${host}/api/messages/fetchallmessages`, {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            
        });
        const json = await response.json();
        setmessages(json[0]);
        setfriends(json[1]);
        setusers(json[2]);

        
    }



    // Edit a Note
    const addPost = async (name, title, url, like, comment) => {
        const response = await fetch(`${host}/api/posts/addpost`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },

            body: JSON.stringify({ name, title, url, like, comment })
        });
        const post = await response.json();
        addLikeNumbers(post._id, 1);
        setposts(posts.concat(post));
    }


    const addComment = async (userid, postid, comment) => {
        // API Call
        const response = await fetch(`${host}/api/posts/addcomment`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ userid, postid, comment })
        });
        const newComment = await response.json();

        setcomments(comments.concat(newComment));
    }

    const addLikeNumbers = async (postid, number) => {
        // API Call
        const response = await fetch(`${host}/api/posts/addlikenumbers`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ postid, number })
        });
        const newlikenumbers = await response.json();
        setlikenumbers(newlikenumbers);
    }


    // Edit a Note
    const editLikeNumbers = async (postid) => {
        // API Call
        await fetch(`${host}/api/posts/updatelikenumbers`, {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ postid })
        });

    }

    
    const addMessage = async (recieveuserid, message) => {
        // API Call
        await fetch(`${host}/api/messages/addmessage`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({recieveuserid, message})
        });
    }

    const addFriend = async (friendtwoid) => {
        // API Call
        await fetch(`${host}/api/messages/addfriend`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({friendtwoid})
        });
    }


    return (
        <postContext.Provider value={{ users, currentuser, posts, comments, likenumbers, messages, friends, addfriends, addPost, addComment, addMessage, addFriend, getPosts, getMessages, editLikeNumbers }}>
            {props.children}
        </postContext.Provider>
    )
}

export default PostState;