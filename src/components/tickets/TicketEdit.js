//module for customer to have ability to edit the service tickets they created.
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const TicketEdit = () => {
     
        const [ticket, edit] = useState({
            description: "",
            emergency: false
        })
      
        const { ticketId } = useParams()
        const navigate = useNavigate()

        useEffect(() => {
            fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
                .then(response => response.json())
                .then((data) => {
                    edit(data)
                })
        }, [ticketId])
  
        const handleSaveButtonClick = (event) => {
            event.preventDefault()
            // console.log("you clicked the button"); used to test button functionality before saving/sending state.
              
            return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ticket)
            })
                .then(response => response.json())
                .then(() => {
                    navigate("/tickets")
                })
        }
    
        return (
            <form className="ticketForm">
                <h2 className="ticketForm__title">Edit Service Ticket</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            required autoFocus
                            type="text"
                            style={{
                                height: "10rem"
                            }}
                            className="form-control"
                            placeholder="Brief description of problem"
                            value={ticket.description}
                            onChange={
                                (evt) => {
                                    const copy = {...ticket}
                                    copy.description = evt.target.value
                                    edit(copy)
                                }
                            }>{ticket.description}</textarea>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Emergency:</label>
                        <input type="checkbox"
                            checked={ticket.emergency}
                            onChange={
                                (evt) => {
                                    const copy = {...ticket}
                                    copy.emergency = evt.target.checked
                                    edit(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button 
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Save Edits
                </button>
            </form>
        )    
}
