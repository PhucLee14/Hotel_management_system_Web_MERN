import React, { useEffect, useState } from "react";
import { viewBillDetail } from "../../../service/billService";
import { viewGuest } from "../../../service/guestService";
import { Link, useParams } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import { viewStaff } from "../../../service/staffService";
import formatNumber from "../../../utils/formatNumber";

const InvoiceDetail = () => {
    const { id } = useParams();
    const [bill, setBill] = useState({});
    const [guest, setGuest] = useState({});
    const [staff, setStaff] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getBill();
    }, []);

    const getBill = async () => {
        try {
            setIsLoading(true);
            const data = await viewBillDetail(id);
            const guestData = await viewGuest(data.guest);
            const staffData = await viewStaff(data.staff);
            setBill(data);
            setGuest(guestData);
            setStaff(staffData);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const calculateTotal = () => {
        const { roomCharge, serviceCharge, discount } = bill;
        if (guest.guestCategories === "Vip" && discount) {
            return roomCharge + serviceCharge - discount;
        }
        return roomCharge + serviceCharge;
    };

    return isLoading ? (
        <Loading />
    ) : (
        <div className="min-h-[78vh]">
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Invoice Detail
            </div>
            <div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Guest Name: </p>
                    <p className="text-gray-500">{guest.name}</p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Staff Name: </p>
                    <p className="text-gray-500">{staff.name}</p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Invoice Date: </p>
                    <p className="text-gray-500">
                        {new Date(bill.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Room Charge: </p>
                    <p className="text-gray-500">
                        {bill.roomCharge ? formatNumber(bill.roomCharge) : ""}{" "}
                        VND
                    </p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Service Charge: </p>
                    <p className="text-gray-500">
                        {bill.serviceCharge
                            ? formatNumber(bill.serviceCharge)
                            : ""}{" "}
                        VND
                    </p>
                </div>
                {guest.guestCategories === "Vip" && bill.discount && (
                    <>
                        <div className="flex py-3 border-b">
                            <p className="font-semibold mr-4">Subtotal: </p>
                            <p className="text-gray-500">
                                {bill.roomCharge + bill.serviceCharge
                                    ? formatNumber(
                                          bill.roomCharge + bill.serviceCharge
                                      )
                                    : ""}{" "}
                                VND
                            </p>
                        </div>
                        <div className="flex py-3 border-b">
                            <p className="font-semibold mr-4">Discount: </p>
                            <p className="text-gray-500">
                                {bill.discount
                                    ? formatNumber(bill.discount)
                                    : ""}{" "}
                                VND
                            </p>
                        </div>
                    </>
                )}
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Total Amount: </p>
                    <p className="text-gray-500">
                        {calculateTotal() ? formatNumber(calculateTotal()) : ""}{" "}
                        VND
                    </p>
                </div>
                <div className="flex flex-col">
                    <Link
                        to="/admin/invoice"
                        className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20 text-center"
                    >
                        Ok
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetail;
