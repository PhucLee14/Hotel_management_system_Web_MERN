import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewListStaff } from "../../../service/staffService";
import Loading from "../../../components/loading/Loading";

const Staff = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await viewListStaff(1);
            console.log(data);
            if (data?.code === 0) {
                setData(data?.data);
            } else {
                setData([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    console.log(data[0]);
    return isLoading ? (
        <Loading />
    ) : (
        <div className="min-h-[78vh]">
            <div className="flex justify-between items-center mb-4">
                <div className="text-[40px] font-semibold text-gray-600">
                    Staff List
                </div>
                <div>
                    <Link
                        to="/admin/staff/create"
                        className="rounded-lg border bg-indigo-600 text-white px-4 py-3"
                    >
                        Add new{" "}
                    </Link>
                </div>
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
                    <tr className="border bg-gray-100">
                        <th className="text-gray-500 font-medium py-4 pl-4">
                            Staff Name
                        </th>
                        <th className="text-gray-500 font-medium py-4">
                            Date Of Birth
                        </th>
                        <th className="text-gray-500 font-medium py-4">
                            Phone Number
                        </th>
                        <th className="text-gray-500 font-medium py-4">
                            ID Number
                        </th>
                        <th className="text-gray-500 font-medium py-4">
                            Job Title
                        </th>
                        <th className="text-gray-500 font-medium text-center">
                            Action
                        </th>
                    </tr>
                    {data.map((staff) => (
                        <tr key={staff._id} className="border">
                            <td className="py-4 text-gray-500 pl-4">
                                {staff.name}
                            </td>
                            <td className="py-4 text-gray-500">
                                {new Date(
                                    staff.dateOfBirth
                                ).toLocaleDateString()}
                            </td>
                            <td className="py-4 text-gray-500">
                                {staff.phoneNumber}
                            </td>
                            <td className="py-4 text-gray-500">
                                {staff.IDnumber}
                            </td>
                            <td className="py-4 text-gray-500">{staff.role}</td>
                            <td className="py-4 text-gray-500 text-center">
                                <Link
                                    to={`/admin/staff/edit/${staff._id}`}
                                    className="text-purple-700 bg-purple-200 py-1 px-4 rounded-full mr-2"
                                >
                                    Edit
                                </Link>
                                <Link
                                    to={`/admin/staff/${staff._id}`}
                                    className="text-purple-700 bg-purple-200 py-1 px-4 rounded-full"
                                >
                                    Detail
                                </Link>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
};

export default Staff;
