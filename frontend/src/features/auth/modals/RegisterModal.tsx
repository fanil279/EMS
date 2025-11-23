import React, { type FC, useState } from "react";
import Button from "../../../components/Button";
import authService from "../../../services/authService";
import type { AuthModalProps } from "../../../types";
import { useDispatch } from 'react-redux';
import { login } from "../authSlice";
import type { AppDispatch } from "../../../store";

const RegisterModal: FC<AuthModalProps> = ({ onClose }) => {
	const dispatch = useDispatch<AppDispatch>();

	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [institution_name, setInstitutionName] = useState<string>("");
	const [institution_address, setInstitutionAddress] = useState<string>("");

	function isValidEmail(email: string) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if ((!name || !password || !email) && isValidEmail(email)) {
			alert("Please fill in all required fields.");
			return;
		}

		try {
			const response = await authService.register({
				name, 
				password, 
				email, 
				institution_name, 
				institution_address
			});

			if (response) {
				dispatch(login(response));

				onClose();
			}

		} catch (error) {
			console.error('Registration error:', error);
			alert('Registration failed. Please try again.');
    	}
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div className="absolute top-100 bg-white rounded-3xl shadow-lg w-full max-w-2xl p-10 max-h-[90vh] overflow-y-auto relative">
				<button
					onClick={onClose}
					className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 text-3xl font-bold"
				>
					&times;
				</button>

				<h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
					Register
				</h2>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Full Name
						</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="John Doe"
							required
							className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Email Address
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="email@example.com"
							required
							className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="********"
							required
							className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Institution Name
						</label>
						<input
							type="text"
							name="institution_name"
							onChange={(e) => setInstitutionName(e.target.value)}
							placeholder="Name of the institution"
							required
							className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Institution Address
						</label>
						<input
							type="text"
							name="institution_address"
							onChange={(e) => setInstitutionAddress(e.target.value)}
							placeholder="Institution address"
							required
							className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<Button
						type="submit"
						variant="primary"
						className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition"
					>
						Register
					</Button>
				</form>
			</div>
		</div>
  	);
};

export default RegisterModal;
