export default function Title({ item }: any) {
    return (
        <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">{item.label}</h2>
        </div>
    );
}
