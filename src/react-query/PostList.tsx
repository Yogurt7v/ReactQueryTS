import usePosts from './hooks/usePosts';
import { useState } from 'react';

const PostList = () => {
  const pageSize = 12;
  // const [page, setPage] = useState(1);

  const {data, error, isLoading, fetchNextPage} =  usePosts({ pageSize});

  if(isLoading) return <p>Wait, please...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
    {/* <select className='form-select mb-3' onChange={(e) => setUserId(parseInt(e.target.value)) } value={userId}>
      <option value=""></option>
      <option value="1">User1</option>
      <option value="2">User2</option>
      <option value="3">User3</option>
    </select> */}
    <ul className="list-group">
      {data.pages.map((page) => (
        <>
        {page.map((post) => (
          <li key={post.id} className="list-group-item" >
            {post.body}
          </li>
        )) }
        </>
      ))}

    </ul>

    <button className="btn btn-primary my-2" onClick={() => fetchNextPage()}>
      Load
    </button> 
    </>
  );
};

export default PostList;
