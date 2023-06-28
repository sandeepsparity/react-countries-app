import React, { useState, useEffect, useReducer } from 'react';

interface State{
  loading: boolean;
  error: null | string;
  data: any[]
}

interface Action{
    type: string;
    payload?: any;
}

const reducer = (state: State, action:Action) => {
    switch(action.type){
       case 'FETCH_START':
          return {
            ...state,
            loading: true
          }
       case 'FETCH_SUCCESS':
        return {
            ...state,
            loading: false,
            data: action.payload  
        }
       case 'FETCH_END':
        return {
            ...state,
            loading: false,
            error: action.payload    
        };
       default:
        return state
    }

}

const Table: React.FC = () => {
    const initialState: State = {
        loading: false,
        data: [],
        error: null,
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({type: 'FETCH_START'});
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                if (!response.ok) {
                    throw Error('Server error' + response.status);
                }
                const responseData = await response.json();
                dispatch({type: 'FETCH_SUCCESS', payload: responseData})
            } catch (error: any) {
                console.error('Error:', error.message);
                dispatch({type: 'FETCH_END', payload: error.message})
            }

        }
        fetchData()
    }, [])

    const handleSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = state.data.filter((post: any) => {
        const { title, body } = post;
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
          title.toLowerCase().includes(lowerCaseSearchTerm) ||
          body.toLowerCase().includes(lowerCaseSearchTerm)
        );
    });

    return (
        <section>
            <div>
                <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search..." />
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User Id: </th>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.map((post:{
                            id: number;
                            userId: string;
                            title: string;
                            body: string
                        }) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.userId}</td>
                                <td>{post.title}</td>
                                <td>{post.body}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </section>
    )
}

export default Table;
