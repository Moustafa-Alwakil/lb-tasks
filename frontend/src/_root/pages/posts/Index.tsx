import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default class PostIndex extends React.Component {  

  state = {
    posts: []
  }

  componentDidMount() {
    axios.get(import.meta.env.VITE_ENDPOINT_BASE_URL + 'posts', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    }).then((response) => {
      const posts = response.data.data;
      this.setState({ posts });
    });
  }

  deletePost(id) {
    axios.post(import.meta.env.VITE_ENDPOINT_BASE_URL + 'posts/' + id, {
      _method: "DELETE"
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    }).then((res) =>{
      const posts = this.state.posts.filter((obj) => obj.id !== res.data.id)
      this.setState({ posts });
      toast.success(res.data.message);
    });
  }

  logout() {
    axios.post(import.meta.env.VITE_ENDPOINT_BASE_URL + 'logout', {
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    }).then(() =>{
      document.location.href = "/login";
    }).catch((err) => {
      const errs = err.response.data;

      if (errs.message) {
        toast.error(errs.message)
      }
    });
  }

  render() {
    return (
      <div className="w-[90%]">
        <div className="mb-3">
          <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter text-center">Posts</h2>
          <div className='text-right mb-5'>
            <Link to="/send-emails" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Send Emails</Link>
            <Link to="/create" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</Link>
            <a onClick={() => this.logout()} className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 cursor-pointer">Logout</a>
          </div>
        </div>


        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.posts
                  .map(post =>
                    <tr key={post.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {post.title}
                      </td>
                      <td className="px-6 py-4">
                        <Link to="/edit" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <a onClick={() => this.deletePost(post.id)} className="font-medium text-red-600 dark:text-blue-500 hover:underline cursor-pointer">Delete</a>
                      </td>
                    </tr>
                  )
              }
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}