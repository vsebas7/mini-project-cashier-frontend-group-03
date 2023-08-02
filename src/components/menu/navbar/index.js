import { useDispatch, useSelector } from "react-redux"
import { useNavigate  } from "react-router-dom"
import { logout } from "../../../store/slices/auth/slices"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

export default function Navbar () {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userAvatar = <FontAwesomeIcon icon={faUser} />
	const { username } = useSelector(state => {
        return {
			username : state.auth.username
        }
    })
	const onButtonLogout = () => {
		navigate("/")
        dispatch(logout()) 
    }

	return (
		<nav class="bg-gray-50 dark:bg-gray-900 fixed w-full z-20 top-0 left-0  dark:border-gray-600">
			<div class="bg-gray-50 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<a onClick={() =>{navigate("/")}} className="bg-gray-50 flex items-center normal-case text-[25pt] ">
					Toko Hidup Makmur
				</a>
				<div class="bg-gray-50 w-full md:block md:w-auto" id="navbar-dropdown ">
					<ul class="bg-gray-50 flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<li className="bg-gray-50">
							<a onClick={onButtonLogout} class="bg-gray-50 block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">
								Logout
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}
