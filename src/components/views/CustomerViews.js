import { Outlet, Route, Routes } from "react-router-dom"
import { Profile } from "../auth/profile/Profile"
import { TicketEdit } from "../tickets/TicketEdit"
import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"

export const CustomerViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Honey Rae Repair Shop</h1>
					<div>Your one-stop-shop to get all your electronics fixed</div>

					<Outlet />
				</>
			}>

				<Route path="tickets" element={<TicketList />} />
				<Route path="tickets/create" element={<TicketForm />} />
				<Route path="profile" element={<Profile />} />
				<Route path="tickets/edit/:ticketId/" element={<TicketEdit />} />
			</Route>
		</Routes>
	)
}