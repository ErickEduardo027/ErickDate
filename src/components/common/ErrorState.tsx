export default function ErrorState({message="Ocurrió un error."}:{message?:string}) {
    return (
    <div className="p-4 rounded-xl border border-red-400/30 bg-red-500/5 text-red-300">
        {message}
    </div>
    );
}
