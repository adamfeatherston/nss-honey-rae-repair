import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Ticket } from "./Ticket"
import "./Tickets.css"

export const TicketList = ({ searchTermState }) => {
    const [tickets, setTickets] = useState([])
    const [employees, setEmployees] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()
    //navigate needed for navigate hook to occur (customer button in line 68)

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().includes(searchTermState.toLowerCase())
            })
            setFiltered(searchedTickets)
            // console.log(searchTermState);
        },
        [searchTermState]
    )

    useEffect(
        //function useEffect displays state
        () => {
            // console.log("Initial state of tickets", tickets) // View the initial state of tickets
            fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
                .then(response => response.json())
                .then((ticketArray) => {
                    setTickets(ticketArray)
                })

                fetch(`http://localhost:8088/employees?_expand=user`)
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (honeyUserObject.staff) {
                //employees view of state
                setFiltered(tickets)
            }
            else {
                //customers view of state: compare id of customer or staff to the userID
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets]
    )

    useEffect(
        //useEffect for filtering only emergency tickets state and for showing all tickets state.
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
            else {
                setFiltered(tickets)
            }
        },
        [emergency]
    )

    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [openOnly]
    )

    return <>
        {
            //ternary statement. renders state based on conditions.  if the object is staff or not in this case.
            // "?"" if the user is staff
            // ":"" if the user is customer/(not staff)
            //buttons invoke useEffect function declared beg. in line 44.
            honeyUserObject.staff
                ? <>
                    <button onClick={() => { setEmergency(true) }} >Show Emergency Tickets Only</button>
                    <button onClick={() => { setEmergency(false) }} >Show All Tickets</button>
                </>
                : <>
                    <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
                    <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
                </>
        }

        <h2>List of Tickets</h2>

        <article className="tickets">
            {
                filteredTickets.map(
                    (ticket) => <Ticket employees={employees} isStaff={honeyUserObject.staff} ticketObject={ticket} />
                )
            }
        </article>
    </>
}

