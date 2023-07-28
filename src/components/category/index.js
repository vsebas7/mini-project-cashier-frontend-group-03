function CategoryProduct ({
    id = "",
    name = "",
}) {
    return (
        <option className={id.toString()} value={name}>{name}</option>
    )
}


export default function RenderCategoryProduct ({
    categories = [],
}) {
    return categories.map((category, index) => {
        return (
            <CategoryProduct key={category.id}
                id={category.id}
                name={category.name}
            />
        )
    })
}