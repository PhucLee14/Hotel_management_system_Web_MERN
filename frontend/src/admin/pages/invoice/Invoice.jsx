import React, { useEffect, useState } from "react";
import { viewListBill } from "../../../service/billService";
import Loading from "../../../components/loading/Loading";
import { Link } from "react-router-dom";
import { viewListGuest } from "../../../service/guestService";
import { viewListStaff } from "../../../service/staffService";

const Invoice = () => {
    const [bills, setBill] = useState([]);
    const [guests, setGuests] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getBill();
        getGuest();
        getStaff();
    }, []);

    const getBill = async () => {
        try {
            setIsLoading(true);
            const data = await viewListBill(1);
            console.log(data);
            if (data?.code === 0) {
                setBill(data?.data);
            } else {
                setBill([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    const getGuest = async () => {
        try {
            setIsLoading(true);
            const data = await viewListGuest(1);
            if (data?.code === 0) {
                setGuests(data?.data);
            } else {
                setGuests([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    const getStaff = async () => {
        try {
            setIsLoading(true);
            const data = await viewListStaff(1);
            if (data?.code === 0) {
                setStaffs(data?.data);
            } else {
                setStaffs([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    return isLoading ? (
        <Loading />
    ) : (
        <div className="min-h-[78vh]">
            <div className="text-[40px] font-semibold text-gray-600 mb-4">
                Invoice List
            </div>
            <div className="flex flex-col justify-between bg-white rounded-xl shadow-md">
                <div className="flex w-1/4 m-4">
                    <input
                        type="text"
                        className="border-2 outline-none px-4 py-2 w-full rounded-s-lg"
                        placeholder="Input phone number"
                    />
                    <button className="border-2 border-l-0 bg-white hover:bg-gray-50 outline-none px-4 rounded-e-lg">
                        <i class="fa-sharp fa-solid fa-xmark text-gray-500"></i>
                    </button>
                </div>
                <table className=" rounded-lg text-left m-4 mt-0 bg-white overflow-hidden">
                    <tr className="border bg-gray-100 rounded-lg overflow-hidden">
                        <th className="text-gray-600 font-medium py-4 pl-4">
                            Guest Name
                        </th>
                        <th className="text-gray-600 font-medium">
                            Total Amount
                        </th>
                        <th className="text-gray-600 font-medium">
                            Staff Name
                        </th>
                        <th className="text-gray-600 font-medium">
                            Invoice Date
                        </th>
                        <th className="text-gray-600 font-medium text-center">
                            Action
                        </th>
                    </tr>
                    {bills.map((bill) => {
                        const guest = guests.find((g) => g._id === bill.guest);
                        const staff = staffs.find((s) => s._id === bill.staff);
                        return (
                            <tr className="border" key={bill._id}>
                                <td className="py-4 text-gray-500 pl-4">
                                    {guest?.name}
                                </td>
                                <td className="py-4 text-gray-500">
                                    {bill.roomCharge + bill.serviceCharge}
                                </td>
                                <td className="py-4 text-gray-500">
                                    {staff?.name}
                                </td>
                                <td className="py-4 text-gray-500">
                                    {new Date(
                                        bill.createdAt
                                    ).toLocaleDateString()}
                                </td>
                                <td className="py-4 text-gray-500 text-center">
                                    <Link
                                        to={`/admin/invoice/${bill._id}`}
                                        className="text-purple-700 bg-purple-200 py-1 px-4 rounded-full mr-1"
                                    >
                                        Detail
                                    </Link>
                                    <Link
                                        to={`/admin/invoice/pdf/${bill._id}`}
                                        className="text-purple-700 bg-purple-200 py-1 px-4 rounded-full ml-1"
                                    >
                                        PDF
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    );
};

export default Invoice;
