import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default class SendEmails extends React.Component {
    state = {
        users: [],
        users_ids: [],
        body: "",
    }

    componentDidMount() {
        axios.get(import.meta.env.VITE_ENDPOINT_BASE_URL + 'get-users', {
        }).then((response) => {
            const users = response.data.data;
            this.setState({ users });
        });
    }

    submitForm(event) {
        axios.post(import.meta.env.VITE_ENDPOINT_BASE_URL + 'send-mails/', {
            users_ids: this.state.users_ids,
            body: this.state.body,

        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        }).then((res) => {
            toast.success(res.data.message);
        }).catch((err) => {
            const errs = err.response.data;

            if (errs.errors) {
                if (errs.users_ids) {
                    toast.error(errs.users_ids[0])
                }

                if (errs.body) {
                    toast.error(errs.body[0])
                }
            }

            if (errs.message) {
                toast.error(errs.message)
            }
        });
    }

    render() {
        return (
            <div className="w-[80%] mt-[300px]">
                <div className="mb-3">
                    <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter text-center">Send Emails</h2>
                </div>
                <div>
                    <form className="mx-auto">
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Body</label>
                            <textarea onChange={(e) => this.state.body = e.target.value} rows="7" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Body" />
                        </div>
                        {
                            this.state.users
                                .map(user =>
                                    <div key={user.id} className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                        <input id={'user-' + user.id} onChange={(e) => e.target.checked ? this.state.users_ids.push(user.id) : this.state.users_ids = this.state.users_ids.filter((item) => item !== user.id)} type="checkbox" value={user.id} name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for={'user-' + user.id} className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{user.name} - {user.email}</label>
                                    </div>
                                )
                        }
                        <div className='text-center my-10'>
                            <button onClick={() => this.submitForm()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}