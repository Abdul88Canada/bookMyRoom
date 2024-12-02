import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import http from "../frameworks/basic-rest/http"; // Ensure correct import for HTTP client
import { API_ENDPOINTS } from "../frameworks/basic-rest/api-endpoints";

const BookingModal = ({ room, onClose, handleBookingComplete }) => {
    const [formData, setFormData] = useState({
        date: null,
        timeSlot: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, date, timeSlot: "" }); // Reset time slot when date changes
    };

    const handleTimeSlotChange = (e) => {
        setFormData({ ...formData, timeSlot: e.target.value });
    };

    const getAvailableSlotsForDay = () => {
        if (!formData.date) return [];
    
        const selectedDate = formData.date.toISOString().split("T")[0]; // Convert selected date to "YYYY-MM-DD"
        console.log('Selected Date:', selectedDate);
        console.log('Room Available Slots:', room.availableSlots);
    
        // Iterate through availableSlots to find matching `slotsByDate`
        for (const slotGroup of room.availableSlots) {
            const matchingDate = slotGroup.slotsByDate.find((slotDate) => slotDate.date === selectedDate);
            if (matchingDate) {
                console.log('Matching Slots:', matchingDate.slots);
                return matchingDate.slots; // Return slots for the selected date
            }
        }
    
        console.log('No slots found for the selected date.');
        return []; // Return an empty array if no slots match the date
    };
    

    const handleFormSubmit = async () => {
        if (!formData.date || !formData.timeSlot ) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const bookingData = {
            roomId: room._id,
            date: formData.date.toISOString(), // Convert date to ISO string
            slot: formData.timeSlot,
        };

        try {
            setIsSubmitting(true);
            const response = await http.post(API_ENDPOINTS.BOOKINGS, bookingData);
            toast.success("Booking completed successfully!");
            //onSubmit(response.data); // Call parent handler with response data
            onClose();
        } catch (error) {
            toast.error(`Booking failed: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsSubmitting(false);
            handleBookingComplete()
        }
    };

    return (
        <div className="modal-overlay">
            <div className="bmodal">
                <div className="modal-header">
                    <h2>New Booking</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Meeting Room</label>
                        <p>{room.name}</p>
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <DatePicker
                            selected={formData.date}
                            onChange={handleDateChange}
                            minDate={new Date()}
                            placeholderText="Select a date"
                            className="date-picker"
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="form-group">
                        <label>Time Slot</label>
                        <select
                            name="timeSlot"
                            value={formData.timeSlot}
                            onChange={handleTimeSlotChange}
                            disabled={!formData.date || isSubmitting}
                        >
                            <option value="">Select a time slot</option>
                            {getAvailableSlotsForDay().map((slot, index) => (
                                <option key={index} value={slot}>
                                    {slot}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        className="submit-button"
                        onClick={handleFormSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Booking..." : "Book"}
                    </button>
                    <button className="close-button" onClick={onClose} disabled={isSubmitting}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
