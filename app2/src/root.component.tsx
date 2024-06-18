import React, {useState, useEffect} from "react";
// @ts-ignore
import {publish, subscribe} from '@demo/events';

export default function Root(props: any) {
  const [messages, setMessages] = useState<String[]>([]);

  const handleClick = () => {
    publish({type: 'message-from-app2', payload: 'Hello from app 2'});
  }

  useEffect(() => {
    const subs: any = subscribe((event) => {
      if(event.type === 'message-from-app1'){
        setMessages(prevMsgs => [...prevMsgs, event.payload + ' ' + new Date().toString()]);
      }
    });

    return () => subs.unsubscribe();
  }, []);

  const listOfMessages = messages.map((msg,index) => <li key={index}>{msg}</li>);

  return <section>
          <p>
            {props.name} is mounted!
          </p>
          <button onClick={handleClick}>Send message to app1</button>

          <p>Messages from app1:</p>
          <ul>{listOfMessages}</ul>
         </section>;
}
