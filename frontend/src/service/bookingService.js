import apiBackend from "../utils/apiBackend";

//Add new booking
export const createNewBooking = (data) => {
    return apiBackend.post(`/api/booking/create`, data);
};

//Edit booking
export const editBooking = (id, roomInteraction, serviceBookings) => {
    return apiBackend.put(`/api/booking/edit/${id}`, {
        roomInteraction,
        serviceBookings,
    });
};

//View list free room
export const viewListFreeRoom = (checkin, checkout) => {
    return apiBackend.get(
        `/api/booking/viewListFreeRoom/${checkin}/${checkout}`
    );
};

export const viewListBooking = (currentPage) => {
    return apiBackend.get(`/api/booking/${currentPage}`);
};

export const viewBooking = (id) => {
    return apiBackend.get(`/api/booking/view/${id}`);
};

export const viewListRoomBooking = (currentPage) => {
    return apiBackend.get(`/api/booking/roombooking/${currentPage}`);
};

export const viewRoomBooking = (id) => {
    return apiBackend.get(`/api/booking/view/roombooking/${id}`);
};

export const viewListServiceBooking = (currentPage) => {
    return apiBackend.get(`/api/booking/servicebooking/${currentPage}`);
};

export const viewServiceBooking = (id) => {
    return apiBackend.get(`/api/booking/view/servicebooking/${id}`);
};
