function ReportDetailCard ({
    id = "",
    name = "",
    price = "",
    qty = "",
    total_price = "",
}) {
    return (
        <tr class="bg-white text-left border-b bg-blue dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4  font-medium text-gray-900  dark:text-white">
                {name}
            </th>
            <th scope="row" class="px-6 py-4 text-center font-medium text-gray-900  dark:text-white">
                {qty}
            </th>
            <th scope="row" class="px-6 py-4 text-right font-medium text-gray-900  dark:text-white">
                {price}
            </th>
            <th scope="row" class="px-6 py-4 text-right font-medium text-gray-900  dark:text-white">
                {total_price}
            </th>
        </tr>
    )
}

export default function RenderReportDetailCard ({
    reportDetail = [],
}) {
    return reportDetail.map((reportDetail, index) => {
        return (
            <ReportDetailCard
                id={index}
                name={reportDetail.product.name}
                price={reportDetail.product.price}
                qty={reportDetail.qty}
                total_price={reportDetail.total_price}
            />
        )
    })
}