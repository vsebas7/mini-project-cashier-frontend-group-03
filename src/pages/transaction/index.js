import ProductListLeftPage from "./list-product"
import CashierTransactionRightPage from "./cashier-transaction"

function TransactionPage () {
    return (
        <div>
            <a className="flex items-center normal-case text-[20pt] pb-10">
                Transaction
            </a>

            <div className="flex gap-8">
                {/* ProductListLeftPage */}
                <ProductListLeftPage/>

                {/* CashierTransactionRightPage */}
                <CashierTransactionRightPage/>

            </div>
        </div>
    )
}

export default TransactionPage