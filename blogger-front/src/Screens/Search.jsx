import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Card, CardContent, Typography } from '@mui/material';
function Search() {
    let { pk } = useParams();
    const [post, setPost] = useState({})

    useEffect(()=>{
        fetch('http://localhost:8000/api/search/?pk='+pk, { method: 'get'})
        .then(response => {
            return response.json()
        })
        .then(data=> {
            setPost(JSON.parse(data)[0])
        })
    }, [])
    
    return(
        <>
        <Card sx={{margin: 'auto', 
            border: '1px solid transparent', borderRadius: 5}}>
            <CardContent>
                <Typography variant="h4" sx={{fontWeight: "bold"}} gutterBottom>
                    {post.fields?.title}
                </Typography>
                <Typography variant="body1">
                    {post.fields?.post}
                </Typography>
            </CardContent>
        </Card>
        </>
    )
}
    
export default Search