type Props = {
    page: number;
    pages: number;
    onPage: (p:number)=>void;
};

export default function Pagination({page, pages, onPage}:Props){
    return (
    <div className="flex items-center justify-center gap-2 mt-6">
        <button
        disabled={page<=1}
        onClick={()=>onPage(page-1)}
        className="px-3 py-2 rounded-lg border border-neutral-800 disabled:opacity-40"
        >Anterior</button>
        <span className="text-sm opacity-80">Página {page} de {pages}</span>
        <button
        disabled={page>=pages}
        onClick={()=>onPage(page+1)}
        className="px-3 py-2 rounded-lg border border-neutral-800 disabled:opacity-40"
        >Siguiente</button>
    </div>
    );
}
