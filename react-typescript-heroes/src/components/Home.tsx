import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
// import axios from 'axios';


interface IState {
	customers: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			customers: [{
				id: 1,
				first_name: 'Drew',
				last_name: 'Mim',
				email: 'something@mail.ru',
				phone: '+375 (29) 222-11-33',
				address: 'some adress',
				description: 'Bla bla bla',
			},
			{
				id: 2,
				first_name: 'John',
				last_name: 'Doe',
				email: 'johnD@mail.ru',
				phone: '+375 (29) 333-22-11',
				address: 'some adress',
				description: 'Bla bla bla',
			},
			{
				id: 3,
				first_name: 'May',
				last_name: 'Digit',
				email: 'mayD@mail.ru',
				phone: '+375 (29) 111-33-22',
				address: 'some adress',
				description: 'Bla bla bla',
			}]
		}
	}

	// public componentDidMount(): void {
	//     axios.get(`http://localhost:5000/customers`).then(data => {
	//         this.setState({ customers: data.data })
	//     })
	// }

	public deleteCustomer(id: number) {
		this.setState(({customers})=>{
			// const index = customers.findIndex(customer => customer.id === id);
			// console.log(index);
			const newArr = customers.filter(customer=>customer.id!==id);

				return {customers: newArr};
		})
		// axios.delete(`http://localhost:5000/customers/${id}`).then(data => {
		//     const index = this.state.customers.findIndex(customer => customer.id === id);
		//     this.state.customers.splice(index, 1);
		//     this.props.history.push('/');
		// })
	}

	public addCustomer(user: object) {
		const newUser = {...user,	id: this.state.customers.length+1}

		this.setState(({customers})=>{
			console.log(customers.length);

			const newArr = [...customers, newUser];

				return {customers: newArr};
		})
		// axios.delete(`http://localhost:5000/customers/${id}`).then(data => {
		//     const index = this.state.customers.findIndex(customer => customer.id === id);
		//     this.state.customers.splice(index, 1);
		//     this.props.history.push('/');
		// })
	}

	public render() {
		const customers = this.state.customers;
		return (
			<div>
				{customers.length === 0 && (
					<div className="text-center">
						<h2>No customer found at the moment</h2>
					</div>
				)}

				<div className="container">
					<div className="row">
						<table className="table table-bordered">
							<thead className="thead-light">
								<tr>
									<th scope="col">Firstname</th>
									<th scope="col">Lastname</th>
									<th scope="col">Email</th>
									<th scope="col">Phone</th>
									<th scope="col">Address</th>
									<th scope="col">Description</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody>
								{customers && customers.map(customer =>
									<tr key={customer.id}>
										<td>{customer.first_name}</td>
										<td>{customer.last_name}</td>
										<td>{customer.email}</td>
										<td>{customer.phone}</td>
										<td>{customer.address}</td>
										<td>{customer.description}</td>
										<td>
											<div className="d-flex justify-content-between align-items-center">
												<div className="btn-group" style={{ marginBottom: "20px" }}>
													<Link to={`edit/${customer.id}`} className="btn btn-sm btn-outline-secondary">Edit Customer </Link>
													<button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteCustomer(customer.id)}>Delete Customer</button>
												</div>
											</div>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>

			</div>
		)
	}
}