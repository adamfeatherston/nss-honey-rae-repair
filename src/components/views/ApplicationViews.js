import { Outlet, Route, Routes } from "react-router-dom"
import { TicketContainer } from "../tickets/TicketContainer"
import { TicketForm } from "../tickets/TicketForm"
import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"

export const ApplicationViews = () => {
	
	const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

	if (honeyUserObject.staff) {
		//return employee views
		return <EmployeeViews />
	}
	else {
		//return customer views
		return <CustomerViews />
	}


}

