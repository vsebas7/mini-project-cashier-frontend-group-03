import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { keepLogin } from "./store/slices/auth/slices"
// import ProtectedRoute from "./protected.routes"
import LoginPage from "./pages/auth/login"
import ForgotPasswordPage from "./pages/auth/forgot-password"
import ResetPasswordPage from "./pages/auth/reset-password"
import RegisterCashierPage from "./pages/auth/register-cashier"
import Navbar from "./components/menu/navbar"
import Sidebar from "./components/menu/sidebar"
import ListCashierPage from "./pages/cashier"
import ListProductPage from "./pages/product"
import AddNewProductPage from "./pages/product/add-new-product"
import ListCategoryPage from "./pages/product/category"

function App() {
	document.title = 'Toko Hidup Makmur'
	const dispatch = useDispatch()
	const { isKeepLoginLoading } = useSelector(state => {
		return {
			isKeepLoginLoading : state.auth?.isKeepLoginLoading
		}
	})

	useEffect(() => {
		dispatch(keepLogin())
	}, [])

	if (isKeepLoginLoading) return (
		<div className="h-screen w-screen flex flex-row align-bottom justify-center">
			<span className="loading loading-spinner loading-md"></span>
		</div>
	)
	return (
		<div>
			<Navbar />
			<Sidebar />
			<div className="pl-[20em] flex flex-col">
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/forgot-password" element={<ForgotPasswordPage />} />
					<Route path="/reset-password/:token" element={<ResetPasswordPage />} />
					<Route path="/cashier" element={<ListCashierPage />} />
					<Route path="/cashier/register-cashier" element={<RegisterCashierPage />} />
					<Route path="/product" element={<ListProductPage />} />
					<Route path="/product/add-new-product" element={<AddNewProductPage />} />
					<Route path="/category" element={<ListCategoryPage />} />
				</Routes>
			</div>
			
			<Toaster/>
		</div>
	);
}

export default App
