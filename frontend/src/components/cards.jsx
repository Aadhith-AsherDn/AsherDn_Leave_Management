export default function cards({
    title,
    no_of_leaves,
}){
    return(
        <div className="bg-gray-400 p-6 rounded-3xl">
            <h3 >
                {title}
            </h3>
            <p>
                {no_of_leaves}
            </p>
        </div>      
    )
}