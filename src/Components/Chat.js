import React from 'react'
import { useState } from 'react'

export default function Comments(props) {
  const [comment, setComment] = useState("")

  return (
    <div>
      <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
      <button onClick={(e) => {
        props.updateComments(comment);
        setComment("")
      }}>Submit Comment</button>
      {props.message.val.comments && props.message.val.comments.length > 0 ? props.message.val.comments.map((item) => <div>{item}</div>) : <div>No Comments</div>}

    </div>
  )
}