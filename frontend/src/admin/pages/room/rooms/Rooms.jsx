import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewListRoom } from "../../../../service/roomService";
import Loading from "../../../../components/loading/Loading";
import { viewListRoomType } from "../../../../service/roomTypeService";

const Rooms = () => {
    const [data, setData] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData();
        getRoomTypes();
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await viewListRoom(1);
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

    const getRoomTypes = async () => {
        try {
            const data = await viewListRoomType(1);
            console.log(data);
            if (data?.code === 0) {
                setRoomTypes(data?.data);
            } else {
                setRoomTypes([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getRoomTypeName = (roomTypeId) => {
        const roomType = roomTypes.find((rt) => rt._id === roomTypeId);
        return roomType ? roomType.name : "Unknown";
    };

    return isLoading ? (
        <Loading />
    ) : (
        <div className="min-h-[78vh]">
            <div className="text-[40px] font-semibold text-gray-600 mb-8">
                Room List
            </div>
            <div>
                <Link
                    to="/admin/rooms/create"
                    className="rounded-lg border bg-indigo-600 text-white px-4 py-3"
                >
                    Add new{" "}
                </Link>
            </div>
            <div className="mt-4 flex flex-wrap">
                {data.map((room) => (
                    <div
                        key={room._id}
                        className={`w-[24%] mt-4 bg-white rounded-lg border-l-4 mr-2 ${
                            room.isFree ? "border-[#1cc88a]" : "border-red-600"
                        }`}
                    >
                        <div className="flex flex-col p-6">
                            <div>
                                <p
                                    className={`uppercase font-semibold text-lg ${
                                        room.isFree
                                            ? "text-[#1cc88a]"
                                            : "text-red-600"
                                    }`}
                                >
                                    {getRoomTypeName(room.roomType)}
                                </p>
                                <p className="font-semibold text-lg mt-4">
                                    {room.roomNumber}
                                </p>
                            </div>
                            <div className="flex justify-end">
                                <Link
                                    to={`/admin/rooms/${room._id}`}
                                    className={`text-white py-2 px-6 rounded-full ${
                                        room.isFree
                                            ? "bg-[#1cc88a]"
                                            : "bg-red-600"
                                    }`}
                                >
                                    Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rooms;
