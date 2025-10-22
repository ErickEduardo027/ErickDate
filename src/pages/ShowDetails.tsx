import { useParams } from "react-router-dom";

export default function ShowDetails() {
    const { id } = useParams();
    return (
    <div className="text-center text-2xl text-pink-400">
        Detalle del show con ID: {id}
    </div>
    );
}
