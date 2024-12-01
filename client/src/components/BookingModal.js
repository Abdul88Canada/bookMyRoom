import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import http from "../frameworks/basic-rest/http"; // Replace with your HTTP client
import { API_ENDPOINTS } from "../frameworks/basic-rest/api-endpoints";

const BookingModal = ({ room, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        date: null,
        timeSlot: "",
        name: "",
        phone: "",
        email: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for form submission

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, date, timeSlot: "" }); // Reset time slot on date change
    };

    const handleTimeSlotChange = (e) => {
        setFormData({ ...formData, timeSlot: e.target.value });
    };

    const getAvailableSlotsForDay = () => {
        if (!formData.date) return [];
        const dayOfWeek = formData.date.toLocaleDateString("en-US", { weekday: "long" }); // e.g., "Wednesday"
        const daySlots = room.availableSlots.find((slot) => slot.day === dayOfWeek);
        return daySlots ? daySlots.slots : [];
    };

    const handleFormSubmit = async () => {
        if (!formData.date || !formData.timeSlot || !formData.name || !formData.phone || !formData.email) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const bookingData = {
            roomId: room._id,
            date: formData.date.toISOString(), // Format date as ISO string
            slot: formData.timeSlot,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
        };

        console.log('bookingData', bookingData)

        try {
            setIsSubmitting(true);
            const response = await http.post(`${API_ENDPOINTS.BOOKINGS}`, bookingData); // Replace with your API endpoint
            toast.success("Booking completed successfully!");
            //onSubmit(response.data);
            onClose();
        } catch (error) {
            toast.error(`Booking failed: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsSubmitting(false);
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
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            disabled={isSubmitting}
                        />
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
