import ProductListPage from "./list-product"
import CashierTransactionPage from "./cashier-transaction"

function TransactionPage () {
    return (
        <div>
            <a className="flex items-center normal-case text-[20pt] pb-10">
                Transaction
            </a>

            <div className="flex gap-4">
                {/* ProductListLeftPage */}
                <ProductListPage/>

                {/* CashierTransactionRightPage */}
                <CashierTransactionPage/>

            </div>
        </div>
    )
}

export default TransactionPage